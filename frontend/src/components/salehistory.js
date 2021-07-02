import React, { Component } from 'react';
 import axios from 'axios';
 import Header from '../directives/header'
 import Footer from '../directives/footer'
 import config from '../config/config'
 import Cookies from 'js-cookie';

import { Link } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import ReactDatatable from '@ashvin27/react-datatable'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const headers = {
    'Content-Type': 'application/json'
 };

export default class salehistory extends Component {

    constructor(props) {
        super(props)
		this.loginData = (!Cookies.get('loginSuccess'))? [] : JSON.parse(Cookies.get('loginSuccess'));
      this.state = {
         talentStatusAPIData:'',
         getUserBidsData:[],
         getUserPurchaseData:[],
         defaultActive:'Price',
         BidDetailData:[],
         selectedBid:[]

      }
      
this.columns = [
   {
       key: "Image",
       text: "Image",
       cell: (item) => {
            return (
               <Link className="weak mr-2 d-inlne-block" to={`${config.baseUrl}itemdetails/${item.item_id}`}
               target="_blank">
               <img src={item.image === null || item.image === '' || item.image === undefined 
               ? 'images/team2.jpg' 
               :
               `${item.image}`} style={{width:'60px',height:'60px',borderRadius:'60px'}} alt=""/>
            </Link>
         );
     }
   },
   {
       key: "name",
       text: "Name",
       sortable: true,
   },
   {
          key: "item_category",
          text: "Category",
          
   },
   {
      key: "price",
      text: "Price",
      
      cell: (item) => {
         return (
            <span>{item.price} VUL</span>
            );
  }
},

{
   key: "create_date",
   text: "Date",
   
},
{
   key: "Action",
   text: "Action",
   cell: (item) => {
      return (
         <>
         {/* {item.status === 'Pending' ?  */}
         <button onClick={this.getBidDetails.bind(this,item)} data-toggle="modal" data-target="#myModal" className="btn btn-primary">View bid</button>
         
      {/* } */}
         </>
   );
}
},
]


this.config = {
   page_size: 10,
   length_menu: [10, 20, 50],
   show_filter: true,
   show_pagination: true,
   pagination: 'advance',
   button: {
            excel: false,
            print: false
      }
   }


this.columns1 = [
   {
       key: "Image",
       text: "Image",
       cell: (item) => {
            return (
               <a className="weak mr-2 d-inlne-block" href={`${config.imageUrl}${item.image}`}
               target="_blank">
               <img src="images/youtube-logo2.jpg" style={{width:'60px',height:'60px',borderRadius:'60px'}}/>
            </a>
         );
     }
   },
   {
       key: "item_name",
       text: "Name",
       sortable: true,
   },
   {
          key: "creator",
          text: "Creation",
          
   },
   {
      key: "price",
      text: "Amount",
      
      cell: (item) => {
         return (
            <span>{item.price} VUL</span>
            );
  }
},

{
   key: "purchase_datetime",
   text: "Date",
   
},

{
   key: "Action",
   text: "Action",
   cell: (item) => {
      return (
         <>
          {item.transfer_hash === null || item.transfer_hash === '' || item.transfer_hash === undefined ? '' :
                <a target="_blank" href={item.transfer_hash} style={{textTransform:'inherit'}} className="btn btn-primary">Blockchain View</a>}

      
         </>
   );
}
},
]

      
      this.config1 = {
         page_size: 10,
         length_menu: [10, 20, 50],
         show_filter: true,
         show_pagination: true,
         pagination: 'advance',
         button: {
                  excel: false,
                  print: false
            }
         }
   
   
}
            
   componentDidMount() {
      this.talentStatusAPI()
      this.getBidListAPI()
      this.getUserPurchaseAPI()
      if(Cookies.get('paymentFor')){
      this.setState({
         defaultActive:Cookies.get('paymentFor')
      })
      Cookies.set('paymentFor','')
   }
      
   }

   //=======================================  Bid details  =====================

async getBidListAPI() {
   await axios({
      method: 'post',
      url: `${config.apiUrl}myBidItem`,
      data: { "user_id": this.loginData.data.id }
   })
      .then(result => {
         if (result.data.success === true) {
            this.setState({
               getUserBidsData: result.data.response,
               
            })
            
         }
         else if (result.data.success === false) {
         }
      }).catch(err => {
      });
   }


   async getBidDetails(item){
      await axios({
         method: 'post',
         url: `${config.apiUrl}getBidDetail`,
         data: { "user_id": this.loginData.data.id,"item_edition_id":item.item_edition_id }
      })
         .then(result => {
            if (result.data.success === true) {
               this.setState({
                  BidDetailData: result.data.response,
                  selectedBid:item,
                  
               })
            }
            else if (result.data.success === false) {
            }
         }).catch(err => {
         });
      }
      //=======================================  Bid details  =====================

async getUserPurchaseAPI() {
   await axios({
      method: 'post',
      url: `${config.apiUrl}getUserSale`,
      data: { "user_id": this.loginData?.data?.id }
   })
      .then(result => {
         if (result.data.success === true) {
            this.setState({
               getUserPurchaseData: result.data.response,
               
            })
         }
         else if (result.data.success === false) {
         }
      }).catch(err => {
         
      });
   }
   

loading(id){
// alert(id)
if(id == '1'){
   window.location.href = `${config.baseUrl}authoredit`
}
else if(id == '2'){
   window.location.href = `${config.baseUrl}about`
}
else if(id == '3'){
   window.location.href = `${config.baseUrl}salehistory`
}
else if(id == '4'){
   window.location.href = `${config.baseUrl}yourpurchase`
}
else if(id == '5'){
   window.location.href = `${config.baseUrl}paymentsetting`
}
else if(id == '6'){
   window.location.href = `${config.baseUrl}featurescreator/${this.loginData.data.id}`

}
else if (id == '7') {
   window.location.href = `${config.baseUrl}royalty`
}

}

async talentStatusAPI(){
await axios({
   method: 'post',
   url: `${config.apiUrl}getTelentStatus`,
   data: {'user_id':this.loginData.data.id}
})
   .then(result => {
      if (result.data.success === true) {
         this.setState({
            talentStatusAPIData:result.data.response[0]
         })
      }
      else if (result.data.success === false) {
      }
   }).catch(err => {
   });
}


//==========================================  Delete Post  ================================

async approveBid(id) {

   confirmAlert({
       title: 'Confirm to submit',
       message: 'Are you sure to Approve this.',
       buttons: [
           {
               label: 'Yes',
               onClick: () =>
                   axios({
                       method: 'post',
                       url: `${config.apiUrl}/bidAccept`,
                       headers: { "Authorization": this.loginData?.Token },
                       data: {"email":this.loginData.data.user_email, 'user_id': this.loginData.data.id,'item_edition_id':id.item_edition_id,'bid_id':id.bid_id,'item_id':id.item_id,'payment_id':id.payment_id}
                   }).then((res) => {
                     //   this.componentDidMount();
                       toast.success("Bid approved successfully", {
                        position: toast.POSITION.TOP_CENTER
                        });
                        setTimeout(() => {
                           window.location.reload()    
                        }, 500);
                       
                      
                   }).catch((error) => {
                   })
           },
           {
               label: 'No',
           }
       ]
   });

}
    render() {
        return (    

            <>
             <Header/>
             <body className="page-login" style={{backgroundColor: "#fff"}}>
             <div id="content-block">
         <div className="container be-detail-container your-purchase-bid">
            <h2 className=" text-white mb-4">Sell History</h2>
            <div className="row">
               <ToastContainer/>
               <div className="left-feild col-xs-12 col-sm-3">
                  <div className="be-vidget">
                     {/* <!-- <h3 className="letf-menu-article">
                        Choose Category
                        </h3> --> */}
                     <div className="creative_filds_block">
                       <ul className="ul nav">
                       {this.state.talentStatusAPIData?.telent_status === 1 ? 
                          <li className="edit-ln" ><Link onClick={this.loading.bind(this,'6')} to={`${config.baseUrl}featurescreator/${this.loginData.data.id}`}>My Profile</Link></li>
                          :''
                          
                        }
                          <li className="edit-ln" ><Link onClick={this.loading.bind(this,'1')} to={`${config.baseUrl}authoredit`}>Account Setting</Link></li>
                          <li className="edit-ln" ><Link onClick={this.loading.bind(this,'2')} to={`${config.baseUrl}about`}>About</Link></li>
                          <li className="edit-ln active" ><Link onClick={this.loading.bind(this,'3')} to={`${config.baseUrl}salehistory`}>Sell History</Link></li>
                          <li className="edit-ln" ><Link onClick={this.loading.bind(this,'4')} to={`${config.baseUrl}yourpurchase`}>Purchases History</Link></li>
                          {/* <li className="edit-ln" ><Link onClick={this.loading.bind(this,'5')} to={`${config.baseUrl}paymentsetting`}>Wallet</Link></li> */}
                          {/* <li className="edit-ln" ><Link onClick={this.loading.bind(this,'7')} to={`${config.baseUrl}royalty`}>Royalty</Link></li> */}
								{/* <!-- <li className="edit-ln"><a href="#web-references">Web References</a></li> --> */}
							</ul>
                     </div>
                  </div>
               </div>
               <div className="col-xs-12 col-sm-9 yourPurchases" >
                  <div className="tab-wrapper style-1">
                     <div className="tab-nav-wrapper">
                        <div className="nav-tab  clearfix">
                           <div className={`nav-tab-item ${(this.state.defaultActive==='Price')?'active':''}`}>
                              <span>Sell History</span>
                           </div>
                           {/* <div className={`nav-tab-item ${(this.state.defaultActive!=='Price')?'active':''}`}>
                              <span>Bids History</span>
                           </div> */}
                    
                        </div>
                     </div>
                     <div className="tabs-content clearfix">
                        <div className={`tab-info ${(this.state.defaultActive==='Price')?'active':''}`}>
                           <div className="row">
                              <div className="col-ml-12 col-xs-12 col-sm-12" style={{marginTop:'-25px'}}>
                                 <div className="">
                                    <div className="row pt-0">
                                    <div className="col-sm-12 mt-3">
                                      <div className="">
                                     

                                        {this.state.getUserPurchaseData.length === 0 ? 
                                       <div class="col-sm-12 background-shadow p-5">
                              
                                       <div class="row">
                                           <div class="col-sm-12 text-center">
                                               <h5 class="weak">You don't have any collected creations available for sale.</h5>
                                           </div>
                                       </div>
                                       
                                   </div>
                                   :
                                   <ReactDatatable
                                   config={this.config1}
                                   records={this.state.getUserPurchaseData}
                                columns={this.columns1}
                                                        /> 
                                       }
                                                                         
                                      </div>
                                      </div>
                                  </div>
                                 </div>
                              </div>
                              
                           </div>
                        </div>
                        <div className={`tab-info ${(this.state.defaultActive!=='Price')?'active':''}`}>
                           <div className="row">
                              <div className="col-ml-12 col-xs-12 col-sm-12" style={{marginTop:'-25px'}}>
                                 <div className="">
                                 {this.state.getUserBidsData.length === 0 ? 
                                       <div class="col-sm-12 background-shadow p-5">
                              
                                       <div class="row">
                                           <div class="col-sm-12 text-center">
                                               <h5 class="weak">You don't have any collected creations available for Bid.</h5>
                                           </div>
                                       </div>
                                       
                                   </div>:                     
                                 <ReactDatatable
                  config={this.config}
                  records={this.state.getUserBidsData}
               columns={this.columns}/> }


					                    {/* <table className="table mt-md-4 mt-0" style={{minWidth: "650px"}}>
					                      <thead className="thead-light">
					                        <tr className="">
                                          <th>Image</th>
                                          <th>Name</th>
					                            <th className="w-10 text-center">Creation</th>
					                            <th className="w-20">Bid Amount</th>
					                            <th className="w-15">Bid Type</th>
					                            <th className="w-20">Date</th>
					                            <th className="w-10">Status</th>					                        </tr>
					                      </thead>
					                      <tbody>
					                            {this.state.getUserBidsData.map(item => (

					                            <tr>
					                                <td>
                                               <img src={item.image === null || item.image === '' || item.image === undefined 
                                             ? 'images/team2.jpg' 
                                             :
                                             `${config.imageUrl}${item.image}`} style={{width:'100px',height:'98px'}} alt=""/></td>
                                                  
                                                
					                                <td>{item.full_name}</td>
					                                <td>{item.nft_datetime}</td>
					                                <td>$ {item.bid_price}</td>
					                                <td>{item.bid_type}</td>
					                                <td>{item.bid_datetime}</td>
					                                <td>{item.status}</td>
					                               
					                            </tr>
                                           ))}
					                            
					                      </tbody>
					                    </table> */}
                                 </div>
                              </div>
                              
                           </div>
                        </div>
                        
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <br/><br/>

            


<div className="modal" id="myModal">
<div className="modal-dialog" style={{overflow:'hidden',width:'700px'}}>
  <div className="modal-content">
    <div className="modal-header">
      <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
      <h4 className="modal-title">Bid details of <b>{this.state.selectedBid.name}</b></h4>
    </div>
    <div className="modal-body">
      <table className="table table-striped table-hover">
          <thead>
          </thead>
          <tbody >
              <tr>
                  <th>Bid ID</th>
                  <th>User Name</th>
                  <th>Bid Price</th>
                  <th>Date</th>
                  <th>Action</th>
              </tr>
              {(this.state.BidDetailData.length==0)?
               <tr>
                  <td colSpan="4">No records found.</td>
               </tr>
              :
              this.state.BidDetailData.map((item,i)=>(
               <tr>
                     <td>{item.bid_id}</td>
                     <td>{item.user_name}</td>
                     <td>$ {item.bid_price}</td>
                     <td>{(item.datetime.replace('.000Z','')).replace('T',' ')}</td>
                     <td><button data-dismiss="modal" aria-hidden="true" type="button" onClick={this.approveBid.bind(this,item)} className="btn btn-sm btn-primary">Approve Bid</button></td>
               </tr>
            ))} 
          </tbody>
      </table>
    </div>
    {/* <div className="modal-footer">
      <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
    </div> */}
  </div>
</div>
</div>


                                   
      </body>
             <Footer/>
             </>
        )
    }
}  