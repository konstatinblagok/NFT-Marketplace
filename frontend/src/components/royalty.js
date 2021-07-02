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

const headers = {
    'Content-Type': 'application/json'
 };

export default class royalty extends Component {

    constructor(props) {
        super(props)
        this.loginData = (!Cookies.get('loginSuccess'))? [] : JSON.parse(Cookies.get('loginSuccess'));
        this.state = {
           talentStatusAPIData:'',
           getWalletDetailAPIData:'',
           payout_address:'',
         getUserPurchaseData:[],

        }
        this.withdraw = this.withdraw.bind(this)
        this.onChange = this.onChange.bind(this)


        this.columns1 = [
            {
                key: "Image",
                text: "Image",
                cell: (item) => {
                     return (
                        <Link className="weak mr-2 d-inlne-block" to={`${config.baseUrl}itemdetails/${item.item_edition_id}`}
                        target="_blank">
                        <img src={item.image === null || item.image === '' || item.image === undefined 
                        ? 'images/team2.jpg' 
                        :
                        `${config.imageUrl}${item.image}`} style={{width:'60px',height:'60px',borderRadius:'60px'}}/>
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
                   key: "transaction_type",
                   text: "Transaction Type",
                   
            },
            {
               key: "amount",
               text: "Royalty Fee",
               
               cell: (item) => {
                  return (
                     <span>$ {item.amount}</span>
                     );
           }
         },
         
         {
            key: "transaction_date",
            text: "Transaction Date",
            
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
      this.getWalletDetailAPI()
      this.getUserPurchaseAPI()
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

      //=======================================  Bid details  =====================

      async getUserPurchaseAPI() {
        await axios({
           method: 'post',
           url: `${config.apiUrl}getRoyaltyTransaction`,
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
      async getWalletDetailAPI(){
         await axios({
            method: 'post',
            url: `${config.apiUrl}getPayoutAddress`,
            data: {'user_id':this.loginData.data.id}
         })
            .then(result => {
             if (result.data.success === true) {
                    this.setState({
                       getWalletDetailAPIData:result.data.response
                    })
             }
             else if (result.data.success === false) {
             }
            }).catch(err => {
            });
         }

         onChange = e =>{
            e.preventDefault()
            let value = e.target.value;  
            this.setState(prevState => ({
              getWalletDetailAPIData: { ...prevState.getWalletDetailAPIData, [e.target.name]: value }
            }))
         }

         async withdraw(event){
            event.preventDefault();
            await axios({
               method: 'post',
               url: `${config.apiUrl}updatePayoutAddress`,
               headers: { "Authorization": this.loginData?.Token },
               data: {"email":this.loginData.data.user_email,'user_id':this.loginData.data.id,"payout_address":this.state.getWalletDetailAPIData.payout_address}
            })
               .then(result => {
                if (result.data.success === true) {
                  toast.success('Withdraw successfully', {
                     position: toast.POSITION.TOP_CENTER
                     });
                   this.componentDidMount()
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
                          <li className="edit-ln" ><Link onClick={this.loading.bind(this,'4')} to={`${config.baseUrl}yourpurchase`}>Purchases and Bids</Link></li>
                          <li className="edit-ln" ><Link onClick={this.loading.bind(this,'5')} to={`${config.baseUrl}paymentsetting`}>Wallet</Link></li>
                          {/* <li className="edit-ln active" ><Link onClick={this.loading.bind(this,'7')} to={`${config.baseUrl}royalty`}>Royalty</Link></li> */}
                         
                     
                     </ul>
                  </div>
                 
               </div>
               </div>
               <div className="col-xs-12 col-sm-9">
                  <div className="row ">
                  <div class="info-block style-1 royaltyHeader"><div class="be-large-post-align "><h3 class="info-block-label">Royalty Setting</h3></div></div>
                      <div className="col-sm-12 background-shadow p-5">
                              
                          <div className="row">
                             
                              <div className="col-sm-6">
                                 <p><b>Payout Address:</b> </p>
                                 <br/>

                                 <input type="text" className="form-control" name="payout_address" value={this.state.getWalletDetailAPIData?.payout_address}
                                 onChange={this.onChange}/>
                                 <br/>
                                 {this.state.getWalletDetailAPIData?.payout_address === '' || this.state.getWalletDetailAPIData?.payout_address === null || this.state.getWalletDetailAPIData?.payout_address === undefined? 
                                <button className="login100-form-btn"
                                disabled style={{cursor:'no-drop'}}>Update</button>:
                                <button className="login100-form-btn" style={{backgroundColor:'#0d58c8'}} onClick={this.withdraw}
                                 >Update</button> 
                                
                                }
                                                                
                                  {/* <h5 className="weak">Payment detail</h5> */}
                              </div>

                              {/* <div className="col-sm-6">
                               
                                 <img src={"https://chart.googleapis.com/chart?chs=350x350&cht=qr&chl="+this.state.getWalletDetailAPIData?.payout_address} id="img_qr_btc_address"/>
                                 <br/>
                                                               
                                  
                              </div> */}
                          </div>

                         
                             
                          
                      </div>
                  </div>
                <br/>

                  <div className="row ">
                  <div class="info-block style-1 royaltyHeader">
                     <div class="be-large-post-align "><h3 class="info-block-label">Royalty Transactions</h3></div></div>
                      <div className="col-sm-12 background-shadow p-5">
                              
                          <div className="row">
                             
                          {this.state.getUserPurchaseData.length === 0 ? 
                                       <div class="col-sm-12 background-shadow p-5">
                              
                                       <div class="row">
                                           <div class="col-sm-12 text-center">
                                               <h5 class="weak">You don't have any Royalty transactions available.</h5>
                                           </div>
                                       </div>
                                       
                                   </div>
                                   :
                                   <>
                                   <p style={{textAlign:'end'}}><b>Royalty Balance:</b> ${parseFloat(this.state.getWalletDetailAPIData?.royalty_amount).toFixed(2)} </p>
                                   <br/>
                                   <ReactDatatable
                                   config={this.config1}
                                   records={this.state.getUserPurchaseData}
                                columns={this.columns1}
                                                        />
                                                        </> }
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
