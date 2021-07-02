import React, { Component } from 'react';
import axios from 'axios';
import Header from '../directives/header'
import Footer from '../directives/footer'
import config from '../config/config'
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie'
// import DatePicker from 'react-datepicker';
import Swal from 'sweetalert2';
// import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-date-picker';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Player } from 'video-react';
import ReactAudioPlayer from 'react-audio-player';
import Loader from "react-loader-spinner";
import Web3 from 'web3';
import Countdown,{zeroPad} from 'react-countdown';

// import {dragData} from './multiImage';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// fake data generator
const getItems = count =>
   Array.from({ length: count }, (v, k) => k).map(k => ({
      id: `item-${k}`,
      keyid: k,
      content: `item ${k}`,
   }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
   const [removed] = result.splice(startIndex, 1);
   result.splice(endIndex, 0, removed);
    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
   // some basic styles to make the items look a bit nicer
   userSelect: 'none',
   padding: grid * 2,
   margin: `0 ${grid}px 0 0`,
   // change background colour if dragging
   background: isDragging ? 'lightgreen' : 'grey',
   marginLeft: isDragging ? '-200px' : '0px',
   // styles we need to apply on draggables
   ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
   background: isDraggingOver ? 'lightblue' : 'lightgrey',
   display: 'flex',
   padding: grid,
   overflow: 'auto',
});



const headers = {
   'Content-Type': 'application/json'
};


export default class featurescreatorrealestate extends Component {
   fileObj = [];
   fileArray = [];

   constructor(props) {
      super(props)
      this.loginData = (!Cookies.get('loginSuccess')) ? [] : JSON.parse(Cookies.get('loginSuccess'))


      const { match: { params } } = this.props;
      this.user_id = params.user_id
      // alert(this.user_id)
      this.state = {
         user_id: this.loginData?.data?.id,
         ConnectWalletAddress: this.loginData?.data?.user_address,
         getListUser: '',
         activeBtn: '0',
         nameCollection: '',
         descriptionCollection: '',
         getUserCollectionData: [],
         name: '',
         description: '',
         image: '',
         item_category_id: '',
         price: '',
         user_collection_id: '',
         start_date: '',
         // end_date : '',
         getcategoryData: [],
         image_file: null,
         image_preview: '',
         image_filetitle_deed: null,
         image_previewtitle_deed: '',
         image_filepassport: null,
         image_previewpassport: '',
         image_previewMain: '',
         image_fileMain: null,
         collectionDataArray: [],
         sell_type: '',
         dateShow: 0,
         nameError: '',
         categoryNameError: '',
         collectionNameError: '',
         sellTypeError: '',
         priceError: '',
         descriptionError: '',
         imageError: '',
         imageErrorMain: '',
         spinLoader: '0',
         collectionOpen: 0,
         productOpen: 1,
         nftopen: 0,
         descriptionErrorCollection: '',
         nameErrorCollection: '',
         collectionShow: '',
         expiry_date: '',
         expiry_dateError: '',
         collectionName: '',
         getSingleUserCollectionData: '',
         deleteShow: '',
         alertShow: '',
         title_deed: '',
         passport: '',
         image_filepassportError: '',
         image_filetitle_deedError: '',
         file_type: '',
         paymentShow: 0,
         loaderShow: false,
         etherClickActive: 0,
         cardNumber: '',
         expMonth: '',
         expYear: '',
         cvc: '',
         errorMessageSripe: '',
         loadingStripe: 0,
         image1: '',
         largeImageSizeError: 0,
         file: [null],
         items: [],
         firstTimeImgPre:[],
         firstTimeImgList:[],
         image_type:''

      }
      this.onDragEnd = this.onDragEnd.bind(this);
      this.submitForm = this.submitForm.bind(this)
      this.nftAdd = this.nftAdd.bind(this)
      this.onChange = this.onChange.bind(this)
      this.handleChange = this.handleChange.bind(this);
      this.handleChangeExpiry = this.handleChangeExpiry.bind(this)
      this.handleChangeCollection = this.handleChangeCollection.bind(this);
      this.paymentStripeShow = this.paymentStripeShow.bind(this)
      this.paymentStripeWallet = this.paymentStripeWallet.bind(this)
      this.paymentNetsents = this.paymentNetsents.bind(this)
      this.handleImagePreview = this.handleImagePreview.bind(this)
   }

   async onDragEnd(result) {
      // dropped outside the list
      if (!result.destination) {
         return;
      }

      const items =await reorder(
         this.state.items,
         result.source.index,
         result.destination.index
      );
      
      var mainArrPre = [];
      var mainArrImg = [];
      
      for (var i = 0; i < items.length; i++) {
         var j = items[i].keyid;
         mainArrPre.push(this.state.firstTimeImgPre[j]);
         mainArrImg.push(this.state.firstTimeImgList[j]);
      }
      
      // this.state.image_preview = mainArrPre;
      this.setState({
         items,
         image_preview: mainArrPre,
         image_file: mainArrImg
      });

      setTimeout(() => {
         
      }, 1000);

   }


   handleChangeCollection = event => {
      event.preventDefault()
      let value = event.target.value;
      this.setState(prevState => ({
         getSingleUserCollectionData: { ...prevState.getSingleUserCollectionData, [event.target.name]: value }
      }))
   }

   handleChange(date) {
      // alert(date)
      // var gg = date.setDate(date.getDate() - 1)
      // // alert(new Date(gg))
      this.setState({
         // start_date: new Date(date).setDate(new Date(date).getDate() + 1)
         start_date: date
      })
      // alert(new Date(this.state.start_date))
   }


   handleChangeExpiry(date) {
      this.setState({
         // start_date: new Date(date).setDate(new Date(date).getDate() + 1)
         expiry_date: date
      })
   }

   componentDidMount() {
      this.getUserDetailsAPI()
      if (this.loginData?.data?.id != this.user_id) {
         this.getViewCountAPI()
      }

      // setTimeout(() => {
      //    if (window.ethereum) {
      //       const { ethereum } = window;
      //       this.setState({
      //          ConnectWalletAddress: ethereum.selectedAddress
      //       })
      //    }
      // }, 1000);

      this.getUserCollectionsAPI()
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.getcategoryAPI()
      this.collectionAPI()


      if (Cookies.get('create_item_process')) {
         if (Cookies.get('cryptoPaiment') === 'success') {
            this.paymentShowAPI(JSON.parse(Cookies.get('create_item_data')));
            Cookies.set('cryptoPaiment', '');
            Cookies.set('create_item_process', '');
            // this.cryptoPaymentSucces();
         } else {
            this.cryptoPaymentFailed();
         }
         Cookies.set('cryptoPaiment', '');
         Cookies.set('create_item_process', '');
         Cookies.set('create_item_realestat', '');
      }

   }






   async connectMetasmask() {
      if (window.ethereum) {
         await window.ethereum.send('eth_requestAccounts');
         window.web3 = new Web3(window.ethereum);
         const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
         this.setState({
            ConnectWalletAddress: accounts
         })
      }
      else {
         toast.error(`Please install MetaMask to use this dApp!`, {
            position: toast.POSITION.TOP_CENTER
         });
      }
   }



   async cryptoPaymentFailed() {
      var willSearch = await Swal.fire({
         title: 'Payment declined!',
         text: 'Something went wrong! please try again.',
         icon: 'error',
         width: 500,
         confirmButtonColor: '#3085d6',
         allowOutsideClick: false,
         confirmButtonText: 'Continue',
      });
   }


   onChange = e => {
      this.setState({
         [e.target.name]: e.target.value
      })
      if (e.target.checked === true && e.target.type === 'checkbox') {
         this.setState({
            dateShow: 1
         })
      }
      else if (e.target.checked === false && e.target.type === 'checkbox') {
         this.setState({
            dateShow: 0
         })
      }
   }


   validate = () => {


      let nameError = ""
      let categoryNameError = '';
      let collectionNameError = '';
      let sellTypeError = '';
      let priceError = '';
      let descriptionError = '';
      let imageError = '';
      let imageErrorMain = '';
      let expiry_dateError = ''
      let image_filetitle_deedError = ''
      let image_filepassportError = ''

      if (this.state.name === '') {
         nameError = "Title is required"
      }
      if (this.state.item_category_id === '') {
         categoryNameError = "Category is required"
      }
      if (this.state.user_collection_id === '') {
         collectionNameError = "Collection name is required"
      }
      if (this.state.sell_type === '') {
         sellTypeError = "Sell type is required"
      }
      if (this.state.price === '') {
         priceError = "Price is required"
      }
      if (this.state.description === '') {
         descriptionError = "Description is required"
      }
      if (this.state.image_file === null) {
         imageError = "Image is required"
      }
      if (this.state.image_fileMain === null) {
         imageErrorMain = "Main Image is required"
      }


      if (this.state.image_filetitle_deed === null) {
         image_filetitle_deedError = "Title deed is required"
      }
      if (this.state.image_filepassport === null) {
         image_filepassportError = "Passport is required"
      }
      if (this.state.expiry_date === '') {
         expiry_dateError = "Expiry date is rquired"
      }

      if (nameError || categoryNameError || collectionNameError || sellTypeError || priceError || descriptionError || imageError || imageErrorMain || expiry_dateError || image_filetitle_deedError || image_filepassportError) {
         this.setState({
            nameError, categoryNameError, collectionNameError, sellTypeError, priceError, descriptionError, imageError, imageErrorMain, expiry_dateError, image_filetitle_deedError, image_filepassportError
         })
         return false
      }
      return true
   }


   validate1 = () => {
      let nameErrorCollection = ""
      let descriptionErrorCollection = '';
      if (this.state.nameCollection === '') {
         nameErrorCollection = "Collection name is required"
      }
      if (this.state.descriptionCollection === '') {
         descriptionErrorCollection = "Description is required"
      }

      if (nameErrorCollection || descriptionErrorCollection) {
         this.setState({
            nameErrorCollection, descriptionErrorCollection
         })
         return false
      }
      return true
   }


   //===================================   give approval    =============================

   async paymentNetsents() {
      this.setState({
         loaderShow: true
      })

      var myDate = new Date(this.state.expiry_date);
      var myDate1 = new Date(this.state.start_date);


      var Netcensts = {};
      Netcensts.description = this.state.description;
      Netcensts.expiry_date = new Date(myDate.getUTCFullYear(), myDate.getUTCMonth(), myDate.getUTCDate() + 2);
      Netcensts.file_type = this.state.file_type;
      Netcensts.image_type = this.state.image_type;
      Netcensts.item_category_id = this.state.item_category_id;
      Netcensts.name = this.state.name;
      Netcensts.price = this.state.price;
      // Netcensts.quantity = this.state.quantity;
      Netcensts.sell_type = this.state.sell_type;
      Netcensts.start_date = new Date(myDate1.getUTCFullYear(), myDate1.getUTCMonth(), myDate1.getUTCDate() + 2);
      // Netcensts.edition_type = this.state.edition_type;
      Netcensts.user_id = this.loginData.data.id;
      Netcensts.user_address = this.state.ConnectWalletAddress;
      Netcensts.user_collection_id = this.state.user_collection_id;
      Netcensts.email = this.loginData.data.user_email


      let formData2 = new FormData();
      let formData3 = new FormData();
      let formData4 = new FormData();

      let allImages = []
      let formData1 = new FormData();


      this.setState({
         spinLoader: '1'
      })
      let filesLength = this.state.image_file.length
      

      for (var j = 0; j < filesLength; j++) {
         let formData1 = new FormData();

         formData1.append('file', this.state.image_file[j]);
         const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
         var resIPF = await axios.post(url,
            formData1,
            {
               headers: {
                  'Content-Type': `multipart/form-data; boundary= ${formData1._boundary}`,
                  'pinata_api_key': 'b26a087893e3f0033bbf',
                  'pinata_secret_api_key': '269ca812d8e34ee37b44b09e966b4be8a13c01921e892438f3d3d834ee0a4681'
               }
            }
         );

         allImages.push(resIPF.data.IpfsHash);
         Netcensts.image1 = allImages
         //  this.state.image = allImages        
      }


      formData2.append('file', this.state.image_filetitle_deed);

      const url1 = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
      var resIPF = await axios.post(url1,
         formData2,
         {
            headers: {
               'Content-Type': `multipart/form-data; boundary= ${formData1._boundary}`,
               'pinata_api_key': 'b26a087893e3f0033bbf',
               'pinata_secret_api_key': '269ca812d8e34ee37b44b09e966b4be8a13c01921e892438f3d3d834ee0a4681'
            }
         }
      );
      // this.state.title_deed = resIPF.data.IpfsHash
      Netcensts.title_deed = resIPF.data.IpfsHash


      formData3.append('file', this.state.image_filepassport);

      const url2 = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
      var resIPF = await axios.post(url2,
         formData3,
         {
            headers: {
               'Content-Type': `multipart/form-data; boundary= ${formData1._boundary}`,
               'pinata_api_key': 'b26a087893e3f0033bbf',
               'pinata_secret_api_key': '269ca812d8e34ee37b44b09e966b4be8a13c01921e892438f3d3d834ee0a4681'
            }
         }
      );
      Netcensts.passport = resIPF.data.IpfsHash


      formData4.append('file', this.state.image_fileMain);

      const url4 = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
      var resIPF = await axios.post(url4,
         formData4,
         {
            headers: {
               'Content-Type': `multipart/form-data; boundary= ${formData1._boundary}`,
               'pinata_api_key': 'b26a087893e3f0033bbf',
               'pinata_secret_api_key': '269ca812d8e34ee37b44b09e966b4be8a13c01921e892438f3d3d834ee0a4681'
            }
         }
      );
      // this.state.title_deed = resIPF.data.IpfsHash
      Netcensts.image = resIPF.data.IpfsHash

      // console.log(Netcensts);
      await axios({
         method: 'post',
         url: `${config.apiUrl}nftTrx_start`,
         headers: { "Authorization": this.loginData?.Token },

         data: { "email":this.loginData.data.user_email, 'user_address': this.state.ConnectWalletAddress, 'user_id': this.loginData.data.id, 'amount': this.state.getListUser?.transfer_fee_usd }
      })
         .then(result => {
            if (result.data.success === true) {
               Netcensts.external_id = result.data.external_id;

               Cookies.set('create_item_data', Netcensts);
               Cookies.set('create_item_realestat', 'yes');
               Cookies.set('create_item_process', 'yes');
               // setTimeout(() => {
               window.location.href = `https://merchant.net-cents.com/widget/payment/currencies?data=${result.data.token}`
               // }, 3000);

            }
            else if (result.data.success === false) {
            }
         }).catch(err => {
            this.setState({
               loaderShow: false
            })
         });
   }



   //======================================  Card and ether popup dynamic through state =================

   etherClick(id) {
      if (id === 'cc') {
         this.setState({
            etherClickActive: 0,
            bid_price: '',
            errorMessageSripe: ''
         })
      }
      else if (id === 'Ether') {
         this.setState({
            etherClickActive: 1,
            bid_price: '',
            cardNumber: '',
            expMonth: '',
            expYear: '',
            cvc: '',
            errorMessageSripe: ''
         })
      }
      else if (id === 'Wallet') {
         this.setState({
            etherClickActive: 2,
            bid_price: '',
            cardNumber: '',
            expMonth: '',
            expYear: '',
            cvc: '',
            errorMessageSripe: ''
         })
      }
   }


   //===================================================== strpe payment ======================================

   async paymentStripeShow() {
      this.setState({
         loadingStripe: 1,
         loaderShow: true
      })
      await axios({
         method: 'post',
         url: `${config.apiUrl}stripePayment`,
         headers: { "Authorization": this.loginData?.Token },
         data: {"email":this.loginData.data.user_email,
            "user_id": this.loginData.data.id, "amount": this.state.getListUser?.transfer_fee_usd, "cardNumber": this.state.cardNumber, "expMonth": this.state.expMonth,
            "expYear": this.state.expYear, "cvc": this.state.cvc
         }
      })
         .then(result => {
            if (result.data.success === true) {
               // this.setState({
               //    getListUser: result.data.response,
               // })
               this.setState({
                  loadingStripe: 0,
                  loaderShow: false
               })
               this.paymentShowAPI()

            }
            else if (result.data.success === false) {
            }
         }).catch(err => {

            this.setState({
               errorMessageSripe: err?.response?.data?.msg,
               loadingStripe: 0,
               loaderShow: false
            })
         });
   }


   //====================================================  wallet API ===============================================

   async paymentStripeWallet() {

      if (parseFloat(this.state.getListUser?.transfer_fee_usd) > parseFloat(this.state.getListUser?.wallet_balance_usd)) {
         this.setState({
            errorMessageSripe: 'Insufficient balance in your wallet'
         })
      }
      else {
         this.setState({
            loadingStripe: 1,
            loaderShow: true
         })
         await axios({
            method: 'post',
            url: `${config.apiUrl}walletPayment`,
            headers: { "Authorization": this.loginData?.Token },
            data: { "email":this.loginData.data.user_email,"user_id": this.loginData.data.id, "amount": this.state.getListUser?.transfer_fee_usd }
         })
            .then(result => {
               if (result.data.success === true) {

                  this.setState({
                     loadingStripe: 0,
                     loaderShow: false
                  })
                  this.paymentShowAPI()


               }
               else if (result.data.success === false) {
                  this.setState({
                     loadingStripe: 0,
                     loaderShow: false
                  })
               }
            }).catch(err => {
               this.setState({
                  loadingStripe: 0,
                  loaderShow: false
               })
            });
      }

   }




   async paymentShowAPI(create_item_data = null) {
      // let formData1 = new FormData();

      Cookies.set('create_item_data', '');
      if (create_item_data) {

         var API_Data = create_item_data;
      } else {
         var myDate = new Date(this.state.expiry_date);
         var myDate1 = new Date(this.state.start_date);

         var API_Data = this.state;
         API_Data.user_address = this.state.ConnectWalletAddress;
         API_Data.expiry_date = new Date(myDate.getUTCFullYear(), myDate.getUTCMonth(), myDate.getUTCDate() + 2);
         API_Data.start_date = new Date(myDate1.getUTCFullYear(), myDate1.getUTCMonth(), myDate1.getUTCDate() + 2);
         let formData2 = new FormData();
         let formData3 = new FormData();
         let allImages = []
         let formData1 = new FormData();
         let formData4 = new FormData();


         this.setState({
            spinLoader: '1',
            loadingStripe: 1,
            loaderShow: true
         })
         let filesLength = API_Data.image_file.length
         for (var j = 0; j < filesLength; j++) {
            let formData1 = new FormData();

            formData1.append('file', API_Data.image_file[j]);
            const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
            var resIPF = await axios.post(url,
               formData1,
               {
                  headers: {
                     'Content-Type': `multipart/form-data; boundary= ${formData1._boundary}`,
                     'pinata_api_key': 'b26a087893e3f0033bbf',
                     'pinata_secret_api_key': '269ca812d8e34ee37b44b09e966b4be8a13c01921e892438f3d3d834ee0a4681'
                  }
               }
            );

            allImages.push(resIPF.data.IpfsHash);
            API_Data.image1 = allImages
         }


         formData2.append('file', API_Data.image_filetitle_deed);

         const url1 = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
         var resIPF = await axios.post(url1,
            formData2,
            {
               headers: {
                  'Content-Type': `multipart/form-data; boundary= ${formData1._boundary}`,
                  'pinata_api_key': 'b26a087893e3f0033bbf',
                  'pinata_secret_api_key': '269ca812d8e34ee37b44b09e966b4be8a13c01921e892438f3d3d834ee0a4681'
               }
            }
         );
         API_Data.title_deed = resIPF.data.IpfsHash


         formData3.append('file', API_Data.image_filepassport);

         const url2 = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
         var resIPF = await axios.post(url2,
            formData3,
            {
               headers: {
                  'Content-Type': `multipart/form-data; boundary= ${formData1._boundary}`,
                  'pinata_api_key': 'b26a087893e3f0033bbf',
                  'pinata_secret_api_key': '269ca812d8e34ee37b44b09e966b4be8a13c01921e892438f3d3d834ee0a4681'
               }
            }
         );
         API_Data.passport = resIPF.data.IpfsHash

         formData4.append('file', API_Data.image_fileMain);

         const url4 = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
         var resIPF = await axios.post(url4,
            formData4,
            {
               headers: {
                  'Content-Type': `multipart/form-data; boundary= ${formData1._boundary}`,
                  'pinata_api_key': 'b26a087893e3f0033bbf',
                  'pinata_secret_api_key': '269ca812d8e34ee37b44b09e966b4be8a13c01921e892438f3d3d834ee0a4681'
               }
            }
         );
         API_Data.image = resIPF.data.IpfsHash

         // formData1.append('file', API_Data.image_file);

         // const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
         // var resIPF = await axios.post(url,
         //    formData1,
         //    {
         //       headers: {
         //          'Content-Type': `multipart/form-data; boundary= ${formData1._boundary}`,
         //          'pinata_api_key': 'b26a087893e3f0033bbf',
         //          'pinata_secret_api_key': '269ca812d8e34ee37b44b09e966b4be8a13c01921e892438f3d3d834ee0a4681'
         //       }
         //    }
         // );
      }
      axios({
         method: 'post',
         url: `${config.apiUrl}addRealEstate`,
         headers: { "Authorization": this.loginData.Token },
         data: {
            "email":this.loginData.data.user_email,
            'user_address': this.state.ConnectWalletAddress,
            'user_id': this.loginData.data.id, 'name': API_Data.name, 'description': API_Data.description, 'image': API_Data.image, 'passport': API_Data.passport,
            'title_deed': API_Data.title_deed, 'image1': API_Data.image1, 'item_category_id': API_Data.item_category_id, 'price': API_Data.price, 'sell_type': API_Data.sell_type,
            'start_date': API_Data.start_date, 'user_collection_id': API_Data.user_collection_id, 'expiry_date': API_Data.expiry_date, 'file_type': API_Data.file_type,'image_type':API_Data.image_type
         }


      })
         .then(async response => {


            if (response.data.success === true) {

               // this.cryptoPaymentSucces();      
               var willSearch = await Swal.fire({
                  title: 'Payment successful!',
                  text: 'Congratulations, you are successfully completed the payment.',
                  icon: 'success',
                  width: 500,
                  confirmButtonColor: '#3085d6',
                  allowOutsideClick: false,
                  confirmButtonText: 'View Added items',
               });
               this.setState({
                  loaderShow: false

               })
               window.location.href = `${config.baseUrl}itemdetails/${response.data.item_edition_id}`

            }

            else if (response.data.success === false) {
               toast.error(response.data.msg, {
                  position: toast.POSITION.TOP_CENTER
               });
               this.setState({
                  spinLoader: '0',
                  loaderShow: false

               })
            }
         })
         .catch(err => {
            toast.error(err?.response?.data?.msg, {
               position: toast.POSITION.TOP_CENTER
            });
            this.setState({
               spinLoader: '0'
            })

         })
   }
   //=======================================  User details  =====================

   async getUserDetailsAPI() {
      // alert('32')
      let User;
      if (this.loginData.data?.id === undefined || this.loginData.length === 0) {
         User = '0'
      }
      else {
         User = this.loginData.data?.id
      }
      await axios({
         method: 'post',
         url: `${config.apiUrl}getUserDetail`,
         data: { "user_id": User, "following_id": this.user_id }
      })
         .then(result => {
            if (result.data.success === true) {
               this.setState({
                  getListUser: result.data.response,
               })
            }
            else if (result.data.success === false) {
            }
         }).catch(err => {
         });
   }

   //=======================================  View count  =====================

   async getViewCountAPI() {
      let User;
      if (this.loginData.data?.id === undefined) {
         User = '0'
      }
      else {
         User = this.loginData.data?.id
      }
      await axios({
         method: 'post',
         url: `${config.apiUrl}insertView`,
         data: { "user_id": this.user_id, "viewer_id": User }
      })
         .then(result => {
            if (result.data.success === true) {
               this.getUserDetailsAPI()
            }
            else if (result.data.success === false) {
            }
         }).catch(err => {
         });
   }
   //=========================================  Follow/Unfollow API   ==============

   async followAPI(id) {
      if (this.loginData.length === 0) {
         window.location.href = `${config.baseUrl}login`
      }
      await axios({
         method: 'post',
         url: `${config.apiUrl}follow`,
         data: { "follower_id": this.loginData.data?.id, 'following_id': this.user_id }
      })
         .then(result => {
            if (result.data.success === true) {
               // toast.success(result.data.msg, {
               //    position: toast.POSITION.TOP_CENTER , 
               //    })
               this.getUserDetailsAPI()

            }
            else if (result.data.success === false) {
            }
         }).catch(err => {
         });
   }

   //=======================================  getUserCollection  =====================

   async getUserCollectionsAPI() {
      await axios({
         method: 'post',
         url: `${config.apiUrl}getRealEstateCollection`,
         data: { "user_id": this.user_id }
      })
         .then(result => {
            if (result.data.success === true) {
               this.setState({
                  getUserCollectionData: result.data.response,
               })
            }
            else if (result.data.success === false) {
            }
         }).catch(err => {
            this.setState({
               collectionShow: 1
            })
         });
   }


   loginCheck() {
      //  console.log(this.loginData)
      if (this.loginData.length === 0) {
         window.location.href = `${config.baseUrl}login`
      }
      else {
         window.location.href = `${config.baseUrl}about`

      }
      // `${config.baseUrl}createyourownnfts`
   }

   async submitForm(e) {
      e.preventDefault()
      const isValid = this.validate1()
      if (!isValid) {
      }
      else {
         await axios({
            method: 'post',
            url: `${config.apiUrl}insertRealEstateCollection`,
            headers: { "Authorization": this.loginData?.Token },
            data: { "email":this.loginData.data.user_email,"user_id": this.loginData?.data?.id, "name": this.state.nameCollection, "description": this.state.descriptionCollection }
         })
            .then(result => {
               if (result.data.success === true) {
                  toast.success(result.data.msg, {
                     position: toast.POSITION.TOP_CENTER,
                  })
                  // this.setState({
                  //    productOpen:1,
                  // })
                  window.location.reload()
               }
               else if (result.data.success === false) {

               }
            }).catch(err => {

            });

      }

   }

   async getcategoryAPI() {
      await axios({
         method: 'get',
         url: `${config.apiUrl}getRealEstateCategory`,
         headers: { "Authorization": this.loginData.Token },
      }).then(response => {
         if (response.data.success === true) {
            this.setState({
               getcategoryData: response.data?.response
            })
         }
      })
   }


   //    handleImagePreview(e) {
   //       this.fileObj.push(e.target.files)
   //       for (let i = 0; i < this.fileObj[0].length; i++) {
   //           this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]))
   //       }
   //       console.log(this.fileArray);

   //       this.setState({ file: this.fileArray })
   //       console.log(this.state.file);

   //   }


   handleImagePreview = (e) => {
      var newImage_as_base64 = []
      var new_image_as_files = []
      var newfile_size = []
      let imageLenght = e.target.files.length
      for (var i = 0; i < imageLenght; i++) {
         let image_as_base64 = URL.createObjectURL(e.target.files[i])
         let image_as_files = e.target.files[i];
         let file_size = e.target.files[i].size;
         let file_type = '';
         if (image_as_files.type.indexOf('image') === 0) {
            file_type = 'image';
         } else if (image_as_files.type.indexOf('video') === 0) {
            file_type = 'video';
         } else if (image_as_files.type.indexOf('audio') === 0) {
            file_type = 'audio';
         }

         var file_size_byte = file_size / 1024;
         var file_size_mb = file_size_byte / 1024;

         if (file_size_mb <= 5) {

            newImage_as_base64.push(image_as_base64);
            new_image_as_files.push(image_as_files);
            this.setState({
               image_preview: newImage_as_base64,
               image_file: new_image_as_files,
               largeImageSizeError: 0
            })
         } else {

            this.setState({
               image_file: null,
               largeImageSizeError: 1
            })
            return true
         }

      }
      setTimeout(() => {
         // console.log()
         this.setState({
            items: getItems(this.state.image_file.length),
            firstTimeImgPre:this.state.image_preview,
            firstTimeImgList:this.state.image_file,
         })
      }, 1000);

      setTimeout(() => {
         
      }, 2000);

   }



   //==================================  for tittle dead ======================================

   handleImagePreviewtitledeed = (e) => {
      let image_as_base64 = URL.createObjectURL(e.target.files[0])
      let image_as_files = e.target.files[0];
      let file_type = '';
      if (image_as_files.type.indexOf('image') === 0) {
         file_type = 'image';
      } else {
         file_type = 'video';
      }

      this.setState({
         image_previewtitle_deed: image_as_base64,
         image_filetitle_deed: image_as_files,
      })


   }

   //=============================== for passport  ==============================================

   handleImagePreviewpassport = (e) => {
      let image_as_base64 = URL.createObjectURL(e.target.files[0])
      let image_as_files = e.target.files[0];
      let file_type = '';
      if (image_as_files.type.indexOf('image') === 0) {
         file_type = 'image';
      } else {
         file_type = 'video';
      }

      this.setState({
         image_previewpassport: image_as_base64,
         image_filepassport: image_as_files,
      })


   }


   //==================================  for Main Image ======================================

   handleImagePreviewMain = (e) => {
      let image_as_base64 = URL.createObjectURL(e.target.files[0])
      let image_as_files = e.target.files[0];
      let file_type = '';
      if (image_as_files.type.indexOf('image') === 0) {
         file_type = 'image';
      } else if (image_as_files.type.indexOf('video') === 0) {
         file_type = 'video';
      } else if (image_as_files.type.indexOf('audio') === 0) {
         file_type = 'audio';
      }

      this.setState({
         image_previewMain: image_as_base64,
         image_fileMain: image_as_files,
         file_type: file_type,
         image_type:e.target.files[0].type
      })
   }

   async nftAdd(e) {
      e.preventDefault()
      const isValid = this.validate()
      if (!isValid) {
         this.setState({
            spinLoader: '0'
         })
      }
      else {
         this.setState({
            paymentShow: 1
         })
      }

   }

   collectionAPI(id, item) {

      if (id === undefined || id === '0') {
         id = '0'
         this.setState({
            collectionName: ''
         })
      }
      this.setState({
         activeBtn: id,
         collectionName: item
      })
      axios({
         method: 'post',
         url: `${config.apiUrl}getRealEstateItem`,
         headers: { "Authorization": this.loginData.Token },
         data: { 'user_collection_id': id, 'user_id': this.user_id, 'limit': '0' }
      })
         .then(response => {


            if (response.data.success === true) {
               this.setState({
                  collectionDataArray: response.data.response,
                  deleteShow: ''
               })
            }

            else if (response.data.success === false) {
               this.setState({
                  collectionDataArray: [],
                  deleteShow: 1
               })
            }
         })
         .catch(err => {
            this.setState({
               collectionDataArray: [],
               deleteShow: 1

            })
         })
   }

   loading() {
      setTimeout(() => {
         window.location.reload()
      });
   }


   openDiv(id) {
      if (id === 'collection') {
         this.setState({
            collectionOpen: 1,
            productOpen: 0,
            nftopen: 0,
            nameError: '',
            categoryNameError: '',
            collectionNameError: '',
            sellTypeError: '',
            priceError: '',
            descriptionError: '',
            imageError: '',
            imageErrorMain: ''
         })
      }
      else if (id === 'NFTs') {
         this.setState({
            collectionOpen: 0,
            productOpen: 0,
            nftopen: 1,
            nameErrorCollection: '',
            descriptionErrorCollection: ''
         })
      }
   }


   async editCollectionAPI(id) {
      await axios({
         method: 'post',
         url: `${config.apiUrl}getSingleUserCollection`,
         headers: { "Authorization": this.loginData.Token },
         data: { 'user_id': id.user_id, "collection_id": id.id }
      }).then(response => {
         if (response.data.success === true) {
            this.setState({
               getSingleUserCollectionData: response.data?.response
            })

         }
      })
   }


   async updateCollection(e) {
      e.preventDefault()
      await axios({
         method: 'post',
         url: `${config.apiUrl}updateUserCollection`,
         headers: { "Authorization": this.loginData.Token },
         data: this.state.getSingleUserCollectionData
      }).then(response => {
         if (response.data.success === true) {
            toast.success(response.data.msg, {
               position: toast.POSITION.TOP_CENTER
            });
            // this.setState({
            //    productOpen:1,
            // })
            window.location.reload()
         }
      })
   }


   //==========================================  Delete collection  ================================

   collectionDelete = (id) => {

      this.setState({
         alertShow: 1
      })
      confirmAlert({
         title: 'Confirm to submit',
         message: 'Are you sure to delete this.',
         buttons: [
            {
               label: 'Yes',
               onClick: () =>
                  axios({
                     method: 'post',
                     url: `${config.apiUrl}deleteUserCollection`,
                     headers: { "Authorization": this.loginData?.Token },
                     data: { "email":this.loginData.data.user_email,"user_id": id.user_id, "collection_id": id.id }
                  })
                     .then((response) => {
                        if (response.data.success === true) {
                           toast.success(response.data.msg, {
                              position: toast.POSITION.TOP_CENTER
                           });
                           // this.setState({
                           //    productOpen:1,
                           // })
                           window.location.reload()
                        }

                     }).catch((error) => {
                     })
            },
            {
               label: 'No',
            }
         ]
      });
   }

   formatInput = (e) => {
      // Prevent characters that are not numbers ("e", ".", "+" & "-") 
      let checkIfNum;
      if (e.key !== undefined) {
         // Check if it's a "e", ".", "+" or "-"
         checkIfNum = e.key === "e" || e.key === "." || e.key === "+" || e.key === "-";
      }
      else if (e.keyCode !== undefined) {
         // Check if it's a "e" (69), "." (190), "+" (187) or "-" (189)
         checkIfNum = e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 187 || e.keyCode === 189;
      }
      return checkIfNum && e.preventDefault();
   }

   getTimeOfStartDate(dateTime){
      var date = new Date(dateTime); // some mock date
      var milliseconds = date.getTime();
      return milliseconds;
    }

   CountdownTimer({days, hours, minutes, seconds, completed }){
      if (completed) {
        // Render a completed state
        return "Starting";
      } else {
        // Render a countdowns
        var dayPrint = (days>0)?days+'d':'';
        return <span>{dayPrint} {zeroPad(hours)}h {zeroPad(minutes)}m {zeroPad(seconds)}s</span>;
      }
    };


   render() {
      return (

         <>
            <Header />
            <div id="content-block">


               <div className="container-fluid custom-container pl-0 pr-0">
                  <ToastContainer />
                  <br />
                  <div className="container-fluid custom-container feature-creator pl-0 pr-0">
                     <div className="container pl-0 pr-0">
                        <div className="row">
                           <div className="col-md-6">
                              <div className="col-sm-3">
                                 <a className="" id="navbar_store_logo" mptrackaction="store:navbar:logo" data-storeid="angelarium" href="javascript:void(0)">
                                    <div className="img_wrp">
                                       {this.state?.getListUser?.profile_pic === '' || this.state?.getListUser?.profile_pic === null || this.state?.getListUser?.profile_pic === undefined ?
                                          <img style={{ height: '96px', width: '96px' }} src='images/noimage.png' />
                                          : <img style={{ height: '96px', width: '96px' }} src={`${config.imageUrl1}${this.state?.getListUser?.profile_pic}`} />
                                       }
                                    </div>
                                 </a>
                              </div>
                              <div className="col-sm-9">
                                 <div className="follow-banner row ml-0 pl-lg-1">
                                    <div className="col-12 mb-2 pl-lg-2">
                                       <a mptrackaction="store:navbar:logo" data-storeid="angelarium" href="javascript:void(0)">
                                          <h3 className="follow-exp mt-1 mt-md-0 mb-0 ">
                                             {this.state.getListUser?.full_name}
                                          </h3>
                                       </a>
                                    </div>
                                    <div className="col-12 mb-2 pl-md-2 pl-0 pt-1 pt-md-0">
                                       <a href="javascript:void(0)" className="all_followers"><span className="follower_count">{this.state?.getListUser?.follower_count}</span> Followers</a> &nbsp;

                                       <a href="javascript:void(0)" className="all_following"><span className="following_count">{this.state.getListUser?.folling_count}</span> Following</a> &nbsp;
                                       <a href="javascript:void(0)" className="learn-more-tooltip " data-toggle="tooltip" >{this.state.getListUser?.view_count} Views</a>
                                    </div>
                                    {this.loginData?.data?.id == this.user_id
                                       ? ''
                                       :
                                       <div className="col-12 pl-md-2 pl-0 pt-1 pt-md-0">
                                          <form method="POST" className="user_follow_form">
                                             <input type="hidden" name="csrfmiddlewaretoken" value="" />
                                             <input type="hidden" name="delete" className="delete-follow" value="0" />
                                             {this.state.getListUser?.is_follow === 0
                                                ?
                                                <button type="button" className="btn size-1 color-5 " onClick={this.followAPI.bind(this, 'follow')}>Follow</button>
                                                :
                                                <button type="button" className="btn size-1 color-5 " onClick={this.followAPI.bind(this, 'unfollow')}>Unfollow</button>
                                             }
                                          </form>
                                       </div>
                                    }
                                 </div>
                              </div>
                           </div>
                           <div className="col-md-6 text-right">
                              <div className="mt-5">
                                 {this.loginData?.data?.id == this.user_id
                                    ?
                                    <>
                                       {/* <div style={{textTransform:'inherit'}} onClick={this.openDiv.bind(this,'collection')} className="new-collection text-white btn btn-primary" data-toggle="modal" data-target="#new-collection">
                              <span>New Collection</span>
                           </div> */}
                                       {/* onClick={this.openDiv.bind(this,'NFTs')} */}

                                       {/* {(this.state.ConnectWalletAddress) ? */}
                                       <>
                                          <div style={{ textTransform: 'inherit' }} className="new-collection text-white pull-right btn btn-primary" data-toggle="modal" data-target="#add-collection">
                                             <span>Create Real Estate</span>
                                          </div>
                                          {/* <a style={{ textTransform: 'inherit', border: '2px solid #3358c8', borderRadius: '15px' }} className="new-collection text-white pull-right btn" target="_blank" href={`https://etherscan.io/address/${this.state.ConnectWalletAddress}`}>{this.state.ConnectWalletAddress.toString().substring(0, 8) + '...' + this.state.ConnectWalletAddress.toString().substr(this.state.ConnectWalletAddress.length - 8)}</a> */}
                                       </>
                                       {/* :
                                          <a onClick={this.connectMetasmask.bind(this)} className="new-collection text-white pull-right btn btn-primary" href="javascript:void(0)" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Create Real Estate</a>
                                       } */}
                                    </> : ''

                                 }
                              </div>
                           </div>
                        </div>


                        {/* //=================  Add new collcetion  ================= */}

                        {this.state.collectionOpen === 1 ?
                           <div className="col-sm-12">
                              <div className="row">
                                 <div className="col-md-12">
                                    <hr />
                                 </div>

                                 <div className="col-md-2"></div>
                                 <div className="col-md-8">
                                    <br />
                                    <h3 className="text-center w-100 text-white">Add a New Collection</h3>
                                    <form id="add_category_form" onSubmit={this.submitForm} >
                                       <div className="row p-3">
                                          <div className="col-12 px-3 d-none error-message">
                                             <div className="alert alert-danger mb-3 error-message-content" role="alert">
                                             </div>
                                          </div>

                                          <div className="col-12 mb-3">
                                             <div className="form-group">
                                                <input className="form-input" type="text" name="nameCollection" placeholder="Collection Name"
                                                   onChange={this.onChange} value={this.state.nameCollection} />
                                                <span className="error-asterick"> {this.state.nameErrorCollection}</span>

                                             </div>
                                          </div>
                                          <div className="input-col col-12 mb-3">
                                             <div className="form-group focus-2 mb-0">
                                                <textarea className="form-input" onChange={this.onChange} value={this.state.descriptionCollection}
                                                   name="descriptionCollection" placeholder="Description"></textarea>
                                                <span className="error-asterick"> {this.state.descriptionErrorCollection}</span>

                                             </div>
                                          </div>


                                          <div className="col-12">

                                             <input type="submit" className="btn-primary btn size-1 col-sm-12 btn-lg" value="Add" />

                                          </div>
                                       </div>

                                       <input type="hidden" name="category_type" value="2" />
                                       <input type="hidden" id="add_category_url" value="/store/categories/" />
                                    </form>

                                 </div>
                                 <div className="col-md-2"></div>
                              </div>
                           </div>
                           : ''
                        }



                        {/* //=========================  Add product  ====================== */}

                        {this.state.nftopen === 1 ?
                           <div className="col-sm-12">
                              <div className="row addNfts-label">
                                 <div className="col-md-12">
                                    <hr />
                                 </div>

                                 <div className="col-md-1"></div>
                                 <div className="col-md-10">
                                    <br />
                                    <h3 className="text-center w-100 text-white">Add NFTs</h3>
                                    <div className="">

                                       <div className="p-5">
                                          <div className="row">
                                             <div className="input-col col-xs-12 col-sm-6 image-uploaddata">
                                                <div className="form-group focus-2">

                                                   {/* <a className="be-ava-user style-2" href="#"> */}
                                                   {this.state.image_preview === '' ?
                                                      <img src="images/productdefault.webp" style={{ height: '115px', width: '115px' }} alt="" className="btn-rounded" />
                                                      : <img src={this.state.image_preview} style={{ height: '115px', width: '115px' }} alt="" className="btn-rounded" />
                                                   }

                                                   {/* </a> */}
                                                   <br />
                                                   <input className="hidden" id="files" type="file" accept=".jpg,.jpeg,.png" onChange={this.handleImagePreview} style={{ marginTop: '10px', display: 'none' }} multiple />
                                                   <label for="files">Select file</label>

                                                   <span className="error-asterick"> {this.state.imageError}</span>
                                                </div>
                                             </div>
                                             <div className="input-col col-xs-12 col-sm-12">
                                                <div className="form-group fg_icon focus-2">
                                                   <div className="form-label">Title <span className="error-asterick">*</span></div>
                                                   <input className="form-input" type="text" value={this.state.name} name="name"
                                                      onChange={this.onChange} placeholder="Title" />
                                                   {/* {console.log('',this.state.name)} */}
                                                   <span className="error-asterick"> {this.state.nameError}</span>

                                                </div>
                                             </div>

                                             <div className="input-col col-xs-6 col-sm-6">
                                                <div className="form-group fg_icon focus-2">
                                                   <div className="form-label">Category Name <span className="error-asterick">*</span></div>
                                                   <select className="" name="item_category_id" onChange={this.onChange}
                                                      value={this.state.item_category_id} className="form-input" >
                                                      <option selected="selected" value="">Select Category</option>

                                                      {this.state.getcategoryData.map(item => (
                                                         <option value={item.id}>{item.name}</option>
                                                      ))}
                                                   </select>
                                                   <span className="error-asterick">  {this.state.categoryNameError}</span>
                                                </div>
                                             </div>

                                             <div className="input-col col-xs-6 col-sm-6">
                                                <div className="form-group fg_icon focus-2">
                                                   <div className="form-label">Collection Name <span className="error-asterick">*</span></div>
                                                   {this.state.collectionShow === 1 ?
                                                      <div className="form-input" style={{ border: '1px solid #000' }}>
                                                         <a href="javascript:void(0)" onClick={this.openDiv.bind(this, 'collection')}>You can add collection from this link</a></div>
                                                      :
                                                      <select className="" name="user_collection_id" onChange={this.onChange}
                                                         value={this.state.user_collection_id} className="form-input" >
                                                         <option selected="selected" value="">Select Collection</option>
                                                         {this.state.getUserCollectionData.map(item => (
                                                            <option value={item.id}>{item.name}</option>
                                                         ))}
                                                      </select>
                                                   }


                                                   <span className="error-asterick"> {this.state.collectionNameError}</span>
                                                </div>
                                             </div>

                                             <div className="input-col col-xs-6 col-sm-6">
                                                <div className="form-group fg_icon focus-2">
                                                   <div className="form-label">Sell Type <span className="error-asterick">*</span></div>
                                                   <select className="" name="sell_type" onChange={this.onChange}
                                                      value={this.state.sell_type} className="form-input" >
                                                      <option selected="selected" value="">Select Type</option>

                                                      <option value="1">Price</option>
                                                      <option value="2">Auction</option>


                                                   </select>
                                                   <span className="error-asterick">{this.state.sellTypeError}</span>
                                                </div>
                                             </div>

                                             {/* <div className="input-col col-xs-6 col-sm-6">
               <div className="form-group fg_icon focus-2">
                  <div className="form-label">Edition Type <span className="error-asterick">*</span></div>
                  <select className="" name="edition_type" onChange={this.onChange} 
                  value={this.state.edition_type} className="form-input" >
                     <option selected="selected" value="">Select Type</option>

                        <option value="1">Limited Edition</option>
                        <option value="2">Open Edition</option>

                  
                  </select>
                  <span className="error-asterick">{this.state.editionTypeError}</span>
               </div>              
            </div> */}

                                             <div className="input-col col-xs-6 col-sm-6">
                                                <div className="form-group focus-2">
                                                   <div className="form-label">Price (in USD) <span className="error-asterick">*</span></div>
                                                   <input className="form-input" type="number" onKeyDown={this.formatInput} value={this.state.price} name="price" placeholder="Price"
                                                      onChange={this.onChange} />
                                                   <span className="error-asterick">{this.state.priceError}</span>
                                                </div>
                                             </div>

                                             <div className="input-col col-xs-6 col-sm-6">
                                                <div className="form-group focus-2 description-field">
                                                   <div className="form-label">NFT Description <span className="error-asterick">*</span></div>
                                                   <textarea className="form-input" value={this.state.description} name="description" placeholder="Description"
                                                      onChange={this.onChange}></textarea>
                                                   <span className="error-asterick"> {this.state.descriptionError}</span>
                                                </div>
                                             </div>



                                             <div className="input-col col-xs-12 col-sm-12">
                                                <div className="form-group focus-2">
                                                   <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" onChange={this.onChange} />
                                                   <label className="label-checkbox100" for="ckb1">For Upcoming Drops</label>


                                                </div>
                                             </div>

                                             {this.state.dateShow === 1 ?
                                                <>
                                                   <div className="input-col col-xs-12 col-sm-6">
                                                      <div className="form-group focus-2">
                                                         <div className="form-label">Start Date</div>
                                                         <div className="form-group addnftdate">

                                                            <DatePicker
                                                               selected={this.state.start_date}
                                                               onChange={this.onChange}
                                                               name="start_date"
                                                               dateFormat="MM/dd/yyyy"
                                                            />
                                                            {/* <input type="date" className="form-control" value={this.state.start_date} name="start_date" 
                  onChange={this.onChange}/> */}
                                                         </div>
                                                      </div>
                                                   </div>

                                                   {/* <div className="input-col col-xs-6 col-sm-6">
               <div className="form-group focus-2">
                  <div className="form-label">End Date</div>                 
                  <input type="date" className="form-control" value={this.state.end_date} name="end_date" 
                  onChange={this.onChange}/>
               </div>                
            </div> */}
                                                </>
                                                : ''
                                             }


                                             <div className="input-col col-xs-12">
                                                {this.state.spinLoader === '0' ?
                                                   <button className="btn btn-primary  size-1 btn-right" type="submit"
                                                      onClick={this.nftAdd}>Add</button> :
                                                   <button className="btn btn-primary  size-1 btn-right" disabled>
                                                      Loading
                                                   </button>
                                                }

                                             </div>


                                          </div>


                                       </div>
                                    </div>
                                 </div>
                                 <div className="col-md-1"></div>
                              </div>
                           </div>
                           : ''
                        }

                        {/* //========================== product list  =========================== */}


                        {/* {this.state.productOpen === 1 ?  */}
                        <div className="col-md-12">
                           <br />
                           <div className="tab-wrapper style-1">
                              <div className="tab-nav-wrapper">
                                 <div className="nav-tab  clearfix scrollmenu">
                                    {this.loginData?.data?.id == this.user_id
                                       ?
                                       <>
                                          {/* onClick={this.openDiv.bind(this,'collection')} */}
                                          <div style={{ textTransform: 'inherit' }} className="new-collection text-white" data-toggle="modal" data-target="#new-collection">
                                             <span>+ New Collection</span>
                                          </div>
                                          {/* <div style={{textTransform:'inherit'}} onClick={this.openDiv.bind(this,'NFTs')} className="new-collection text-white btn btn-primary" data-toggle="modal" data-target="#add-collection">
                              <span>Create NFTs</span>
                           </div> */}
                                       </> : ''

                                    }
                                    <div className={`nav-tab-item ${(this.state.activeBtn == '0') ? `active` : ``} `}>
                                       <span onClick={this.collectionAPI.bind(this, '0')}>All</span>
                                    </div>
                                    {this.state.getUserCollectionData.map(item => (
                                       <div className={`nav-tab-item ${(this.state.activeBtn == item.id) ? `active` : ``} `} onClick={this.collectionAPI.bind(this, item.id, item)}>
                                          <span>{item.name}</span>
                                       </div>
                                    ))}

                                 </div>
                              </div>
                              <div className="tabs-content clearfix">
                                 <div className="tab-info active" style={{ display: "block" }}>
                                    {this.loginData.data.id == this.user_id ?
                                       <h4 className="text-white text-center" style={{ display: this.state.collectionName?.name === '' || this.state.collectionName?.name === undefined ? 'none' : 'block' }}>{this.state.collectionName?.name} &nbsp;
                                          <i className="fa fa-pencil pencilcollection" onClick={this.editCollectionAPI.bind(this, this.state.collectionName)} data-toggle="modal" data-target="#edit-collection" style={{ display: this.state.collectionName?.name === '' || this.state.collectionName?.name === undefined ? 'none' : 'contents' }}></i>
                                       </h4> : ''}
                                    <div className=" custom-container ">
                                       <div className="container hot-bid">
                                          <div className="row">

                                             <div className="col-md-12">
                                                <br />
                                                <div className="row _post-container_">
                                                   {this.state.collectionDataArray.length === 0 ? <h3 className="text-center">No Items in this Collection</h3>
                                                      : this.state.collectionDataArray.map(item => (
                                                         <div className="category-2 mix col-md-4">
                                                            <div className="be-post">
                                                            {item.is_sold === 0 ? 
                                                               '':
                                                               <div className="soldOut">
                                                               <img src="images/sold.png"/>
                                                            </div>
                                                            }
                                                               <Link to={item.file_type === 'video' ? '#/' : `${config.baseUrl}itemdetails/${item.item_edition_id}`} className="be-img-block">
                                                                  {item.file_type === 'audio' ?
                                                                     <img src="https://ipfs.io/ipfs/QmcwrJKCnvNuxKP22TpYptN3hM76jmwL6kt4BbieBgCCba" alt="omg" /> : ''
                                                                  }

                                                                  {item.file_type === 'image' ?
                                                                     <img src={`${config.imageUrl}${item.image}`} alt="omg" /> :
                                                                     item.file_type === 'video' ?
                                                                        <Player className="preview_image_data" src={`${config.imageUrl}${item.image}`} /> :
                                                                        <ReactAudioPlayer
                                                                           src={`${config.imageUrl}${item.image}`}

                                                                           controls
                                                                        />
                                                                  }

                                                         {item.is_sold === 1 || item.expiry_date === '0000-00-00 00:00:00' || item.expiry_date === '0000-00-00' ? 
                                                                                    '':
                                                            <div className="timer2">
                                                                                       
                                                                                       <Countdown
                                                                                 date={this.getTimeOfStartDate(item.expiry_date)}
                                                                                 renderer={this.CountdownTimer}
                                                                              />
                                                                              </div>}

                                                               </Link>

                                                               <div className="mb-4">
                                                                  <Link to={`${config.baseUrl}itemdetails/${item.item_edition_id}`} className="be-post-title" style={{ display: "inline" }}>{item.name}</Link>
                                                                  <Link to={`${config.baseUrl}itemdetails/${item.item_edition_id}`} className="be-post-title price">$ {item.price}</Link>
                                                               </div>
                                                               <div className="author-post">
                                                               </div>
                                                            </div>
                                                         </div>

                                                      ))}
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 <br />
                                 <div className="tab-info" style={{ display: "none" }}>
                                    <div className=" custom-container ">
                                       <div className="container hot-bid">
                                          <div className="row">

                                             <div className="col-md-12">
                                                <br />
                                                <div className="row _post-container_">

                                                   <div className="category-2 mix col-md-4">
                                                      <div className="be-post">
                                                         <a href="#page2.html" className="be-img-block">
                                                            <img src="images/p2.jpg" alt="omg" />
                                                         </a>
                                                         <a href="#page2.html" className="be-post-title">Treebeard</a>
                                                         <span>
                                                         </span>
                                                         <div className="author-post">
                                                         </div>
                                                      </div>
                                                   </div>
                                                   <div className="category-3 mix col-md-4">
                                                      <div className="be-post">
                                                         <a href="#page3.html" className="be-img-block">
                                                            <img src="images/p3.jpg" alt="omg" />
                                                         </a>
                                                         <a href="#page3.html" className="be-post-title">Colors of Ramadan</a>
                                                         <span>
                                                         </span>
                                                         <div className="author-post">
                                                         </div>
                                                      </div>
                                                   </div>
                                                   <div className="category-4 mix col-md-4">
                                                      <div className="be-post">
                                                         <a href="#page1.html" className="be-img-block">
                                                            <img src="images/p4.jpg" alt="omg" />
                                                         </a>
                                                         <a href="#page1.html" className="be-post-title">Leaving Home - L'Officiel Ukraine</a>
                                                         <span>
                                                         </span>
                                                         <div className="author-post">
                                                         </div>
                                                      </div>
                                                   </div>
                                                   <div className="category-2 mix col-md-4">
                                                      <div className="be-post">
                                                         <a href="#page2.html" className="be-img-block">
                                                            <img src="images/p10.jpg" alt="omg" />
                                                         </a>
                                                         <a href="#page2.html" className="be-post-title">Treebeard</a>
                                                         <span>
                                                         </span>
                                                         <div className="author-post">
                                                         </div>
                                                      </div>
                                                   </div>
                                                   <div className="category-3 mix col-md-4">
                                                      <div className="be-post">
                                                         <a href="#page3.html" className="be-img-block">
                                                            <img src="images/p9.jpg" alt="omg" />
                                                         </a>
                                                         <a href="#page3.html" className="be-post-title">Colors of Ramadan</a>
                                                         <span>
                                                         </span>
                                                         <div className="author-post">
                                                         </div>
                                                      </div>
                                                   </div>
                                                   <div className="category-4 mix col-md-4">
                                                      <div className="be-post">
                                                         <a href="#page1.html" className="be-img-block">
                                                            <img src="images/p8.jpg" alt="omg" />
                                                         </a>
                                                         <a href="#page1.html" className="be-post-title">Leaving Home - L'Officiel Ukraine</a>
                                                         <span>
                                                         </span>
                                                         <div className="author-post">
                                                         </div>
                                                      </div>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="tab-info" style={{ display: "none" }}>
                                    <div className="row">
                                       <div className="col-ml-12 col-xs-12 col-md-12">
                                          <div className="table-responsive">
                                             <table id="default-ordering" className="table" style={{ width: "100%" }}>
                                                <thead>
                                                   <tr>
                                                      <th>S.no</th>
                                                      <th>Product image</th>
                                                      <th>Product Name</th>
                                                      <th>Product Price</th>
                                                      <th>Product unit</th>

                                                   </tr>
                                                </thead>
                                                <tbody>
                                                   <tr>
                                                      <td>1</td>
                                                      <td><img src="https://tv-inventory.s3.eu-west-2.amazonaws.com/terravirtuaart/images/small/asw_rsq_5.png" className="profile-img" alt="avatar" width="64px" /></td>
                                                      <td>Goona</td>
                                                      <td>$200</td>
                                                      <td>2</td>

                                                   </tr>
                                                   <tr>
                                                      <td>2</td>
                                                      <td><img src="https://tv-inventory.s3.eu-west-2.amazonaws.com/terravirtuaart/images/small/asw_rsq_5.png" className="profile-img" alt="avatar" width="64px" /></td>
                                                      <td>Goona</td>
                                                      <td>$300</td>
                                                      <td>3</td>

                                                   </tr>
                                                   <tr>
                                                      <td>3</td>
                                                      <td><img src="https://tv-inventory.s3.eu-west-2.amazonaws.com/terravirtuaart/images/small/asw_rsq_5.png" className="profile-img" alt="avatar" width="64px" /></td>
                                                      <td>Goona</td>
                                                      <td>$400</td>
                                                      <td>4</td>

                                                   </tr>
                                                   <tr>
                                                      <td>4</td>
                                                      <td><img src="https://tv-inventory.s3.eu-west-2.amazonaws.com/terravirtuaart/images/small/asw_rsq_5.png" className="profile-img" alt="avatar" width="64px" /></td>
                                                      <td>Goona</td>
                                                      <td>$500</td>
                                                      <td>5</td>

                                                   </tr>
                                                   <tr>
                                                      <td>5</td>
                                                      <td><img src="https://tv-inventory.s3.eu-west-2.amazonaws.com/terravirtuaart/images/small/asw_rsq_5.png" className="profile-img" alt="avatar" width="64px" /></td>
                                                      <td>Goona</td>
                                                      <td>$600</td>
                                                      <td>6</td>

                                                   </tr>
                                                </tbody>
                                             </table>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="tab-info" style={{ display: "none" }}>
                                    <div className="col-sm-12">
                                       <div className="table-responsive">
                                          <table id="default-ordering" className="table" style={{ width: "100%" }}>
                                             <thead>
                                                <tr>
                                                   <th>S.no</th>
                                                   <th>Product image</th>
                                                   <th>Product Name</th>
                                                   <th>Product Price</th>
                                                   <th>Product unit</th>

                                                </tr>
                                             </thead>
                                             <tbody>
                                                <tr>
                                                   <td>1</td>
                                                   <td><img src="https://tv-inventory.s3.eu-west-2.amazonaws.com/terravirtuaart/images/small/asw_rsq_5.png" className="profile-img" alt="avatar" width="64px" /></td>
                                                   <td>Goona</td>
                                                   <td>$200</td>
                                                   <td>2</td>

                                                </tr>
                                                <tr>
                                                   <td>2</td>
                                                   <td><img src="https://tv-inventory.s3.eu-west-2.amazonaws.com/terravirtuaart/images/small/asw_rsq_5.png" className="profile-img" alt="avatar" width="64px" /></td>
                                                   <td>Goona</td>
                                                   <td>$300</td>
                                                   <td>3</td>

                                                </tr>
                                                <tr>
                                                   <td>3</td>
                                                   <td><img src="https://tv-inventory.s3.eu-west-2.amazonaws.com/terravirtuaart/images/small/asw_rsq_5.png" className="profile-img" alt="avatar" width="64px" /></td>
                                                   <td>Goona</td>
                                                   <td>$400</td>
                                                   <td>4</td>

                                                </tr>
                                                <tr>
                                                   <td>4</td>
                                                   <td><img src="https://tv-inventory.s3.eu-west-2.amazonaws.com/terravirtuaart/images/small/asw_rsq_5.png" className="profile-img" alt="avatar" width="64px" /></td>
                                                   <td>Goona</td>
                                                   <td>$500</td>
                                                   <td>5</td>

                                                </tr>
                                                <tr>
                                                   <td>5</td>
                                                   <td><img src="https://tv-inventory.s3.eu-west-2.amazonaws.com/terravirtuaart/images/small/asw_rsq_5.png" className="profile-img" alt="avatar" width="64px" /></td>
                                                   <td>Goona</td>
                                                   <td>$600</td>
                                                   <td>6</td>

                                                </tr>
                                             </tbody>
                                          </table>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        {/* :''
} */}



                     </div>
                  </div>
               </div>


            </div>
            <br />
            {/* </div> */}


            {/* // modalS */}

            <div id="new-collection" className="modal fade" role="dialog" style={{ display: "none" }} style={{ background: 'rgb(6, 6, 6)' }}
               data-backdrop="false" aria-hidden="false">
               <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                     <div className="modal-header">
                        <h4 className="modal-title  text-center w-100">Add a New Collection</h4>
                        <button type="button" className="close" onClick={this.loading.bind(this)} data-dismiss="modal">×</button>
                     </div>
                     <form id="add_category_form" onSubmit={this.submitForm} >
                        <div className="row p-3">
                           <div className="col-12 px-3 d-none error-message">
                              <div className="alert alert-danger mb-3 error-message-content" role="alert">
                              </div>
                           </div>

                           <div className="col-12 mb-3">
                              <div className="form-group">
                                 <input className="form-input" type="text" name="nameCollection" placeholder="Collection Name"
                                    onChange={this.onChange} value={this.state.nameCollection} />
                                 <span className="error-asterick"> {this.state.nameErrorCollection}</span>

                              </div>
                           </div>
                           <div className="input-col col-12 mb-3">
                              <div className="form-group focus-2 mb-0">
                                 <textarea className="form-input" onChange={this.onChange} value={this.state.descriptionCollection}
                                    name="descriptionCollection" placeholder="Description"></textarea>
                                 <span className="error-asterick"> {this.state.descriptionErrorCollection}</span>

                              </div>
                           </div>


                           <div className="col-12">

                              <input type="submit" className="btn-primary btn size-1 col-sm-12 btn-lg" value="Add" />

                           </div>
                        </div>

                        <input type="hidden" name="category_type" value="2" />
                        <input type="hidden" id="add_category_url" value="/store/categories/" />
                     </form>

                  </div>
               </div>
            </div>

            <div id="add-collection" className="modal fade" role="dialog" style={{ display: "none" }} aria-hidden="true" data-backdrop="false" style={{ background: 'rgb(6, 6, 6)' }}
               data-backdrop="false">
               <div className="modal-dialog modal-dialog-centered modal-lg">
                  <div className="modal-content">
                     <div className="modal-header">
                        <h4 className="modal-title  text-center w-100">Real Estate NFT </h4>
                        <button type="button" onClick={this.loading.bind(this)} className="close" data-dismiss="modal">×</button>
                     </div>
                     <div className="">
                        {this.state.paymentShow === 0 ?


                           <div className="p-5">
                              <div className="row">
                                 <div className="row">

                                    <div className="form-label" style={{ marginLeft: '40px' }}>Main Image <span className="error-asterick">*</span></div>
                                    <div className="input-col col-xs-12 col-sm-3">
                                       <div className="form-group focus-2 mb-0 audioNft">

                                          {/* {this.state.image_previewMain === '' ?
                    <img src="images/nftlogo.png" style={{ height: '115px', width: '115px', objectFit: 'contain' }} alt="" className="btn-rounded" />:
                      this.state.file_type === 'image' ? 
                    <img src={this.state.image_previewMain} style={{height:'115px',width:'115px'}} alt="" className="btn-rounded"/>
                    :
                    this.state.file_type === 'video'?
                    <Player className="preview_image_data" src={(this.state.image_previewMain)}/> :
                    this.state.file_type === 'audio'?
                    <ReactAudioPlayer
                     src={(this.state.image_previewMain)}
                  
                     controls
                     /> :''                   
                  }  */}
                                          <img src="images/nftlogo.png" style={{ height: '115px', width: '115px', objectFit: 'contain' }} alt="" className="btn-rounded" />


                                       </div>
                                    </div>
                                    <div className="input-col col-xs-12 col-sm-6 image-uploaddata">
                                       <div className="form-group focus-2">



                                          <br />
                                          <input className="form-input" type="file" accept=".jpg,.jpeg,.png,.gif,.mp3,.mp4" onChange={this.handleImagePreviewMain} style={{ marginTop: '10px' }} />
                                          <p>( jpg, jpeg, png, gif, mp3, mp4)</p>
                                          <span className="error-asterick"> {this.state.imageErrorMain}</span>
                                       </div>
                                    </div>
                                 </div>

                                 <div className="row">
                                    <div className="form-label" style={{ marginLeft: '40px' }}>Gallery Image (Max size limit 5MB) <span title="You can customize the order of image."><i style={{fontSize:'16px',cursor:'pointer'}} className="fa fa-question-circle" aria-hidden="true"></i>
 </span> <span className="error-asterick">*</span></div>
                                    <div className="input-col col-xs-12 col-sm-3">
                                       <div className="form-group focus-2 mb-0 audioNft">

                                          {/* {this.state.image_preview === '' ?
                    : 
                    //   this.state.file_type == 'image' ? 
                  //   <img src={this.state.image_preview} style={{height:'115px',width:'115px'}} alt="" className="btn-rounded"/>
                  //   :
                  //   this.state.file_type == 'video'?
                  //   <Player className="preview_image_data" src={(this.state.image_preview)}/> :
                  //   <ReactAudioPlayer
                  //    src={(this.state.image_preview)}
                  
                  //    controls
                  //    />                    
                  // } */}
                                          <img src="images/nftlogo.png" style={{ height: '115px', width: '115px', objectFit: 'contain' }} alt="" className="btn-rounded" />


                                       </div>
                                    </div>
                                    <div className="input-col col-xs-12 col-sm-6 image-uploaddata">
                                       <div className="form-group focus-2">



                                          <br />
                                          {/* {this.state.largeImageSizeError === 0 ?  */}
                                          <input className="form-input" type="file" accept=".jpg,.jpeg,.png,.gif" onChange={this.handleImagePreview} style={{ marginTop: '10px' }} multiple />
                                          {/* : */}
                                          {/* <input className="form-input" type="file" id="files" accept=".jpg,.jpeg,.png,.gif" onChange={this.handleImagePreview} style={{marginTop:'10px'}} multiple/>     */}
                                          {/* } */}
                                          {/* <dragData/> */}
                                             <div>
                                          {(this.state.image_preview) ?
                                             <DragDropContext onDragEnd={this.onDragEnd}>
                                                <Droppable droppableId="droppable" direction="horizontal">
                                                   {(provided, snapshot) => (
                                                      <div
                                                         ref={provided.innerRef}
                                                         style={getListStyle(snapshot.isDraggingOver)}
                                                         {...provided.droppableProps}
                                                      >
                                                         {this.state.items.map((item, index) => (
                                                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                                               {(provided, snapshot) => (
                                                                  <div
                                                                     ref={provided.innerRef}
                                                                     {...provided.draggableProps}
                                                                     {...provided.dragHandleProps}
                                                                     style={getItemStyle(
                                                                        snapshot.isDragging,
                                                                        provided.draggableProps.style
                                                                     )}
                                                                  >
                                                                     {/* {item.content} */}
                                                                     <img src={this.state.image_preview[index]} width="50" />
                                                                  </div>
                                                               )}
                                                            </Draggable>
                                                         ))}
                                                         {provided.placeholder}
                                                      </div>
                                                   )}
                                                </Droppable>
                                             </DragDropContext>
                                             : ''}
                                             </div>

                                          <p>( jpg, jpeg, png, gif)</p>
                                          <span className="error-asterick"> {this.state.imageError} &nbsp;{this.state.largeImageSizeError === 0 ? '' :
                                             ('Image size should be less than 5MB')}</span>
                                       </div>
                                    </div>
                                 </div>


                                 <div className="row">
                                    <div className="form-label" style={{ marginLeft: '40px' }}>Title Deed <span className="error-asterick">*</span></div>

                                    <div className="input-col col-xs-12 col-sm-3">
                                       <div className="form-group focus-2 mb-0">

                                          {this.state.image_previewtitle_deed === '' ?
                                             <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7N3o9uY176gUMll-_hGgtmbW5LisG_9UD7w&usqp=CAU" style={{ height: '115px', width: '115px', objectFit: 'contain' }} alt="" className="btn-rounded" />
                                             : <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7N3o9uY176gUMll-_hGgtmbW5LisG_9UD7w&usqp=CAU" style={{ height: '115px', width: '115px' }} alt="" className="btn-rounded" />
                                          }


                                       </div>
                                    </div>
                                    <div className="input-col col-xs-12 col-sm-6 image-uploaddata" >
                                       <div className="form-group focus-2">



                                          <br />
                                          <input className="form-input" type="file" accept=".zip,.pdf,.doc.,docx,.jpg,.jpeg,.png" onChange={this.handleImagePreviewtitledeed} style={{ marginTop: '10px' }} />
                                          <p>( zip, pdf, doc, jpg, jpeg, png)</p>
                                          <span className="error-asterick"> {this.state.image_filetitle_deedError}</span>
                                       </div>
                                    </div>
                                 </div>

                                 <div className="row">
                                    <div className="form-label" style={{ marginLeft: '40px' }}>Passport <span className="error-asterick">*</span></div>

                                    <div className="input-col col-xs-12 col-sm-3">
                                       <div className="form-group focus-2 mb-0">

                                          {/* {this.state.image_previewpassport === '' ? */}
                                          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT34flVmWg-SlL2iUAhnfk-M08UTA7g8DZ5ow&usqp=CAU" style={{ height: '115px', width: '115px', objectFit: 'contain' }} alt="" className="btn-rounded" />
                                          {/* : <img src={this.state.image_previewpassport} style={{ height: '115px', width: '115px', objectFit: 'contain' }} alt="" className="btn-rounded" /> */}
                                          {/* } */}


                                       </div>
                                    </div>
                                    <div className="input-col col-xs-12 col-sm-6 image-uploaddata">
                                       <div className="form-group focus-2">



                                          <br />
                                          <input className="form-input" type="file" accept=".png,.jpg,.jpeg,.zip,.pdf,.doc,.docx" onChange={this.handleImagePreviewpassport} style={{ marginTop: '10px' }} />
                                          <p>( png, jpg, jpeg, zip, pdf, doc)</p>
                                          <span className="error-asterick"> {this.state.image_filepassportError}</span>
                                       </div>
                                    </div>
                                 </div>


                                 <div className="input-col col-xs-12 col-sm-12">
                                    <div className="form-group fg_icon focus-2">
                                       <div className="form-label">Title <span className="error-asterick">*</span></div>
                                       <input className="form-input" type="text" value={this.state.name} name="name"
                                          onChange={this.onChange} placeholder="Title" />
                                       <span className="error-asterick"> {this.state.nameError}</span>

                                    </div>
                                 </div>

                                 <div className="input-col col-xs-6 col-sm-6">
                                    <div className="form-group fg_icon focus-2">
                                       <div className="form-label">Category Name <span className="error-asterick">*</span></div>
                                       <select className="" name="item_category_id" onChange={this.onChange}
                                          value={this.state.item_category_id} className="form-input" >
                                          <option selected="selected" value="">Select Category</option>

                                          {this.state.getcategoryData.map(item => (
                                             <option value={item.id}>{item.name}</option>
                                          ))}
                                       </select>
                                       <span className="error-asterick">  {this.state.categoryNameError}</span>
                                    </div>
                                 </div>

                                 <div className="input-col col-xs-6 col-sm-6">
                                    <div className="form-group fg_icon focus-2">
                                       <div className="form-label">Collection Name <span className="error-asterick">*</span></div>
                                       <select className="" name="user_collection_id" onChange={this.onChange}
                                          value={this.state.user_collection_id} className="form-input" >
                                          <option selected="selected" value="">Select Collection</option>
                                          {this.state.getUserCollectionData.map(item => (
                                             <option value={item.id}>{item.name}</option>
                                          ))}
                                       </select>
                                       <span className="error-asterick"> {this.state.collectionNameError}</span>
                                    </div>
                                 </div>

                                 <div className="input-col col-xs-6 col-sm-6">
                                    <div className="form-group fg_icon focus-2">
                                       <div className="form-label">Sell Type <span className="error-asterick">*</span></div>
                                       <select className="" name="sell_type" onChange={this.onChange}
                                          value={this.state.sell_type} className="form-input" >
                                          <option selected="selected" value="">Select Type</option>

                                          <option value="1">Price</option>
                                          <option value="2">Auction</option>


                                       </select>
                                       <span className="error-asterick">{this.state.sellTypeError}</span>
                                    </div>
                                 </div>

                                 {/* <div className="input-col col-xs-6 col-sm-6">
               <div className="form-group fg_icon focus-2">
                  <div className="form-label">Edition Type <span className="error-asterick">*</span></div>
                  <select className="" name="edition_type" onChange={this.onChange} 
                  value={this.state.edition_type} className="form-input" >
                     <option selected="selected" value="">Select Type</option>

                        <option value="1">Limited Edition</option>
                        <option value="2">Open Edition</option>

                  
                  </select>
                  <span className="error-asterick">{this.state.editionTypeError}</span>
               </div>              
            </div> */}

                                 <div className="input-col col-xs-6 col-sm-6">
                                    <div className="form-group focus-2">
                                       <div className="form-label">Fixed price (in USD) <span className="error-asterick">*</span></div>
                                       <input className="form-input" type="number" value={this.state.price} name="price" placeholder="Price"
                                          onChange={this.onChange} onKeyDown={this.formatInput} />
                                       <span className="error-asterick">{this.state.priceError}</span>
                                    </div>
                                 </div>

                                 <div className="input-col col-xs-12 col-sm-6">
                                    <div className="form-group focus-2 description-field">
                                       <div className="form-label">NFT Description <span className="error-asterick">*</span></div>
                                       <textarea className="form-input" value={this.state.description} name="description" placeholder="Description"
                                          onChange={this.onChange}></textarea>
                                       <span className="error-asterick"> {this.state.descriptionError}</span>
                                    </div>
                                 </div>

                                 <div className="input-col col-xs-12 col-sm-6">
                                    <div className="form-group focus-2">
                                       <div className="form-label">Sale ends <span className="error-asterick">*</span></div>
                                       <div className="form-group addnftdate">
                                          <DatePicker className="form-control"
                                             onChange={this.handleChangeExpiry} minDate={new Date()}

                                             value={this.state.expiry_date}
                                             name="expiry_date"
                                          />
                                          {/* <DatePicker className="form-control"
              selected={ this.state.start_date }
              
              onChange={date => this.handleChange(date) }
              name="start_date"
              dateFormat="MM/dd/yyyy"
          /> */}
                                       </div>
                                       {/* <input type="date" className="form-control" value={this.state.expiry_date} name="expiry_date" 
                  onChange={this.onChange}/> */}
                                       <span className="error-asterick"> {this.state.expiry_dateError}</span>

                                    </div>
                                 </div>

                                 {/* <div className="input-col col-xs-6 col-sm-6">
               <div className="form-group focus-2">
                  <div className="form-label">Quantity</div>  
                
                <input type="number" className="form-control" value={this.state.quantity} name="quantity" 
                onChange={this.onChange} onKeyDown={ this.formatInput }/>
               <span className="error-asterick"> {this.state.quantityError}</span>
               
               </div>                
            </div> */}



                                 <div className="input-col col-xs-12 col-sm-12">
                                    <div className="form-group focus-2">
                                       <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" onChange={this.onChange} />
                                       <label className="label-checkbox100" for="ckb1">For Upcoming Drops</label>


                                    </div>
                                 </div>

                                 {this.state.dateShow === 1 ?
                                    <>
                                       <div className="input-col col-xs-12 col-sm-6">
                                          <div className="form-group focus-2">
                                             <div className="form-label">Start Date</div>
                                             {/* <input type="date" className="form-control" value={this.state.start_date} name="start_date" 
                  onChange={this.onChange}/> */}
                                             <div className="form-group addnftdate">
                                                <DatePicker className="form-control"
                                                   onChange={this.handleChange} minDate={new Date()}

                                                   value={this.state.start_date}
                                                   name="start_date"
                                                />
                                                {/* <DatePicker className="form-control"
              selected={ this.state.start_date }
              
              onChange={date => this.handleChange(date) }
              name="start_date"
              dateFormat="MM/dd/yyyy"
          /> */}
                                             </div>
                                          </div>
                                       </div>

                                       {/* <div className="input-col col-xs-6 col-sm-6">
               <div className="form-group focus-2">
                  <div className="form-label">End Date</div>                 
                  <input type="date" className="form-control" value={this.state.end_date} name="end_date" 
                  onChange={this.onChange}/>
               </div>                
            </div> */}
                                    </> : ''
                                 }


                                 <div className="input-col col-xs-12">
                                    {this.state.spinLoader === '0' ?
                                       <button className="btn btn-primary  size-1 btn-right" type="submit"
                                          onClick={this.nftAdd}>Proceed to payment</button> :
                                       <button className="btn btn-primary  size-1 btn-right" disabled>
                                          Loading
                                       </button>
                                    }

                                 </div>


                              </div>


                           </div>
                           :

                           <div className="tab-wrapper style-1" style={{ padding: '25px', minHeight: '347px' }}>
                              {(this.state.loaderShow) ?
                                 <Loader className="paymentLoaderReal"
                                    type="Bars"
                                    color="#00BFFF"
                                    height={80}
                                    width={80}
                                 /> : ''}
                              <div className="tab-nav-wrapper" style={{ opacity: `${(this.state.loaderShow) ? '0.1' : '1'}` }}>
                                 <div className="nav-tab  clearfix">
                                    {(this.state.loaderShow) ?
                                       <>
                                          <div className={(this.state.etherClickActive) == 0 ? "nav-tab-item active" : "nav-tab-item"} >
                                             <span>Credit Card</span>
                                          </div>
                                          <div className={(this.state.etherClickActive) == 1 ? "nav-tab-item active" : "nav-tab-item"} >
                                             <span className="text-black">Crypto</span>
                                          </div>

                                          {/* <div className={(this.state.etherClickActive) == 2 ? "nav-tab-item active" : "nav-tab-item"} >
                       <span className="text-black">Wallet</span>
                    </div> */}
                                       </>
                                       :
                                       <>
                                          <div className={this.state.etherClickActive == 0 ? "nav-tab-item active" : "nav-tab-item"} onClick={this.etherClick.bind(this, 'cc')}>
                                             <span>Credit Card</span>
                                          </div>
                                          <div className={this.state.etherClickActive == 1 ? "nav-tab-item active" : "nav-tab-item"} onClick={this.etherClick.bind(this, 'Ether')}>
                                             <span className="text-black">Crypto</span>
                                          </div>

                                          <div className={this.state.etherClickActive == 2 ? "nav-tab-item active" : "nav-tab-item"} onClick={this.etherClick.bind(this, 'Wallet')}>
                                             <span className="text-black">Wallet</span>
                                          </div>
                                       </>
                                    }


                                 </div>
                              </div>
                              <div className="tabs-content clearfix">
                                 <div className={this.state.etherClickActive == 0 ? "tab-info" : "tab-info active"} style={{ display: this.state.etherClickActive == 0 ? 'block' : 'none' }}>
                                    <div className="row">
                                       <div className="col-ml-12 col-xs-12 col-sm-12">
                                          <div className="col-12 mt-3">
                                             <p>Price : {this.state.getListUser?.transfer_fee_eth === '' || this.state.getListUser?.transfer_fee_eth === null
                                                || this.state.getListUser?.transfer_fee_eth === undefined || this.state.getListUser?.transfer_fee_eth === 'NaN' ? 0 :
                                                this.state.getListUser?.transfer_fee_eth} ETH ~ ${this.state.getListUser?.transfer_fee_usd === '' || this.state.getListUser?.transfer_fee_usd === null
                                                   || this.state.getListUser?.transfer_fee_usd === undefined || this.state.getListUser?.transfer_fee_usd === 'NaN' ? 0 :
                                                   this.state.getListUser?.transfer_fee_usd}</p>
                                          </div>


                                          <div className="col-12 mt-3">
                                             <div className="input-group">
                                                <input type="number" className="form-control "
                                                   placeholder="Card Number" maxLength={16} name="cardNumber" onChange={this.onChange} value={this.state.cardNumber} />
                                             </div>
                                          </div>

                                          <div className="row">
                                             <div className="col-sm-4 mt-3 mb-2">
                                                <div className="input-group">
                                                   <input type="number" className="form-control "
                                                      placeholder="Exp Month" name="expMonth" onChange={this.onChange} value={this.state.expMonth} />
                                                   {/* <input type="date" className="form-control datepicker " placeholder="12/11/1997" name="Date" /> */}
                                                </div>
                                             </div>

                                             <div className="col-sm-4 mt-3 mb-2">
                                                <div className="input-group">
                                                   <input type="number" className="form-control "
                                                      placeholder="Exp Year" name="expYear" onChange={this.onChange} value={this.state.expYear} />
                                                   {/* <input type="date" className="form-control datepicker " placeholder="12/11/1997" name="Date" required=""/> */}
                                                </div>
                                             </div>



                                             <div className="col-sm-4 mt-3 mb-2">
                                                <div className="input-group">
                                                   <input type="number" className="form-control " placeholder="CVC" name="cvc" onChange={this.onChange} value={this.state.cvc} />
                                                </div>
                                             </div>
                                          </div>

                                          {/* <div className="col-12 text-right mt-1">
<label className="form-check-label">
<input type="checkbox" className="mr-2 remember_card_checkbox" name="remember_card" checked=""/>
Save for future use.
</label>
</div> */}
                                          {this.state.errorMessageSripe === '' ? '' : <p style={{ color: 'red' }}> {this.state.errorMessageSripe}</p>}

                                          <div className="col-12 mt-3">
                                             {this.state.loadingStripe === 0 ?
                                                <button type="submit" className="btn btn-primary col-sm-12 size-1 " disabled={!this.state.cardNumber || !this.state.expYear || !this.state.expMonth || !this.state.cvc} onClick={this.paymentStripeShow} >Pay with card</button> :
                                                <button type="submit" className="btn btn-primary col-sm-12 size-1 " disabled >Processing...</button>

                                             }

                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 <div class={this.state.etherClickActive == 1 ? "tab-info" : "tab-info active"} style={{ display: this.state.etherClickActive == 1 ? 'block' : 'none' }}>

                                    <div className="col-12 nopadding">
                                       <p>Price : {this.state.getListUser?.transfer_fee_eth === '' || this.state.getListUser?.transfer_fee_eth === null
                                          || this.state.getListUser?.transfer_fee_eth === undefined || this.state.getListUser?.transfer_fee_eth === 'NaN' ? 0 :
                                          this.state.getListUser?.transfer_fee_eth} ETH ~ ${this.state.getListUser?.transfer_fee_usd === '' || this.state.getListUser?.transfer_fee_usd === null
                                             || this.state.getListUser?.transfer_fee_usd === undefined || this.state.getListUser?.transfer_fee_usd === 'NaN' ? 0 :
                                             this.state.getListUser?.transfer_fee_usd}</p>
                                       <div className="mt-2">
                                          You need to deposit selected Cryptocurrency to complete your purchase.</div>
                                    </div>
                                    <div className="mt-4">
                                       <div className="col-12 nopadding">
                                          <div className="col-12 nopadding">
                                             {(this.state.loaderShow == false) ?
                                                <button type="submit" className="btn btn-primary col-sm-12 size-1" onClick={this.paymentNetsents} >Pay With crypto</button> :
                                                <button type="submit" className="btn btn-primary col-sm-12 size-1" disabled >Processing...</button>
                                             }

                                          </div>
                                       </div>
                                    </div>
                                 </div>

                                 <div class={this.state.etherClickActive == 2 ? "tab-info" : "tab-info active"} style={{ display: this.state.etherClickActive == 2 ? 'block' : 'none' }}>
                                    <div className="col-12 mt-3">
                                       <p>Price : {this.state.getListUser?.transfer_fee_eth === '' || this.state.getListUser?.transfer_fee_eth === null
                                          || this.state.getListUser?.transfer_fee_eth === undefined || this.state.getListUser?.transfer_fee_eth === 'NaN' ? 0 :
                                          this.state.getListUser?.transfer_fee_eth} ETH ~ ${this.state.getListUser?.transfer_fee_usd === '' || this.state.getListUser?.transfer_fee_usd === null
                                             || this.state.getListUser?.transfer_fee_usd === undefined || this.state.getListUser?.transfer_fee_usd === 'NaN' ? 0 :
                                             this.state.getListUser?.transfer_fee_usd}</p>
                                    </div>
                                    <div className="col-12 mt-3">

                                       <div className="input-group">
                                          Wallet Balance : {this.state.getListUser?.wallet_balance_eth} ETH ~ ${this.state.getListUser?.wallet_balance_usd}
                                       </div>
                                    </div>
                                    <div className="mt-4">
                                       {this.state.errorMessageSripe === '' ? '' : <p style={{ color: 'red' }}> {this.state.errorMessageSripe}</p>}
                                       <div className="col-12 nopadding">
                                          {this.state.loadingStripe === 0 ?
                                             <button type="submit" className="btn btn-primary col-sm-12 size-1" onClick={this.paymentStripeWallet} >Pay with wallet</button> :
                                             <button type="submit" className="btn btn-primary col-sm-12 size-1" disabled >Processing...</button>
                                          }

                                          {/* <span style={{color:'red',fontFamily:'cursive',textAlign:'center'}}>{this.state.ErrorMessage}</span> */}

                                          <div className="my-3 text-center">


                                          </div>
                                       </div>
                                    </div>
                                 </div>

                              </div>
                           </div>

                        }


                     </div>
                  </div>
               </div>
            </div>


            {/* //=========================================  edit collection   =============================== */}


            <div id="edit-collection" className="modal fade" role="dialog" style={{ display: this.state.alertShow === 1 ? 'none' : '', background: 'rgb(6, 6, 6)' }} data-backdrop="false" aria-hidden="false">
               <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                     <div className="modal-header">
                        <h4 className="modal-title  text-center w-100">Edit Collection</h4>
                        <button type="button" className="close" onClick={this.loading.bind(this)} data-dismiss="modal">×</button>
                     </div>
                     <form id="add_category_form" onSubmit={this.editForm} >
                        <div className="row p-3">
                           <div className="col-12 px-3 d-none error-message">
                              <div className="alert alert-danger mb-3 error-message-content" role="alert">
                              </div>
                           </div>

                           <div className="col-12 mb-3">
                              <div className="form-group">
                                 <input className="form-input" type="text" onChange={this.handleChangeCollection} name="name" placeholder="Collection Name"
                                    value={this.state.getSingleUserCollectionData?.name} />
                                 {/* <span className="error-asterick"> {this.state.nameErrorCollection}</span> */}

                              </div>
                           </div>
                           <div className="input-col col-12 mb-3">
                              <div className="form-group focus-2 mb-0">
                                 <textarea className="form-input" onChange={this.handleChangeCollection} name="description"
                                    value={this.state.getSingleUserCollectionData?.description} placeholder="Description"></textarea>
                                 {/* <span className="error-asterick"> {this.state.descriptionErrorCollection}</span> */}

                              </div>
                           </div>


                           <div className="col-12">

                              <input type="submit" className="btn-primary btn size-1 col-sm-12 btn-lg" value="Update" disabled={!this.state.getSingleUserCollectionData?.name || !this.state.getSingleUserCollectionData?.description} onClick={this.updateCollection.bind(this)} />
                              {this.state.deleteShow === 1 ?
                                 <input type="button" className="btn-danger btn size-1 col-sm-12 btn-lg" value="Delete" onClick={this.collectionDelete.bind(this, this.state.collectionName)} />
                                 : ''

                              }


                           </div>
                        </div>

                        <input type="hidden" name="category_type" value="2" />
                        <input type="hidden" id="add_category_url" value="/store/categories/" />
                     </form>

                  </div>
               </div>
            </div>

            <Footer />
         </>
      )
   }
}