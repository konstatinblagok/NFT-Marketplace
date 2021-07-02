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
import Swal from 'sweetalert2';
import DatePicker from 'react-date-picker';
import Web3 from 'web3';
import Loader from "react-loader-spinner";

const headers = {
   'Content-Type': 'application/json'
};

export default class yourpurchase extends Component {

   constructor(props) {
      super(props)
      this.loginData = (!Cookies.get('loginSuccess')) ? [] : JSON.parse(Cookies.get('loginSuccess'));
      
      this.state = {
         ConnectWalletAddress: this.loginData?.data?.user_address,
         talentStatusAPIData: '',
         getUserBidsData: [],
         getUserPurchaseData: [],
         defaultActive: 'Price',
         transactionDetailAPIData: [],
         sellItem: [],
         resellBtnText: false,
         paymentShow: 0,
         loaderShow: false,
         etherClickActive: 0,
         cardNumber: '',
         expMonth: '',
         expYear: '',
         cvc: '',
         errorMessageSripe: '',
         loadingStripe: 0,
         getData:''
      }

      this.columns = [
         {
            key: "Image",
            text: "Image",
            cell: (item) => {
               return (
                  <Link className="weak mr-2 d-inlne-block" to={`${config.baseUrl}itemdetails/${item.item_edition_id}`}
                     target="_blank">
                     {item.file_type === 'image' ?
                        <img src={item.image === null || item.image === '' || item.image === undefined
                           ? 'images/team2.jpg'
                           :
                           `${config.imageUrl}${item.image}`} style={{ width: '60px', height: '60px', borderRadius: '60px' }} /> :
                        item.file_type === 'video' ?
                           <a href={`${config.imageUrl}${item.image}`} target="_blank">
                              <img className="video-css" src="images/youtube-logo2.jpg" />
                           </a> :
                           <a href={`${config.imageUrl}${item.image}`} target="_blank">
                              <img className="video-css" src="images/pngtree-high-sound-vector-icon-png-image_470307.jpg" />
                           </a>
                     }

                  </Link>
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
            text: "Creator",

         },
         {
            key: "bid_price",
            text: "Bid Amount",

            cell: (item) => {
               return (
                  <span>{item.bid_price} VUL</span>
               );
            }
         },

         {
            key: "bid_datetime",
            text: "Date",
            cell: (item) => {
               return (
                
                     <span> {item.bid_datetime}</span>
               );
            }
         },
         {
            key: "status",
            text: "Status",

         },
         {
            key: "Action",
            text: "Action",
            cell: (item) => {
               return (
                  <>
                     {item.status === 'Pending' ?
                        <button onClick={this.bidCancel.bind(this, item)} className="btn btn-danger">Cancel</button> : ''

                     }
                     <Link to={`${config.baseUrl}purchasedetail/${item.transaction_id}`} target="_blank" style={{ textTransform: 'inherit' }} className="btn btn-primary">Detail</Link>
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
                  <Link className="weak mr-2 d-inlne-block" to={`${config.baseUrl}itemdetails/${item.item_edition_id}`}
                     target="_blank">
                     {item.file_type === 'image' ?
                        <img src={item.image === null || item.image === '' || item.image === undefined
                           ? 'images/team2.jpg'
                           :
                           `${config.imageUrl}${item.image}`} style={{ width: '60px', height: '60px', borderRadius: '60px' }} /> :
                        item.file_type === 'video' ?
                           <a href={`${config.imageUrl}${item.image}`} target="_blank">
                              <img className="video-css" src="images/youtube-logo2.jpg" />
                           </a> :
                           <a href={`${config.imageUrl}${item.image}`} target="_blank">
                              <img className="video-css" src="images/pngtree-high-sound-vector-icon-png-image_470307.jpg" />
                           </a>
                     }

                  </Link>
               );
            }
         },
         {
            key: "item_name",
            text: "Name",
            sortable: true,
            cell: (item) => {
               return (
                  <>
                  <span> {item.item_name}</span><br/>
                  {/* <span>Edition: {item.edition_text}</span> */}
                  </>
               );
            }
         },
         {
            key: "creator",
            text: "Creator",

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
            cell: (item) => {
               return (
              

                     <span> {item.purchase_datetime}</span>
                 
               );
            }
         },

         
         {
            key: "Action",
            text: "Action",
            cell: (item) => {
               return (
                  <>
                     {item.transfer_hash === null || item.transfer_hash === '' || item.transfer_hash === undefined ? '' :
                        <a target="_blank" href={item.transfer_hash} style={{ textTransform: 'inherit' }} className="btn btn-primary">Blockchain View</a>

                     }
                     <Link to={`${config.baseUrl}purchasedetail/${item.transaction_id}`} target="_blank" style={{ textTransform: 'inherit' }} className="btn btn-primary">Detail</Link>
                     {/* <a target="_blank" href={item.transfer_hash} style={{textTransform:'inherit'}} className="btn btn-primary">Resell</a> */}
                     {item.is_sold === 1 ?
                        <a href="" onClick={this.clickResell.bind(this, item)} className="btn btn-primary" data-toggle="modal" style={{ textTransform: 'inherit' }} data-target="#modalLoginForm">Resell</a>
                        : ''

                     }
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

      this.handleChangeExpiry = this.handleChangeExpiry.bind(this)
      this.onChange = this.onChange.bind(this)
      this.resellSubmit = this.resellSubmit.bind(this)
      this.resellSubmitAPI = this.resellSubmitAPI.bind(this)
      this.paymentStripeShow = this.paymentStripeShow.bind(this)
      this.paymentStripeWallet = this.paymentStripeWallet.bind(this)
      this.paymentNetsents = this.paymentNetsents.bind(this)
      
      
   }

   componentDidMount() {
      window.scrollTo({ top: 0, behavior: 'smooth' });

      this.talentStatusAPI()
      this.getBidListAPI()
      this.getUserPurchaseAPI()
      
      if (Cookies.get('cryptoPaiment')) {
         if (Cookies.get('cryptoPaiment') === 'success') {
            this.resellSubmitFinal(Cookies.get('resellApiData'));
         } else {
            this.cryptoPaymentFailed();
         }
         Cookies.set('resellItemItemProcess','');
         Cookies.set('resellApiData','');
         Cookies.set('cryptoPaiment', '');
      }


      // setTimeout(() => {
      //    if (window.ethereum) {
      //       const { ethereum } = window;
      //       this.setState({
      //          ConnectWalletAddress: ethereum.selectedAddress
      //       })
      //    }
      // }, 1000);

   }


   handleChangeExpiry(date) {
      this.setState({
         // start_date: new Date(date).setDate(new Date(date).getDate() + 1)
         expiry_date: date
      })
   }

   onChange = e => {
      this.setState({
         [e.target.name]: e.target.value
      })
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

   async cryptoPaymentSucces() {
      var willSearch = await Swal.fire({
         title: 'Payment successful!',
         text: 'Congratulations, you are successfully completed the payment.',
         icon: 'success',
         width: 500,
         confirmButtonColor: '#3085d6',
         allowOutsideClick: false,
         confirmButtonText: 'View Purchased items',
      });

   }
   //=======================================  Bid details  =====================

   async getBidListAPI() {
      await axios({
         method: 'post',
         url: `${config.apiUrl}getUserBids`,
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
   //=======================================  Bid details  =====================

   async getUserPurchaseAPI() {
      await axios({
         method: 'post',
         url: `${config.apiUrl}getUserPurchase`,
         data: { "user_id": this.loginData.data.id }
      })
         .then(result => {
            if (result.data.success === true) {
               this.setState({
                  getData:result.data,
                  getUserPurchaseData: result.data.response,

               })
               
            }
            else if (result.data.success === false) {
            }
         }).catch(err => {
         });
   }


   loading(id) {
      if (id == '1') {
         window.location.href = `${config.baseUrl}authoredit`
      }
      else if (id == '2') {
         window.location.href = `${config.baseUrl}about`
      }
      else if (id == '3') {
         window.location.href = `${config.baseUrl}salehistory`
      }
      else if (id == '4') {
         window.location.href = `${config.baseUrl}yourpurchase`
      }
      else if (id == '5') {
         window.location.href = `${config.baseUrl}paymentsetting`
      }
      else if (id == '6') {
         window.location.href = `${config.baseUrl}featurescreator/${this.loginData.data.id}`

      }
      else if (id == '7') {
         window.location.href = `${config.baseUrl}royalty`
      }

   }

   async talentStatusAPI() {
      await axios({
         method: 'post',
         url: `${config.apiUrl}getTelentStatus`,
         data: { 'user_id': this.loginData.data.id }
      })
         .then(result => {
            if (result.data.success === true) {
               this.setState({
                  talentStatusAPIData: result.data.response[0]
               })
            }
            else if (result.data.success === false) {
            }
         }).catch(err => {
         });
   }



   clickResell(item) {
      this.setState({
         sellItem: item
      })
   }

   async resellSubmit() {
      this.setState({
         resellBtnText: true
      })

      let getContractDeatils = await axios(`${config.apiUrl}getContractDeatils`);
      if (!getContractDeatils.data.blockchainNetwork) {
         toast.error('Contract details not found!', {
            position: toast.POSITION.TOP_CENTER
         });
         return false;
      }
      let blockchainNetwork = getContractDeatils.data.blockchainNetwork;
      let fromAddress = this.state.ConnectWalletAddress;
      let tokenId = this.state.sellItem.item_id;//332555;
      let amount = 1;
      let contractAddress = getContractDeatils.data.contractAddress;
      let to_address = getContractDeatils.data.adminAddress;
      let token_owner_address = fromAddress;


      var web3 = new Web3(window.ethereum);

      var currentNetwork = web3.currentProvider.chainId;
      if (currentNetwork !== '0x3' && blockchainNetwork == 'testnet') {
         toast.error(`Please select ropsten testnet network !`, {
            position: toast.POSITION.TOP_CENTER
         });
         this.setState({
            resellBtnText: false
         })
         return false;
      }

      if (currentNetwork !== '0x1' && blockchainNetwork == 'mainnet') {
         toast.error(`Please select Ethereum mainnet network !`, {
            position: toast.POSITION.TOP_CENTER
         });
         this.setState({
            resellBtnText: false
         })
         return false;
      }
      try {

         var chainId = currentNetwork;

         const contract = await new web3.eth.Contract(config.abi, contractAddress);
         let count = await web3.eth.getTransactionCount(fromAddress);

         web3.eth.defaultAccount = fromAddress;

         const tx_builder = await contract.methods.safeTransferFrom(token_owner_address, to_address, tokenId, amount, '0x7B502C3A1F48C8609AE212CDFB639DEE39673F5E');

         let encoded_tx = tx_builder.encodeABI();

         let gasPrice = await web3.eth.getGasPrice();

         let gasLimit = await web3.eth.estimateGas({
            from: fromAddress,
            nonce: web3.utils.toHex(count),
            gasPrice: web3.utils.toHex(gasPrice),
            to: contractAddress,
            data: encoded_tx,
            chainId: chainId,
         });

         

         let transactionObject = {
            nonce: web3.utils.toHex(count),
            from: fromAddress,
            gasPrice: web3.utils.toHex(gasPrice),
            gasLimit: web3.utils.toHex(gasLimit),
            to: contractAddress,
            data: encoded_tx,
            value: 0,
            chainId: chainId,
         };

         const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionObject],
         });
         if (txHash) {
            this.resellSubmitAPI(txHash);
         }
      } catch (e) {

         toast.error(e.message, {
            position: toast.POSITION.TOP_CENTER
         });

         this.setState({
            resellBtnText: false
         })
      }
   }
  
  
   async resellSubmitAPI(e) {
      e.preventDefault()
      this.setState({
         paymentShow: 1
      })

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


   //==========================================  Delete Post  ================================

   async bidCancel(id) {

      confirmAlert({
         title: 'Confirm to submit',
         message: 'Are you sure to delete this.',
         buttons: [
            {
               label: 'Yes',
               onClick: () =>
                  axios({
                     method: 'post',
                     url: `${config.apiUrl}/rejectBid`,
                     headers: { "Authorization": this.loginData?.Token },
                     data: { "email":this.loginData.data.user_email,'bid_id': id.bid_id }
                  }).then((res) => {
                     this.componentDidMount()

                  }).catch((error) => {
                  })
            },
            {
               label: 'No',
            }
         ]
      });

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
         data: {
            "email":this.loginData.data.user_email,"user_id": this.loginData.data.id, "amount": this.state.getData?.resale_charges, "cardNumber": this.state.cardNumber, "expMonth": this.state.expMonth,
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
               this.resellSubmitFinal()
               
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
      if (parseFloat(this.state.getData?.resale_charges) > parseFloat(this.state.getListUser?.wallet_balance_usd)) {
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
            data: {"email":this.loginData.data.user_email, "user_id": this.loginData.data.id, "amount": this.state.getData?.resale_charges }
         })
            .then(result => {
               if (result.data.success === true) {

                  this.setState({
                     loadingStripe: 0,
                     loaderShow: false
                  })
                  this.resellSubmitFinal()

                  
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


    //===================================   give approval    =============================

    async paymentNetsents() {
        
      this.setState({
         loaderShow: true
      })
      var Netcensts = {};
      Netcensts.user_id = this.loginData.data.id;
      Netcensts.user_address = this.loginData?.data?.user_address;
      Netcensts.item_edition_id = this.state.sellItem.item_edition_id;
      Netcensts.price = this.state.price;
      Netcensts.expiry_date = this.state.expiry_date;
      Netcensts.price_eth = this.state.getData?.resale_charges_eth
      Netcensts.email = this.loginData.data.user_email


      
      await axios({
         method: 'post',
         url: `${config.apiUrl}resaleTrxStart`,
         headers: { "Authorization": this.loginData?.Token },
         data: { "email":this.loginData.data.user_email, 'user_address': this.state.ConnectWalletAddress, 'user_id': this.loginData.data.id, 'amount': this.state.getData?.resale_charges }
      })
         .then(result => {
            if (result.data.success === true) {
               Netcensts.external_id = result.data.external_id;
               
               Cookies.set('resellApiData', Netcensts);
               Cookies.set('resellItemItemProcess', 'yes');
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


   async resellSubmitFinal(resellApiData=null) {
      if(!resellApiData){
         var API_DATA = {"user_address":this.loginData?.data?.user_address, "item_edition_id": this.state.sellItem.item_edition_id, "price": this.state.price, "expiry_date": this.state.expiry_date,'price_eth':this.state.getData?.resale_charges_eth ,"email":this.loginData.data.user_email};
      }else{
         var API_DATA = JSON.parse(resellApiData);
      }
      await axios({
         method: 'post',
         url: `${config.apiUrl}resaleNFT`,
         headers: { "Authorization": this.loginData?.Token },
         data: API_DATA
      })
         .then(async result => {
            if (result.data.success === true) {
               var willSearch = await Swal.fire({
                  title: 'Payment successful!',
                  text: 'Congratulations, Your NFT has been published for resell!',
                  icon: 'success',
                  width: 500,
                  confirmButtonColor: '#3085d6',
                  allowOutsideClick: false,
                  confirmButtonText: 'View Resell Item',
               });
               this.setState({
                  loaderShow: false,
            loadingStripe: 0

               })
               window.location.href = `${config.baseUrl}itemdetails/${result.data.item_edition_id}`

            }
            else if (result.data.success === false) {
            }
         }).catch(err => {
         });
   }
   

   loadingRemove(){
      setTimeout(() => {
         window.location.reload()
      }, );
   }


   render() {
      return (

         <>
            <Header />
            <body className="page-login" style={{ backgroundColor: "#fff" }}>
               <ToastContainer />
               <div id="content-block">
                  <div className="container be-detail-container your-purchase-bid">
                     <h2 className=" text-white mb-4">Your Purchases</h2>
                     <div className="row">
                        <div className="left-feild col-xs-12 col-sm-3">
                           <div className="be-vidget">
                              <div className="creative_filds_block">
                                 <ul className="ul nav">
                                    {this.state.talentStatusAPIData?.telent_status === 1 ?
                                       <li className="edit-ln" ><Link onClick={this.loading.bind(this, '6')} to={`${config.baseUrl}featurescreator/${this.loginData.data.id}`}>My Profile</Link></li>
                                       : ''

                                    }
                                    <li className="edit-ln" ><Link onClick={this.loading.bind(this, '1')} to={`${config.baseUrl}authoredit`}>Account Setting</Link></li>
                                    <li className="edit-ln" ><Link onClick={this.loading.bind(this, '2')} to={`${config.baseUrl}about`}>About</Link></li>
                                    <li className="edit-ln" ><Link onClick={this.loading.bind(this, '3')} to={`${config.baseUrl}salehistory`}>Sell History</Link></li>
                                    <li className="edit-ln active" ><Link onClick={this.loading.bind(this, '4')} to={`${config.baseUrl}yourpurchase`}>Purchases History</Link></li>
                                    {/* <li className="edit-ln" ><Link onClick={this.loading.bind(this, '5')} to={`${config.baseUrl}paymentsetting`}>Wallet</Link></li> */}
                                    {/* <li className="edit-ln" ><Link onClick={this.loading.bind(this, '7')} to={`${config.baseUrl}royalty`}>Royalty</Link></li> */}
                                 </ul>
                              </div>
                           </div>
                        </div>
                        <div className="col-xs-12 col-sm-9 yourPurchases" >
                           <div className="tab-wrapper style-1">
                              <div className="tab-nav-wrapper">
                                 <div className="nav-tab  clearfix">
                                    <div className={`nav-tab-item ${(this.state.defaultActive === 'Price') ? 'active' : ''}`}>
                                       <span>Your Purchases</span>
                                    </div>
                                    {/* <div className={`nav-tab-item ${(this.state.defaultActive !== 'Price') ? 'active' : ''}`}>
                                       <span>Your Bids</span>
                                    </div> */}
                                 </div>
                              </div>
                              <div className="tabs-content clearfix">
                                 <div className={`tab-info ${(this.state.defaultActive === 'Price') ? 'active' : ''}`}>
                                    <div className="row">
                                       <div className="col-ml-12 col-xs-12 col-sm-12" style={{ marginTop: '-25px' }}>
                                          <div className="">
                                             <div className="row pt-0">
                                                <div className="col-sm-12 mt-3">
                                                   <div className="table-responsive" style={{ border: 'none' }}>
                                                      {this.state.getUserPurchaseData.length === 0 ?
                                                         <div className="col-sm-12 background-shadow p-5">

                                                            <div className="row">
                                                               <div className="col-sm-12 text-center">
                                                                  <h5 className="weak">You don't have any collected creations available for Purchase.</h5>
                                                               </div>
                                                            </div>

                                                         </div> :
                                                         <ReactDatatable
                                                            config={this.config1}
                                                            records={this.state.getUserPurchaseData}
                                                            columns={this.columns1}
                                                         />}
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       </div>

                                    </div>
                                 </div>
                                 <div className={`tab-info ${(this.state.defaultActive !== 'Price') ? 'active' : ''}`}>
                                    <div className="row">
                                       <div className="col-ml-12 col-xs-12 col-sm-12" style={{ marginTop: '-25px' }}>
                                          <div className="">
                                             {this.state.getUserBidsData.length === 0 ?
                                                <div className="col-sm-12 background-shadow p-5">

                                                   <div className="row">
                                                      <div className="col-sm-12 text-center">
                                                         <h5 className="weak">You don't have any collected creations available for Bid.</h5>
                                                      </div>
                                                   </div>

                                                </div> :
                                                <ReactDatatable
                                                   config={this.config}
                                                   records={this.state.getUserBidsData}
                                                   columns={this.columns}
                                                />
                                             }
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
               <br /><br />
            </body>
            <Footer />

            <div className="modal fade" id="modalLoginForm" data-backdrop="false" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
               aria-hidden="true" style={{ background: 'rgb(6, 6, 6)' }}>
               <div className="modal-dialog" role="document">


                  <div className="modal-content">
                     <div className="modal-header text-center">
                        <h4 className="modal-title w-100 font-weight-bold"><strong>Publish for Resell</strong> </h4>
                        <button type="button" className="close" onClick={this.loadingRemove.bind(this)} data-dismiss="modal" aria-label="Close" style={{ marginTop: '-23px' }}>
                           <span aria-hidden="true">&times;</span>
                        </button>
                     </div>
                     {this.state.paymentShow === 0 ?
                        <>
                           <div className="modal-body mx-3">
                             

                              <div className="md-form ">
                                 {/* <i className="fas fa-envelope prefix grey-text"></i> */}
                                 <div data-error="wrong" data-success="right" for="defaultForm-email">Resell Price (USD)</div>
                                 {/* <br /> */}
                                 <input type="number" name="price" onChange={this.onChange} value={this.state.price} className="form-control validate" />
                              </div>
                              <br/>
                              <div className="md-form">
                                 {/* <i className="fas fa-lock prefix grey-text"></i> */}
                                 <div data-error="wrong" data-success="right" for="defaultForm-pass">Expiry Date</div>
                                 {/* <br /> */}
                                 <DatePicker className="form-control"
                                    onChange={this.handleChangeExpiry}
                                    value={this.state.expiry_date} minDate={new Date()}
                                    name="expiry_date"
                                 />
                              </div>

                           </div>
                           <div className="modal-footer d-flex justify-content-center">
                              {/* {(this.state.ConnectWalletAddress) ? */}
                              <>
                                 {/* {(this.state.sellItem.user_address?.toUpperCase() === this.state.ConnectWalletAddress?.toUpperCase())? */}
                                 <button type="submit" onClick={this.resellSubmitAPI} className="btn btn-primary col-sm-12 size-1" disabled={!this.state.price || !this.state.expiry_date || this.state.resellBtnText}>{(this.state.resellBtnText) ? 'Processing...' : 'Continue'}</button>
                                 {/* : */}
                                 {/* // <p style={{color:'red'}}>Please connect wallet with {this.state.sellItem.user_address}</p> */}
                                 {/* } */}
                              </>
                              {/* : */}
                              {/* // <a onClick={this.connectMetasmask.bind(this)} className="new-collection text-white pull-right btn btn-primary" href="javascript:void(0)" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Connect Wallet</a> */}
                              {/* } */}

                           </div>
                        </>
                        :
                        <div className="tab-wrapper style-1" style={{ padding: '25px', minHeight: '347px' }}>
                           {(this.state.loaderShow) ?
                              <Loader className="paymentLoader"
                                 type="Puff"
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

                                       <div className={(this.state.etherClickActive) == 2 ? "nav-tab-item active" : "nav-tab-item"} >
                                          <span className="text-black">Wallet</span>
                                       </div>
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
                                          <p>Payable amount : {parseFloat(this.state.getData?.resale_charges_eth).toFixed(6)} ETH ~ ${parseFloat(this.state.getData?.resale_charges).toFixed(2)}</p>
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
                                    <p>Payable amount : {parseFloat(this.state.getData?.resale_charges_eth).toFixed(6)} ETH ~ ${parseFloat(this.state.getData?.resale_charges).toFixed(2)}</p>
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
                                    <p>Payable amount : {parseFloat(this.state.getData?.resale_charges_eth).toFixed(6)} ETH ~ ${parseFloat(this.state.getData?.resale_charges).toFixed(2)}</p>
                                 </div>
                                 <div className="col-12 mt-3">

                                    <div className="input-group">
                                       Wallet Balance : {this.state.getData?.wallet_balance_eth} ETH ~ ${this.state.getData?.wallet_balance_usd}
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


         </>
      )
   }
}