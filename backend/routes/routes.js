const jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var config = require('../config');
var db = require('../utils/connection');
/* stripe includes*/
//const express = require("express");
const app = express();
require("dotenv").config();
const stripe = require("stripe")(`${config.stripe_key}`);
//const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
/*-------------------*/

router.use(bodyParser.json());
router.use(
    bodyParser.urlencoded({
        extended: true,
    })
);     


var multer  = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      console.log(file.originalname);
      var filetype = '';
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      if(file.mimetype === 'image/jpg') {
        filetype = 'jpg';
      }
      if(file.mimetype === 'video/mp4') {
        filetype = 'mp4';profile
      }
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});
var upload = multer({storage: storage});
var pageUpload = upload.fields([{ name: 'avatar', maxCount: 1 }])
var userupload = upload.fields([{ name: 'profile_pic', maxCount: 1 }, { name: 'banner', maxCount: 8 }])
var sliderUpload = upload.fields([{ name: 'slider1', maxCount: 1 }, { name: 'slider2', maxCount: 8 }, { name: 'slider3', maxCount: 8 }, { name: 'logo', maxCount: 8 }, { name: 'favicon', maxCount: 8 }, { name: 'realEstateImage', maxCount: 8 }])
var realEstateImage = upload.fields([{ name: 'slider1', maxCount: 1 }, { name: 'slider2', maxCount: 8 }, { name: 'slider3', maxCount: 8 }])

var addnftImage = upload.fields([{ name: 'image', maxCount: 1 }])

// ---------------Controllers--------
const signup = require('../controllers/signup');
const login = require('../controllers/login');
const admin = require('../controllers/admin/admin');
const getFile = require('../controllers/getFile');
const marketplace = require('../controllers/marketplace');
const explorer = require('../controllers/infinity_explorer');


//==============Post Status API ===================================
router.post('/adminlogin', admin.login.bind(this, db));
router.get('/getfooter', admin.getFooter.bind(this, db));

router.get('/getwebcontent', admin.getWebContent.bind(this, db));
router.get('/getmarketplace', admin.getMarketPlace.bind(this, db));

router.post('/insertmarketplace',ensureWebToken,admin.insertMarketPlace.bind(this,db));

router.post('/updatefooter', ensureWebToken,admin.updateFooter.bind(this, db));
router.post('/updatewebcontent', ensureWebToken,admin.updateWebContent.bind(this, db));


/*--------- Item Category ---------*/
router.post('/insertcategory', ensureWebToken,admin.insertCategory.bind(this, db));
router.get('/getcategory', admin.getCategory.bind(this, db));
router.get('/getDigitalCategory', admin.getDigitalCategory.bind(this, db));
router.get('/getRealEstateCategory', admin.getRealEstateCategory.bind(this, db));
router.post('/singlecategory', admin.singleCategory.bind(this, db));
router.post('/singlecategory', admin.singleCategory.bind(this, db));
router.get('/getNftType', admin.getNftType.bind(this, db));
router.post('/updatecategory', ensureWebToken,admin.updateCategory.bind(this, db));
router.post('/deletecategory', ensureWebToken,admin.deleteCategory.bind(this, db));
router.get('/getuser',admin.getUsers.bind(this, db));
router.get('/dashboarditem',admin.dashboardItem.bind(this, db));
router.get('/getUserTelent',admin.getTelentUsers.bind(this, db));
router.get('/getRealEstateUsers',admin.getRealEstateUsers.bind(this,db));


/*--------- End Category ---------*/

/*--------- Item  ---------*/
router.post('/insertitem',addnftImage,admin.insertItem.bind(this, db));
router.post('/deleteitem', ensureWebToken,admin.deleteItem.bind(this, db));
router.post('/updateitem',ensureWebToken,admin.updateItem.bind(this, db));

router.get('/getitem',admin.getItem.bind(this, db));
router.post('/removeFeatured',ensureWebToken,admin.removeFeatured.bind(this, db));
router.post('/addFeatured',ensureWebToken,admin.addFeatured.bind(this, db));

router.post('/showNFT',ensureWebToken,admin.showNFT.bind(this, db));
router.post('/hideNFT',ensureWebToken,admin.hideNFT.bind(this, db));

router.post('/listitem',admin.listItem.bind(this, db));
router.post('/listAdminItem',admin.listAdminItem.bind(this, db));
router.post('/listSingleItem',admin.listSingleItem.bind(this, db));
router.get('/getWebImage',admin.getWebImage.bind(this, db));
router.post('/getwalletDetails',admin.getwalletDetails.bind(this, db));
router.get('/getRealEstateImage',admin.getRealEstateImage.bind(this, db));
//router.post('/updateWebImage',admin.updateWebImage.bind(this, db));
router.post('/updateWebImage', sliderUpload,ensureWebToken, admin.updateWebImage.bind(this, db));
router.post('/updateRealEstateImage', realEstateImage, ensureWebToken,admin.updateRealEstateImage.bind(this, db));


/*--------- End Item ---------*/

/*--------- Marketplace ---------*/
router.post('/testmail',marketplace.testmail.bind(this, db));
router.post('/test',marketplace.test.bind(this, db));


router.post('/getjwttoken',marketplace.getJWTToken.bind(this, db));


router.post('/addTelent',ensureWebToken,marketplace.addTelent.bind(this, db));
router.post('/addRealEstateUser',ensureWebToken,marketplace.EstateUser.bind(this, db));

router.post('/addWishlist',ensureWebToken,marketplace.addWishlist.bind(this, db));
router.post('/listWishlist',marketplace.listWishlist.bind(this,db));
router.post('/removeWishlist',ensureWebToken,marketplace.removeWishlist.bind(this,db));

router.post('/addCart',ensureWebToken,marketplace.addCart.bind(this, db));
router.post('/listCart',marketplace.listCart.bind(this,db));
router.post('/removeCart',ensureWebToken,marketplace.removeCart.bind(this,db));
router.post('/itemdetail',marketplace.itemDetails.bind(this,db));
router.post('/ItemDetailForEdit',marketplace.ItemDetailForEdit.bind(this,db));
router.post('/purchaseNft',marketplace.purchaseNft.bind(this,db));
router.post('/getUserTelent',marketplace.getUserTelent.bind(this,db));
router.post('/insertUserCollection',ensureWebToken,marketplace.insertUserCollection.bind(this,db));
router.post('/getSingleUserCollection',marketplace.getSingleUserCollection.bind(this,db));
router.post('/updateUserCollection',marketplace.updateUserCollection.bind(this,db));
router.post('/deleteUserCollection',ensureWebToken,marketplace.deleteUserCollection.bind(this,db));

router.post('/getUserCollection',marketplace.getUserCollection.bind(this,db));
router.post('/getUserItem',marketplace.getUserItem.bind(this,db));

router.post('/updateTelentForApproved',marketplace.updateTelentForApproved.bind(this,db));
router.post('/updateTelentForReject',marketplace.updateTelentForReject.bind(this,db));
router.post('/realEstateUserReject',marketplace.realEstateUserReject.bind(this,db));
router.post('/realEstateUserApprove',marketplace.realEstateUserApprove.bind(this,db));
router.post('/getRealEstateStatus',marketplace.getRealEstateStatus.bind(this,db));
router.post('/addNftByUser',addnftImage, marketplace.addNftByUser.bind(this,db));
router.post('/insertRealEstateCollection',ensureWebToken,marketplace.insertRealEstateCollection.bind(this,db));
router.post('/getRealEstateCollection',marketplace.getRealEstateCollection.bind(this,db));
router.post('/getPayoutAddress',marketplace.getPayoutAddress.bind(this,db));
router.post('/getRoyaltyTransaction',marketplace.getRoyaltyTransaction.bind(this,db));
router.post('/resaleNFT',ensureWebToken,marketplace.resaleNFT.bind(this,db));



router.post('/getQR',marketplace.getQR.bind(this,db));
router.post('/twoAuthenticationVerify',marketplace.twoAuthenticationVerify.bind(this,db));
router.post('/getCategoryById',marketplace.getCategoryById.bind(this,db));

router.post('/allSearch',marketplace.allSearch.bind(this,db));
router.post('/insertBid',marketplace.insertBid.bind(this,db));
router.post('/getBidDetail',marketplace.getBidDetail.bind(this,db));
router.post('/bidAccept',ensureWebToken,marketplace.bidAccept.bind(this,db));
router.post('/getTelentStatus',marketplace.getTelentStatus.bind(this,db));
router.post('/paymentReceived',marketplace.paymentReceived.bind(this,db));
router.post('/onlinetrx_start',ensureWebToken,marketplace.onlinetrx_start.bind(this,db));
router.post('/nftTrx_start',ensureWebToken,marketplace.nftTrx_start.bind(this,db));
router.post('/getUserBids',marketplace.getUserBids.bind(this,db));
router.get('/getfaq',marketplace.getfaq.bind(this,db));
router.post('/charge',ensureWebToken,marketplace.charge.bind(this,db));
//router.post('/stripe_success',marketplace.stripe_success.bind(this,db));
router.post('/stripePayment',ensureWebToken,marketplace.stripePayment.bind(this,db));
router.post('/walletPayment',ensureWebToken,marketplace.walletPayment.bind(this,db)); 
router.post('/getUserPurchase',marketplace.getUserPurchase.bind(this,db));
router.post('/getUserSale',marketplace.getUserSale.bind(this,db));
router.post('/myBidItem',marketplace.myBidItem.bind(this,db));
router.get('/getRecentWorks',marketplace.getRecentWorks.bind(this,db));
router.get('/allTalentList',marketplace.allTalentList.bind(this,db));
router.post('/rejectBid',ensureWebToken,marketplace.rejectBid.bind(this,db));
router.post('/itemView',marketplace.itemView.bind(this,db));
router.post('/likeItem',marketplace.likeItem.bind(this,db));
router.post('/getItemLikeCount',marketplace.getItemLikeCount.bind(this,db));
router.post('/getWalletDetail',marketplace.getWalletDetail.bind(this,db));
router.post('/userWithdraw',ensureWebToken,marketplace.userWithdraw.bind(this,db));
router.post('/insertContact',marketplace.insertContact.bind(this,db));
router.get('/getContact',marketplace.getContact.bind(this,db));
router.post('/transactionDetail',marketplace.transactionDetail.bind(this,db));
router.get('/allCategoryItem',marketplace.allCategoryItem.bind(this,db));
router.post('/addRealEstate',marketplace.addRealEstate.bind(this,db));
router.post('/getRealEstateItem',marketplace.getRealEstateItem.bind(this,db));
router.get('/getAllRealEstateCollection',marketplace.getAllRealEstateCollection.bind(this,db));
router.get('/getAllUserCollection',marketplace.getAllUserCollection.bind(this,db));
router.post('/updateRealEstateUser',ensureWebToken,marketplace.updateRealEstateUser.bind(this,db));
router.post('/updateTalentUser',ensureWebToken,marketplace.updateTalentUser.bind(this,db));
router.get('/getRealEstate',marketplace.getRealEstate.bind(this,db));
router.post('/getUserRealEstate',marketplace.getUserRealEstate.bind(this,db));
router.post('/getUserTalentById',marketplace.getUserTalentById.bind(this,db));
router.post('/updatePayoutAddress',ensureWebToken,marketplace.updatePayoutAddress.bind(this, db));
router.get('/getContractDeatils',marketplace.getContractDeatils.bind(this,db));
router.get('/getRoyaltyList',marketplace.getRoyaltyList.bind(this,db));
router.post('/getWalletTransaction',ensureWebToken,marketplace.getWalletTransaction.bind(this,db));
router.post('/getPayoutAddress',ensureWebToken,marketplace.getPayoutAddress.bind(this,db));
router.post('/resaleTrxStart',ensureWebToken,marketplace.resaleTrxStart.bind(this,db));
router.post('/getMarketActivity',marketplace.getMarketActivity.bind(this,db));
router.post('/setPayoutAddress',marketplace.setPayoutAddress.bind(this,db));


/*--------- End Marketplace ---------*/


/*--------- explorer start ---------*/
router.post('/listItemexplorer',explorer.listItemexplorer.bind(this,db));
router.post('/itemdetails',explorer.itemdetails.bind(this,db));
router.post('/userwallet',explorer.userwallet.bind(this,db));
router.post('/useritem',explorer.useritem.bind(this,db));
router.post('/getCreatorItem',explorer.getCreatorItem.bind(this,db));
router.post('/userholder',explorer.userHolder.bind(this,db));
router.post('/useritemdetail',explorer.userItems.bind(this,db));
router.post('/getWalletTrx',explorer.getWalletTrx.bind(this,db));
router.post('/hashdetail',explorer.hashDetail.bind(this,db));
router.post('/explorerSearch',explorer.explorerSearch.bind(this,db));
/*--------- End explorer ---------*/



router.get("/uploads/:image", getFile.getImage);

router.post('/updateProfilePic', userupload, signup.updateProfilePic.bind(this, db));
router.post('/getProfilePic', signup.getProfilePic.bind(this, db));
router.post('/getAboutDetail',signup.getAboutDetail.bind(this,db));
router.post('/updateAboutDetail',signup.updateAboutDetail.bind(this,db));
router.post('/follow',signup.follow.bind(this, db))
router.post('/insertView',signup.insertView.bind(this, db))
router.post('/getUserDetail',signup.getUserDetail.bind(this, db))
router.post('/addSubscriber',signup.addSubscriber.bind(this, db));




router.post('/deleteuser',ensureWebToken,admin.deleteUser.bind(this, db));
router.post('/updateprofilepic', ensureWebToken,admin.insertProfilePic.bind(this, db));
router.post('/adminprofilepic', admin.getProfilePic.bind(this, db));
router.post('/adminpassword',ensureWebToken,admin.changePassword.bind(this, db));
router.post('/updateWallet',ensureWebToken,admin.updateWallet.bind(this, db));

router.post('/register', signup.register.bind(this, db));
router.post('/verifyAccount/:token', signup.activateAccount.bind(this, db));
router.post('/login', login.login.bind(this, db));
router.post('/forgot', signup.forgot.bind(this, db));
router.post('/resetpassword', ensureWebToken, signup.Resetpassword.bind(this, db));
router.post('/getuserprofile', signup.getUserProfile.bind(this, db));
router.post('/updateuserprofile', signup.userProfile.bind(this, db));
router.post('/deactivate', ensureWebToken,signup.deActivateAccount.bind(this, db));
router.post('/changepassword', ensureWebToken,signup.changePassword.bind(this, db));
router.get('/getcountries', signup.getCountry.bind(this, db));
router.get("/", function (request, response) {
    response.contentType("routerlication/json");
    response.end(JSON.stringify("Node is running"));    
});

router.get("*", function (req, res) {
    return res.status(200).json({
        code: 404,
        data: null,
        msg: "Invalid Request {URL Not Found}", 
    });
});

router.post("*", function (req, res) {
    return res.status(200).json({
        code: 404,
        data: null,
        msg: "Invalid Request {URL Not Found}",
    });
});

function ensureWebToken(req, res, next) {

    const x_access_token = req.headers['authorization'];
    if (typeof x_access_token !== undefined) {
        req.token = x_access_token;
        verifyJWT(req, res, next);
    } else {
        res.sendStatus(403);
    }
}

// async function verifyJWT(req, res, next) {

//     jwt.verify(req.token, config.JWT_SECRET_KEY, async function (err, data) {
//         if (err) {
//             res.sendStatus(401);
//         } else {
//             const _data = await jwt.decode(req.token, {
//                 complete: true,
//                 json: true
//             });
//             req.user = _data['payload'];
//             next();
//         }
//     })
// }

async function verifyJWT(req, res, next) {
    jwt.verify(req.token, config.JWT_SECRET_KEY, async function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            const _data = await jwt.decode(req.token, {
                complete: true,
                json: true
            });
            req.user = _data['payload'];
            if(req.user.email != req.body.email){
                return res.sendStatus(403);
            }
            next();
        }
    })
}

module.exports.routes = router;
