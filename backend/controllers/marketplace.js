const CryptoJS = require("crypto-js");
var fetch = require('node-fetch');
const config = require('../config');
var validator = require("email-validator");
var ipfsCompress = require('./ipfsCompress/imagecompress');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const axios = require('axios');
var nodemailer = require('nodemailer')
var speakeasy = require('speakeasy');
/* stripe includes*/
const express = require("express");
const jwt = require('jsonwebtoken');
const app = express();
require("dotenv").config();
const stripe = require("stripe")(`${config.stripe_key}`);
const bodyParser = require("body-parser");
const cors = require("cors");
var FormData = require('form-data');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
/*-------------------*/

const marketplaceQueries = require("../services/marketplaceQueries");
const adminQueries = require("../services/adminQueries");
const { json } = require("body-parser");
const { compileFunction } = require("vm");




const mysql = require('mysql2');
const { JWT_SECRET_KEY } = require("../config");
const { end } = require("../utils/connection");
// create the pool
const pool = mysql.createPool({ host: config.mysqlHost, user: config.user, password: config.password, database: config.database, port: config.mysqlPort });
// now get a Promise wrapped instance of that pool
const promisePool = pool.promise();
// query database using promises


exports.test = async (db, req, res) => {
    
    const jwtToken = jwt.sign({
        email: req.body.email,
        user_id: req.body.user_id,
    }, config.JWT_SECRET_KEY, {
        expiresIn: config.SESSION_EXPIRES_IN
    })
    return res.status(200).send({
        success: false,
        msg: "Token generated",
        token: jwtToken
    }); 
}



exports.getJWTToken = async (db, req, res) => {

    const jwtToken = jwt.sign({
        email: req.body.email,
        id: req.body.user_id,
    }, config.JWT_SECRET_KEY, {
        expiresIn: config.SESSION_EXPIRES_IN
    })
    return res.status(200).send({
        success:true,
        responce : jwtToken
    })
}   

exports.addTelent = async (db, req, res) => {

    var user_id = req.body.user_id;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;
    var description = req.body.description;
    var facebook = req.body.facebook;
    var youtube = req.body.youtube;
    var twitter = req.body.twitter;
    var insta = req.body.insta;
    var nft_hash = req.body.nft_hash;
    var country_id = req.body.country_id;
    var city = req.body.city;
    var follower = req.body.follower;
    //console.log(city);
    if (!first_name) {
        return res.status(400).send({
            success: false,
            msg: "First Name required"
        });
    }

    if (!last_name) {
        return res.status(400).send({
            success: false,
            msg: "Last Name required"
        });
    }

    if (!user_id) {
        return res.status(400).send({
            success: false,
            msg: "User ID required"
        });
    }

    if (!email) {
        return res.status(400).send({
            success: false,
            msg: "email required"
        });
    }

    var insertData = {
        "user_id": user_id,
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "description": description,
        "facebook": facebook,
        "youtube": youtube,
        "twitter": twitter,
        "insta": insta,
        "country_id": country_id,
        "city": city,
        "follower": follower
    }
    //console.log(insertData);
    await db.query(marketplaceQueries.addTelent, [insertData], async function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        if (data) {
            //console.log("dsfdsf");
            /* update telent_status in users */
            var updateData = {
                "telent_status": "0"
            }
            await db.query(marketplaceQueries.updateUser, [updateData, user_id], function (error, data) {
                if (error) {
                    return res.status(400).send({
                        success: false,
                        msg: "Error occured!!",
                        error
                    });
                }
            })
            /* ------------------*/

            res.status(200).send({
                success: true,
                msg: "Your request submitted successfully!! ",

            });
        } else {
            res.status(400).send({
                success: false,
                msg: "No Data"
            });
        }
    });
}

exports.EstateUser = async (db, req, res) => {

    var user_id = req.body.user_id;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;
    var country_id = req.body.country_id;
    var city = req.body.city;
    var description = req.body.description;
    var website = req.body.website;
    var insta = req.body.insta;

    if (!first_name) {
        return res.status(400).send({
            success: false,
            msg: "First Name required"
        });
    }

    if (!last_name) {
        return res.status(400).send({
            success: false,
            msg: "Last Name required"
        });
    }

    if (!user_id) {
        return res.status(400).send({
            success: false,
            msg: "User ID required"
        });
    }

    if (!email) {
        return res.status(400).send({
            success: false,
            msg: "email required"
        });
    }

    var insertData = {
        "user_id": user_id,
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "country_id": country_id,
        "city": city,
        "description": description,
        "website": website,
        "insta": insta,

    }
    //console.log(insertData);
    await db.query(marketplaceQueries.addRealEstateUser, [insertData], async function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        if (data) {
            //console.log("dsfdsf");
            /* update telent_status in users */
            var updateData = {
                "real_estate_status": "0"
            }
            await db.query(marketplaceQueries.updateUser, [updateData, user_id], function (error, data) {
                if (error) {
                    return res.status(400).send({
                        success: false,
                        msg: "Error occured!!",
                        error
                    });
                }
            })
            /* ------------------*/

            res.status(200).send({
                success: true,
                msg: "Your request submitted successfully!! ",

            });
        } else {
            res.status(400).send({
                success: false,
                msg: "No Data"
            });
        }
    });
}


exports.listWishlist = async (db, req, res) => {

    var user_id = req.body.user_id;

    if (!user_id) {
        return res.status(400).send({
            success: false,
            msg: "User ID required"
        });
    }
    await db.query(marketplaceQueries.listWishlist, [user_id], function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        if (data.length > 0) {
            res.status(200).send({
                success: true,
                msg: "Your Wishlist ",
                data: data

            });
        } else {
            res.status(400).send({
                success: false,
                msg: "No Data"
            });
        }
    });
}


exports.addWishlist = async (db, req, res) => {

    var item_id = req.body.item_id;
    var user_id = req.body.user_id;

    if (!item_id) {
        return res.status(400).send({
            success: false,
            msg: "Item ID required"
        });
    }

    if (!user_id) {
        return res.status(400).send({
            success: false,
            msg: "User ID required"
        });
    }
    var insertData = {
        "user_id": user_id,
        "item_id": item_id
    }

    await db.query(marketplaceQueries.addWishlist, [insertData], function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        if (data) {
            res.status(200).send({
                success: true,
                msg: "Item added to your wishlist ",

            });
        } else {
            res.status(400).send({
                success: false,
                msg: "No Data"
            });
        }
    });
}


exports.listWishlist = async (db, req, res) => {

    var user_id = req.body.user_id;

    if (!user_id) {
        return res.status(400).send({
            success: false,
            msg: "User ID required"
        });
    }
    await db.query(marketplaceQueries.listWishlist, [user_id], function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        if (data.length > 0) {
            res.status(200).send({
                success: true,
                msg: "Your Wishlist ",
                data: data

            });
        } else {
            res.status(400).send({
                success: false,
                msg: "No Data"
            });
        }
    });
}

exports.removeWishlist = async (db, req, res) => {

    var wishlist_id = req.body.wishlist_id;

    await db.query(marketplaceQueries.removeWishlist, [wishlist_id], function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        if (data) {
            res.status(200).send({
                success: true,
                msg: "Item Removed from your wishlist "
            });
        } else {
            res.status(200).send({
                success: false,
                msg: "Deletion Failed"
            });
        }
    });
}


exports.addCart = async (db, req, res) => {

    var item_id = req.body.item_id;
    var user_id = req.body.user_id;

    if (!item_id) {
        return res.status(400).send({
            success: false,
            msg: "Item ID required"
        });
    }

    if (!user_id) {
        return res.status(400).send({
            success: false,
            msg: "User ID required"
        });
    }
    var insertData = {
        "user_id": user_id,
        "item_id": item_id,
        "quantity": 1
    }
    //console.log(insertData);
    await db.query(marketplaceQueries.addCart, [insertData], function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        if (data) {
            res.status(200).send({
                success: true,
                msg: "Item added to your cart ",

            });
        } else {
            res.status(400).send({
                success: false,
                msg: "No Data"
            });
        }
    });
}


exports.listCart = async (db, req, res) => {

    var user_id = req.body.user_id;
    var cart_id = 0;


    if (!user_id) {
        return res.status(400).send({
            success: false,
            msg: "User ID required"
        });
    }
    await db.query(marketplaceQueries.listCart, [user_id, user_id], function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        if (data.length > 0) {
            res.status(200).send({
                success: true,
                msg: "Your Wishlist ",
                cart_total: data[0].cart_total,
                data: data

            });
        } else {
            res.status(400).send({
                success: false,
                msg: "No Data"
            });
        }
    });
}

exports.removeCart = async (db, req, res) => {

    var cart_id = req.body.cart_id;

    await db.query(marketplaceQueries.removeCart, [cart_id], function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        if (data) {
            res.status(200).send({
                success: true,
                msg: "Item Removed from your wishlist "
            });
        } else {
            res.status(200).send({
                success: false,
                msg: "Deletion Failed"
            });
        }
    });
}


exports.itemDetails = async (db, req, res) => {
    var item_edition_id = req.body.item_edition_id;
    var user_id = req.body.user_id;
    if (!user_id) {
        user_id = 0;
    }
    //console.log(user_id);
    await db.query(marketplaceQueries.itemdetail, [item_edition_id, user_id, item_edition_id, item_edition_id], async function (error, data) {

        //console.log(data);
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }


        await db.query(marketplaceQueries.getWalletDetail, [user_id], async function (error, walletData) {
            if (error) {
                return res.status(400).send({
                    success: false,
                    msg: "Error occured in wallet detail!!",
                    error
                });
            }
            
            await db.query(marketplaceQueries.getImages, [item_edition_id,item_edition_id], async function (error, imageData) {
                if (error) {
                    return res.status(400).send({
                        success: false,
                        msg: "Error occured in ImageData!!",
                        error
                    });
                }

            ////GET TRANSFER FEE 
            const response1 = await fetch('https://infinity8.io:8001/api/erc1155/getFeeFortransfer', {
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
            const feedata = await response1.json();
            if (!feedata.tnx_fee) {
                return res.status(400).send({
                    success: false,
                    msg: "Error occured in txn_fee get!!",
                    error
                });
            }
            const response2 = await fetch('https://api.coinbase.com/v2/prices/ETH-USD/buy', {
                method: 'GET', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            const usdPrice = await response2.json();


            if (data.length > 0) {
                itemcategoryid = data[0].item_category_id;
            }
            else {
                itemcategoryid = 0;
            }
            await db.query(marketplaceQueries.itemCategory, [itemcategoryid, item_edition_id], function (error, data1) {
                if (error) {
                    return res.status(400).send({
                        success: false,
                        msg: "Error occured!!",
                        error
                    });
                }
                if (data.length > 0) {
                    var wallet_balance_usd = 0;
                    var wallet_balance_eth = 0;
                    if (walletData.length > 0) {
                        wallet_balance_usd = walletData[0].balance;
                        wallet_balance_eth = walletData[0].balance / usdPrice['data']['amount'];

                    }
                    //console.log("txn_fee_usd " + (feedata.tnx_fee * usdPrice['data']['amount']).toFixed(2));
                    //console.log("txn_fee_eth " + (feedata.tnx_fee.toFixed(6)));
                    var extrafee = 3;
                    res.status(200).send({
                        success: true,
                        txn_fee_eth: (feedata.tnx_fee + (extrafee / usdPrice['data']['amount'])).toFixed(6),
                        txn_fee_usd: ((feedata.tnx_fee * usdPrice['data']['amount']) + extrafee).toFixed(2),
                        price_eth: (data[0].price / usdPrice['data']['amount']).toFixed(6),
                        wallet_balance_usd: wallet_balance_usd.toFixed(2),
                        wallet_balance_eth: wallet_balance_eth.toFixed(6),
                        response: data[0],
                        data: data1
,                        imageData : imageData

                    });

                }
                else {
                    return res.status(400).send({
                        success: false,
                        msg: "No Data"
                    });
                }
            });
        });
    });
});
}


exports.ItemDetailForEdit = async (db, req, res) => {
    var item_id = req.body.item_id;
    await db.query(marketplaceQueries.ItemDetailForEdit, [item_id], async function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        if (data.length > 0) {
            res.status(200).send({
                success: true,
                response: data[0]
            });
        }
        else {
            res.status(400).send({
                success: false,
                msg: "No Data"
            });
        }
    });
}


exports.getUserTelent = async (db, req, res) => {

    var limit = req.body.limit;
    var qry = "Select t.*, u.user_name,u.banner,u.profile_pic,u.telent_status from telent as t inner Join users as u ON t.user_id=u.id and u.deactivate_account=0 inner join (select * from item where id in (select max(id) from item group by created_by)) as i on i.created_by=t.user_id where u.is_featured=1";
    if (limit > 0) {
        var qry = `Select t.*, u.user_name,u.banner,u.profile_pic,u.telent_status from telent as t left Join users as u ON t.user_id=u.id and u.deactivate_account=0  inner join (select * from item where id in (select max(id) from item group by created_by)) as i on i.created_by=t.user_id where u.is_featured=1 limit ${limit}`;
    }
    await db.query(qry, async function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        if (data.length > 0) {
            res.status(200).send({
                success: true,
                response: data

            });

        }
        else {
            res.status(400).send({
                success: false,
                msg: "No Data"
            });
        }
    });
}


exports.updateTelentForApproved = async (db, req, res) => {

    var email = req.body.email;
    var user_id = req.body.user_id;

    await db.query(marketplaceQueries.updateTelentForApproved, [user_id], async function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }

        // var transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //       user: `bilal.espsofttech@gmail.com`,
        //       pass: `Bilal123#`
        //     }
        //   });

        var transporter = nodemailer.createTransport({
            host: 'espsofttechnologies.com',
            port: 465,
            secure: true,
            auth: {
                user: 'developer@espsofttechnologies.com',
                pass: 'Espsoft123#'
            },
            tls: {
                rejectUnauthorized: false
            }
        });


        var mailOptions = {
            from: 'no-reply@infinity8.io',
            //   from : 'bilal.espsofttech@gmail.com', 
            to: `${email}`,
            subject: 'Account item Verified Link',
            html: `<div style="background-color:#f4f4f4">
        <div>
        <div style="margin:0px auto;max-width:800px">
        <table align="center" border="0" cellpadding="0" cellspacing="0" style="width:100%">
        <tbody>
        <tr>
        <td style="direction:ltr;font-size:0px;padding:10px 0px;text-align:center">
        </td>
        </tr>
        </tbody>
        </table>

        </div>
        <div style="background:black;background-color:#6f43ec;margin:0px auto;border-radius:5px;max-width:800px">
        <table align="center" border="0" cellpadding="0" cellspacing="0" style="width:100%;border-radius:5px">
        <tbody>
        <tr>
        <td style="direction:ltr;font-size:0px;padding:8px 0;text-align:center">
        <div style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
        <table border="0" cellpadding="0" cellspacing="0" style="vertical-align:top" width="100%">
        <tbody>
        <tr>
        <td align="center" style="font-size:0px;padding:0px 25px 0px 25px;word-break:break-word">
        <table border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px">
        <tbody>
        <tr>
        <td style="width:126px">
        <img height="auto" src="https://infinity8.io/images/logo-new.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px" width="150"  class="CToWUd">
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        <div style="height:20px">
        &nbsp;
        </div>
        <div style="background:#fff;margin:0px auto;border-radius:5px;max-width:800px">
        <table align="center" border="0" cellpadding="0" cellspacing="0" style="width:100%;border-radius:5px">
        <tbody>
        <tr>
        <td style="direction:ltr;font-size:0px;padding:0px;text-align:center">
        <div style="margin:0px auto;max-width:800px">
        <table align="center" border="0" cellpadding="0" cellspacing="0" style="width:100%">
        <tbody>
        <tr>
        <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center">
        <div style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
        <table border="0" cellpadding="0" cellspacing="0" style="vertical-align:top" width="100%">
        <tbody>
        <tr>
        <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word">
        <div style="font-family:Arial,sans-serif;font-size:15px;line-height:1;text-align:left;color:#000"><b>Dear ${email}</b></div>
        </td>
        </tr>
        <tr>
        <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word">
        <div style="font-family:Arial,sans-serif;font-size:15px;line-height:25px;text-align:left;color:#000">
        <h3> You are Verified, Now Add Item </h3>
        <h4>Please Click on given link </h4>
        <a href='https://infinity8.io/featurescreator/${user_id}'>Click here </a>
        </div>
        </td>
        </tr>
        <tr>
        <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word">
        <div style="font-family:Arial,sans-serif;font-size:15px;line-height:25px;text-align:left;color:#000">
        Thanks <br>
        Infinity8 Team
        </div>
        </td>
        </tr>

        </tbody>
        </table>
        </div>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        <div style="height:20px">
        &nbsp;
        </div>
        <div style="background:#000;background-color:#000;margin:0px auto;border-radius:5px;max-width:800px">
        <font color="#888888">
        </font><font color="#888888">
        </font><font color="#888888">
        </font><table align="center" border="0" cellpadding="0" cellspacing="0" style="background:#b09af7;background-color:#000;width:100%;border-radius:5px">
        <tbody>
        <tr>
        <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center">
        <div style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
        <font color="#888888">
        </font><font color="#888888">
        </font><font color="#888888">
        </font><table border="0" cellpadding="0" cellspacing="0" style="vertical-align:top" width="100%">
        <tbody>
        <tr>
        <td align="center" style="font-size:0px;padding:0px 25px;word-break:break-word">
        <div style="font-family:Arial,sans-serif;font-size:13px;line-height:25px;text-align:left;color:#fff"><b>Infinity8 Team

        </b></div>
        </td>
        <td align="center" style="font-size:0px;padding:0px 25px;word-break:break-word">
        <div style="font-family:Arial,sans-serif;font-size:13px;line-height:25px;text-align:right;color:#fff"><b style="color:white"><a href="mailto:support@infinity8.io" target="_blank">support@infinity8.io</a></b></div><font color="#888888">
        </font></td></tr></tbody></table><font color="#888888">
        </font></div><font color="#888888">
        </font></td></tr></tbody></table><font color="#888888">
        </font></div><font color="#888888">
        </font></div><font color="#888888">
        </font></div>`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                //   console.log(error);
            } else {
                //console.log('Email sent: ' + info.response);
            }
        });

        if (data) {
            res.status(200).send({
                success: true,
                msg: "Email has been Sent",
            });
        } else {
            res.status(400).send({
                success: false,
                msg: "Something Wrong due to internal Error"
            });
        }
    });
}

exports.realEstateUserApprove = async (db, req, res) => {

    var email = req.body.email;
    var user_id = req.body.user_id;

    await db.query(marketplaceQueries.realEstateUserApprove, [user_id], async function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }

        var transporter = nodemailer.createTransport({
            host: 'espsofttechnologies.com',
            port: 465,
            secure: true,
            auth: {
                user: 'developer@espsofttechnologies.com',
                pass: 'Espsoft123#'
            },
            tls: {
                rejectUnauthorized: false
            }
        });


        var mailOptions = {
            from: 'no-reply@infinity8.io',
            //   from : 'bilal.espsofttech@gmail.com', 
            to: `${email}`,
            subject: 'Account item Verified Link',
            html: `<div style="background-color:#f4f4f4">
        <div>
        <div style="margin:0px auto;max-width:800px">
        <table align="center" border="0" cellpadding="0" cellspacing="0" style="width:100%">
        <tbody>
        <tr>
        <td style="direction:ltr;font-size:0px;padding:10px 0px;text-align:center">
        </td>
        </tr>
        </tbody>
        </table>

        </div>
        <div style="background:black;background-color:#6f43ec;margin:0px auto;border-radius:5px;max-width:800px">
        <table align="center" border="0" cellpadding="0" cellspacing="0" style="width:100%;border-radius:5px">
        <tbody>
        <tr>
        <td style="direction:ltr;font-size:0px;padding:8px 0;text-align:center">
        <div style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
        <table border="0" cellpadding="0" cellspacing="0" style="vertical-align:top" width="100%">
        <tbody>
        <tr>
        <td align="center" style="font-size:0px;padding:0px 25px 0px 25px;word-break:break-word">
        <table border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px">
        <tbody>
        <tr>
        <td style="width:126px">
        <img height="auto" src="https://infinity8.io/images/logo-new.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px" width="150"  class="CToWUd">
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        <div style="height:20px">
        &nbsp;
        </div>
        <div style="background:#fff;margin:0px auto;border-radius:5px;max-width:800px">
        <table align="center" border="0" cellpadding="0" cellspacing="0" style="width:100%;border-radius:5px">
        <tbody>
        <tr>
        <td style="direction:ltr;font-size:0px;padding:0px;text-align:center">
        <div style="margin:0px auto;max-width:800px">
        <table align="center" border="0" cellpadding="0" cellspacing="0" style="width:100%">
        <tbody>
        <tr>
        <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center">
        <div style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
        <table border="0" cellpadding="0" cellspacing="0" style="vertical-align:top" width="100%">
        <tbody>
        <tr>
        <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word">
        <div style="font-family:Arial,sans-serif;font-size:15px;line-height:1;text-align:left;color:#000"><b>Dear ${email}</b></div>
        </td>
        </tr>
        <tr>
        <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word">
        <div style="font-family:Arial,sans-serif;font-size:15px;line-height:25px;text-align:left;color:#000">
        <h3> You are Verified, Now Add Item </h3>
        <h4>Please Click on given link </h4>
        <a href='https://infinity8.io/featurescreator/${user_id}'>Click here </a>
        </div>
        </td>
        </tr>
        <tr>
        <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word">
        <div style="font-family:Arial,sans-serif;font-size:15px;line-height:25px;text-align:left;color:#000">
        Thanks <br>
        Infinity8 Team
        </div>
        </td>
        </tr>

        </tbody>
        </table>
        </div>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        <div style="height:20px">
        &nbsp;
        </div>
        <div style="background:#000;background-color:#000;margin:0px auto;border-radius:5px;max-width:800px">
        <font color="#888888">
        </font><font color="#888888">
        </font><font color="#888888">
        </font><table align="center" border="0" cellpadding="0" cellspacing="0" style="background:#b09af7;background-color:#000;width:100%;border-radius:5px">
        <tbody>
        <tr>
        <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center">
        <div style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
        <font color="#888888">
        </font><font color="#888888">
        </font><font color="#888888">
        </font><table border="0" cellpadding="0" cellspacing="0" style="vertical-align:top" width="100%">
        <tbody>
        <tr>
        <td align="center" style="font-size:0px;padding:0px 25px;word-break:break-word">
        <div style="font-family:Arial,sans-serif;font-size:13px;line-height:25px;text-align:left;color:#fff"><b>Infinity8 Team

        </b></div>
        </td>
        <td align="center" style="font-size:0px;padding:0px 25px;word-break:break-word">
        <div style="font-family:Arial,sans-serif;font-size:13px;line-height:25px;text-align:right;color:#fff"><b style="color:white"><a href="mailto:support@infinity8.io" target="_blank">support@infinity8.io</a></b></div><font color="#888888">
        </font></td></tr></tbody></table><font color="#888888">
        </font></div><font color="#888888">
        </font></td></tr></tbody></table><font color="#888888">
        </font></div><font color="#888888">
        </font></div><font color="#888888">
        </font></div>`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                //   console.log(error);
            } else {
                //console.log('Email sent: ' + info.response);
            }
        });

        if (data) {
            res.status(200).send({
                success: true,
                msg: "Real estate user approved successfully!!",
            });
        } else {
            res.status(400).send({
                success: false,
                msg: "Something Wrong due to internal Error"
            });
        }
    });
}



exports.updateTelentForReject = async (db, req, res) => {

    var email = req.body.email;
    var user_id = req.body.user_id;

    await db.query(marketplaceQueries.updateTelentForReject, [user_id], async function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        await db.query(marketplaceQueries.DeleteTelent, [user_id], async function (error, data) {
            if (error) {
                return res.status(400).send({
                    success: false,
                    msg: "Error occured!!",
                    error
                });
            }

            // var transporter = nodemailer.createTransport({
            //     service: 'gmail',
            //     auth: {
            //       user: `bilal.espsofttech@gmail.com`,
            //       pass: `Bilal123#`
            //     }
            //   });

            var transporter = nodemailer.createTransport({
                host: 'espsofttechnologies.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'developer@espsofttechnologies.com',
                    pass: 'Espsoft123#'
                },
                tls: {
                    rejectUnauthorized: false
                }
            });


            var mailOptions = {
                from: 'no-reply@infinity8.io',
                //   from : 'bilal.espsofttech@gmail.com', 
                to: `${email}`,
                subject: 'Account item Verified Link',
                html: `<div style="background-color:#f4f4f4">
            <div>
               <div style="margin:0px auto;max-width:800px">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" style="width:100%">
                     <tbody>
                        <tr>
                           <td style="direction:ltr;font-size:0px;padding:10px 0px;text-align:center">
                           </td>
                        </tr>
                     </tbody>
                  </table>
               
               </div>
           <div style="background:black;background-color:#6f43ec;margin:0px auto;border-radius:5px;max-width:800px">
              <table align="center" border="0" cellpadding="0" cellspacing="0" style="width:100%;border-radius:5px">
                 <tbody>
                    <tr>
                       <td style="direction:ltr;font-size:0px;padding:8px 0;text-align:center">
                          <div style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
                             <table border="0" cellpadding="0" cellspacing="0" style="vertical-align:top" width="100%">
                                <tbody>
                                   <tr>
                                      <td align="center" style="font-size:0px;padding:0px 25px 0px 25px;word-break:break-word">
                                         <table border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px">
                                            <tbody>
                                               <tr>
                                                  <td style="width:126px">
                                                     <img height="auto" src="https://infinity8.io/images/logo-new.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px" width="150"  class="CToWUd">
                                                  </td>
                                               </tr>
                                            </tbody>
                                         </table>
                                      </td>
                                   </tr>
                                </tbody>
                             </table>
                          </div>
                       </td>
                    </tr>
                 </tbody>
              </table>
           </div>
               <div style="height:20px">
                  &nbsp;
               </div>
               <div style="background:#fff;margin:0px auto;border-radius:5px;max-width:800px">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" style="width:100%;border-radius:5px">
                     <tbody>
                        <tr>
                           <td style="direction:ltr;font-size:0px;padding:0px;text-align:center">
                              <div style="margin:0px auto;max-width:800px">
                                 <table align="center" border="0" cellpadding="0" cellspacing="0" style="width:100%">
                                    <tbody>
                                       <tr>
                                          <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center">
                                             <div style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
                                                <table border="0" cellpadding="0" cellspacing="0" style="vertical-align:top" width="100%">
                     <tbody>
                        <tr>
                           <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word">
                              <div style="font-family:Arial,sans-serif;font-size:15px;line-height:1;text-align:left;color:#000"><b>Dear ${email}</b></div>
                           </td>
                        </tr>
                        <tr>
                           <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word">
                              <div style="font-family:Arial,sans-serif;font-size:15px;line-height:25px;text-align:left;color:#000">
                             <h3> Your Request Rejected By Admin , Please Again fill form </h3>
                                </div>
                           </td>
                        </tr>
                        <tr>
                           <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word">
                              <div style="font-family:Arial,sans-serif;font-size:15px;line-height:25px;text-align:left;color:#000">
                                Thanks <br>
                                Infinity8 Team
                              </div>
                           </td>
                        </tr>
                        
                     </tbody>
                    </table>
                                             </div>
                                          </td>
                                       </tr>
                                    </tbody>
                                 </table>
                              </div>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
               <div style="height:20px">
                  &nbsp;
               </div>
               <div style="background:#000;background-color:#000;margin:0px auto;border-radius:5px;max-width:800px">
                  <font color="#888888">
                        </font><font color="#888888">
                     </font><font color="#888888">
                  </font><table align="center" border="0" cellpadding="0" cellspacing="0" style="background:#b09af7;background-color:#000;width:100%;border-radius:5px">
                     <tbody>
                        <tr>
                           <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center">
                              <div style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
                                 <font color="#888888">
                                       </font><font color="#888888">
                                    </font><font color="#888888">
                                 </font><table border="0" cellpadding="0" cellspacing="0" style="vertical-align:top" width="100%">
                                    <tbody>
                                       <tr>
                                          <td align="center" style="font-size:0px;padding:0px 25px;word-break:break-word">
                                             <div style="font-family:Arial,sans-serif;font-size:13px;line-height:25px;text-align:left;color:#fff"><b>Infinity8 Team
    
                                             </b></div>
                                          </td>
                                          <td align="center" style="font-size:0px;padding:0px 25px;word-break:break-word">
                                             <div style="font-family:Arial,sans-serif;font-size:13px;line-height:25px;text-align:right;color:#fff"><b style="color:white"><a href="mailto:support@infinity8.io" target="_blank">support@infinity8.io</a></b></div><font color="#888888">
                                          </font></td></tr></tbody></table><font color="#888888">
                              </font></div><font color="#888888">
                           </font></td></tr></tbody></table><font color="#888888">
               </font></div><font color="#888888">
            </font></div><font color="#888888">
         </font></div>`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            if (data) {
                res.status(200).send({
                    success: true,
                    msg: "Email has been Sent",
                });
            } else {
                res.status(400).send({
                    success: false,
                    msg: "Something Wrong due to internal Error"
                });
            }
        });
    });
}

exports.realEstateUserReject = async (db, req, res) => {

    var email = req.body.email;
    var user_id = req.body.user_id;

    await db.query(marketplaceQueries.realEstateUserReject, [user_id], async function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }

        await db.query(marketplaceQueries.DeleteRealEstateUser, [user_id], async function (error, data2) {
            if (error) {
                return res.status(400).send({
                    success: false,
                    msg: "Error occured!!",
                    error
                });
            }


            var transporter = nodemailer.createTransport({
                host: 'espsofttechnologies.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'developer@espsofttechnologies.com',
                    pass: 'Espsoft123#'
                },
                tls: {
                    rejectUnauthorized: false
                }
            });


            var mailOptions = {
                from: 'no-reply@infinity8.io',
                //   from : 'bilal.espsofttech@gmail.com', 
                to: `${email}`,
                subject: 'Account item Verified Link',
                html: `<div style="background-color:#f4f4f4">
        <div>
            <div style="margin:0px auto;max-width:800px">
                <table align="center" border="0" cellpadding="0" cellspacing="0" style="width:100%">
                    <tbody>
                    <tr>
                        <td style="direction:ltr;font-size:0px;padding:10px 0px;text-align:center">
                        </td>
                    </tr>
                    </tbody>
                </table>
            
            </div>
        <div style="background:black;background-color:#6f43ec;margin:0px auto;border-radius:5px;max-width:800px">
            <table align="center" border="0" cellpadding="0" cellspacing="0" style="width:100%;border-radius:5px">
                <tbody>
                <tr>
                    <td style="direction:ltr;font-size:0px;padding:8px 0;text-align:center">
                        <div style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
                            <table border="0" cellpadding="0" cellspacing="0" style="vertical-align:top" width="100%">
                            <tbody>
                                <tr>
                                    <td align="center" style="font-size:0px;padding:0px 25px 0px 25px;word-break:break-word">
                                        <table border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px">
                                        <tbody>
                                            <tr>
                                                <td style="width:126px">
                                                    <img height="auto" src="https://infinity8.io/images/logo-new.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px" width="150"  class="CToWUd">
                                                </td>
                                            </tr>
                                        </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
            <div style="height:20px">
                &nbsp;
            </div>
            <div style="background:#fff;margin:0px auto;border-radius:5px;max-width:800px">
                <table align="center" border="0" cellpadding="0" cellspacing="0" style="width:100%;border-radius:5px">
                    <tbody>
                    <tr>
                        <td style="direction:ltr;font-size:0px;padding:0px;text-align:center">
                            <div style="margin:0px auto;max-width:800px">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" style="width:100%">
                                <tbody>
                                    <tr>
                                        <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center">
                                            <div style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
                                            <table border="0" cellpadding="0" cellspacing="0" style="vertical-align:top" width="100%">
                    <tbody>
                    <tr>
                        <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word">
                            <div style="font-family:Arial,sans-serif;font-size:15px;line-height:1;text-align:left;color:#000"><b>Dear ${email}</b></div>
                        </td>
                    </tr>
                    <tr>
                        <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word">
                            <div style="font-family:Arial,sans-serif;font-size:15px;line-height:25px;text-align:left;color:#000">
                            <h3> Your Request Rejected By Admin , Please Again fill form </h3>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word">
                            <div style="font-family:Arial,sans-serif;font-size:15px;line-height:25px;text-align:left;color:#000">
                            Thanks <br>
                            Infinity8 Team
                            </div>
                        </td>
                    </tr>
                    
                    </tbody>
                </table>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                                </table>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div style="height:20px">
                &nbsp;
            </div>
            <div style="background:#000;background-color:#000;margin:0px auto;border-radius:5px;max-width:800px">
                <font color="#888888">
                    </font><font color="#888888">
                    </font><font color="#888888">
                </font><table align="center" border="0" cellpadding="0" cellspacing="0" style="background:#b09af7;background-color:#000;width:100%;border-radius:5px">
                    <tbody>
                    <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center">
                            <div style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
                                <font color="#888888">
                                    </font><font color="#888888">
                                </font><font color="#888888">
                                </font><table border="0" cellpadding="0" cellspacing="0" style="vertical-align:top" width="100%">
                                <tbody>
                                    <tr>
                                        <td align="center" style="font-size:0px;padding:0px 25px;word-break:break-word">
                                            <div style="font-family:Arial,sans-serif;font-size:13px;line-height:25px;text-align:left;color:#fff"><b>Infinity8 Team

                                            </b></div>
                                        </td>
                                        <td align="center" style="font-size:0px;padding:0px 25px;word-break:break-word">
                                            <div style="font-family:Arial,sans-serif;font-size:13px;line-height:25px;text-align:right;color:#fff"><b style="color:white"><a href="mailto:support@infinity8.io" target="_blank">support@infinity8.io</a></b></div><font color="#888888">
                                        </font></td></tr></tbody></table><font color="#888888">
                            </font></div><font color="#888888">
                        </font></td></tr></tbody></table><font color="#888888">
            </font></div><font color="#888888">
        </font></div><font color="#888888">
        </font></div>`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                       console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            if (data) {
                res.status(200).send({
                    success: true,
                    msg: "Real estate user rejected!!",
                });
            } else {
                res.status(400).send({
                    success: false,
                    msg: "Something Wrong due to internal Error"
                });
            }
        });
    });
}

exports.allSearch = async (
    db, req, res) => {

    var search = (!req.body.search) ? '' : req.body.search;


    if (!search) {
        return res.status(400).send({
            success: false,
            msg: "Search parameter required"
        });
    }
    qry = "select t.user_id as id,t.email,u.user_name,concat(t.first_name,' ',t.last_name) as full_name,u.profile_pic,'talent' as type from telent as t left join users as u on u.id=t.user_id where t.first_name like '" + `${search}` + "%' or t.last_name like '" + `${search}` + "%' or u.user_name like '" + `${search}` + "%' or u.email like '" + `${search}` + "%' or concat(t.first_name,' ',t.last_name) like '" + `${search}` + "%'  union all select ie.id,u.email,u.user_name,i.name,i.image as profile_pic,'nft' as type from item_edition as ie left join item as i on i.id=ie.item_id left join users as u on u.id=i.created_by where i.name like '" + `${search}` + "%' and ie.id in (select min(id) from item_edition where is_sold=0 group by item_id)";
    //console.log(qry);
    try {
        await db.query(qry, async function (err, result) {
            if (err) {
                return res.status(400).send({
                    success: false,
                    msg: "error occured ",
                    error
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
                return res.status(400).send({
                    success: false,
                    msg: "No data found ",
                    data: []
                });
            }
        })



    } catch (err) {
        return res.status(500).send({
            success: false,
            msg: `unable to add customer address due to internal error :${err}`
        });
    }
}


exports.insertUserCollection = async (db, req, res) => {

    var user_id = req.body.user_id;
    var name = req.body.name;
    var description = req.body.description;
    var ip = req.body.ip;
    var datetime = new Date();

    var users = {
        user_id: user_id,
        name: name,
        description: description,
        ip: ip,
        datetime: datetime
    }

    await db.query(marketplaceQueries.insertUserCollection, [users], function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        if (data) {
            res.status(200).send({
                success: true,
                msg: "User Collection Inserted Successfully",
            });
        } else {
            res.status(400).send({
                success: false,
                msg: "Something Wrong due to internal Error"
            });
        }
    });
}

exports.insertRealEstateCollection = async (db, req, res) => {

    var user_id = req.body.user_id;
    var name = req.body.name;
    var description = req.body.description;
    var nft_type_id = 2;

    if (!user_id) {
        return res.status(400).send({
            success: false,
            msg: "user_id required!!"

        });
    }
    if (!name) {
        return res.status(400).send({
            success: false,
            msg: "name required!!"
        });
    }
    if (!description) {
        return res.status(400).send({
            success: false,
            msg: "description required!!"
        });
    }
    var users = {
        user_id: user_id,
        name: name,
        description: description,
        nft_type_id: nft_type_id
    }

    await db.query(marketplaceQueries.insertUserCollection, [users], function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        if (data) {
            res.status(200).send({
                success: true,
                msg: "Collection Inserted Successfully",
            });
        } else {
            res.status(400).send({
                success: false,
                msg: "Something Wrong due to internal Error"
            });
        }
    });
}

exports.getUserCollection = async (db, req, res) => {
    var user_id = req.body.user_id;
    await db.query(marketplaceQueries.getUserCollection, [user_id], function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        if (data.length > 0) {
            res.status(200).send({
                success: true,
                msg: "User Collection Details",
                response: data
            });
        } else {
            res.status(400).send({
                success: false,
                msg: "Something Wrong due to internal Error"
            });
        }
    });
}

exports.getAllUserCollection = async (db, req, res) => {

    await db.query(marketplaceQueries.getAllUserCollection, function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        if (data.length > 0) {
            res.status(200).send({
                success: true,
                msg: "All user Collection Detail!!",
                response: data
            });
        } else {
            res.status(400).send({
                success: false,
                msg: "Something Wrong due to internal Error"
            });
        }
    });
}

exports.getAllRealEstateCollection = async (db, req, res) => {

    await db.query(marketplaceQueries.getAllRealEstateCollection, function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        if (data.length > 0) {
            res.status(200).send({
                success: true,
                msg: "All user Collection Detail!!",
                response: data
            });
        } else {
            res.status(400).send({
                success: false,
                msg: "Something Wrong due to internal Error"
            });
        }
    });
}

exports.getRealEstateCollection = async (db, req, res) => {

    var user_id = req.body.user_id;

    await db.query(marketplaceQueries.getRealEstateCollection, [user_id], function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        if (data.length > 0) {
            res.status(200).send({
                success: true,
                msg: "Collection Details",
                response: data
            });
        } else {
            res.status(400).send({
                success: false,
                msg: "Something Wrong due to internal Error"
            });
        }
    });
}

exports.getSingleUserCollection = async (db, req, res) => {

    var user_id = req.body.user_id;
    var collection_id = req.body.collection_id;
    if (!collection_id) {
        return res.status(400).send({
            success: false,
            msg: "collection_id required!!"
        });
    }
    await db.query(marketplaceQueries.getSingleUserCollection, [collection_id, user_id], function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        if (data.length > 0) {
            res.status(200).send({
                success: true,
                msg: "User Collection Details",
                response: data[0]
            });
        } else {
            res.status(400).send({
                success: false,
                msg: "Something Wrong due to internal Error"
            });
        }
    });
}


exports.updateUserCollection = async (db, req, res) => {

    var user_id = req.body.user_id;
    var collection_id = req.body.collection_id;
    var name = req.body.name;
    var description = req.body.description;

    var userColl = {
        name: name,
        description: description,
        ip: "null",
        datetime: new Date()
    }

    await db.query(marketplaceQueries.updateUserCollection, [userColl, collection_id, user_id], function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        if (data) {
            res.status(200).send({
                success: true,
                msg: "User Collection Updated",

            });
        } else {
            res.status(400).send({
                success: false,
                msg: "Something Wrong due to internal Error"
            });
        }
    });
}




exports.deleteUserCollection = async (db, req, res) => {

    var collection_id = req.body.collection_id;


    await db.query(marketplaceQueries.getCollectionItemCount, [collection_id], async function (error, cnt) {
        if (cnt[0].itemCount > 0) {
            return res.status(400).send({
                success: false,
                msg: "You can't delete collectoin if any NFT exists in it !!"
            });
        }
        await db.query(marketplaceQueries.deleteUserCollection, [collection_id], function (error, data) {
            if (error) {
                return res.status(400).send({
                    success: false,
                    msg: "Error occured!!",
                    error
                });
            }
            if (data) {
                res.status(200).send({
                    success: true,
                    msg: "User Collection Deleted!!",

                });
            } else {
                res.status(400).send({
                    success: false,
                    msg: "Something Wrong due to internal Error"
                });
            }
        });
    });
}




exports.getUserItem = async (db, req, res) => {

    var user_id = req.body.user_id;
    var user_collection_id = req.body.user_collection_id;
    var limit = req.body.limit;

    var qry = `Select it.id as item_id,ie.id as item_edition_id,it.name,it.description,it.image,it.file_type,it.owner,it.item_category_id,it.token_id,ie.price,cl.id as collection_id,cl.user_id,ie.is_sold from item_edition as ie left join item as it on it.id=ie.item_id LEFT JOIN user_collection as cl ON cl.id = it.user_collection_id where ie.id in (select min(id) from item_edition where ie.owner_id=${user_id} group by item_id) and it.nft_type_id=1 and it.is_active=1`

    if (user_id > 0) {
        qry = qry + ` and ie.owner_id=${user_id} `
    }

    if (user_collection_id > 0) {
        qry = qry + ` and cl.id=${user_collection_id}`
    }
    if (limit > 0) {
        qry = qry + ` order by ie.id desc limit ${limit}`
    }
    else {
        qry = qry +` order by ie.id desc `
    }

    await db.query(qry, function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        if (data.length > 0) {
            res.status(200).send({
                success: true,
                msg: "User Item Details",
                response: data
            });
        } else {
            res.status(200).send({
                success: false,
                msg: "No Data"
            });
        }
    });
}
exports.getRealEstateItem = async (db, req, res) => {

    var user_id = req.body.user_id;
    var user_collection_id = req.body.user_collection_id;
    var limit = req.body.limit;
    if (!user_id) {
        return res.status(400).send({
            success: false,
            msg: "User ID required!!"
        });
    }

    if (!user_collection_id) {
        return res.status(400).send({
            success: false,
            msg: "user_collection_id required!!"
        });
    }

    if (!limit) {
        return res.status(400).send({
            success: false,
            msg: "limit required!!"
        });
    }
    var qry = "Select it.id as item_id,ie.id as item_edition_id,case when length(it.name)>=30 then concat(left(it.name,30),'...')  else it.name end as name,it.description,it.image,it.file_type,u.full_name as owner,it.item_category_id,coalesce(it.start_date,it.datetime) as start_date,it.token_id,it.price,cl.id as collection_id,cl.user_id,ic.name as item_category,ie.is_sold,ie.expiry_date from item_edition as ie left join item as it on it.id=ie.item_id LEFT JOIN user_collection as cl ON cl.id = it.user_collection_id left join users as u on u.id=it.owner_id left join item_category as ic on ic.id=it.item_category_id where ie.id in (select min(id) from item_edition where is_sold=0 group by item_id) and it.nft_type_id=2 and it.is_active=1"

    if (user_id > 0) {
        qry = qry + ` and cl.user_id=${user_id}`
    }

    if (user_collection_id > 0) {
        qry = qry + ` and cl.id=${user_collection_id}`
    }
    if (limit > 0) {
        qry = qry + ` order by rand() limit ${limit}`
    }

    await db.query(qry, function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        if (data.length > 0) {
            res.status(200).send({
                success: true,
                msg: "User Item Details",
                response: data
            });
        } else {
            res.status(200).send({
                success: false,
                msg: "No Data"
            });
        }
    });
}

exports.addRealEstate = async (db, req, res) => {
    var user_id = req.body.user_id;
    var name = req.body.name;
    var description = req.body.description;
    var image = req.body.image;
    var image1 = req.body.image1;
    var file_type = req.body.file_type;
    var title_deed = req.body.title_deed;
    var passport = req.body.passport;
    var item_category_id = req.body.item_category_id;
    var price = req.body.price;
    var edition_type = 1;
    var quantity = 1;
    var nft_type_id = 2;
    var sell_type = req.body.sell_type;
    var edition_type = 1;
    var user_collection_id = req.body.user_collection_id;
    var start_date = req.body.start_date;
    var end_date = req.body.end_date;
    var expiry_date = req.body.expiry_date;
    var image_low=req.body.image;
    var user_address=req.body.user_address;
    if(file_type==='image'){
    var recCompress = await ipfsCompress.compressImages(["https://ipfs.io/ipfs/" + image]);
    if (recCompress.success == false) {
        // return res.status(400).send({
        //     success: false,
        //     msg: "Image compress issue "
        // });
        var image_low = image;
    }else{
        var image_low = recCompress.imageHash[0];
    }
    //  return res.json({
    //     image_low:image_low,
    //     image:image
    //  })        
    }


    if (!name) {
        return res.status(400).send({
            success: false,
            msg: "name required!! "
        });
    }
    if (!image) {
        return res.status(400).send({
            success: false,
            msg: "image required!! "
        });
    }
    if (!description) {
        return res.status(400).send({
            success: false,
            msg: "description required!! "
        });
    }

    if (!price) {
        return res.status(400).send({
            success: false,
            msg: "Price required!! "
        });
    }
    if (!sell_type) {
        return res.status(400).send({
            success: false,
            msg: "Sell type required!! "
        });
    }
    if (!title_deed) {
        return res.status(400).send({
            success: false,
            msg: "title_deed required!! "
        });
    }

    if (!passport) {
        return res.status(400).send({
            success: false,
            msg: "passport required!! "
        });
    }

    var users = {
        "name": name,
        "description": description,
        "image": image_low,
        "image_original": image,
        "file_type": file_type,
        "title_deed": title_deed,
        "passport": passport,
        "item_category_id": item_category_id,
        "user_collection_id": user_collection_id,
        "start_date": start_date,
        "end_date": end_date,
        "price": price,
        "owner_id": user_id,
        "created_by": user_id,
        "sell_type": sell_type,
        "edition_type": edition_type,
        "expiry_date": expiry_date,
        "quantity": quantity,
        "nft_type_id": nft_type_id
    }
    //console.log(users);
    var mint_quantity = quantity;


    await db.query(marketplaceQueries.insertItem, [users], async function (error, data) {
        if (error) {
            console.log("error in insertItem");
            return res.status(400).send({
                success: false,
                msg: "error occured in item insert",
                error
            });
        }
        /**---------------------------IPFS Json ---------------------------------- */
        var additem = {
            "name": name,
            "description": description,
            "image": 'https://ipfs.io/ipfs/' + image
        }
        var userfile = 'item_'.concat(data.insertId, '.json');
        //console.log(userfile);


        fs.writeFile(`./metadata/${userfile}`, JSON.stringify(additem), async (err, fd) => {

            // Checking for errors
            if (err) throw err;

            //console.log("Done writing"); // Success




            const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

            let formdata = new FormData();

            //console.log("Done writing"); // Success
            formdata.append('file', fs.createReadStream('./metadata/' + userfile));


            //   console.log(fs.createReadStream('./metadata/'+userfile)); // Success
            // var filedata = await axios.post(url,
            //     formdata,
            //     {
            //         maxContentLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
            //         headers: {
            //             // 'Content-Type' : `application/json;boundary=${formdata._boundary}`,
            //             'Content-Type': `multipart/form-data; boundary=${formdata._boundary}`,
            //             'pinata_api_key': 'b26a087893e3f0033bbf',
            //             'pinata_secret_api_key': '269ca812d8e34ee37b44b09e966b4be8a13c01921e892438f3d3d834ee0a4681'
            //         }
            //     }
            // )
            // console.log(filedata.data.IpfsHash);

            const response2 = await fetch(url, {
                    method: 'POST', headers: {
                        // 'Content-Type' : `application/json;boundary=${formdata._boundary}`,
                        'Content-Type': `multipart/form-data; boundary=${formdata._boundary}`,
                        'pinata_api_key': 'b26a087893e3f0033bbf',
                        'pinata_secret_api_key': '269ca812d8e34ee37b44b09e966b4be8a13c01921e892438f3d3d834ee0a4681'
                    },
                    body: formdata
                });
                const filedata = await response2.json();
                //console.log(filedata);

                //console.log(filedata.IpfsHash);


            db.query(marketplaceQueries.updatemeta, [filedata.IpfsHash, data.insertId], (error, data235) => {
                //console.log(data235);
            })

        


        /*-------------------------------------------------------------------------------------*/

        /**------------------------------------------ Insert-into Item_Images------------------- */


        for (let i = 0; i < image1.length; i++) {

            if (i >= 0) {

                var insertData = {
                    "item_id": data.insertId,
                    "name": image1[i],
                    "ip": null,
                    "datetime": new Date()
                }
                await db.query(marketplaceQueries.additemimages, [insertData])
            };

        }


        /**--------------------------------------------------------------------------------------- */
        /**  -----------------------------------Insertinto Edition */

        for (var i = 1; i <= quantity; i++) {


            var item_ed = {
                "edition_text": `${i} of ${quantity}`,
                "edition_no": i,
                "item_id": data.insertId,
                "is_sold": 0,
                "owner_id": user_id,
                "price":price,
                "start_date":start_date,
                "expiry_date":expiry_date,
                "end_date" :end_date,
                "user_collection_id": user_collection_id,
                "user_address":user_address,
                "ip": null,
                "datetime": new Date()
            };

            await db.query(marketplaceQueries.insertEdition, [item_ed])
        }
        /** ---------------------------------------------------------- */
        if (data) {
            //console.log("getting wallet Detail");
            await db.query(marketplaceQueries.getWalletDetail, [user_id], async function (error, walletData) {
                /* create NFT and update into table */

                //var contract=`${config.contractAddress}`; // TEST CONTRACT
                var contract = `${config.contractAddress}`; //LIVE CONTRACT
                const response1 = await fetch(`${config.blockchainApiUrl}mint`, {
                    method: 'POST', headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "from_address": `${config.contractOwnerAddress}`,
                        "from_private_key": `${config.contractOwnerPrivateKey}`,
                        "to_address": `${config.contractOwnerAddress}`,
                        "contract_address": `${contract}`,
                        "MetaDataHash": `${filedata.IpfsHash}`,
                        "TokenName": `${name}`,
                        "TokenId": `${data.insertId}`,
                        "totalSupply": `${mint_quantity}`
                    })
                });

                const data1 = await response1.json();
                console.log("minted.");
                if (!data1.hash) {
                    return res.status(400).send({
                        success: false,
                        msg: "error occured in mint NFT",
                        error
                    });
                }

                var updateData = {
                    "token_hash": data1.hash,
                    "token_id": data.insertId
                }
                //console.log(updateData);
                await db.query(marketplaceQueries.updateItem, [updateData, data.insertId], async function (error, data3) {
                    if (error) {
                        return res.status(400).send({
                            success: false,
                            msg: "error occured in update item table",
                            error
                        });
                    }
                });
            })
            await db.query(marketplaceQueries.getItemEdition, [data.insertId], async function (error, iedata) {
                if (error) {

                    return res.status(400).send({
                        success: false,
                        msg: "error occured in item insert",
                        error
                    });
                }
                return res.status(200).send({
                    success: true,
                    msg: "Item Inserted Successfully",
                    item_edition_id: iedata[0].id
                });
            });
        } else {
            return res.status(400).send({
                success: false,
                msg: "Something Wrong due to internal Error"
            });
        }
    });
});

}




exports.walletPayment = async (db, req, res) => {

    var user_id = req.body.user_id;
    var amount = req.body.amount;

    await db.query(marketplaceQueries.adminWallet, async function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "error occured",
                error
            });
        }

        await db.query(marketplaceQueries.userWallet, [user_id], async function (error, data1) {
            if (error) {
                return res.status(400).send({
                    success: false,
                    msg: "error occured",
                    error
                });
            }
            var transaction = {
                user_id: user_id,
                transaction_type_id: "5",
                from_address: data1[0].public,//user From Address
                to_address: data[0].public, // admin To Address
                amount: amount * -1,
                status : 1,
                currency: 'USD'
            }

            await db.query(marketplaceQueries.insertTransaction, transaction)

            if (data1) {
                res.status(200).send({
                    success: true,
                    msg: "User Withdraw Succesfull",

                });
            } else {
                res.status(400).send({
                    success: false,
                    msg: "User withdrawal Error"
                });
            }
        });
    });
}

/* ---------------------------  STRIPE PAYMENT GATEWAY IMPLEMENTATION ---------------*/
exports.stripePayment = async (db, req, res) => {
    var user_id = req.body.user_id;
    var amount = req.body.amount;
    var cardNumber = req.body.cardNumber;
    var expMonth = req.body.expMonth;
    var expYear = req.body.expYear;
    var cvc = req.body.cvc;

    try {
        await db.query(marketplaceQueries.getUserDetail, [user_id], async function (error, userData) {
            if (error) {
                return res.status(400).send({
                    success: false,
                    msg: "Error occured in userData!!",
                    error
                });
            }

            const response4 = await fetch('https://infinity8.io:7007/stripe/create-card', {
                method: 'POST', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `${config.stripe_key}`
                },
                body: JSON.stringify({
                    "cardNumber": `${cardNumber}`,
                    "expMonth": `${expMonth}`,
                    "expYear": `${expYear}`,
                    "cvc": `${cvc}`
                })
            });

            const data4 = await response4.json();
            var cardid = data4.CardID;
            //console.log(data4);
            //console.log("cardid " + cardid);
            if (data4.success == false) {
                return res.status(400).send({
                    success: false,
                    data: data4,
                    msg: data4.message
                });
            }
            const response1 = await fetch('https://infinity8.io:7007/stripe/create-customer', {
                method: 'POST', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `${config.stripe_key}`
                },
                body: JSON.stringify({
                    "name": `${userData[0].user_name}`,
                    "email": `${userData[0].email}`,
                    "address": {
                        line1: 'Infinity8',
                        postal_code: 'Infinity8',
                        city: 'Infinity8',
                        state: 'CA',
                        country: 'US',

                    }
                })
            });

            const data1 = await response1.json();
            var customerID = data1.CustomerID;
            //console.log(data1);

            const response2 = await fetch('https://infinity8.io:7007/stripe/capture-payment', {
                method: 'POST', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `${config.stripe_key}`
                },
                body: JSON.stringify({
                    "cardId": `${cardid}`,
                    "customerId": `${customerID}`,
                    "amount": `${Math.round(amount * 100)}`,
                    "currency": "USD",
                    "description": "Amount"
                })
            });
            const data2 = await response2.json();
            //console.log(data2);
            if (data2.success == 'false') {
                return res.status(400).send({
                    success: false,
                    msg: data2.message
                });
            }

            const response3 = await fetch('https://infinity8.io:7007/stripe/confirm-capture-payment', {
                method: 'POST', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `${config.stripe_key}`
                },
                body: JSON.stringify({
                    "paymentId": `${data2.paymentId}`
                })
            });
            const data3 = await response3.json();
            //console.log(data3);

            if (data3.success) {

                return res.status(200).send({
                    success: true,
                    msg: data3.message
                });

            }
            else {
                return res.status(400).send({
                    success: false,
                    msg: data3.message
                });
            }

        });
    }
    catch (err) {
        console.log(err)
        return res.status(400).send({
            success: false,
            msg: "Unexpected internal error!!",
            err
        });
    }
}


exports.getJWTToken = async (db, req, res) => {

    const jwtToken = jwt.sign({
        email: req.body.email,
        id: req.body.user_id,
    }, config.JWT_SECRET_KEY, {
        expiresIn: config.SESSION_EXPIRES_IN
    })
    return res.status(200).send({
        success:true,
        responce : jwtToken
    })
}   

/* ---------------------------  STRIPE PAYMENT GATEWAY IMPLEMENTATION ---------------*/

exports.addNftByUser = async (db, req, res) => {

    var user_id = req.body.user_id;
    var name = req.body.name;
    var description = req.body.description;
    var image = req.body.image;
    var file_type = req.body.file_type;
    var item_category_id = req.body.item_category_id;
    var price = req.body.price;
    var quantity = req.body.quantity;
    var sell_type = req.body.sell_type;
    var edition_type = req.body.edition_type;
    var user_collection_id = req.body.user_collection_id;
    var start_date = req.body.start_date;
    var end_date = req.body.end_date;
    var expiry_date = req.body.expiry_date;
    var image_low = req.body.image;
    var user_address = req.body.user_address;

    var recCompress = await ipfsCompress.compressImages(["https://ipfs.io/ipfs/" + image],file_type);
    if (recCompress.success == false) {
        console.log("compress false");
        var image_low = image;
    }else{
        console.log("compressed")
        var image_low = recCompress.imageHash[0];
    }

    if (!name) {
        return res.status(400).send({
            success: false,
            msg: "name required!! "
        });
    }
    if (!image) {
        return res.status(400).send({
            success: false,
            msg: "image required!! "
        });
    }
    if (!file_type) {
        return res.status(400).send({
            success: false,
            msg: "file_type required!! "
        });
    }
    if (!description) {
        return res.status(400).send({
            success: false,
            msg: "description required!! "
        });
    }

    if (!price) {
        return res.status(400).send({
            success: false,
            msg: "Price required!! "
        });
    }
    if (!sell_type) {
        return res.status(400).send({
            success: false,
            msg: "Sell type required!! "
        });
    }
    if (!edition_type) {
        return res.status(400).send({
            success: false,
            msg: "edition_type required!!"
        });
    }
    if (!quantity && edition_type === '1') {
        return res.status(400).send({
            success: false,
            msg: "quantity required!! "
        });
    }

    var users = {
        "name": name,
        "description": description,
        "image": image_low,
        "image_original": image,
        "file_type": file_type,
        "item_category_id": item_category_id,
        "user_collection_id": user_collection_id,
        "start_date": start_date,
        "end_date": end_date,
        "price": price,
        "owner_id": user_id,
        "created_by": user_id,
        "sell_type": sell_type,
        "expiry_date": expiry_date,
        "quantity": quantity,
        "local_image" : recCompress.images[0]
    }

    var mint_quantity = quantity;
    if (edition_type === '2') {
        quantity = 1;
        mint_quantity = 1;
    }
    await db.query(marketplaceQueries.insertItem, [users], async function (error, data) {
        if (error) {

            return res.status(400).send({
                success: false,
                msg: "error occured in item insert",
                error
            });
        }

        /**---------------------------IPFS Json ---------------------------------- */
        var additem = {
            "name": name,
            "description": description,
            "image": 'https://ipfs.io/ipfs/' + image
        }
        var userfile = 'item_'.concat(data.insertId, '.json');
        try {
            fs.writeFile(`./metadata/${userfile}`, JSON.stringify(additem), async (err, fd) => {

                if (err) throw err;
                const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
                let formdata = new FormData();
                formdata.append('file', fs.createReadStream('./metadata/' + userfile))
                const response2 = await fetch(url, {
                    method: 'POST', headers: {
                        'Content-Type': `multipart/form-data; boundary=${formdata._boundary}`,
                        'pinata_api_key': 'b26a087893e3f0033bbf',
                        'pinata_secret_api_key': '269ca812d8e34ee37b44b09e966b4be8a13c01921e892438f3d3d834ee0a4681'
                    },
                    body: formdata
                });
                const filedata = await response2.json();
                db.query(marketplaceQueries.updatemeta, [filedata.IpfsHash, data.insertId], (error, data235) => {
     
                })

                for (var i = 1; i <= quantity; i++) {
                    var item_ed = {
                        "edition_text": `${i} of ${quantity}`,
                        "edition_no": i,
                        "item_id": data.insertId,
                        "is_sold": 0,
                        "owner_id": user_id,
                        "user_collection_id": user_collection_id,
                        "start_date": start_date,
                        "end_date": end_date,
                        "expiry_date": expiry_date,
                        "user_address": user_address,
                        "price": price,
                        "ip": null,
                        "datetime": new Date()
                    };

                    await db.query(marketplaceQueries.insertEdition, [item_ed])
                }
                /* ---------------------------------------------------------- */
                await db.query(marketplaceQueries.getItemEdition, [data.insertId], async function (error, iedata) {
                    if (error) {
                        return res.status(400).send({
                            success: false,
                            msg: "error occured in item insert",
                            error
                        });
                    }

                    if (iedata) {
                        await db.query(marketplaceQueries.getWalletDetail, [user_id], async function (error, walletData) {
                            if (error) {
                                return res.status(400).send({
                                    success: false,
                                    msg: "error occured in item insert",
                                    error
                                });
                            }

                            var contract = `${config.contractAddress}`; // TEST CONTRACT
                            // var contract = `${config.contractAddress}`; //LIVE CONTRACT

                            var mintArr = JSON.stringify({
                                "from_address": `${config.contractOwnerAddress}`,
                                "from_private_key": `${config.contractOwnerPrivateKey}`,
                                "contract_address": `${contract}`,
                                "to_address": `${config.contractOwnerAddress}`,
                                "MetaDataHash": `${filedata.IpfsHash}`,
                                "TokenName": `${name}`,
                                "TokenId": `${data.insertId}`+'3000',
                                "totalSupply": `${mint_quantity}`
                            })

                            console.log(mintArr);

                            const response1 = await fetch(`${config.blockchainApiUrl}mint`, {
                                method: 'POST', headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: mintArr
                            });

                            const data1 = await response1.json();
                            console.log(data1);
                            if (!data1.hash) {
                                return res.status(400).send({
                                    success: false,
                                    msg: "error occured in mint NFT",
                                    error
                                });
                            }

                            var updateData = {
                                "token_hash": data1.hash,
                                "token_id": data.insertId+'3000'
                            }
                            await db.query(marketplaceQueries.updateItem, [updateData, data.insertId], async function (error, dataRes) {
                                if (error) {
                                    return res.status(400).send({
                                        success: false,
                                        msg: "error occured in update item table",
                                        error
                                    });

                                }else{

                                    res.status(200).send({
                                        success: true,
                                        msg: "Item Inserted Successfully",
                                        item_edition_id: iedata[0].id
                                    });                                    
                                }
                            })

                        });

                    } else {
                        res.status(400).send({
                            success: false,
                            msg: "Something Wrong due to internal Error"
                        });
                    }
                });
            });
        } catch (e) {
            return res.status(400).send({
                success: false,
                e
            });
        }

    });

}



exports.getQR = async (db, req, res) => {


    var user_id = req.body.user_id;

    await db.query(marketplaceQueries.getUserAuth, [user_id], async function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }


        if (data.length > 0) {
            res.status(200).send({
                success: true,
                msg: "QR Code",
                response: data[0]
            });

        } else {
            res.status(400).send({
                success: false,
                msg: "No Data Found"
            });
        }

    });
}



exports.twoAuthenticationVerify = async (db, req, res) => {

    var user_id = req.body.user_id;
    var userToken = req.body.SecretKey;
    var enableTwoFactor = req.body.enableTwoFactor;
    await db.query(marketplaceQueries.getUserAuth, [user_id], async function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }

        var abc = data[0].googleAuthCode;
        var tokenValidates = speakeasy.totp.verify({
            secret: abc,
            encoding: 'base32',
            token: userToken,
            window: 0
        });

        if (tokenValidates) {
            await db.query(marketplaceQueries.updateUsersAuth, [enableTwoFactor, user_id]);

            res.status(200).send({
                success: true,
                msg: "Result",
                response: tokenValidates
            });

        } else {
            res.status(400).send({
                success: false,
                msg: "Token misMatch"
            });
        }

    });
}

exports.getUserRealEstate = async (db, req, res) => {
    var user_id = req.body.user_id;
    await db.query(marketplaceQueries.getUserRealEstate, [user_id], function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        if (data.length > 0) {
            res.status(200).send({
                success: true,
                msg: "Real estate users detail!!",
                response: data[0]
            });
        } else {
            res.status(400).send({
                success: false,
                msg: "Something Wrong due to internal Error"
            });
        }
    });
}


exports.getUserTalentById = async (db, req, res) => {
    var user_id = req.body.user_id;
    await db.query(marketplaceQueries.getUserTalentById, [user_id], function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        //console.log(data);
        if (data) {
            res.status(200).send({
                success: true,
                msg: "User talent detail!!",
                response: data[0]
            });
        } else {
            res.status(400).send({
                success: false,
                msg: "Data not found!!"
            });
        }
    });
}


exports.getRealEstate = async (db, req, res) => {
    await db.query(marketplaceQueries.getRealEstate, function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        if (data.length > 0) {
            res.status(200).send({
                success: true,
                msg: "Real estate users detail!!",
                response: data
            });
        } else {
            res.status(400).send({
                success: false,
                msg: "Something Wrong due to internal Error"
            });
        }
    });
}
exports.updateRealEstateUser = async (db, req, res) => {
    var id = req.body.id;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;
    var country_id = req.body.country_id;
    var city = req.body.city;
    var description = req.body.description;
    var website = req.body.website;
    var insta = req.body.insta;


    await db.query(marketplaceQueries.updateRealEstateUser, [first_name, last_name, email, country_id, city, description, website, insta, id], function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "error occured",
                error
            });
        }
        if (data) {
            res.status(200).send({
                success: true,
                msg: "Real estate user Updated!!"
            });
        } else {
            res.status(400).send({
                success: false,
                msg: "Updation Error"
            });
        }
    });
}

exports.updateTalentUser = async (db, req, res) => {
    var id = req.body.id;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;
    var description = req.body.description;
    var facebook = req.body.facebook;
    var youtube = req.body.youtube;
    var twitter = req.body.twitter;
    var insta = req.body.insta;
    var country_id = req.body.country_id;
    var city = req.body.city;
    var follower = req.body.follower;


    await db.query(marketplaceQueries.updateTalentUser, [first_name, last_name, email, description, facebook, youtube, twitter, insta, country_id, city, follower, id], function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "error occured",
                error
            });
        }
        if (data) {
            res.status(200).send({
                success: true,
                msg: "Talent user Updated!!"
            });
        } else {
            res.status(400).send({
                success: false,
                msg: "Updation Error"
            });
        }
    });
}


exports.getCategoryById = async (db, req, res) => {

    var item_category_id = req.body.item_category_id;
    var limit = req.body.limit;


    var qry = "Select i.id as item_id,ie.id as item_edition_id,i.image,i.file_type,case when length(i.name)>=30 then concat(left(i.name,30),'...')  else i.name end as name,i.name as item_fullname,i.price,i.description from item_edition as ie left join item as i on i.id=ie.item_id where ie.is_sold=0 and ie.id in (select min(id) from item_edition where is_sold=0 and (expiry_date >= now() or expiry_date is null) group by item_id) ";

    if (item_category_id > 0) {
        qry = qry + ` and i.item_category_id=${item_category_id}`
    }
    qry = qry + " order by rand() ";
    if (limit > 0) {
        qry = qry + ` limit ${limit}`
    }

    //console.log(qry);       
    await db.query(qry, function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        if (data.length > 0) {
            res.status(200).send({
                success: true,
                msg: "Category Item Detail",
                response: data
            });
        } else {
            res.status(400).send({
                success: false,
                msg: "Something Wrong due to internal Error"
            });
        }
    });
}


/* -------------------End Item -------------------------*/

/* Bid process methods */


exports.insertBid = async (db, req, res) => {

    var user_id = req.body.user_id;
    var item_edition_id = req.body.item_edition_id;
    var bid_price = req.body.bid_price;
    if (!user_id) {
        return res.status(400).send({
            success: false,
            msg: "User ID required!!"
        });
    }

    if (!user_id) {
        return res.status(400).send({
            success: false,
            msg: "user_id required!!"
        });
    }
    if (!item_edition_id) {
        return res.status(400).send({
            success: false,
            msg: "item_edition_id required!!"
        });
    }

    if (!bid_price) {
        return res.status(400).send({
            success: false,
            msg: "bid_price required!!"
        });
    }
    var insertdata = {
        user_id: user_id,
        item_edition_id: item_edition_id,
        bid_price: bid_price
    }

    await db.query(marketplaceQueries.insertBid, [insertdata],async function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        if (data) {
    /// SEND MAIL FOR PURCHASING NFT STARTS
    await db.query(marketplaceQueries.bidMailData, [user_id,item_edition_id], async function (error, mailData) {
        var transporter = nodemailer.createTransport({
            host: 'espsofttechnologies.com',
            port: 465,
            secure: true,
            auth: {
                user: 'developer@espsofttechnologies.com',
                pass: 'Espsoft123#'

            },
            tls: {
                rejectUnauthorized: false
            }
        });
        console.log(mailData);
        var mailOptions = {
            from: 'no-reply@infinity8.io',
            to: mailData[0].bidderEmail,
            subject: 'Bid Placed',
            html: ` 
<div style="FONT-FAMILY:Helvetica-Neue,Helvetica,Arial,sans-serif">
<table cellspacing="0" cellpadding="6" width="100%" style="background:#ffffff">
<tbody>
    <tr>
        <td style="border:#ffffff 1px solid">
            <table cellspacing="0" cellpadding="0" width="640px" style="margin:0 auto" bgcolor="white">
                <tbody>
                    <tr>
                        <td>
                            <table cellspacing="0" cellpadding="0" width="100%">
                                <tbody>
                                    <tr valign="middle">
                                        <td colspan="2" align="center" style="text-align:center;width:100%;padding:12px 0px;border-bottom:1px solid #eaeaea">
                                            <div>
                                                <a href="#" target="_blank" >
                                                    <img align="left"  src="http://13.126.99.244/infinity8-admin/images/logo-new.png" width="180" style="max-width:400px;padding-bottom:0;display:inline!important;vertical-align:bottom;border:0;height:auto;outline:none;text-decoration:none" class="CToWUd">
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">
                                                <table style="text-align:left;font-family:'Helvetica Neue',Helvetica,Arial,Geneva,sans-serif;padding-top:20px;color:#37393a" width="100%" cellspacing="0" cellpadding="10" border="0" align="left">
                                                    <tbody>
                                                        <tr>
                                                            <td align="center">
                                                                <span style="font-size:26px;display:block;font-weight:normal;padding:16px 0 8px 0">
                                                                ${mailData[0].bidderName} Placed bid on your NFT for  
                                                                    <strong>${bid_price} $</strong>
                                        .
                                        
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td align="center">
                                                                <span style="font-size:16px;display:block;font-weight:normal;padding:0">
                                        
                                        </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td align="center" style="padding:16px">
                                                                <div>
                                                                    <a href="https://infinity8.io/itemdetails/${item_edition_id}" style="background-color:#0d58c8;color:#ffffff;display:inline-block;font-family:'Helvetica Neue',Helvetica,Arial,Geneva,sans-serif;font-size:16px;font-weight:normal;line-height:40px;text-align:center;text-decoration:none;width:200px" target="_blank" >View your NFT</a>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <table width="100%" cellspacing="0" cellpadding="10" style="background:#f8f8f8;margin-top:10px">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td align="center" style="padding:0 0 20px 0">
                                                                                <table cellspacing="0" cellpadding="0">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align="center" width="580">
                                                                                                <div style="text-align:left;font-size:26px;font-weight:400;padding-top:30px">
                                                                    
                                                                </div>
                                                                                                <div style="text-align:left;font-size:18px;padding-bottom:30px">
                                                                    
                                                                                                </div>
                                                                                            
                                                                                                    
                                                                                                    </a>
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td align="center" width="580">
                                                                                                    <table cellpadding="0" cellspacing="0">
                                                                                                        <tbody>
                                                                                                            <tr>
                                                                                                                <td width="580" style="padding-top:10px">
                                                                                                                    <span style="text-align:left;font-size:26px;font-weight:400">
                                                                        
                                                                            </span>
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                            <tr>
                                                                                                                <td width="580" style="padding-top:6px">
                                                                                                                    <span style="text-align:left;font-size:16px;font-weight:300">
                                                                            
                                                                            </span>
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                            <tr>
                                                                                                                <td width="580" style="padding-top:6px">
                                                                                                                    <span style="text-align:left;font-size:16px;font-weight:300">
                                                                            
                                                                            
                                                                            </span>
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                            <tr>
                                                                                                                <td align="center" style="padding:16px">
                                                                                                                    <div>
                                                                                                                    
                                                                                                                    </div>
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="text-align:left">
                                                                    <span style="color:#37393a;font-size:1em;display:block;font-weight:normal;font-family:'Helvetica Neue',Helvetica,Arial,Geneva,sans-serif">— Infinity8 Team</span>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="text-align:left;padding-top:0">
                                                                    <span style="color:#37393a;font-size:1em;display:block;font-weight:normal;font-family:'Helvetica Neue',Helvetica,Arial,Geneva,sans-serif">Join us on 
                                                                        <a style="color:#0d58c8" href="#" target="_blank" >Discord</a>&nbsp;&nbsp;
                                                                        <a style="color:#0d58c8" href="#" target="_blank" >Instagram</a>&nbsp;&nbsp;
                                                                        <a style="color:#0d58c8" href="#" target="_blank" >Twitter</a>&nbsp;&nbsp;
                                                                        <a style="color:#0d58c8" href="#" target="_blank" >P
                                                                            <wbr>interest
                                                                            </a>&nbsp;&nbsp;
                                                                            <a style="color:#0d58c8" href="#" target="_blank" >Facebook</a>
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2" style="padding:60px 10px;text-align:left;font-size:12px;color:#808080">
                            Onchain Labs, Inc.
                                                        <br>
                            1150 Folsom St, San Francisco, CA 94103
                                                            <br>
                                                                <a style="color:#808080" href="#" target="_blank" >Unsubscribe from emails like this.</a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <img src="https://ci4.googleusercontent.com/proxy/0euvWLzznUAdrrGW6axQu9EsfXL7_6GxTkwJXcHMuspzeRNp8FcjggNNSiY-JGDJ8z4DbOXNQp4KIPTZGVU1rxrMwTDYTuQi_8byNugrg1teFLBDeSl-qzOQlrLf_5J09vckt8nuI2XdYRyBtc51W8-MtkRh6exxSbukw1tjdhyhvMvjDg4Km59N4U3mO6S4-d8_qLLADYjFCESLB7XgLben3uVL4vcgREVoCHPLX6k3tMUx_FICjsmAUoTqIEH2GMf5wgZievaPA2FQOsBv4s_5yQ8C8XOv0k5NOqjY2urKBqyOq4G918U_MsrE-E3O0QXlCZiNFMR4DS4XsZfIO7jkNZNjY1fmhbbJ5FmqHSpFOVjPj-L0nDeH1Aa9yyLBjJ8RUt5mreprdNhk7hv3wgqbGqA6IEDjln3sjelbl0HCClCvviJF3ImLBwtYrS_qya6aceNru1Yu8h5K36tjqdlYk05fH1VZgaFH2SnzfmoMSRZh6_24w61qjJmllDy5lyanOd0W7ata=s0-d-e1-ft#http://url7878.makersplace.com/wf/open?upn=-2BPV2hBq-2FD7DUfRz313ixDR4OP7mK3ScXbRYQPgG4McsDWBvGxOavCkt0egDMf4b2MzJOqSn6f8bSm0zGobt5IGcNocHC4GA5YoQaHHfw1RO7GmjU08o22B1HLW-2Fq-2FN3jJKNDg1SS-2BSCtQWUppObUIwIZAn1dnxWCpXLKq7tqll-2B8rhp45PZ-2FNrigL7mTnNsMQJBbqpQ-2F1l39X0wIMXhjb-2B-2BPdbUuwbBmXLgH4uU4sqgvdtK88KY3UvGN12jSTb-2FB-2BSps-2FmbaghPBh0Pipfp5DQL4Qmdp-2BJ9AzYB2PBiDsEc-3D" alt="" width="1" height="1" border="0" style="height:1px!important;width:1px!important;border-width:0!important;margin-top:0!important;margin-bottom:0!important;margin-right:0!important;margin-left:0!important;padding-top:0!important;padding-bottom:0!important;padding-right:0!important;padding-left:0!important" class="CToWUd">
                    <font color="#888888"></font>
                </div>`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    });
            
            
                                    /// SEND MAIL FOR PURCHASING NFT ENDS
        return res.status(200).send({
                success: true,
                msg: "User Bid Inserted Successfully",
            });
        } else {
            res.status(400).send({
                success: false,
                msg: "Something Wrong due to internal Error"
            });
        }
    });
}


exports.getBidDetail = async (db, req, res) => {

    var item_edition_id = req.body.item_edition_id

    await db.query(marketplaceQueries.getBidDetail, [item_edition_id], function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        if (data.length > 0) {
            res.status(200).send({
                success: true,
                msg: "Item Bid Details",
                response: data
            });
        } else {
            res.status(400).send({
                success: false,
                msg: "No data found!!"
            });
        }
    });
}


exports.getWalletDetail = async (db, req, res) => {

    var user_id = req.body.user_id
    const response1 = await fetch('https://api.coinbase.com/v2/prices/ETH-USD/buy', {
        method: 'GET', headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const data1 = await response1.json();
    //console.log(data1['data']['amount']);
    await db.query(marketplaceQueries.getWalletDetail, [user_id], function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }

        if (data.length > 0) {
            res.status(200).send({
                success: true,
                msg: "User's wallet detail!!",
                user_id: data[0].user_id,
                usd_balance: data[0].balance.toFixed(2),
                public: data[0].public,
                private: '',
                eth_balance: (data[0].balance / data1['data']['amount']).toFixed(6),
                eth_usd_value: data1['data']['amount']
            });
        } else {
            res.status(400).send({
                success: false,
                msg: "Something Wrong due to internal Error!!"
            });
        }
    });
}

exports.bidAccept = async (db, req, res) => {


    var user_id = req.body.user_id;
    var item_id = req.body.item_id;
    var payment_id = req.body.payment_id;
    var item_edition_id = req.body.item_edition_id;
    var bid_id = req.body.bid_id;
    var is_sold = 1;

    await db.query(marketplaceQueries.getBidRecord, [bid_id], async function (error, biddata) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "error occured in getWalletDetail",
                error
            });
        }
        //console.log(biddata);

        await db.query(marketplaceQueries.insertSellTransactionByBidId, [bid_id], async function (error, data3) {
            if (error) {
                return res.status(400).send({
                    success: false,
                    msg: "Error occured in insertSellTransactionByBidId!!",
                    error
                });
            }
        });
        await db.query(marketplaceQueries.getWalletDetail, [biddata[0].user_id], async function (error, walletDetail) {
            if (error) {
                return res.status(400).send({
                    success: false,
                    msg: "error occured in getWalletDetail",
                    error
                });
            }
            var publickey = walletDetail[0].public;
            //console.log(publickey);

            /// CONFIRM CAPTURE PAYMENT STARTS
            const response3 = await fetch('https://infinity8.io:7007/stripe/confirm-capture-payment', {
                method: 'POST', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `${config.stripe_key}`
                },
                body: JSON.stringify({
                    "paymentId": `${payment_id}`
                })
            });
            const data3 = await response3.json();
            //console.log(data3);
            /// CONFIRM CAPTURE PAYMENT ENDS

            /* run ownership changes api */
            const response1 = await fetch(`${config.blockchainApiUrl}transfer`, {
                method: 'POST', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "from_address": `${config.contractOwnerAddress}`,
                    "from_private_key": `${config.contractOwnerPrivateKey}`,
                    "contract_address": `${config.contractAddress}`,
                    "to_address": `${publickey}`,
                    "token_owner_address": `${config.contractOwnerAddress}`,
                    "tokenId": item_id,
                    "amount": 1
                })
            });
            const data1 = await response1.json();
            //console.log(data1.hash);
            if (!data1.hash) {
                return res.status(400).send({
                    success: false,
                    msg: "error occured in ownership transfer",
                    apidata: data1
                });
            }

            /* end ownership change api */
            await db.query(marketplaceQueries.updateSold2, [is_sold, biddata[0].user_id, data1.hash, item_edition_id], async function (error, data) {
                if (error) {
                    return res.status(400).send({
                        success: false,
                        msg: "Error occured!!",
                        error
                    });
                }

                await db.query(marketplaceQueries.updateItemBid, [item_edition_id, bid_id], async function (error, data) {
                    if (error) {
                        return res.status(400).send({
                            success: false,
                            msg: "Error occured updateItemBid!!",
                            error
                        });
                    }
                });
                await db.query(marketplaceQueries.updateItemBid2, [bid_id], async function (error, data) {
                    if (error) {
                        return res.status(400).send({
                            success: false,
                            msg: "Error occured in updateItemBid2!!",
                            error
                        });
                    }
                });
                await db.query(marketplaceQueries.insertBuyTransactionByBidId, [biddata[0].user_id, bid_id], async function (error, data3) {
                    if (error) {
                        return res.status(400).send({
                            success: false,
                            msg: "Error occured in insertBuyTransactionByBidId!!",
                            error
                        });
                    }
                    await db.query(marketplaceQueries.getItemDetails, [item_edition_id], async function (error, data1) {
                        if (error) {
                            return res.status(400).send({
                                success: false,
                                msg: "Error occured!!",
                                error
                            });
                        }
                        var itemHistroy = {
                            "user_id": data1[0].created_by,
                            "item_edition_id": data1[0].item_edition_id,
                            "owner": data1[0].user_name
                        }


                        await db.query(marketplaceQueries.insertOwnerHistory, [itemHistroy], async function (error, data2) {
                            if (error) {
                                return res.status(400).send({
                                    success: false,
                                    msg: "Error occured!!",
                                    error
                                });
                            }

                            /*------------------------------- Email Sent */


                            await db.query(marketplaceQueries.getUserDetails, [bid_id], async function (error, result) {
                                if (error) {
                                    return res.status(400).send({
                                        success: false,
                                        msg: "error occured in UserDetail",
                                        error
                                    });
                                }
                                //console.log(result);
                                var transporter = nodemailer.createTransport({
                                    host: 'espsofttechnologies.com',
                                    port: 465,
                                    secure: true,
                                    auth: {
                                        user: 'developer@espsofttechnologies.com',
                                        pass: 'Espsoft123#'
                                    },
                                    tls: {
                                        rejectUnauthorized: false
                                    }
                                });
                                //console.log(result[0].email);

                                var mailOptions = {
                                    from: 'no-reply@infinity8.io',
                                    to: result[0].email,
                                    subject: 'Bid Status',
                                    html: ` <div style="FONT-FAMILY:Helvetica-Neue,Helvetica,Arial,sans-serif">
<table cellspacing="0" cellpadding="6" width="100%" style="background:#ffffff">
   <tbody>
      <tr>
         <td style="border:#ffffff 1px solid">
            <table cellspacing="0" cellpadding="0" width="640px" style="margin:0 auto" bgcolor="white">
               <tbody>
                  <tr>
                     <td>
                        <table cellspacing="0" cellpadding="0" width="100%">
                           <tbody>
                              <tr valign="middle">
                                 <td colspan="2" align="center" style="text-align:center;width:100%;padding:12px 0px;border-bottom:1px solid #eaeaea">
                                    <div><a href="#" target="_blank" ><img align="left" alt="MakersPlace Logo" src="https://ci6.googleusercontent.com/proxy/YkfORi10H1b77f9VCRO8EjkzzrpXzQxzFiH__voSSA64eyQyBGnMfhfwX_XHjTL2q-HdU-PzZy2M4ZiPa-LCRjjCNg=s0-d-e1-ft#https://makersplace.com/static/img/logo-main.png" width="180" style="max-width:400px;padding-bottom:0;display:inline!important;vertical-align:bottom;border:0;height:auto;outline:none;text-decoration:none" class="CToWUd"></a></div>
                                 </td>
                              </tr>
                              <tr>
                                 <td colspan="2">
                                    <table style="text-align:left;font-family:'Helvetica Neue',Helvetica,Arial,Geneva,sans-serif;padding-top:20px;color:#37393a" width="100%" cellspacing="0" cellpadding="10" border="0" align="left">
                                       <tbody>
                                          <tr>
                                             <td align="center">
                                                <span style="font-size:26px;display:block;font-weight:normal;padding:16px 0 8px 0">
                                                Your bid of <strong>${result[0].bid_price}</strong>
                                                was Accepted.
                                                </span>
                                             </td>
                                          </tr>
                                          <tr>
                                             <td align="center">
                                                <span style="font-size:16px;display:block;font-weight:normal;padding:0">
                                                Your offer is only valid till ${result[0].expiry_date} or before you will outbid, and you'll only be charged if your offer is accepted.
                                                </span>
                                             </td>
                                          </tr>
                                          <tr>
                                             <td align="center" style="padding:16px">
                                                <div><a href="https://infinity8.io/purchasedetail/${data3.insertId}" style="background-color:#0d58c8;color:#ffffff;display:inline-block;font-family:'Helvetica Neue',Helvetica,Arial,Geneva,sans-serif;font-size:16px;font-weight:normal;line-height:40px;text-align:center;text-decoration:none;width:200px" target="_blank" >View your Bids</a></div>
                                             </td>
                                          </tr>
                                          <tr>
                                             <td>
                                                <table width="100%" cellspacing="0" cellpadding="10" style="background:#f8f8f8;margin-top:10px">
                                                   <tbody>
                                                      <tr>
                                                         <td align="center" style="padding:0 0 20px 0">
                                                            <table cellspacing="0" cellpadding="0">
                                                               <tbody>
                                                                  <tr>
                                                                     <td align="center" width="580">
                                                                        <div style="text-align:left;font-size:26px;font-weight:400;padding-top:30px">
                                                                           ${result[0].name}
                                                                        </div>
                                                                        <div style="text-align:left;font-size:18px;padding-bottom:30px">
                                                                           by <a style="color:#808080;text-decoration:none" href="#" target="_blank">${result[0].owner}</a>
                                                                        </div>
                                                                        <a href="https://infinity8.io/purchasedetail/${data3.insertId}" target="_blank" ><img width="580" src="${config.imageUrl}${result[0].image}" class="CToWUd"></a>
                                                                     </td>
                                                                  </tr>
                                                                  <tr>
                                                                     <td align="center" width="580">
                                                                        <table cellpadding="0" cellspacing="0">
                                                                           <tbody>
                                                                              <tr>
                                                                                 <td width="580" style="padding-top:10px">
                                                                                    <span style="text-align:left;font-size:26px;font-weight:400">
                                                                                    Details
                                                                                    </span>
                                                                                 </td>
                                                                              </tr>
                                                                              <tr>
                                                                                 <td width="580" style="padding-top:6px">
                                                                                    <span style="text-align:left;font-size:16px;font-weight:300">
                                                                                    Edition 21 of 35
                                                                                    </span>
                                                                                 </td>
                                                                              </tr>
                                                                              <tr>
                                                                                 <td width="580" style="padding-top:6px">
                                                                                    <span style="text-align:left;font-size:16px;font-weight:300">
                                                                                    ${result[0].description}
                                                                                    A gateway to the unknown. Will our 3 little explorers dare to enter?
                                                                                    </span>
                                                                                 </td>
                                                                              </tr>
                                                                              <tr>
                                                                                 <td align="center" style="padding:16px">
                                                                                    <div><a href="https://infinity8.io/purchasedetail/${data3.insertId}" style="background-color:#0d58c8;color:#ffffff;display:inline-block;font-family:'Helvetica Neue',Helvetica,Arial,Geneva,sans-serif;font-size:16px;font-weight:normal;line-height:40px;text-align:center;text-decoration:none;width:200px" target="_blank" >View your Bids</a></div>
                                                                                 </td>
                                                                              </tr>
                                                                           </tbody>
                                                                        </table>
                                                                     </td>
                                                                  </tr>
                                                               </tbody>
                                                            </table>
                                                         </td>
                                                      </tr>
                                                   </tbody>
                                                </table>
                                             </td>
                                          </tr>
                                          <tr>
                                             <td style="text-align:left">
                                                <span style="color:#37393a;font-size:1em;display:block;font-weight:normal;font-family:'Helvetica Neue',Helvetica,Arial,Geneva,sans-serif">— Infinity8 Team</span>
                                             </td>
                                          </tr>
                                          <tr>
                                             <td style="text-align:left;padding-top:0">
                                                <span style="color:#37393a;font-size:1em;display:block;font-weight:normal;font-family:'Helvetica Neue',Helvetica,Arial,Geneva,sans-serif">Join us on <a style="color:#0d58c8" href="#" target="_blank" >Discord</a>&nbsp;&nbsp;<a style="color:#0d58c8" href="#" target="_blank" >Instagram</a>&nbsp;&nbsp;<a style="color:#0d58c8" href="#" target="_blank" >Twitter</a>&nbsp;&nbsp;<a style="color:#0d58c8" href="#" target="_blank" >P<wbr>interest</a>&nbsp;&nbsp;<a style="color:#0d58c8" href="#" target="_blank" >Facebook</a></span>
                                             </td>
                                          </tr>
                                       </tbody>
                                    </table>
                                 </td>
                              </tr>
                              <tr>
                                 <td colspan="2" style="padding:60px 10px;text-align:left;font-size:12px;color:#808080">
                                    Onchain Labs, Inc.<br>
                                    1150 Folsom St, San Francisco, CA 94103<br>
                                    <a style="color:#808080" href="#" target="_blank" >Unsubscribe from emails like this.</a>
                                 </td>
                              </tr>
                           </tbody>
                        </table>
                     </td>
                  </tr>
               </tbody>
            </table>
         </td>
      </tr>
   </tbody>
</table>
<img src="https://ci4.googleusercontent.com/proxy/0euvWLzznUAdrrGW6axQu9EsfXL7_6GxTkwJXcHMuspzeRNp8FcjggNNSiY-JGDJ8z4DbOXNQp4KIPTZGVU1rxrMwTDYTuQi_8byNugrg1teFLBDeSl-qzOQlrLf_5J09vckt8nuI2XdYRyBtc51W8-MtkRh6exxSbukw1tjdhyhvMvjDg4Km59N4U3mO6S4-d8_qLLADYjFCESLB7XgLben3uVL4vcgREVoCHPLX6k3tMUx_FICjsmAUoTqIEH2GMf5wgZievaPA2FQOsBv4s_5yQ8C8XOv0k5NOqjY2urKBqyOq4G918U_MsrE-E3O0QXlCZiNFMR4DS4XsZfIO7jkNZNjY1fmhbbJ5FmqHSpFOVjPj-L0nDeH1Aa9yyLBjJ8RUt5mreprdNhk7hv3wgqbGqA6IEDjln3sjelbl0HCClCvviJF3ImLBwtYrS_qya6aceNru1Yu8h5K36tjqdlYk05fH1VZgaFH2SnzfmoMSRZh6_24w61qjJmllDy5lyanOd0W7ata=s0-d-e1-ft#http://url7878.makersplace.com/wf/open?upn=-2BPV2hBq-2FD7DUfRz313ixDR4OP7mK3ScXbRYQPgG4McsDWBvGxOavCkt0egDMf4b2MzJOqSn6f8bSm0zGobt5IGcNocHC4GA5YoQaHHfw1RO7GmjU08o22B1HLW-2Fq-2FN3jJKNDg1SS-2BSCtQWUppObUIwIZAn1dnxWCpXLKq7tqll-2B8rhp45PZ-2FNrigL7mTnNsMQJBbqpQ-2F1l39X0wIMXhjb-2B-2BPdbUuwbBmXLgH4uU4sqgvdtK88KY3UvGN12jSTb-2FB-2BSps-2FmbaghPBh0Pipfp5DQL4Qmdp-2BJ9AzYB2PBiDsEc-3D" alt="" width="1" height="1" border="0" style="height:1px!important;width:1px!important;border-width:0!important;margin-top:0!important;margin-bottom:0!important;margin-right:0!important;margin-left:0!important;padding-top:0!important;padding-bottom:0!important;padding-right:0!important;padding-left:0!important" class="CToWUd"><font color="#888888">
</font>
</div>`
                                };

                                transporter.sendMail(mailOptions, function (error, info) {
                                    if (error) {
                                           console.log(error);
                                    } else {
                                        console.log('Email sent: ' + info.response);
                                    }
                                });

                            });
                            /*------------------------------- Close */


                            if (data) {
                                res.status(200).send({
                                    success: true,
                                    msg: "Item Sold ",
                                });
                            } else {
                                res.status(400).send({
                                    success: false,
                                    msg: "Something Wrong due to internal Error"
                                });
                            }
                        });
                    });
                });
            });
        });
    });
}

exports.getRealEstateStatus = async (db, req, res) => {

    var user_id = req.body.user_id

    await db.query(marketplaceQueries.getRealEstateStatus, [user_id], function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        //console.log(data);
        if (data.length > 0) {
            res.status(200).send({
                success: true,
                msg: "Users Telent Status",
                response: data
            });
        } else {
            res.status(400).send({
                success: false,
                msg: "Something Wrong due to internal Error"
            });
        }
    });
}


exports.getTelentStatus = async (db, req, res) => {

    var user_id = req.body.user_id
    //console.log(user_id);
    await db.query(marketplaceQueries.getTelentStatus, [user_id], function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        //console.log(data.length);
        if (data.length > 0) {
            res.status(200).send({
                success: true,
                msg: "Users Telent Status",
                response: data
            });
        } else {
            res.status(204).send({
                success: false,
                msg: "No data found!!"
            });
        }
    });
}


exports.resaleTrxStart = async (db, req, res) => {
    //console.log("In resaleTrx");
    var user_id = req.body.user_id;
    var amount = req.body.amount;
    var trx_type = 'resale';
    var user_address = req.body.user_address;
    if (!user_id) {
        return res.status(400).send({
            success: false,
            msg: "User ID required"
        });
    }

    if (!user_address) {
        return res.status(400).send({
            success: false,
            msg: "user_address required"
        });
    }

    if (!amount) {
        return res.status(400).send({
            success: false,
            msg: "amount required"
        });
    }
    var transaction = {
        "user_id": user_id,
        "transaction_type_id": 9,
        "amount": amount * -1,
        "currency": "USD",
        "status": 0,
        "user_address": user_address
    }
    await db.query(marketplaceQueries.insertTransaction, [transaction], async function (error, trxdata) {
        //console.log('trxdata in nftTrx_start', trxdata);
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured in insertTransaction!!",
                error
            });
        }

        var insertData = {
            "bid_price": amount,
            "transaction_status": 'begin',
            "trx_type": trx_type,
            "transaction_id": trxdata.insertId,
            "user_address": user_address
        }
        //console.log("insertData");
        //console.log(insertData);
        await db.query(marketplaceQueries.onlinetrx_start, [insertData], async function (error, data) {
            if (error) {
                return res.status(400).send({
                    success: false,
                    msg: "Error occured!!",
                    error
                });
            }
            if (data) {

                /* run token api */
                // console.log(JSON.stringify({
                //     "external_id": `${trxdata.insertId}`,
                //     "hosted_payment_id": `${config.netCentshostedPaymentId}`,
                //     "amount": `${amount}`,
                //     "email": "",
                //     "first_name": "",
                //     "last_name": ""
                // }));
                //console.log(config.netCentshostedPaymentId);
                //console.log(config.netCentsAuthorization);
                const response1 = await fetch('https://api.net-cents.com/merchant/v2/widget_payments', {
                    method: 'POST', headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `${config.netCentsAuthorization}`
                    },
                    body: JSON.stringify({
                        "external_id": `${trxdata.insertId}`,
                        "hosted_payment_id": `${config.netCentshostedPaymentId}`,
                        "amount": `${amount}`,
                        "email": "",
                        "first_name": "",
                        "last_name": ""
                    })
                });
                const data1 = await response1.json();
                //console.log(data1);
                if (!data1.token) {
                    return res.status(400).send({
                        success: false,
                        msg: "Error occured!!",
                        error
                    });
                }

                /* end token api */
                res.status(200).send({
                    success: true,
                    msg: "Your request submitted successfully!! ",
                    external_id: trxdata.insertId,
                    token: data1.token,
                    id: data1.id,
                    status: data1.status

                });
            } else {
                res.status(400).send({
                    success: false,
                    msg: "No Data"
                });
            }
        });
    });
}


exports.nftTrx_start = async (db, req, res) => {
    //console.log("dsfdsfds");
    var user_id = req.body.user_id;
    var amount = req.body.amount;
    var trx_type = 'create';
    var user_address = req.body.user_address;
    if (!user_id) {
        return res.status(400).send({
            success: false,
            msg: "User ID required"
        });
    }

    if (!user_address) {
        return res.status(400).send({
            success: false,
            msg: "user_address required"
        });
    }

    if (!amount) {
        return res.status(400).send({
            success: false,
            msg: "amount required"
        });
    }
    var transaction = {
        "user_id": user_id,
        "transaction_type_id": 7,
        "amount": amount * -1,
        "currency": "USD",
        "status": 0,
        "user_address": user_address
    }
    await db.query(marketplaceQueries.insertTransaction, [transaction], async function (error, trxdata) {
        //console.log('trxdata in nftTrx_start', trxdata);
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured in insertTransaction!!",
                error
            });
        }

        var insertData = {
            "bid_price": amount,
            "transaction_status": 'begin',
            "trx_type": trx_type,
            "transaction_id": trxdata.insertId,
            "user_address": user_address
        }
        //console.log("insertData");
        //console.log(insertData);
        await db.query(marketplaceQueries.onlinetrx_start, [insertData], async function (error, data) {
            if (error) {
                return res.status(400).send({
                    success: false,
                    msg: "Error occured!!",
                    error
                });
            }
            if (data) {

                /* run token api */

                //console.log(config.netCentshostedPaymentId);
                //console.log(config.netCentsAuthorization);
                const response1 = await fetch('https://api.net-cents.com/merchant/v2/widget_payments', {
                    method: 'POST', headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `${config.netCentsAuthorization}`
                    },
                    body: JSON.stringify({
                        "external_id": `${trxdata.insertId}`,
                        "hosted_payment_id": `${config.netCentshostedPaymentId}`,
                        "amount": `${amount}`,
                        "email": "",
                        "first_name": "",
                        "last_name": ""
                    })
                });
                const data1 = await response1.json();
                //console.log(data1);
                if (!data1.token) {
                    return res.status(400).send({
                        success: false,
                        msg: "Error occured!!",
                        error
                    });
                }

                /* end token api */
                res.status(200).send({
                    success: true,
                    msg: "Your request submitted successfully!! ",
                    external_id: trxdata.insertId,
                    token: data1.token,
                    id: data1.id,
                    status: data1.status

                });
            } else {
                res.status(400).send({
                    success: false,
                    msg: "No Data"
                });
            }
        });
    });
}


exports.onlinetrx_start = async (db, req, res) => {
    //console.log("in onlinetrx_start");
    var user_id = req.body.user_id;
    var item_id = req.body.item_id;
    var item_edition_id = req.body.item_edition_id;
    var bid_id = req.body.bid_id;
    var amount = req.body.amount;
    var sell_type = req.body.sell_type;
    var user_address = req.body.user_address;
    //console.log(amount);
    if (!user_id) {
        return res.status(400).send({
            success: false,
            msg: "User ID required"
        });
    }

    if (!item_id) {
        return res.status(400).send({
            success: false,
            msg: "Item ID required"
        });
    }

    if (!amount) {
        return res.status(400).send({
            success: false,
            msg: "amount required"
        });
    }
    if (!sell_type) {
        return res.status(400).send({
            success: false,
            msg: "sell_type required"
        });
    }

    var transactiontypeid = 4;
    if (sell_type === 'Price') {
        transactiontypeid = 6;
    }

    var transaction = {
        "user_id": user_id,
        "transaction_type_id": transactiontypeid,
        "amount": amount * -1,
        "item_id": item_id,
        "item_edition_id": item_edition_id,
        "user_address": user_address,
        "currency": "USD",
        "status": 0
    }
    await db.query(marketplaceQueries.insertTransaction, [transaction], async function (error, trxdata) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured in insertTransaction!!",
                error
            });
        }
        var insertData = {
            "user_id": user_id,
            "item_id": item_id,
            "item_edition_id": item_edition_id,
            "item_edition_bid_id": bid_id,
            "bid_price": amount,
            "transaction_status": 'begin',
            "transaction_id": trxdata.insertId,
            "user_address": user_address
        }
        await db.query(marketplaceQueries.onlinetrx_start, [insertData], async function (error, data) {
            if (error) {
                return res.status(400).send({
                    success: false,
                    msg: "Error occured!!",
                    error
                });
            }
            if (data) {

                /* run token api */
                const response1 = await fetch('https://api.net-cents.com/merchant/v2/widget_payments', {
                    method: 'POST', headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `${config.netCentsAuthorization}`
                    },
                    body: JSON.stringify({
                        "external_id": `${trxdata.insertId}`,
                        "hosted_payment_id": `${config.netCentshostedPaymentId}`,
                        "amount": `${amount}`,
                        "email": "",
                        "first_name": "",
                        "last_name": ""
                    })
                });
                const data1 = await response1.json();
                //console.log(data1);
                if (!data1.token) {
                    return res.status(400).send({
                        success: false,
                        msg: "Error occured!!",
                        error
                    });
                }

                /* end token api */
                res.status(200).send({
                    success: true,
                    msg: "Your request submitted successfully!! ",
                    external_id: trxdata.insertId,
                    token: data1.token,
                    id: data1.id,
                    status: data1.status

                });
            } else {
                res.status(400).send({
                    success: false,
                    msg: "No Data"
                });
            }
        });
    });
}


exports.paymentReceived = async (db, req, res) => {
    //console.log("in paymentReceived");
    var amount_due = req.body.amount_due;
    var amount_received = req.body.amount_received;
    var exchange_rate = req.body.exchange_rate;
    var exchange_rate_currency = req.body.exchange_rate_currency;
    var external_id = req.body.external_id;
    var invoice_number = req.body.invoice_number;
    var transaction_currency = req.body.transaction_currency;
    var transaction_status = req.body.transaction_status;
    var payment_id = req.body.payment_id;
    var transaction_id = req.body.transaction_id;
    var txid = req.body.txid;
    var blockchain_transactions = req.body.blockchain_transactions;


    var udpateData = {
        "amount_due": amount_due,
        "amount_received": amount_received,
        "exchange_rate": exchange_rate,
        "exchange_rate_currency": exchange_rate_currency,
        "invoice_number": invoice_number,
        "transaction_currency": transaction_currency,
        "transaction_status": transaction_status,
        "api_transaction_id": transaction_id,
        "payment_id": payment_id,
        "txid": txid,
        "blockchain_id": blockchain_transactions[0].id,
        "blockchain_status": blockchain_transactions[0].status,
        "blockchain_amount_received": blockchain_transactions[0].amount_received,
        "blockchain_find_time": blockchain_transactions[0].find_time,
        "blockchain_txid": blockchain_transactions[0].trxid,
    }
    //console.log('external_id : ', external_id);
    //console.log('udpateData', udpateData);

    await db.query(marketplaceQueries.updateOnlinetrx, [udpateData, external_id], function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        //    else{
        //     res.status(200).send({
        //             success:true,
        // msg:"Transaction updated successfully"
        //                 });            
        //         }
    });
    await db.query(marketplaceQueries.getOnlineTrx, [external_id], async function (error, checktrx) {
        //console.log(checktrx);
        //console.log(checktrx[0].trx_type);
        
        if (checktrx[0].trx_type === 'create') {
            //console.log("blockchain_transactions[0]");
            //console.log(blockchain_transactions[0]);
            if (blockchain_transactions[0].status === 'confirmed') {
                //console.log("NFT create payment confirmed");
                return res.status(200).send({
                    success: true,
                    msg: "Payment successfull!!",

                });
            }
            else {
                //console.log("NFT create payment failed");
                return res.status(400).send({
                    success: false,
                    msg: "Payment failed",
                });
            }
        }

        
        if (checktrx[0].trx_type === 'resale') {
            //console.log("blockchain_transactions[0]");
            //console.log(blockchain_transactions[0]);
            if (blockchain_transactions[0].status === 'confirmed') {
                //console.log("NFT resale payment confirmed");
                return res.status(200).send({
                    success: true,
                    msg: "NFT resale payment successfull!!",

                });
            }
            else {
                //console.log("NFT resale payment failed");
                return res.status(400).send({
                    success: false,
                    msg: "NFT resale Payment failed",
                });
            }
        }


        if (blockchain_transactions[0].status === 'confirmed') {

            /* check sell type of item */



            await db.query(marketplaceQueries.itemDetailByonlinetrx, [external_id], async function (error, itemdata2) {
                //console.log("itemdata2");
                //console.log(itemdata2);
                if (error) {
                    return res.status(400).send({
                        success: false,
                        msg: "error occured in itemDetailByonlinetrx",
                        error
                    });
                }
                //console.log(itemdata2);
                var publickey = itemdata2[0].public;
                if (itemdata2[0].sell_type === 1) {

                    /// SEND MAIL FOR PURCHASING NFT STARTS
                    await db.query(marketplaceQueries.getUserDetail, [checktrx[0].user_id], async function (error, mailData) {
                        var transporter = nodemailer.createTransport({
                            host: 'espsofttechnologies.com',
                            port: 465,
                            secure: true,
                            auth: {
                                user: 'developer@espsofttechnologies.com',
                                pass: 'Espsoft123#'

                            },
                            tls: {
                                rejectUnauthorized: false
                            }
                        });
                        console.log(mailData[0].email);
                        var mailOptions = {
                            from: 'no-reply@infinity8.io',
                            to: mailData[0].email,
                            subject: 'NFT Purchased',
                            html: ` 
      <div style="FONT-FAMILY:Helvetica-Neue,Helvetica,Arial,sans-serif">
          <table cellspacing="0" cellpadding="6" width="100%" style="background:#ffffff">
              <tbody>
                  <tr>
                      <td style="border:#ffffff 1px solid">
                          <table cellspacing="0" cellpadding="0" width="640px" style="margin:0 auto" bgcolor="white">
                              <tbody>
                                  <tr>
                                      <td>
                                          <table cellspacing="0" cellpadding="0" width="100%">
                                              <tbody>
                                                  <tr valign="middle">
                                                      <td colspan="2" align="center" style="text-align:center;width:100%;padding:12px 0px;border-bottom:1px solid #eaeaea">
                                                          <div>
                                                              <a href="#" target="_blank" >
                                                                  <img align="left"  src="http://13.126.99.244/infinity8-admin/images/logo-new.png" width="180" style="max-width:400px;padding-bottom:0;display:inline!important;vertical-align:bottom;border:0;height:auto;outline:none;text-decoration:none" class="CToWUd">
                                                                  </a>
                                                              </div>
                                                          </td>
                                                      </tr>
                                                      <tr>
                                                          <td colspan="2">
                                                              <table style="text-align:left;font-family:'Helvetica Neue',Helvetica,Arial,Geneva,sans-serif;padding-top:20px;color:#37393a" width="100%" cellspacing="0" cellpadding="10" border="0" align="left">
                                                                  <tbody>
                                                                      <tr>
                                                                          <td align="center">
                                                                              <span style="font-size:26px;display:block;font-weight:normal;padding:16px 0 8px 0">
                                                        Your have purchased NFT  for 
                                                                                  <strong>${amount_received}</strong>
                                                        .
                                                        
                                                                              </span>
                                                                          </td>
                                                                      </tr>
                                                                      <tr>
                                                                          <td align="center">
                                                                              <span style="font-size:16px;display:block;font-weight:normal;padding:0">
                                                       
                                                        </span>
                                                                          </td>
                                                                      </tr>
                                                                      <tr>
                                                                          <td align="center" style="padding:16px">
                                                                              <div>
                                                                                  <a href="https://infinity8.io/itemdetails/${checktrx[0].item_edition_id}" style="background-color:#0d58c8;color:#ffffff;display:inline-block;font-family:'Helvetica Neue',Helvetica,Arial,Geneva,sans-serif;font-size:16px;font-weight:normal;line-height:40px;text-align:center;text-decoration:none;width:200px" target="_blank" >View your NFT</a>
                                                                              </div>
                                                                          </td>
                                                                      </tr>
                                                                      <tr>
                                                                          <td>
                                                                              <table width="100%" cellspacing="0" cellpadding="10" style="background:#f8f8f8;margin-top:10px">
                                                                                  <tbody>
                                                                                      <tr>
                                                                                          <td align="center" style="padding:0 0 20px 0">
                                                                                              <table cellspacing="0" cellpadding="0">
                                                                                                  <tbody>
                                                                                                      <tr>
                                                                                                          <td align="center" width="580">
                                                                                                              <div style="text-align:left;font-size:26px;font-weight:400;padding-top:30px">
                                                                                  
                                                                                </div>
                                                                                                              <div style="text-align:left;font-size:18px;padding-bottom:30px">
                                                                                  
                                                                                                              </div>
                                                                                                            
                                                                                                                 
                                                                                                                  </a>
                                                                                                              </td>
                                                                                                          </tr>
                                                                                                          <tr>
                                                                                                              <td align="center" width="580">
                                                                                                                  <table cellpadding="0" cellspacing="0">
                                                                                                                      <tbody>
                                                                                                                          <tr>
                                                                                                                              <td width="580" style="padding-top:10px">
                                                                                                                                  <span style="text-align:left;font-size:26px;font-weight:400">
                                                                                        
                                                                                            </span>
                                                                                                                              </td>
                                                                                                                          </tr>
                                                                                                                          <tr>
                                                                                                                              <td width="580" style="padding-top:6px">
                                                                                                                                  <span style="text-align:left;font-size:16px;font-weight:300">
                                                                                           
                                                                                            </span>
                                                                                                                              </td>
                                                                                                                          </tr>
                                                                                                                          <tr>
                                                                                                                              <td width="580" style="padding-top:6px">
                                                                                                                                  <span style="text-align:left;font-size:16px;font-weight:300">
                                                                                           
                                                                                            
                                                                                            </span>
                                                                                                                              </td>
                                                                                                                          </tr>
                                                                                                                          <tr>
                                                                                                                              <td align="center" style="padding:16px">
                                                                                                                                  <div>
                                                                                                                                    
                                                                                                                                  </div>
                                                                                                                              </td>
                                                                                                                          </tr>
                                                                                                                      </tbody>
                                                                                                                  </table>
                                                                                                              </td>
                                                                                                          </tr>
                                                                                                      </tbody>
                                                                                                  </table>
                                                                                              </td>
                                                                                          </tr>
                                                                                      </tbody>
                                                                                  </table>
                                                                              </td>
                                                                          </tr>
                                                                          <tr>
                                                                              <td style="text-align:left">
                                                                                  <span style="color:#37393a;font-size:1em;display:block;font-weight:normal;font-family:'Helvetica Neue',Helvetica,Arial,Geneva,sans-serif">— Infinity8 Team</span>
                                                                              </td>
                                                                          </tr>
                                                                          <tr>
                                                                              <td style="text-align:left;padding-top:0">
                                                                                  <span style="color:#37393a;font-size:1em;display:block;font-weight:normal;font-family:'Helvetica Neue',Helvetica,Arial,Geneva,sans-serif">Join us on 
                                                                                      <a style="color:#0d58c8" href="#" target="_blank" >Discord</a>&nbsp;&nbsp;
                                                                                      <a style="color:#0d58c8" href="#" target="_blank" >Instagram</a>&nbsp;&nbsp;
                                                                                      <a style="color:#0d58c8" href="#" target="_blank" >Twitter</a>&nbsp;&nbsp;
                                                                                      <a style="color:#0d58c8" href="#" target="_blank" >P
                                                                                          <wbr>interest
                                                                                          </a>&nbsp;&nbsp;
                                                                                          <a style="color:#0d58c8" href="#" target="_blank" >Facebook</a>
                                                                                      </span>
                                                                                  </td>
                                                                              </tr>
                                                                          </tbody>
                                                                      </table>
                                                                  </td>
                                                              </tr>
                                                              <tr>
                                                                  <td colspan="2" style="padding:60px 10px;text-align:left;font-size:12px;color:#808080">
                                            Onchain Labs, Inc.
                                                                      <br>
                                            1150 Folsom St, San Francisco, CA 94103
                                                                          <br>
                                                                              <a style="color:#808080" href="#" target="_blank" >Unsubscribe from emails like this.</a>
                                                                          </td>
                                                                      </tr>
                                                                  </tbody>
                                                              </table>
                                                          </td>
                                                      </tr>
                                                  </tbody>
                                              </table>
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                              <img src="https://ci4.googleusercontent.com/proxy/0euvWLzznUAdrrGW6axQu9EsfXL7_6GxTkwJXcHMuspzeRNp8FcjggNNSiY-JGDJ8z4DbOXNQp4KIPTZGVU1rxrMwTDYTuQi_8byNugrg1teFLBDeSl-qzOQlrLf_5J09vckt8nuI2XdYRyBtc51W8-MtkRh6exxSbukw1tjdhyhvMvjDg4Km59N4U3mO6S4-d8_qLLADYjFCESLB7XgLben3uVL4vcgREVoCHPLX6k3tMUx_FICjsmAUoTqIEH2GMf5wgZievaPA2FQOsBv4s_5yQ8C8XOv0k5NOqjY2urKBqyOq4G918U_MsrE-E3O0QXlCZiNFMR4DS4XsZfIO7jkNZNjY1fmhbbJ5FmqHSpFOVjPj-L0nDeH1Aa9yyLBjJ8RUt5mreprdNhk7hv3wgqbGqA6IEDjln3sjelbl0HCClCvviJF3ImLBwtYrS_qya6aceNru1Yu8h5K36tjqdlYk05fH1VZgaFH2SnzfmoMSRZh6_24w61qjJmllDy5lyanOd0W7ata=s0-d-e1-ft#http://url7878.makersplace.com/wf/open?upn=-2BPV2hBq-2FD7DUfRz313ixDR4OP7mK3ScXbRYQPgG4McsDWBvGxOavCkt0egDMf4b2MzJOqSn6f8bSm0zGobt5IGcNocHC4GA5YoQaHHfw1RO7GmjU08o22B1HLW-2Fq-2FN3jJKNDg1SS-2BSCtQWUppObUIwIZAn1dnxWCpXLKq7tqll-2B8rhp45PZ-2FNrigL7mTnNsMQJBbqpQ-2F1l39X0wIMXhjb-2B-2BPdbUuwbBmXLgH4uU4sqgvdtK88KY3UvGN12jSTb-2FB-2BSps-2FmbaghPBh0Pipfp5DQL4Qmdp-2BJ9AzYB2PBiDsEc-3D" alt="" width="1" height="1" border="0" style="height:1px!important;width:1px!important;border-width:0!important;margin-top:0!important;margin-bottom:0!important;margin-right:0!important;margin-left:0!important;padding-top:0!important;padding-bottom:0!important;padding-right:0!important;padding-left:0!important" class="CToWUd">
                                  <font color="#888888"></font>
                              </div>`
                        };

                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('Email sent: ' + info.response);
                            }
                        });


                        /// SEND MAIL FOR PURCHASING NFT ENDS

                        await db.query(marketplaceQueries.getOnlineTrx, [external_id], async function (error, trx) {
                            if (error) {
                                return res.status(400).send({
                                    success: false,
                                    msg: "error occured in getonlinetrx",
                                    error
                                });
                            }
                            //console.log("trx ", trx);

                            ///////// INSERT SELL TRX
                            await db.query(marketplaceQueries.insertSellTransactionByItemId, [trx[0].user_address, trx[0].item_edition_id], async function (error, selldata) {
                                if (error) {
                                    return res.status(400).send({
                                        success: false,
                                        msg: "error occured in insertSellTransactionByItemId",
                                        error
                                    });
                                }
                            });

                            ///////// INSERT ROYALTY TRX
                            await db.query(marketplaceQueries.insertRoyaltyTransactionByItemId, [trx[0].item_edition_id], async function (error, selldata) {
                                if (error) {
                                    return res.status(400).send({
                                        success: false,
                                        msg: "error occured in insertRoyaltyTransactionByItemId",
                                        error
                                    });
                                }
                            });

                            var updateData = {
                                "status": "1"
                            }
                            await db.query(marketplaceQueries.updateTransaction, [updateData, external_id], async function (error, trxid) {
                                


                                /* run ownership changes api */
                                const response1 = await fetch(`${config.blockchainApiUrl}transfer`, {
                                    method: 'POST', headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        "from_address": `${config.contractOwnerAddress}`,
                                        "from_private_key": `${config.contractOwnerPrivateKey}`,
                                        "contract_address": `${config.contractAddress}`,
                                        "to_address": `${trx[0].user_address}`,
                                        "token_owner_address": `${config.contractOwnerAddress}`,
                                        "tokenId": itemdata2[0].token_id,
                                        "amount": 1
                                    })
                                });
                                const data1 = await response1.json();
                                //console.log(data1.hash);
                                if (!data1.hash) {
                                    return res.status(400).send({
                                        success: false,
                                        msg: "error occured in ownership transfer",
                                        apidata: data1
                                    });
                                }
                                await db.query(marketplaceQueries.updateSold2, [1, trx[0].user_id, data1.hash, trx[0].user_address, trx[0].item_edition_id]);
                                /* end ownership change api */

                                return res.status(200).send({
                                    success: true,
                                    msg: "Ownership changed successfully",
                                    transaction_id: external_id

                                });
                            });
                        });
                    });
                }
                else {
                    await db.query(marketplaceQueries.placeBidByOnlinetrx, [external_id], async function (error, trxdata) {
                        
                        if (error) {
                            return res.status(400).send({
                                success: false,
                                msg: "error occured in place bid",
                                error
                            });
                        }
                        else {
                            var updateData = {
                                "status": "1"
                            }
                            await db.query(marketplaceQueries.updateTransaction, [updateData, external_id], async function (error, bidtrx) {
                                return res.status(400).send({
                                    success: false,
                                    msg: "Placed bid successfully",
                                    transaction_id: external_id
                                });
                                ////// SEND MAIL FOR ADD BID STARTS

                                ///// SEND MAIL FOR ADD BID ENDS

                            });
                        }
                    })
                }

            });

        }
    });
}

exports.getUserBids = async (db, req, res) => {

    var user_id = req.body.user_id

    await db.query(marketplaceQueries.getUserBids, [user_id], function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        if (data.length > 0) {
            res.status(200).send({
                success: true,
                msg: "User bids detail",
                response: data
            });
        } else {
            res.status(400).send({
                success: false,
                msg: "Something Wrong due to internal Error"
            });
        }
    });
}

exports.getfaq = async (db, req, res) => {

    await db.query(marketplaceQueries.getfaq, function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        if (data.length > 0) {
            res.status(200).send({
                success: true,
                msg: "Item Details",
                response: data
            });
        } else {
            res.status(200).send({
                success: false,
                msg: "No Data"
            });
        }
    });
}


/* ---------------------------  STRIPE PAYMENT GATEWAY IMPLEMENTATION ---------------*/
exports.charge = async (db, req, res) => {
    var amount = req.body.amount;
    var id = req.body.id;
    var user_id = req.body.user_id
    var item_id = req.body.item_id
    var item_edition_id = req.body.item_edition_id
    var sell_type = req.body.sell_type
    var user_address = req.body.user_address;
    //console.log("in charge api");
    //console.log(req.body);
    try {
        await db.query(marketplaceQueries.getUserDetail, [user_id], async function (error, userData) {
            if (error) {
                return res.status(400).send({
                    success: false,
                    msg: "Error occured in userData!!",
                    error
                });
            }
            const response1 = await fetch('https://infinity8.io:7007/stripe/create-customer', {
                method: 'POST', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `${config.stripe_key}`
                },
                body: JSON.stringify({
                    "name": `${userData[0].user_name}`,
                    "email": `${userData[0].email}`,
                    "address": {
                        line1: 'Infinity8',
                        postal_code: 'Infinity8',
                        city: 'Infinity8',
                        state: 'CA',
                        country: 'US',

                    }
                })
            });

            const data1 = await response1.json();
            var customerID = data1.CustomerID;
            //console.log(data1);


            const response2 = await fetch('https://infinity8.io:7007/stripe/capture-payment', {
                method: 'POST', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `${config.stripe_key}`
                },
                body: JSON.stringify({
                    "cardId": `${id}`,
                    "customerId": `${customerID}`,
                    "amount": `${(amount * 100).toFixed(0)}`,
                    "currency": "USD",
                    "description": "Amount"
                })
            });
            const data2 = await response2.json();
            //console.log(data2);
            if (data2.success == 'false') {
                return res.status(400).send({
                    success: false,
                    msg: data2.message
                });
            }
            if (sell_type === 'Price') {
                const response3 = await fetch('https://infinity8.io:7007/stripe/confirm-capture-payment', {
                    method: 'POST', headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `${config.stripe_key}`
                    },
                    body: JSON.stringify({
                        "paymentId": `${data2.paymentId}`
                    })
                });
                const data3 = await response3.json();
                //console.log(data3);
                if (data3.message === 'Payment Successful') {
                    console.log('data3.message===Payment Successful');

                    //// transactoin for sell product start
                    await db.query(marketplaceQueries.insertSellTransactionByItemId, [user_address,item_edition_id], async function (error, selldata) {
                        if (error) {
                            return res.status(400).send({
                                success: false,
                                msg: "error occured in insertSellTransactionByItemId",
                                error
                            });
                        }
                    });


                    //// transactoin for sell product ends

                    //// ROYALTY TRX start
                    await db.query(marketplaceQueries.insertRoyaltyTransactionByItemId, [item_edition_id], async function (error, selldata) {
                        if (error) {
                            return res.status(400).send({
                                success: false,
                                msg: "error occured in insertRoyaltyTransactionByItemId",
                                error
                            });
                        }



                        //// ROYALTY TRX ends
                        await db.query(marketplaceQueries.getWalletDetail, [user_id], async function (error, walletDetail) {
                            if (error) {
                                return res.status(400).send({
                                    success: false,
                                    msg: "error occured in getWalletDetail",
                                    error
                                });
                            }
                            //console.log('updating updateSold-edition_id' + item_edition_id);
                            await db.query(marketplaceQueries.updateSoldStripe, [1, user_id, data2.paymentId, data2.receipt_url, user_address, item_edition_id], async function (error, data) {
                                if (error) {
                                    return res.status(400).send({
                                        success: false,
                                        msg: "error occured in udpateSold",
                                        error
                                    });
                                }
                                //console.log('updateSoldStripe');
                                //console.log(data);


                                await db.query(marketplaceQueries.insertBuyTransactionByItemId, [user_address,item_edition_id], async function (error, buydata) {
                                    if (error) {
                                        return res.status(400).send({
                                            success: false,
                                            msg: "error occured in udpateSold",
                                            error
                                        });
                                    }

                                    var publickey = walletDetail[0].public;
                                    //console.log("public Key");
                                    //  console.log(publickey);
                                    /* run ownership changes api */
                                   
                                    


                                    const response1 = await fetch(`${config.blockchainApiUrl}transfer`, {
                                        method: 'POST', headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            "from_address": `${config.contractOwnerAddress}`,
                                            "from_private_key": `${config.contractOwnerPrivateKey}`,
                                            "contract_address": `${config.contractAddress}`,
                                            "to_address": `${user_address}`,
                                            "token_owner_address": `${config.contractOwnerAddress}`,
                                            "tokenId": `${item_id}`,
                                            "amount": 1
                                        })
                                    });
                                    const data1 = await response1.json();
                                    //console.log(data1);
                                    if (!data1.hash) {
                                        return res.status(400).send({
                                            success: false,
                                            msg: "error occured in ownership transfer",
                                            apidata: data1
                                        });
                                    }
                                    //console.log(data1.hash);
                                    await db.query(marketplaceQueries.updateTransferHash, [data1.hash, item_edition_id], async function (error, data) {
                                        if (error) {
                                            return res.status(400).send({
                                                success: false,
                                                msg: "Error occured in updateTransferHash!!",
                                                error
                                            });
                                        }
                                        else {
                                            //console.log('without error 2273');
                                        }


                                        /* end ownership change api */

                                        res.status(200).send({
                                            success: true,
                                            msg: "Ownership changed successfully",
                                            transaction_id: buydata.insertId

                                        });
                                    });
                                });
                            });
                        })
                    });
                }
            }
            else {
                

                if (data2.message === 'Payment successfully authorized') {


                    //console.log('after mail 2322');
                    var insertData = {
                        "user_id": user_id,
                        "item_edition_id": item_edition_id,
                        "bid_price": amount,
                        "payment_id": data2.paymentId,
                        "receipt_url": data2.receipt_url
                    }
                    await db.query(marketplaceQueries.insertBid, [insertData], async function (error, trxdata) {
                        if (error) {
                            return res.status(400).send({
                                success: false,
                                msg: "error occured in place bid",
                                error
                            });
                        }
                        else {
                            /// RETURN OLD BID PAYMENT STARTS
                            await db.query(marketplaceQueries.getPendingBid, [item_edition_id, trxdata.insertId], async function (error, returndata) {
                                if (error) {
                                    return res.status(400).send({
                                        success: false,
                                        msg: "error occured in getWalletDetail",
                                        error
                                    });
                                }
                                if (returndata.length > 0) {
                                    const response2 = await fetch('https://infinity8.io:7007/stripe/cancel-payment', {
                                        method: 'POST', headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json',
                                            'Authorization': `${config.stripe_key}`
                                        },
                                        body: JSON.stringify({
                                            "paymentId": `${returndata[0].payment_id}`
                                        })
                                    });
                                    const data2 = await response2.json();
                                    
                                    await db.query(marketplaceQueries.rejectBid, returndata[0].id);
                                }
                            });

                            //// RETURN OLD BID PAYMENT ENDS
                            await db.query(marketplaceQueries.insertBidTransactionByItemId, [trxdata.insertId], async function (error, dataId) {
                                if (error) {
                                    return res.status(400).send({
                                        success: false,
                                        msg: "Error occured5!!",
                                        error
                                    });
                                }


                                // /*------------------------------- Email Sent */

                                await db.query(marketplaceQueries.getUsersByEmail, [user_id], async function (error, result) {

                                    await db.query(marketplaceQueries.getitems, [item_id], async function (error, data) {


                                        if (error) {
                                            return res.status(400).send({
                                                success: false,
                                                msg: "error occured in UserDetail",
                                                error
                                            });
                                        }
                                        var transporter = nodemailer.createTransport({
                                            host: 'espsofttechnologies.com',
                                            port: 465,
                                            secure: true,
                                            auth: {
                                                user: 'developer@espsofttechnologies.com',
                                                pass: 'Espsoft123#'

                                            },
                                            tls: {
                                                rejectUnauthorized: false
                                            }
                                        });
                                        console.log(result[0].email);
                                        var mailOptions = {
                                            from: 'no-reply@infinity8.io',
                                            to: result[0].email,
                                            subject: 'Bid Status',
                                            html: ` 
    <div style="FONT-FAMILY:Helvetica-Neue,Helvetica,Arial,sans-serif">
        <table cellspacing="0" cellpadding="6" width="100%" style="background:#ffffff">
            <tbody>
                <tr>
                    <td style="border:#ffffff 1px solid">
                        <table cellspacing="0" cellpadding="0" width="640px" style="margin:0 auto" bgcolor="white">
                            <tbody>
                                <tr>
                                    <td>
                                        <table cellspacing="0" cellpadding="0" width="100%">
                                            <tbody>
                                                <tr valign="middle">
                                                    <td colspan="2" align="center" style="text-align:center;width:100%;padding:12px 0px;border-bottom:1px solid #eaeaea">
                                                        <div>
                                                            <a href="#" target="_blank" >
                                                                <img align="left" alt="Infinity 8 Logo" src="http://13.126.99.244/infinity8-admin/images/logo-new.png" width="180" style="max-width:400px;padding-bottom:0;display:inline!important;vertical-align:bottom;border:0;height:auto;outline:none;text-decoration:none" class="CToWUd">
                                                                </a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="2">
                                                            <table style="text-align:left;font-family:'Helvetica Neue',Helvetica,Arial,Geneva,sans-serif;padding-top:20px;color:#37393a" width="100%" cellspacing="0" cellpadding="10" border="0" align="left">
                                                                <tbody>
                                                                    <tr>
                                                                        <td align="center">
                                                                            <span style="font-size:26px;display:block;font-weight:normal;padding:16px 0 8px 0">
                                                      Your bid of  
                                                                                <strong>${amount}</strong>
                                                      was Placed.
                                                      
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="center">
                                                                            <span style="font-size:16px;display:block;font-weight:normal;padding:0">
                                                      Your offer is only valid till  ${data[0].expiry_date} or before you will outbid, and you'll only be charged if your offer is accepted.
                                                      </span>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="center" style="padding:16px">
                                                                            <div>
                                                                                <a href="https://infinity8.io/purchasedetail/${dataId.insertId}" style="background-color:#0d58c8;color:#ffffff;display:inline-block;font-family:'Helvetica Neue',Helvetica,Arial,Geneva,sans-serif;font-size:16px;font-weight:normal;line-height:40px;text-align:center;text-decoration:none;width:200px" target="_blank" >View your Bids</a>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <table width="100%" cellspacing="0" cellpadding="10" style="background:#f8f8f8;margin-top:10px">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td align="center" style="padding:0 0 20px 0">
                                                                                            <table cellspacing="0" cellpadding="0">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td align="center" width="580">
                                                                                                            <div style="text-align:left;font-size:26px;font-weight:400;padding-top:30px">
                                                                                 ${data[0].name}
                                                                              </div>
                                                                                                            <div style="text-align:left;font-size:18px;padding-bottom:30px">
                                                                                 by 
                                                                                                                <a style="color:#808080;text-decoration:none" href="#" target="_blank">${data[0].owner}</a>
                                                                                                            </div>
                                                                                                            <a href="https://infinity8.io/purchasedetail/${dataId.insertId}" target="_blank" >
                                                                                                                <img width="580" src="${config.imageUrl}${data[0].image}" class="CToWUd">
                                                                                                                </a>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td align="center" width="580">
                                                                                                                <table cellpadding="0" cellspacing="0">
                                                                                                                    <tbody>
                                                                                                                        <tr>
                                                                                                                            <td width="580" style="padding-top:10px">
                                                                                                                                <span style="text-align:left;font-size:26px;font-weight:400">
                                                                                          Details
                                                                                          </span>
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td width="580" style="padding-top:6px">
                                                                                                                                <span style="text-align:left;font-size:16px;font-weight:300">
                                                                                          Edition 21 of 35
                                                                                          </span>
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td width="580" style="padding-top:6px">
                                                                                                                                <span style="text-align:left;font-size:16px;font-weight:300">
                                                                                          ${data[0].description}
                                                                                          A gateway to the unknown. Will our 3 little explorers dare to enter?
                                                                                          </span>
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td align="center" style="padding:16px">
                                                                                                                                <div>
                                                                                                                                    <a href="https://infinity8.io/purchasedetail/${dataId.insertId}" style="background-color:#0d58c8;color:#ffffff;display:inline-block;font-family:'Helvetica Neue',Helvetica,Arial,Geneva,sans-serif;font-size:16px;font-weight:normal;line-height:40px;text-align:center;text-decoration:none;width:200px" target="_blank" >View your Bids</a>
                                                                                                                                </div>
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                    </tbody>
                                                                                                                </table>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style="text-align:left">
                                                                                <span style="color:#37393a;font-size:1em;display:block;font-weight:normal;font-family:'Helvetica Neue',Helvetica,Arial,Geneva,sans-serif">— Infinity8 Team</span>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style="text-align:left;padding-top:0">
                                                                                <span style="color:#37393a;font-size:1em;display:block;font-weight:normal;font-family:'Helvetica Neue',Helvetica,Arial,Geneva,sans-serif">Join us on 
                                                                                    <a style="color:#0d58c8" href="#" target="_blank" >Discord</a>&nbsp;&nbsp;
                                                                                    <a style="color:#0d58c8" href="#" target="_blank" >Instagram</a>&nbsp;&nbsp;
                                                                                    <a style="color:#0d58c8" href="#" target="_blank" >Twitter</a>&nbsp;&nbsp;
                                                                                    <a style="color:#0d58c8" href="#" target="_blank" >P
                                                                                        <wbr>interest
                                                                                        </a>&nbsp;&nbsp;
                                                                                        <a style="color:#0d58c8" href="#" target="_blank" >Facebook</a>
                                                                                    </span>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td colspan="2" style="padding:60px 10px;text-align:left;font-size:12px;color:#808080">
                                          Onchain Labs, Inc.
                                                                    <br>
                                          1150 Folsom St, San Francisco, CA 94103
                                                                        <br>
                                                                            <a style="color:#808080" href="#" target="_blank" >Unsubscribe from emails like this.</a>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <img src="https://ci4.googleusercontent.com/proxy/0euvWLzznUAdrrGW6axQu9EsfXL7_6GxTkwJXcHMuspzeRNp8FcjggNNSiY-JGDJ8z4DbOXNQp4KIPTZGVU1rxrMwTDYTuQi_8byNugrg1teFLBDeSl-qzOQlrLf_5J09vckt8nuI2XdYRyBtc51W8-MtkRh6exxSbukw1tjdhyhvMvjDg4Km59N4U3mO6S4-d8_qLLADYjFCESLB7XgLben3uVL4vcgREVoCHPLX6k3tMUx_FICjsmAUoTqIEH2GMf5wgZievaPA2FQOsBv4s_5yQ8C8XOv0k5NOqjY2urKBqyOq4G918U_MsrE-E3O0QXlCZiNFMR4DS4XsZfIO7jkNZNjY1fmhbbJ5FmqHSpFOVjPj-L0nDeH1Aa9yyLBjJ8RUt5mreprdNhk7hv3wgqbGqA6IEDjln3sjelbl0HCClCvviJF3ImLBwtYrS_qya6aceNru1Yu8h5K36tjqdlYk05fH1VZgaFH2SnzfmoMSRZh6_24w61qjJmllDy5lyanOd0W7ata=s0-d-e1-ft#http://url7878.makersplace.com/wf/open?upn=-2BPV2hBq-2FD7DUfRz313ixDR4OP7mK3ScXbRYQPgG4McsDWBvGxOavCkt0egDMf4b2MzJOqSn6f8bSm0zGobt5IGcNocHC4GA5YoQaHHfw1RO7GmjU08o22B1HLW-2Fq-2FN3jJKNDg1SS-2BSCtQWUppObUIwIZAn1dnxWCpXLKq7tqll-2B8rhp45PZ-2FNrigL7mTnNsMQJBbqpQ-2F1l39X0wIMXhjb-2B-2BPdbUuwbBmXLgH4uU4sqgvdtK88KY3UvGN12jSTb-2FB-2BSps-2FmbaghPBh0Pipfp5DQL4Qmdp-2BJ9AzYB2PBiDsEc-3D" alt="" width="1" height="1" border="0" style="height:1px!important;width:1px!important;border-width:0!important;margin-top:0!important;margin-bottom:0!important;margin-right:0!important;margin-left:0!important;padding-top:0!important;padding-bottom:0!important;padding-right:0!important;padding-left:0!important" class="CToWUd">
                                <font color="#888888"></font>
                            </div>`
                                        };

                                        transporter.sendMail(mailOptions, function (error, info) {
                                            if (error) {
                                                console.log(error);
                                            } else {
                                                console.log('Email sent: ' + info.response);
                                            }
                                        });

                                    });

                                });
                                // ------------------------------------------------------


                                await db.query(marketplaceQueries.updateTrxidInBid, [dataId.insertId, trxdata.insertId]);
                                return res.status(200).send({
                                    success: true,
                                    msg: "Placed bid successfully",
                                    transaction_id: dataId.insertId
                                });
                            }
                            )
                        }
                    })

                }
            }
        });
    }
    catch (err) {
        console.log(err)
        return res.status(400).send({
            success: false,
            msg: "Unexpected internal error!!",
            err
        });
    }
}

/* ---------------------------  STRIPE PAYMENT GATEWAY IMPLEMENTATION ---------------*/

exports.charge2 = async (db, req, res) => {
    //exports.getfaq= async (db,req,res)=>{
    //app.post("/stripe/charge", cors(), async (req, res) => {
    //console.log("stripe-routes.js 9 | route reached", req.body);
    //let { amount, id } = req.body;

    var amount = req.body.amount
    var id = req.body.id
    //console.log("stripe-routes.js 10 | amount and id", amount, id);
    try {
        var customer = await stripe.customers.create({
            name: 'Jenny Rosen',
            address: {
                line1: '510 Townsend St',
                postal_code: '98140',
                city: 'San Francisco',
                state: 'CA',
                country: 'US',
            }
        });
        //console.log('customer.id', customer.id)
        const payment = await stripe.paymentIntents.create({
            customer: customer.id,
            amount: amount,
            currency: "USD",
            description: "Your Company Description",
            payment_method: id,
            confirm: true,
        });
        //console.log("stripe-routes.js 19 | payment", payment);
        res.json({
            message: "Payment Successful",
            success: true,
        });
    } catch (error) {
        //console.log("stripe-routes.js 17 | error", error);
        res.json({
            message: "Payment Failed",
            success: false,
            error: error,
        });
    }
};
/* ----------------------------------------------------------------------------------*/

exports.stripe_success = async (db, req, res) => {

    var user_id = req.body.user_id;
    var item_edition_id = req.body.item_edition_id;
    var item_id = req.body.item_id;
    var bid_price = req.body.bid_price;
    var sell_type = req.body.sell_type;

    //     if(!user_id){
    //         res.status(400).send({
    //             success : false,
    //             msg : "user_id required!!"
    //         });
    //     }
    //     if(!item_edition_id){
    //         res.status(400).send({
    //             success : false,
    //             msg : "item_edition_id required!!"
    //         });
    //     }
    //     if(!item_id){
    //         res.status(400).send({
    //             success : false,
    //             msg : "item_id required!!"
    //         });
    //     } if(!bid_price){
    //         res.status(400).send({
    //             success : false,
    //             msg : "bid_price required!!"
    //         });
    //     } if(!sell_type){
    //         res.status(400).send({
    //             success : false,
    //             msg : "sell_type required!!"
    //         });
    //     }
    //     if(sell_type==='Price'){
    //         await db.query(marketplaceQueries.getWalletDetail,[user_id],async function(error,walletDetail){
    //             if(error){
    //             return res.status(400).send({
    //             success: false,
    //         msg: "error occured in getWalletDetail",
    //             error
    //         });
    //             }
    //             await db.query(marketplaceQueries.updateSold,[1,user_id,item_edition_id], async function(error,data){
    //                 if(error){
    //      return res.status(400).send({
    //                 success: false,
    //             msg: "error occured in udpateSold",
    //                       error
    //                    });
    //              }
    //             })

    //             await db.query(marketplaceQueries.insertBuyTransactionByItemId,[item_edition_id], async function(error,data){
    //                 if(error){
    //      return res.status(400).send({
    //                 success: false,
    //             msg: "error occured in udpateSold",
    //                       error
    //                    });
    //              }
    //             })

    //         var publickey=walletDetail[0].public;
    //         //console.log("public Key");
    //       //  console.log(publickey);
    //                 /* run ownership changes api */
    //                 const response1 = await fetch(`${config.blockchainApiUrl}transfer`,{ method:'POST', headers: {
    //                     'Accept': 'application/json',
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify( {
    //                     "from_address": `${config.contractOwnerAddress}`,
    //                     "from_private_key": `${config.contractOwnerPrivateKey}`,
    //                     "contract_address": `${config.contractAddress}`,
    //                     "to_address": `${publickey}`,
    //                     "tokenId": item_id,
    //                     "amount": 1
    //                 })
    //                 });
    //                 const data1 = await response1.json();
    //             //    console.log(data1);
    //                 if(!data1.hash){
    //                     return res.status(400).send({
    //                         success: false,
    //                         msg: "error occured in ownership transfer",
    //                         apidata : data1
    //                     });
    //                 }
    //             //    console.log(data1.hash);
    //                 await db.query(marketplaceQueries.updateTransferHash,[data1.hash,item_edition_id], async function(error,data){
    //                     if(error){
    //          return res.status(400).send({
    //                     success: false,
    //                 msg: "Error occured in updateTransferHash!!",
    //                           error
    //                        });
    //                  }
    //                 })

    //                 /* end ownership change api */
    //             })
    //             res.status(200).send({
    //                 success:true,
    //         msg : "Ownership changed successfully",

    //         });
    //         }
    //         else{



    // /*------------------------------- Email Sent */


    //  db.query(marketplaceQueries.getitemBy,[item_id],async function(error,result){

    //  var data = await  db.query(marketplaceQueries.getUsersByEmail,[user_id])

    //     if(error){
    //     return res.status(400).send({
    //     success: false,
    // msg: "error occured in UserDetail",
    //     error
    // });
    //     }


    // var transporter = nodemailer.createTransport({
    //     host: 'espsofttechnologies.com',
    //     port:465,
    //     secure: true,
    //     auth: {
    //       user: 'developer@espsofttechnologies.com',
    //       pass:  'Espsoft123#'
    //     },
    //     tls: {
    //         rejectUnauthorized: false
    //     }
    //   });


    // var mailOptions = {
    // from: 'no-reply@infinity8.io',
    // to: data[0].email,
    // subject: 'Bid On this item',
    // html : `  <div style="FONT-FAMILY:Helvetica-Neue,Helvetica,Arial,sans-serif">
    // <table cellspacing="0" cellpadding="6" width="100%" style="background:#ffffff">
    //    <tbody>
    //       <tr>
    //          <td style="border:#ffffff 1px solid">
    //             <table cellspacing="0" cellpadding="0" width="640px" style="margin:0 auto" bgcolor="white">
    //                <tbody>
    //                   <tr>
    //                      <td>
    //                         <table cellspacing="0" cellpadding="0" width="100%">
    //                            <tbody>
    //                               <tr valign="middle">
    //                                  <td colspan="2" align="center" style="text-align:center;width:100%;padding:12px 0px;border-bottom:1px solid #eaeaea">
    //                                     <div><a href="#" target="_blank" ><img align="left" alt="MakersPlace Logo" src="https://ci6.googleusercontent.com/proxy/YkfORi10H1b77f9VCRO8EjkzzrpXzQxzFiH__voSSA64eyQyBGnMfhfwX_XHjTL2q-HdU-PzZy2M4ZiPa-LCRjjCNg=s0-d-e1-ft#https://makersplace.com/static/img/logo-main.png" width="180" style="max-width:400px;padding-bottom:0;display:inline!important;vertical-align:bottom;border:0;height:auto;outline:none;text-decoration:none" class="CToWUd"></a></div>
    //                                  </td>
    //                               </tr>
    //                               <tr>
    //                                  <td colspan="2">
    //                                     <table style="text-align:left;font-family:'Helvetica Neue',Helvetica,Arial,Geneva,sans-serif;padding-top:20px;color:#37393a" width="100%" cellspacing="0" cellpadding="10" border="0" align="left">
    //                                        <tbody>
    //                                           <tr>
    //                                              <td align="center">
    //                                                 <span style="font-size:26px;display:block;font-weight:normal;padding:16px 0 8px 0">
    //                                                 Your bid of <strong>$${bid_price}</strong>
    //                                                 was placed.
    //                                                 </span>
    //                                              </td>
    //                                           </tr>
    //                                           <tr>
    //                                              <td align="center">
    //                                                 <span style="font-size:16px;display:block;font-weight:normal;padding:0">
    //                                                 Your offer is only valid for ${result[0].expiry_date} days, and you'll only be charged if your offer is accepted.
    //                                                 </span>
    //                                              </td>
    //                                           </tr>
    //                                           <tr>
    //                                              <td align="center" style="padding:16px">
    //                                                 <div><a href="#" style="background-color:#0d58c8;color:#ffffff;display:inline-block;font-family:'Helvetica Neue',Helvetica,Arial,Geneva,sans-serif;font-size:16px;font-weight:normal;line-height:40px;text-align:center;text-decoration:none;width:200px" target="_blank" >View your Bids</a></div>
    //                                              </td>
    //                                           </tr>
    //                                           <tr>
    //                                              <td>
    //                                                 <table width="100%" cellspacing="0" cellpadding="10" style="background:#f8f8f8;margin-top:10px">
    //                                                    <tbody>
    //                                                       <tr>
    //                                                          <td align="center" style="padding:0 0 20px 0">
    //                                                             <table cellspacing="0" cellpadding="0">
    //                                                                <tbody>
    //                                                                   <tr>
    //                                                                      <td align="center" width="580">
    //                                                                         <div style="text-align:left;font-size:26px;font-weight:400;padding-top:30px">
    //                                                                           ${result[0].name}
    //                                                                         </div>
    //                                                                         <div style="text-align:left;font-size:18px;padding-bottom:30px">
    //                                                                            by <a style="color:#808080;text-decoration:none" href="#" target="_blank">${result[0].owner}</a>
    //                                                                         </div>
    //                                                                         <a href="#" target="_blank" ><img width="580" src="${config.imageUrl}${result[0].image}" class="CToWUd"></a>
    //                                                                      </td>
    //                                                                   </tr>
    //                                                                   <tr>
    //                                                                      <td align="center" width="580">
    //                                                                         <table cellpadding="0" cellspacing="0">
    //                                                                            <tbody>
    //                                                                               <tr>
    //                                                                                  <td width="580" style="padding-top:10px">
    //                                                                                     <span style="text-align:left;font-size:26px;font-weight:400">
    //                                                                                     Details
    //                                                                                     </span>
    //                                                                                  </td>
    //                                                                               </tr>
    //                                                                               <tr>
    //                                                                                  <td width="580" style="padding-top:6px">
    //                                                                                     <span style="text-align:left;font-size:16px;font-weight:300">
    //                                                                                     Edition 21 of 35
    //                                                                                     </span>
    //                                                                                  </td>
    //                                                                               </tr>
    //                                                                               <tr>
    //                                                                                  <td width="580" style="padding-top:6px">
    //                                                                                     <span style="text-align:left;font-size:16px;font-weight:300">
    //                                                                                     ${result[0].description}
    //                                                                                     A gateway to the unknown. Will our 3 little explorers dare to enter?
    //                                                                                     </span>
    //                                                                                  </td>
    //                                                                               </tr>
    //                                                                               <tr>
    //                                                                                  <td align="center" style="padding:16px">
    //                                                                                     <div><a href="#" style="background-color:#0d58c8;color:#ffffff;display:inline-block;font-family:'Helvetica Neue',Helvetica,Arial,Geneva,sans-serif;font-size:16px;font-weight:normal;line-height:40px;text-align:center;text-decoration:none;width:200px" target="_blank" >View your Bids</a></div>
    //                                                                                  </td>
    //                                                                               </tr>
    //                                                                            </tbody>
    //                                                                         </table>
    //                                                                      </td>
    //                                                                   </tr>
    //                                                                </tbody>
    //                                                             </table>
    //                                                          </td>
    //                                                       </tr>
    //                                                    </tbody>
    //                                                 </table>
    //                                              </td>
    //                                           </tr>
    //                                           <tr>
    //                                              <td style="text-align:left">
    //                                                 <span style="color:#37393a;font-size:1em;display:block;font-weight:normal;font-family:'Helvetica Neue',Helvetica,Arial,Geneva,sans-serif">— MakersPlace Team</span>
    //                                              </td>
    //                                           </tr>
    //                                           <tr>
    //                                              <td style="text-align:left;padding-top:0">
    //                                                 <span style="color:#37393a;font-size:1em;display:block;font-weight:normal;font-family:'Helvetica Neue',Helvetica,Arial,Geneva,sans-serif">Join us on <a style="color:#0d58c8" href="#" target="_blank" >Discord</a>&nbsp;&nbsp;<a style="color:#0d58c8" href="#" target="_blank" >Instagram</a>&nbsp;&nbsp;<a style="color:#0d58c8" href="#" target="_blank" >Twitter</a>&nbsp;&nbsp;<a style="color:#0d58c8" href="#" target="_blank" >P<wbr>interest</a>&nbsp;&nbsp;<a style="color:#0d58c8" href="#" target="_blank" >Facebook</a></span>
    //                                              </td>
    //                                           </tr>
    //                                        </tbody>
    //                                     </table>
    //                                  </td>
    //                               </tr>
    //                               <tr>
    //                                  <td colspan="2" style="padding:60px 10px;text-align:left;font-size:12px;color:#808080">
    //                                     Onchain Labs, Inc.<br>
    //                                     1150 Folsom St, San Francisco, CA 94103<br>
    //                                     <a style="color:#808080" href="#" target="_blank" >Unsubscribe from emails like this.</a>
    //                                  </td>
    //                               </tr>
    //                            </tbody>
    //                         </table>
    //                      </td>
    //                   </tr>
    //                </tbody>
    //             </table>
    //          </td>
    //       </tr>
    //    </tbody>
    // </table>
    // <img src="https://ci4.googleusercontent.com/proxy/0euvWLzznUAdrrGW6axQu9EsfXL7_6GxTkwJXcHMuspzeRNp8FcjggNNSiY-JGDJ8z4DbOXNQp4KIPTZGVU1rxrMwTDYTuQi_8byNugrg1teFLBDeSl-qzOQlrLf_5J09vckt8nuI2XdYRyBtc51W8-MtkRh6exxSbukw1tjdhyhvMvjDg4Km59N4U3mO6S4-d8_qLLADYjFCESLB7XgLben3uVL4vcgREVoCHPLX6k3tMUx_FICjsmAUoTqIEH2GMf5wgZievaPA2FQOsBv4s_5yQ8C8XOv0k5NOqjY2urKBqyOq4G918U_MsrE-E3O0QXlCZiNFMR4DS4XsZfIO7jkNZNjY1fmhbbJ5FmqHSpFOVjPj-L0nDeH1Aa9yyLBjJ8RUt5mreprdNhk7hv3wgqbGqA6IEDjln3sjelbl0HCClCvviJF3ImLBwtYrS_qya6aceNru1Yu8h5K36tjqdlYk05fH1VZgaFH2SnzfmoMSRZh6_24w61qjJmllDy5lyanOd0W7ata=s0-d-e1-ft#http://url7878.makersplace.com/wf/open?upn=-2BPV2hBq-2FD7DUfRz313ixDR4OP7mK3ScXbRYQPgG4McsDWBvGxOavCkt0egDMf4b2MzJOqSn6f8bSm0zGobt5IGcNocHC4GA5YoQaHHfw1RO7GmjU08o22B1HLW-2Fq-2FN3jJKNDg1SS-2BSCtQWUppObUIwIZAn1dnxWCpXLKq7tqll-2B8rhp45PZ-2FNrigL7mTnNsMQJBbqpQ-2F1l39X0wIMXhjb-2B-2BPdbUuwbBmXLgH4uU4sqgvdtK88KY3UvGN12jSTb-2FB-2BSps-2FmbaghPBh0Pipfp5DQL4Qmdp-2BJ9AzYB2PBiDsEc-3D" alt="" width="1" height="1" border="0" style="height:1px!important;width:1px!important;border-width:0!important;margin-top:0!important;margin-bottom:0!important;margin-right:0!important;margin-left:0!important;padding-top:0!important;padding-bottom:0!important;padding-right:0!important;padding-left:0!important" class="CToWUd"><font color="#888888">
    // </font>
    // </div>`
    // };

    // transporter.sendMail(mailOptions, function(error, info){
    // if (error) {
    // //   console.log(error);
    // } else {
    // console.log('Email sent: ' + info.response);
    // }
    // });

    // });
    // /*-------------------------------  */

    //             var insertData={
    //                 "user_id":user_id,
    //                 "item_edition_id": item_edition_id,
    //                 "bid_price": bid_price
    //             }
    //         await db.query(marketplaceQueries.insertBid,[insertData],async function(error,trxdata){
    //                     if(error){
    //         return res.status(400).send({
    //                     success: false,
    //                 msg: "error occured in place bid",
    //                     error
    //                 });
    //                     }
    //                     else{
    //                         await db.query(marketplaceQueries.insertBidTransactionByItemId,[trxdata.insertId])
    //                         return res.status(200).send({
    //                             success: true,
    //                         msg: "Placed bid successfully",
    //                             error
    //                         });
    //                     }
    //                 })
    //             }
}

exports.getUserPurchase = async (db, req, res) => {
    var user_id = req.body.user_id

    await db.query(marketplaceQueries.getWalletDetail,[user_id],async function (error, walletData) {
    await db.query(marketplaceQueries.getSettingData,async function (error, settingData) {
    await db.query(marketplaceQueries.getUserPurchase, [user_id],async function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        if (data.length > 0) {
            const response2 = await fetch('https://api.coinbase.com/v2/prices/ETH-USD/buy', {
                method: 'GET', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            const usdPrice = await response2.json();
            
            res.status(200).send({
                success: true,
                msg: "User purchase detail",
                resale_charges : (settingData[0].resale_charges).toFixed(2),
                resale_charges_eth : (settingData[0].resale_charges/usdPrice['data']['amount']).toFixed(6),
                wallet_balance_usd : walletData[0].balance,
                wallet_balance_eth : walletData[0].balance/usdPrice['data']['amount'],
                response: data
            });
        } else {
            res.status(400).send({
                success: false,
                msg: "Something Wrong due to internal Error"
            });
        }
    });
});
    });
}

exports.getUserSale = async (db, req, res) => {

    var user_id = req.body.user_id

    await db.query(marketplaceQueries.getUserSale, [user_id, user_id], function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        if (data.length > 0) {
            res.status(200).send({
                success: true,
                msg: "User Sale detail",
                response: data
            });
        } else {
            res.status(400).send({
                success: false,
                msg: "Something Wrong due to internal Error"
            });
        }
    });
}

exports.myBidItem = async (db, req, res) => {
    var user_id = req.body.user_id
    await db.query(marketplaceQueries.myBidItem, [user_id], function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        if (data.length > 0) {
            res.status(200).send({
                success: true,
                msg: "Item bid detail!!",
                response: data
            });
        } else {
            res.status(400).send({
                success: false,
                msg: "No data found!!"
            });
        }
    });
}

exports.allCategoryItem = async (db, req, res) => {
    //var user_id = req.body.user_id


    let i = 0;
    const [result, fields] = await promisePool.query(marketplaceQueries.getDigitalCategory);
    let MainArr1 = [];
    for (const item of result) {
        let MainArr = {
            category: '',
            data: ''
        };
        const [result1, fields1] = await promisePool.query(marketplaceQueries.allCategoryItem, [item.id, 5]);

        MainArr.category = item.name;
        MainArr.data = result1;
        await MainArr1.push(MainArr);
        i++;
    }
    await db.query(marketplaceQueries.getUpcomingNft, 5, function (error, data3) {

        let MainArr2 = {
            category: '',
            data: ''
        };
        MainArr2.category = 'Upcoming';
        MainArr2.data = data3;
        MainArr1.push(MainArr2);

        if (result.length == i) {
            if (MainArr1.length > 0) {
                res.status(200).send({
                    success: true,
                    msg: "Item bid detail!!",
                    response: MainArr1
                });
            } else {
                return res.status(400).send({
                    success: false,
                    msg: "No data found!!"
                });
            }

        }
    });
}

exports.getRecentWorks = async (db, req, res) => {

    await db.query(marketplaceQueries.getRecentWorks, function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        if (data.length > 0) {
            res.status(200).send({
                success: true,
                msg: "Recent works details",
                response: data
            });
        } else {
            res.status(400).send({
                success: false,
                msg: "Something Wrong due to internal Error"
            });
        }
    });
}

exports.allTalentList = async (db, req, res) => {
    await db.query(marketplaceQueries.allTalentList1, async function (error, circle) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        await db.query(marketplaceQueries.allTalentList2, function (error, square) {
            if (error) {
                return res.status(400).send({
                    success: false,
                    msg: "Error occured!!",
                    error
                });
            }
            if (circle.length > 0) {
                res.status(200).send({
                    success: true,
                    circle: circle,
                    square: square

                });

            }
            else {
                res.status(400).send({
                    success: false,
                    msg: "No Data"
                });
            }
        });
    });
}

exports.rejectBid = async (db, req, res) => {

    var bid_id = req.body.bid_id;

    await db.query(marketplaceQueries.updateTransactionStatus, [bid_id]);
    await db.query(marketplaceQueries.rejectBid, [bid_id], function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        if (data) {
            res.status(200).send({
                success: true,
                msg: "Your bid has been rejected!! "
            });
        } else {
            res.status(200).send({
                success: false,
                msg: "Deletion Failed"
            });
        }
    });
}


exports.itemView = async (db, req, res) => {
    var user_id = req.body.user_id;
    var item_edition_id = req.body.item_edition_id;

    if (!user_id) {
        res.status(400).send({
            success: false,
            msg: "user_id required!!"
        });
    }
    if (!item_edition_id) {
        res.status(400).send({
            success: false,
            msg: "item_edition_id required!!"
        });
    }
    var views = {
        "user_id": user_id,
        'item_edition_id': item_edition_id
    }

    await db.query(marketplaceQueries.itemView, [views], function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        if (data) {
            res.status(200).send({
                success: true,
                msg: "Insert item view successfully!!",
            });
        } else {
            res.status(400).send({
                success: false,
                msg: "Error in insertion!!"
            });
        }
    });
}

exports.likeItem = async (
    db, req, res) => {
    //required fields
    var user_id = req.body.user_id;
    var item_edition_id = req.body.item_edition_id;
    if (!user_id) {
        return res.status(400).send({
            success: false,
            msg: "user_id required!!"
        });
    }

    if (!item_edition_id) {
        return res.status(400).send({
            success: false,
            msg: "item_edition_id required!!"
        });
    }

    var itemlike = {
        "item_edition_id": item_edition_id,
        "user_id": user_id
    }
    await db.query(marketplaceQueries.getItemLike, [item_edition_id, user_id], async function (err, result1) {

        if (err) {
            return res.status(400).send({
                success: false,
                msg: "error occured",
                err
            });
        }
        if (result1.length > 0) {
            await db.query(marketplaceQueries.deleteItemLike, [item_edition_id, user_id], async function (err, result) {

                if (err) {
                    return res.status(400).send({
                        success: false,
                        msg: err
                    });
                }
            });
            return res.status(200).send({
                success: true,
                msg: "Like removed!!",
                err
            });
        }
        else {
            await db.query(marketplaceQueries.insertItemLike, itemlike, async function (err, result2) {

                if (err) {
                    return res.status(400).send({
                        success: false,
                        msg: err
                    });

                }
                return res.status(200).send({
                    success: true,
                    msg: "Item liked successfully!!",
                    err
                });
            })
        }
    });

}

exports.getItemLikeCount = async (db, req, res) => {

    var item_edition_id = req.body.item_edition_id
    var user_id = req.body.user_id

    await db.query(marketplaceQueries.getItemLikeCount, [user_id, item_edition_id], function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        if (data.length > 0) {
            res.status(200).send({
                success: true,
                msg: "Item like count",
                response: data[0]
            });
        } else {
            res.status(400).send({
                success: false,
                msg: "Something Wrong due to internal Error"
            });
        }
    });
}

exports.userWithdraw = async (db, req, res) => {

    var user_id = req.body.user_id;
    var amount = req.body.amount;
    var amount_usd = req.body.amount_usd;
    var address = req.body.address;
    var datetime = new Date();

    if(!user_id){
        res.status(400).send({
            success : false,
            msg : "user_id required!!"
        });
    }
    if(!amount){
        res.status(400).send({
            success : false,
            msg : "amount required!!"
        });
    }
    if(!amount_usd){
        res.status(400).send({
            success : false,
            msg : "amount_usd required!!"
        });
    }
    if(!address){
        res.status(400).send({
            success : false,
            msg : "address required!!"
        });
    }

    await db.query(marketplaceQueries.adminWallet, async function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "error occured",
                error
            });
        }

        await db.query(marketplaceQueries.userWallet, [user_id], async function (error, data1) {
            if (error) {
                return res.status(400).send({
                    success: false,
                    msg: "error occured",
                    error
                });
            }

            const response1 = await fetch(`${config.ethTransferApiUrl}`, {
                method: 'POST', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "from_address": data[0].public, //Admin Public Address
                    "from_private_key": data[0].private,  //Admin Private Address
                    "to_address": address, //User To Address        
                    "value": amount
                })

            });
            const data2 = await response1.json();


            if (!data2.hash) {

                return res.status(400).send({
                    success: false,
                    msg: "error occured in ownership transfer",
                    apidata: data2
                });
            }
            var transaction = {
                user_id: user_id,
                transaction_type_id: "3",
                from_address: data[0].public,//Admin From Address
                to_address: address, // User To Address
                hash: data2.hash,
                amount: amount_usd * -1,
                status:1,
                datetime: datetime,
                currency: "USD"
            }

            await db.query(marketplaceQueries.insertTransaction, transaction)

            if (data1) {
                res.status(200).send({
                    success: true,
                    msg: "User Withdraw Succesfull",

                });
            } else {
                res.status(400).send({
                    success: false,
                    msg: "User withdrawal Error"
                });
            }
        });
    });
}

exports.insertContact = async (db, req, res) => {

    var name = req.body.name;
    var email = req.body.email;
    var subject = req.body.subject;
    var comments = req.body.comments;
    var ip = req.body.ip;
    var datetime = new Date();

    var contact_us = {
        "name": name,
        "email": email,
        "subject": subject,
        "comments": comments,
        "ip": ip,
        "datetime": datetime
    }
    await db.query(marketplaceQueries.insertContacts, [contact_us], function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        if (data) {
            res.status(200).send({
                success: true,
                msg: "Your request has been updated Successfully, admin will contact you soon!!",
            });
        } else {
            res.status(400).send({
                success: false,
                msg: "Something Wrong due to internal Error"
            });
        }
    });
}


exports.getContact = async (db, req, res) => {

    await db.query(marketplaceQueries.getContact, function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        if (data.length > 0) {
            res.status(200).send({
                success: true,
                msg: "Contacts Records",
                response: data
            });
        } else {
            res.status(200).send({
                success: false,
                msg: "No data found!!"
            });
        }
    });
}



exports.transactionDetail = async (db, req, res) => {

    var transaction_id = req.body.transaction_id

    await db.query(marketplaceQueries.getTransactionDetail, [transaction_id], async function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        if (data.length > 0) {
            res.status(200).send({
                success: true,
                msg: "Transactions Detail",
                response: data[0]
            });
        } else {
            await db.query(marketplaceQueries.getTransactionDetail1, [transaction_id], function (error, data1) {
                if (error) {
                    return res.status(400).send({
                        success: false,
                        msg: "Error occured!!",
                        error
                    });
                }

                res.status(200).send({
                    success: true,
                    msg: "Transactions Detail",
                    response: data1[0]
                });
            });

        }
    });
}


exports.testmail = async (db, req, res) => {

    var email = req.body.email;
    //         Username: info@infinity8.io
    // Pass: fiyaz@2021
    console.log(email);
    var transporter = nodemailer.createTransport({
        // host: 'smtp.gmail.com',
        // port:465,
        // secure: true,
        // auth: {
        //   user: 'info@infinity8.io',
        //   pass:  'fiyaz@2021'

        // },
        // ssl:true
        // // tls: {
        // //     rejectUnauthorized: false
        // // }
        host: 'espsofttechnologies.com',
        port: 465,
        secure: true,
        auth: {
            user: 'developer@espsofttechnologies.com',
            pass: 'Espsoft123#'

        },
    });

    var mailOptions = {
        from: 'no-reply@infinity8.io',
        to: email,
        subject: 'test',
        html: "This is a test mail"
    };

    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        } else {
            console.log('Email sent: ' + info.response);
            return res.status(200).send({
                success: true,
                msg: "Transactions Detail",

            });

        }

    });

    //  return res.status(200).send({
    //     success:true,
    //     msg : "done!!!",

    //  });
}



exports.updatePayoutAddress = async (db, req, res) => {
    var user_id = req.body.user_id;
    var payout_address = req.body.payout_address;

    var updateData = {
        "payout_address": payout_address
    }

    await db.query(marketplaceQueries.updatePayoutAddress, [updateData, user_id], function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        if (data) {
            res.status(200).send({
                success: true,
                msg: "Payout address updated!!",

            });
        } else {
            res.status(400).send({
                success: false,
                msg: "Something Wrong due to internal Error"
            });
        }
    });
}


exports.getPayoutAddress = async (db, req, res) => {

    var user_id = req.body.user_id

    await db.query(marketplaceQueries.getPayout_address, [user_id], function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        //console.log(data);
        if (data.length > 0) {
            res.status(200).send({
                success: true,
                msg: "Payout Address!!",
                response: data[0]
            });
        } else {
            res.status(400).send({
                success: false,
                msg: "Something Wrong due to internal Error"
            });
        }
    });
}

exports.setPayoutAddress = async (db, req, res) => {

    var user_id = req.body.user_id
    var address = req.body.address
    var arr = {
        'public' : address,
        'user_id' : user_id
    }
    console.log(arr);
    await db.query(marketplaceQueries.setPayoutAddress, arr, function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }else{
            res.status(200).send({
                success: true,
                msg: "Payout Address!!"
            });
        }
    });
}


exports.getRoyaltyList = async (db, req, res) => {

    await db.query(marketplaceQueries.getRoyaltyList,async function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        //console.log(data);
        if (data.length > 0) {
            const response2 = await fetch('https://api.coinbase.com/v2/prices/ETH-USD/buy', {
                method: 'GET', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            const usdPrice = await response2.json();
            
            res.status(200).send({
                success: true,
                msg: "Royalty List!!",
                ETH_price :usdPrice['data']['amount'],
                response: data
            });
        } else {
            res.status(400).send({
                success: false,
                msg: "Something Wrong due to internal Error"
            });
        }
    });
}

exports.getRoyaltyTransaction = async (db, req, res) => {
    var user_id = req.body.user_id;
    await db.query(marketplaceQueries.getRoyaltyTransaction, [user_id], function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        if (data.length > 0) {
            res.status(200).send({
                success: true,
                msg: "Royalty transaction details!!",
                response: data
            });
        } else {
            res.status(400).send({
                success: false,
                msg: "No data found!!"
            });
        }
    });
}


exports.getWalletTransaction = async (db, req, res) => {
    var user_id = req.body.user_id;
    await db.query(marketplaceQueries.getWalletTransaction, [user_id],async function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        if (data.length > 0) {
            const response2 = await fetch('https://api.coinbase.com/v2/prices/ETH-USD/buy', {
                method: 'GET', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            const usdPrice = await response2.json();
            
            res.status(200).send({
                success: true,
                msg: "Wallet transaction details!!",
                eth_usd_price : usdPrice['data']['amount'],
                response: data
            });
        } else {
            res.status(400).send({
                success: false,
                msg: "No data found!!"
            });
        }
    });
}

exports.getPayoutAddress = async (db, req, res) => {
    var user_id = req.body.user_id;
    await db.query(marketplaceQueries.getPayout_address, [user_id],async function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        if (data.length > 0) {
           
            res.status(200).send({
                success: true,
                msg: "Wallet transaction details!!",
                response: data
            });
        } else {
            res.status(200).send({
                success: false,
                msg: "No data found!!"
            });
        }
    });
}


exports.resaleNFT = async (db, req, res) => {
    var item_edition_id = req.body.item_edition_id;
    var price = req.body.price;
    var price_eth = req.body.price_eth;
    var expiry_date = req.body.expiry_date;
    var hash = req.body.hash;
    var user_address = req.body.user_address

    var updateData = {
        "price": price,
        "expiry_date": expiry_date,
        "end_date": expiry_date,
        "is_sold": 0,
        "resale_hash": hash,
        "user_address":user_address,
        "start_date": new Date()
    }

    await db.query(marketplaceQueries.resaleNFT, [updateData, item_edition_id],async function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        if (data) {
            
            const response1 = await fetch(`${config.ethTransferApiUrl}`, {
                method: 'POST', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "from_address": config.contractOwnerAddress, //Admin Public Address
                    "from_private_key": config.contractOwnerPrivateKey,  //Admin Private Address
                    "to_address": user_address, //User To Address        
                    "value": price_eth
                })
            });

            res.status(200).send({
                success: true,
                msg: "NFT has been published for resale!",
                item_edition_id : item_edition_id

            });
        } else {
            res.status(400).send({
                success: false,
                msg: "Something Wrong due to internal Error!"
            });
        }
    });
}


exports.getContractDeatils = async (db, req, res) => {

    res.status(200).send({
        success: true,
        msg: "Contract details!!",
        adminAddress: config.contractOwnerAddress,
        contractAddress: config.contractAddress,
        blockchainNetwork: config.blockchainNetwork
    });

}


exports.getMarketActivity = async (db, req, res) => {
    var item_id = req.body.item_id;
    await db.query(marketplaceQueries.getMarketActivity, [item_id], function (error, data) {
        if (error) {
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
        if (data.length > 0) {
            res.status(200).send({
                success: true,
                msg: "Activity details!!",
                response: data
            });
        } else {
            res.status(400).send({
                success: false,
                msg: "No data found!!"
            });
        }
    });
}


exports.purchaseNft = async (db, req, res) => {

    var nftid = req.body.nftid;
    var toAddress = req.body.toAddress;
    var remainingAmount = req.body.remainingAmount;
    var user_id = req.body.user_id;
    var item_edition_id = req.body.item_edition_id;
    var amount = req.body.amount;
    var seller_id = req.body.seller_id;
    var trxHash = req.body.trxHash;

    var ownerTransferArr = JSON.stringify({
        "from_address": `${config.contractOwnerAddress}`,
        "from_private_key": `${config.contractOwnerPrivateKey}`,
        "contract_address": `${config.contractAddress}`,
        "to_address": `${toAddress}`,
        "token_owner_address": `${config.contractOwnerAddress}`,
        "tokenId": nftid+'3000',
        "amount": 1
    })

    console.log(ownerTransferArr);

    const response1 = await fetch(`${config.blockchainApiUrl}transfer`, {
        method: 'POST', headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: ownerTransferArr
    });
    const data1 = await response1.json();
    console.log(data1);
    if(data1.hash){
        var arr = {
            'transfer_hash' : data1.hash,
            'owner_id' : user_id,
            'is_sold' : 1,
            'payment_hash' : trxHash
        }
        await db.query(marketplaceQueries.updateItem, [arr, nftid], async function (error, data) {
            if (error) {
                return res.status(400).send({
                    success: false,
                    msg: "Error occured updateItemBid!!",
                    error
                });
            }else{

                var updateData1 = {
                    "transfer_hash": data1.hash,
                    'owner_id' : user_id
                }
                await db.query(marketplaceQueries.itemEditionUpdate, [updateData1, nftid], async function (error, datalimited) {

                })

                var updateWalletData = {
                    "balance": remainingAmount
                }
                await db.query(marketplaceQueries.updateWalletBalance, [updateWalletData, user_id], async function (error, dataWallet) {

                })   
                
                transactionArr = {
                    'user_id' : user_id,
                    'item_id' : nftid,
                    'item_edition_id' : item_edition_id,
                    'transaction_type_id' : 6,
                    'amount' : amount,
                    'currency' : 'USD',
                    'status' : 1,
                    'user_address' : toAddress

                }

                await db.query(marketplaceQueries.insertTransaction, [transactionArr], async function (error, data) {

                })

                var samount = amount*0.7
                sellerTransactionArr = {
                    'user_id' : seller_id,
                    'item_id' : nftid,
                    'item_edition_id' : item_edition_id,
                    'transaction_type_id' : 1,
                    'amount' : samount,
                    'currency' : 'USD',
                    'status' : 1,
                    'user_address' : toAddress

                }

                await db.query(marketplaceQueries.insertTransaction, [sellerTransactionArr], async function (error, data) {

                })                

                return res.status(200).send({
                    success: true,
                    msg: "NFT purchased successfully!",
                });                
            }
        });
    }else{
        return res.status(400).send({
            success: false,
            msg: "Error occured!"
        });        
    }


}