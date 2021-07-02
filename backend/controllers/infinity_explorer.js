const explorerQueries = require("../services/explorerQueries");
const config = require('../config')
const fetch = require('node-fetch');
var dateFormat = require("dateformat");


const Web3 = require("web3");
const web3 = new Web3();
const ethUtil = require("ethereumjs-util");
const ethereum_address = require("ethereum-address");

web3.setProvider(
  new web3.providers.HttpProvider(
    "https://mainnet.infura.io/v3/9255e09afae94ffa9ea052ce163b8c90"
  )
);


exports.listItemexplorer  = async (db,req,res)=>{
  
    var item_category_id=req.body.item_category_id;
    var limit = req.body.limit;
    console.log(req.body);

    if (!item_category_id) {
        return res.status(400).send({
            success: false,
            msg: "category_id required!!"
        });
    }
    if (!limit) {
        return res.status(400).send({
            success: false,
            msg: "limit required!!"
        });
    }

    var qry =" Select i.id,ie.id as item_edition_id, case when length(i.name)>=30 then concat(left(i.name,30),'...')  else i.name end as name,i.name as item_fullname,i.description,i.image,i.file_type,i.owner,i.owner_id,i.created_by,i.item_category_id,i.token_id,ie.price,coalesce(i.start_date,i.datetime) as start_date,i.end_date,ie.edition_text,ie.edition_no from item_edition as ie left join item as i on i.id=ie.item_id where  ie.is_sold=0 and ie.id in (select min(id) from item_edition where is_sold=0 group by item_id)  and (date(i.expiry_date) >= CURRENT_DATE or i.expiry_date is null) and i.is_active=1";
    
    if(item_category_id!='0'){
        if(item_category_id==='-1'){
            qry= qry+' and i.start_date>CURRENT_DATE and i.start_date is not null'
        }else{
            qry= qry+' and i.item_category_id ='+ item_category_id;
            qry=qry+' and (i.start_date<CURRENT_DATE or i.start_date is null)' ;
        }  
     }else{
        qry=qry+' and (i.start_date<CURRENT_DATE or i.start_date is null)' ;
     }

     qry= qry+' order by ie.id desc  ';
     
     if(limit !='0'){
        qry= qry+' LIMIT '+limit
     }
//console.log(qry);
await db.query(qry, function(error,data){
    if(error){
    return res.status(400).send({
        success: false,
        msg: "Error occured!!",
        error
    });
}
    if(data.length > 0){
res.status(200).send({
    success:true,
 
    response : data
});
    }else{
        res.status(400).send({
            success:false,
            msg:"No data found!!"
        });            
    }
});
}



exports.itemdetails = async (db, req, res) => {
    var item_edition_id = req.body.item_edition_id;
  
    //console.log(user_id);


    const responsefee = await fetch('https://infinity8.io:8001/api/erc1155/getFeeFortransfer', {
        method: 'POST', headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "from_address": `${config.contractOwnerAddress}`,
            "from_private_key": `${config.contractOwnerPrivateKey}`,
            "contract_address": `${config.contractAddress}`,
            "to_address": `${config.contractOwnerAddress}`,
            "token_owner_address": `${config.contractOwnerAddress}`,
            "tokenId": 324,
            "amount": 1
        })
    });

    const feedata = await responsefee.json();
 
  

     await db.query(explorerQueries.getSetting,async function(error,dataSetting){
         
    
    await db.query(explorerQueries.getItemDetails,[item_edition_id], async function (error, data) {

        console.log(data);
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
                
            });
        }
        if (data) {
            return res.status(200).send({
                success: true,
                msg: "Data!!",
                response: data[0],
                response1: feedata.tnx_fee,
                response2: dataSetting[0].resale_charges
            });
        }
    });

       
            });
}



exports.userwallet = async (db, req, res) => {
    var public_key = req.body.public_key;
    // if (!user_id) {
    //     user_id = 0;
    // }

    try{
    var qry=`select uw.user_id,uw.public,0 as balance from user_wallet as uw where uw.user_id=getUserIdByAddress('${public_key}')`;
    console.log(qry);
    await db.query(qry, async function (error, data) {
        console.log(data);
        if (data.length>0) {
            console.log("in",data[0].user_id)
        await db.query(explorerQueries.getItemCount,[data[0].user_id,data[0].user_id], async function (error, result) {
       
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
                
            });
        }

        const response1 = await fetch('https://api.coinbase.com/v2/prices/ETH-USD/buy', {
        method: 'GET', headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const feedata = await response1.json();
      
       
        const response2 = await fetch(`https://api.etherscan.io/api?module=account&action=txlistinternal&address=${public_key}&startblock=0&endblock=2702578&sort=asc&apikey=RVCXGDXZ2PYSGX9Q25RBU9YUSMUSGRPM78`, {
            method: 'GET', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
            const feedata1 = await response2.json();
       console.log(feedata);
/// GET BALANCE
const response3 = await fetch(`https://api.etherscan.io/api?module=account&action=balance&address=${public_key}&tag=latest&apikey=RVCXGDXZ2PYSGX9Q25RBU9YUSMUSGRPM78`, {
            method: 'GET', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const bal = await response3.json();
        console.log("bal",bal);
       return res.status(200).send({
        success: true,
        msg: "Data!!",
        usd_balance: (bal.result * feedata['data']['amount'])/1000000000000000000,
        eth_balance: (bal.result)/1000000000000000000,
        public_key : public_key,
        response1: feedata1.result,
        response3 :  result[0]
    });

        
            });

   


    }
    else{
        const response1 = await fetch('https://api.coinbase.com/v2/prices/ETH-USD/buy', {
            method: 'GET', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const feedata = await response1.json();

    const response2 = await fetch(`https://api.etherscan.io/api?module=account&action=txlistinternal&address=${public_key}&startblock=0&endblock=2702578&sort=asc&apikey=RVCXGDXZ2PYSGX9Q25RBU9YUSMUSGRPM78`, {
        method: 'GET', headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
        const feedata1 = await response2.json();
    
        /// GET BALANCE
const response3 = await fetch(`https://api.etherscan.io/api?module=account&action=balance&address=${public_key}&tag=latest&apikey=RVCXGDXZ2PYSGX9Q25RBU9YUSMUSGRPM78`, {
    method: 'GET', headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
});
const bal = await response3.json();
console.log("bal",bal);

    if (feedata1) {
            
        return res.status(200).send({
            success: true,
            msg: "Data!!",
            usd_balance: (bal.result * feedata['data']['amount'])/1000000000000000000,
            eth_balance: (bal.result)/1000000000000000000,
            public_key : public_key,
            response1: '',
           
            response3 : ''
        });
    }
    else{
            return res.status(204).send({
            success: false,
            msg: "Address not found!!",
            error
            
        });
        
    }

    }
    });
    }catch(err){
        console.log(err);
    }
    }   








exports.useritem = async (db, req, res) => {
    var created_by = req.body.created_by;
    // if (!user_id) {
    //     user_id = 0;
    // }

        await db.query(explorerQueries.getUserItem,[created_by], async function (error, data) {

        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
                
            });
        }

        if (data) {
            return res.status(200).send({
                success: true,
                msg: "Data!!",
                response: data,
            });
        }

        });
}


exports.userHolder = async (db, req, res) => {
    var id = req.body.id;
    // if (!user_id) {
    //     user_id = 0;
    // }

    
    const responsefee = await fetch('https://infinity8.io:8001/api/erc1155/getFeeFortransfer', {
        method: 'POST', headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "from_address": `${config.contractOwnerAddress}`,
            "from_private_key": `${config.contractOwnerPrivateKey}`,
            "contract_address": `${config.contractAddress}`,
            "to_address": `${config.contractOwnerAddress}`,
            "token_owner_address": `${config.contractOwnerAddress}`,
            "tokenId": 324,
            "amount": 1
        })
    });

    const feedata = await responsefee.json();
 
  

    
        await db.query(explorerQueries.getUserHolder,[id], async function (error, data) {

           
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
                
            });
        }
        var datetime= dateFormat(data[0].datetime, "dddd, mmmm dS, yyyy");
        if (data) {
            return res.status(200).send({
                success: true,
                msg: "Data!!",
                response: data,
                response1: feedata.tnx_fee,
                response2 : datetime
            });
        }

        });
}


exports.userItems = async (db, req, res) => {
    var owner_id = req.body.owner_id;

        await db.query(explorerQueries.getUserItemDetails,[owner_id], async function (error, data) {

        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
                
            });
        }

        if (data) {
            return res.status(200).send({
                success: true,
                msg: "Data!!",
                response: data,
            });
        }

        });
}


exports.getCreatorItem = async (db, req, res) => {
    var created_by = req.body.created_by;

        await db.query(explorerQueries.getCreatorItem,[created_by], async function (error, data) {

        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
                
            });
        }

        if (data) {
            return res.status(200).send({
                success: true,
                msg: "Data!!",
                response: data,
            });
        }

        });
}



exports.hashDetail = async (db, req, res) => {
    var hash = req.body.hash;
    var user_id = req.body.user_id;
    
    try {

        await db.query(explorerQueries.getuserhashdetail,[hash], async function (error, result) {

                
               
            console.log(result);

        var data = await web3.eth.getTransactionReceipt(hash);
        var data1 =  await web3.eth.getTransaction(hash);
        return res.status(200).json({
            response : result,
      
            Receipt:data,
        data:data1,
        });
    });
      } catch (er) {
        return res.status(200).json({
          msg:"Something went wrong! please try again.",
          status:false,
          error:er
        });
      }
    
}

exports.explorerSearch = async (db, req, res) => {
    var search = (!req.body.search) ? '' : req.body.search;
    if (!search) {
        return res.status(400).send({
            success: false,
            msg: "Search parameter required"
        });
    }
    qry = "select ie.id,u.email,getCreatorId(i.id) as user_id,u.user_name,i.name,i.image as profile_pic,'nft' as type from item_edition as ie left join item as i on i.id=ie.item_id left join users as u on u.id=i.created_by where i.name like '" + `${search}` + "%' and ie.id in (select min(id) from item_edition where is_sold=0 group by item_id)union all select uw.public as id,u.email,u.id as user_id,u.user_name,'' as name,'' as profile_pic,'address' as type from user_wallet as uw left join users as u on u.id=uw.user_id where uw.public='"+`${search}`+"' union all select i.token_hash as id,u.email,u.id as user_id,u.user_name,i.name,u.profile_pic,'hash' as type from item as i left join users as u on u.id=i.created_by where i.token_hash='"+`${search}`+"' union all select ie.transfer_hash as id,u.email,u.id as user_id,u.user_name,i.name,u.profile_pic,'hash' as type from item_edition as ie left join item as i on i.id=ie.item_id left join users as u on u.id=ie.owner_id where ie.transfer_hash='"+`${search}`+"'";
    //console.log(qry);
    try {
        await db.query(qry, async function (err, result) {
            if (err) {
                return res.status(400).send({
                    success: false,
                    msg: "error occured ",
                    error: err
                });
            }
            else if (result.length > 0) {
                return res.status(200).send({
                    success: true,
                    msg: 'data  found',
                    response: result

                });
            }
            else {
                console.log("in else "+search);
                const trx = await fetch(`https://api.etherscan.io/api?module=account&action=txlist&address=${search}&startblock=0&endblock=99999999&sort=desc&apikey=RVCXGDXZ2PYSGX9Q25RBU9YUSMUSGRPM78`, {
                    method: 'GET', headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                });
            
                const walletTrx = await trx.json();

                
                if(walletTrx.status==='0'){
                return res.status(204).send({
                    success: false,
                    msg: "No data found ",
                    data: []
                });
            }
            else{
                var arr=[];
                var obj={
                    'id':search,
                    'email': '',
                    "user_id": 0,
                    "user_name": "",
                    "name": "",
                    "profile_pic": "",
                    "type": "address"
                };
                arr.push(obj);
                return res.status(200).send({
                    success: true,
                    msg: "data found ",
                    response: arr
                });
            }
        }
        })



    } catch (err) {
        return res.status(500).send({
            success: false,
            msg: `unable to add customer address due to internal error :${err}`
        });
    }
}


exports.getWalletTrx = async (db, req, res) => {
    var public_key = req.body.public_key;
    // if (!user_id) {
    //     user_id = 0;
    // }

    
    const trx = await fetch(`https://api.etherscan.io/api?module=account&action=txlistinternal&address=${public_key} &startblock=0&endblock=2702578&sort=desc&apikey=RVCXGDXZ2PYSGX9Q25RBU9YUSMUSGRPM78`, {
        method: 'GET', headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

    const walletTrx = await trx.json();
    
           if (walletTrx) {
            return res.status(200).send({
                success: true,
                msg: "Data!!",
                response: walletTrx
            });
        }

        }
