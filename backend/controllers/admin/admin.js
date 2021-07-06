const CryptoJS = require("crypto-js");
var fetch = require('node-fetch');
const config = require('../../config');
const adminQueries = require("../../services/adminQueries");
var validator = require("email-validator");
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const axios = require('axios');
const jwt = require('jsonwebtoken');
var ipfsCompress = require('../ipfsCompress/imagecompress');

const marketplaceQueries = require("../../services/marketplaceQueries");

var FormData = require('form-data');


     exports.getWebImage = async (db,req,res)=>{
        
        await db.query(adminQueries.getWebImage,function(error,data){
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
            msg : "Web Images",
            response : data,
            data:data[0]
        });
            }else{
                res.status(400).send({
                    success:false,
                    msg:"No data found!!"
                });            
            }
        });
     }



 exports.getItem= async (db,req,res)=>{

    await db.query(adminQueries.getItem,function(error,data){
        if(error){
        return res.status(400).send({
            success: false,
            msg: "Error occured!!",
            error
        });
    }
        if(data.length>0){
    res.status(200).send({
        success:true,
        msg : "Item Details",
        response:data
     });
        }else{
            res.status(200).send({
                success:false,
                msg:"No data found!!"
            });            
        }
    });
    }

    exports.getDigitalCategory = async (db,req,res)=>{
        await db.query(adminQueries.getDigitalCategory,function(error,data){
            if(error){
            return res.status(400).send({
                success: false,
                msg: "Error occured!!",
                error
            });
        }
            if(data.length>0){
        res.status(200).send({
            success:true,
            msg : "Category Item Details",
            response:data
         });
            }else{
                res.status(200).send({
                    success:false,
                    msg:"No data found!!"
                });            
            }
        });
        }

        exports.getwalletDetails = async (db,req,res)=>{
            var user_id = req.body.user_id
            await db.query(adminQueries.getwalletDetails, user_id ,function(error,data){
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
                msg : "Wallet Details",
                response : data,
                data:data[0]
            });
                }else{
                    res.status(400).send({
                        success:false,
                        msg:"No data found!!"
                    });            
                }
            });
         }     
                