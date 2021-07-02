import React, { Component } from 'react';
 import axios from 'axios';
 import Header from '../directives/header'
 import Footer from '../directives/footer'
 import config from '../config/config'
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import ReactDatatable from '@ashvin27/react-datatable'
import {CopyToClipboard} from 'react-copy-to-clipboard';

const headers = {
    'Content-Type': 'application/json'
 };

export default class paymentsetting extends Component {

    constructor(props) {
        super(props)
        this.loginData = (!Cookies.get('loginSuccess'))? [] : JSON.parse(Cookies.get('loginSuccess'));
        this.state = {
           talentStatusAPIData:'',
           getWalletDetailAPIData:'',
           rece_address:'',
           amount:'',
           processing:'',
           getWalletTransactionAPIData:[],
           getPayoutAddress : [],
            copied: false,

        }
        this.withdraw = this.withdraw.bind(this)
        this.onChange = this.onChange.bind(this)


        this.columns = [
         
         
         {
            key: "to_address",
            text: "Withdrawal Address",
            sortable: true,
            cell: (item) => {
               return (
                  <>
                  <span title={item.to_address}>{item?.to_address.toString().substring(0, 8) + '...' + item?.to_address.toString().substr(item?.to_address.length - 8)}
                  
                  &nbsp; <CopyToClipboard text={item.to_address}
                  onCopy={() => this.setState({copied: true})}>
                                        <img src="images/copy-link.png" style={{cursor:'pointer'}} className="link-copy"/>
                  
                </CopyToClipboard>
                { this.state.copied ? <div className="mt-1 d-block">Copied!</div> : ''}
                  </span>

                 
              </>
               )
            }
            
         },
         
       

         

         {
            key: "amount",
            text: "USD Amount",
            cell: (item) => {
               return (
                  <span>$ {item.amount}</span>
               );
            }

         },
         {
            key: "transaction_date",
            text: "Transaction Date",
            cell: (item) => {
               return (
                  <td style={{width:'120px'}}>

                     <span> {item.transaction_date}</span>
                  </td>
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
    }

    componentDidMount() {
      this.talentStatusAPI()
      this.getWalletDetailAPI()
      this.getWalletHistoryAPI()
      this.getPayoutAddressAPI()
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


      async getWalletDetailAPI(){
         await axios({
            method: 'post',
            url: `${config.apiUrl}getWalletDetail`,
            headers: { "Authorization": this.loginData?.Token },
            data: {"email":this.loginData.data.user_email,'user_id':this.loginData.data.id}
         })
            .then(result => {
             if (result.data.success === true) {
                    this.setState({
                       getWalletDetailAPIData:result.data
                    })
             }
             else if (result.data.success === false) {
             }
            }).catch(err => {
            });
         }

         onChange = e =>{
            this.setState({
                [e.target.name] : e.target.value
             })
         }

         async withdraw(event){
            event.preventDefault();
            this.setState({
               processing:1
            })
            await axios({
               method: 'post',
               url: `${config.apiUrl}userWithdraw`,
               headers: { "Authorization": this.loginData?.Token },
               data: {"email":this.loginData.data.user_email,'user_id':this.loginData.data.id,"amount":this.state.amount,"address":this.state.rece_address,'amount_usd':parseFloat(this.state.amount* this.state.getWalletDetailAPIData?.eth_usd_value).toFixed(2)}
            })
               .then(result => {
                if (result.data.success === true) {
                  toast.success('Withdraw successfully', {
                     position: toast.POSITION.TOP_CENTER
                     });
                     this.setState({
                        rece_address:'',
                        amount:'',
                        processing:''
                     })
                }
                else if (result.data.success === false) {
                   this.setState({
                     processing:''
                   })
                }
               }).catch(err => {
                  toast.error(err?.response?.data?.msg, {
                     position: toast.POSITION.TOP_CENTER
                     });
                  this.setState({
                     processing:''
                  })
               });
            
            
         }

         //========================================  Wallet history API  ===================================

         async getWalletHistoryAPI(){
            await axios({
               method: 'post',
               url: `${config.apiUrl}getWalletTransaction`,
               headers: { "Authorization": this.loginData?.Token },
               data: {"email":this.loginData.data.user_email,'user_id':this.loginData.data.id}
            })
               .then(result => {
                if (result.data.success === true) {
                       this.setState({
                          getWalletTransactionAPIData:result.data.response
                       })
                }
                else if (result.data.success === false) {
                }
               }).catch(err => {
               });
            }


            async getPayoutAddressAPI(){
               await axios({
                  method: 'post',
                  url: `${config.apiUrl}getPayoutAddress`,
                  headers: { "Authorization": this.loginData?.Token },
                  data: {'user_id':this.loginData.data.id}
               })
                  .then(result => {
                   if (result.data.success === true) {
                          this.setState({
                           getPayoutAddress:result.data
                          })
                   }
                   else if (result.data.success === false) {
                   }
                  }).catch(err => {
                  });
               }            

    render() {
        return (    

            <>
             <Header/>
             <body class="page-login" style={{backgroundColor: "#fff"}}>
             <div id="content-block">
         <div className="container be-detail-container your-purchase-bid">
            <ToastContainer/>
            <div className="row">
               <div className="left-feild col-xs-12 col-sm-3">
                 
               <div className="be-vidget" id="scrollspy">
            {/* <h2 className=" mb-4">Wallet</h2> */}
                
                  <div className="creative_filds_block">
                     <ul className="ul nav">
                     <li className="edit-ln" >
                     {this.state.talentStatusAPIData?.telent_status === 1 ? 
                          <li className="edit-ln" ><Link onClick={this.loading.bind(this,'6')} to={`${config.baseUrl}featurescreator/${this.loginData.data.id}`}>My Profile</Link></li>
                          :''
                          
                        }
                        <Link onClick={this.loading.bind(this,'1')} to={`${config.baseUrl}authoredit`}>Account Setting</Link></li>
                          <li className="edit-ln" ><Link onClick={this.loading.bind(this,'2')} to={`${config.baseUrl}about`}>About</Link></li>
                          <li className="edit-ln" ><Link onClick={this.loading.bind(this,'3')} to={`${config.baseUrl}salehistory`}>Sell History</Link></li>
                          <li className="edit-ln" ><Link onClick={this.loading.bind(this,'4')} to={`${config.baseUrl}yourpurchase`}>Purchases History</Link></li>
                          <li className="edit-ln active" ><Link onClick={this.loading.bind(this,'5')} to={`${config.baseUrl}paymentsetting`}>Wallet</Link></li>
                          {/* <li className="edit-ln" ><Link onClick={this.loading.bind(this,'7')} to={`${config.baseUrl}royalty`}>Royalty</Link></li> */}
                         
                     
                     </ul>
                  </div>
                 
               </div>
               </div>
               <div className="col-xs-12 col-sm-9">
                  <div className="row ">
                      <div className="col-sm-12 background-shadow p-5">
                              
                          <div className="row">

                          <div className="col-sm-6">
                                 <p><b>Payout address:</b> </p>
                                 <input type="text" className="form-control" name="payout_address" value={this.state.getPayoutAddress?.public}
                                 onChange={this.onChange}/>
                                 {this.state.processing === '' ?
                                 <button className="login100-form-btn" style={{backgroundColor:'#0d58c8'}} onClick={this.withdraw}
                                 disabled={!this.state.rece_address || !this.state.amount}>Withdraw</button>
                                :
                                <button className="login100-form-btn" onClick={this.withdraw}
                                 disabled>Processing...</button>
                                
                                 
                                 }
                                   {/* <h5 className="weak">Payment detail</h5> */}
                              </div>

                              <div className="col-sm-6" style={{display:"none"}}>
                                 {/* <p><b>Wallet Address:</b> {this.state.getWalletDetailAPIData?.public}</p>
                                 <br/> */}
                                 <p><b>Available Balance: </b>

                                 {this.state.getWalletDetailAPIData?.usd_balance === null || this.state.getWalletDetailAPIData?.usd_balance === undefined || this.state.getWalletDetailAPIData?.usd_balance === '' ? 0 : this.state.getWalletDetailAPIData?.usd_balance } VUL

                                 </p>
                     
                              </div>

                              <div className="col-sm-6" style={{display:"none"}}>
                                 <p><b>Recepient ETH address:</b> </p>
                                 <input type="text" className="form-control" name="rece_address" value={this.state.rece_address}
                                 onChange={this.onChange}/>
                                 <br/>
                                 <p><b>Amount:</b> </p>
                                 <div class="row">
    <div class="col-sm-8"> <input type="number" className="form-control" name="amount" placeholder="VUL" value={this.state.amount}
                                 onChange={this.onChange}/></div>
                                 
    <div class="col-sm-4"><div style={{paddingTop:'5px',wordBreak:'break-all'}}>~ ${parseFloat(this.state.amount* 1).toFixed(2)}USD</div> </div>
</div>
                                 <br/>
                                 {this.state.processing === '' ?
                                 <button className="login100-form-btn" style={{backgroundColor:'#0d58c8'}} onClick={this.withdraw}
                                 disabled={!this.state.rece_address || !this.state.amount}>Withdraw</button>
                                :
                                <button className="login100-form-btn" onClick={this.withdraw}
                                 disabled>Processing...</button>
                                
                                 
                                 }
                                   {/* <h5 className="weak">Payment detail</h5> */}
                              </div>
                          </div>

                         
                             
                          
                      </div>
                  </div>


               <br/>
              
                  <div className="row " style={{display:"none"}}>
                  <div class="info-block style-1 royaltyHeader">
                     <div class="be-large-post-align "><h3 class="info-block-label">Withdrawal History</h3></div></div>
                      <div className="col-sm-12 background-shadow p-5">
                              
                          <div className="row">
                         
                          {this.state.getWalletTransactionAPIData.length === 0 ?
                           <div class="col-sm-12 background-shadow p-5">

                              <div class="row">
                                 <div class="col-sm-12 text-center">
                                    <h5 class="weak">You don't have any wallet history.</h5>
                                 </div>
                              </div>

                           </div> :
                           <ReactDatatable 
                              config={this.config}
                              records={this.state.getWalletTransactionAPIData}
                              columns={this.columns}
                           />}
                         
                            </div>

                         
                             
                          
                      </div>
                  </div>
               </div>
            
            </div>
         </div>
      </div>
      
      <br/>
      <br/>
      </body>
             <Footer/>
             </>
             )
             }
             }
