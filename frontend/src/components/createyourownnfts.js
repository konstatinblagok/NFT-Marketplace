import React, { Component } from 'react';
 import axios from 'axios';
 import Header from '../directives/header'
 import Footer from '../directives/footer'
 import config from '../config/config'
 import Cookies from 'js-cookie';	
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const headers = {
    'Content-Type': 'application/json'
 };

export default class createyourownnfts extends Component {

    constructor(props) {
        super(props)
        // alert(this.loginData)
		this.loginData = (!Cookies.get('loginSuccess'))? [] : JSON.parse(Cookies.get('loginSuccess'));
		this.state = {
			user_id: this.loginData?.data?.id,
			first_name : '',
			last_name : '',
			email : '',
			city : '',
			description : '',
			follower : '',
			facebook : '',
			youtube : '',
			twitter : '',
			insta : '',
			country_id: [],
            countrylistData: [],
			talentStat:''
			 }
	this.submitForm = this.submitForm.bind(this)
	}

    componentDidMount() {
		this.countryList()
		this.getProfilePicAPI();
		this.talentStatusAPI()
    }

	  handleChange1 = e => {
		this.setState({
		   [e.target.name]: e.target.value
		})
	 }

	
	async countryList() {
		await axios({
		   method: 'get',
		   url: `${config.apiUrl}getCountries`,
		   headers: { "Authorization": this.loginData.message },
		}).then(response => {
		   if (response.data.success === true) {
			  this.setState({
				 countrylistData: response.data?.response
			  })
		   }
		})
	 }


	     //  is_approved :0 => Pending
    //  is_approved :1 => Approval
    //  is_approved :2 => Reject

	async talentStatusAPI(){
		await axios({
		   method: 'post',
		   url: `${config.apiUrl}getTelentStatus`,
		   data: {'user_id':this.loginData.data.id}
		})
		   .then(result => {
			  if (result.data.success === true) {
				this.setState({
					talentStat : result.data.response[0].telent_status
				})
				// console.log(this.state.talentStat);
		if(result.data.response[0].telent_status === 1){
				   window.location.href = `${config.baseUrl}featurescreator/${this.loginData.data.id}`
				 }
				 
				 else{		 }
			  }
			  else if (result.data.success === false) {
			  }
		   }).catch(err => {
		   });
		}

	 async submitForm(e) {
		e.preventDefault()
	axios({
	method:'post',
	url: `${config.apiUrl}addTelent`,
	headers: { "Authorization": this.loginData.Token },
	data: this.state
	})
	.then(response => {
		

		if (response.data.success === true) {
			toast.success(response.data.msg, {
				position: toast.POSITION.TOP_CENTER
			});

			
			// setTimeout(() => {
			// 	window.location.href = `${config.baseUrl}createyourownnftslist`
			// }, 200);
			this.talentStatusAPI()
		}

		else if (response.data.success === false) {
			toast.error(response.data.msg, {
				position: toast.POSITION.TOP_CENTER
			});
		}
	})
	.catch(err => {
		toast.error(err?.response?.data?.msg, {
			position: toast.POSITION.TOP_CENTER
		});

	})
}

async getProfilePicAPI() {
	await axios({
	   method: 'post',
	   url: `${config.apiUrl}getProfilePic`,
	   headers: { "Authorization": this.loginData.message },
	   data: { "email":  this.loginData.data.user_email }
	}).then(response => {
	   if (response.data.success === true) {
		  this.setState({
			
				profile_pic: response.data.response
			 })
	   }
	})
 }



    render() {
        return (    

            <>
  <Header/>
  <body class="page-login" style={{backgroundColor: "#fff"}}>
  <div id="content-block">
		<div className="container be-detail-container account-verify" style={{paddingTop:'50px'}}>
		<ToastContainer/>
		{this.state.talentStat === 0 ?
		//  <span style={{textAlign:'center', color:'red'}}>Your Account is in process to get verify from admin side, Please wait to "Create NFT".</span>
		<div class="alert alert-secondary"><h4 style={{padding: '22px 20px'}}>Your Account is in process to get verify from admin side, Please wait to "Create NFT".</h4></div>
		  : 
		<>
<div className="row">
				<div className="col-xs-12 col-md-4 left-feild">
					<div className="be-user-block style-4">
						<div className="be-user-detail">
							<a className="be-ava-user style-2" href="#">
								<img src={this.state.profile_pic?.profile_pic === '' || this.state.profile_pic?.profile_pic === undefined || 
							this.state.profile_pic?.profile_pic === null ? "images/noimage.png" : `${config.imageUrl1}${this.state.profile_pic?.profile_pic}`} style={{height:'115px',width:'115px'}} alt=""/> 
							</a>
							
							<p className="be-use-name">{this.state.profile_pic?.full_name}</p>
							{this.state.profile_pic?.user_name}
							
						</div>
					
					</div>
														
				</div>
				<div className="col-xs-12 col-md-8">
                   <div className="sec personal-information" data-sec="basic-information">
						<div className="be-large-post">
							<div className="info-block style-2">
								<div className="be-large-post-align "><h3 className="info-block-label">Personal Information</h3></div>
							</div>
							
							<div className="be-large-post-align">
								<div className="row">
									<div className="input-col col-xs-12 col-sm-6">
										<div className="form-group fg_icon focus-2">
											<div className="form-label textOwn">First Name <span className="error-asterick">*</span></div>
											<input className="form-input" type="text" onChange={this.handleChange1} name="first_name" value={this.state.first_name} />
										</div>							
									</div>
									<div className="input-col col-xs-12 col-sm-6">
										<div className="form-group focus-2">
											<div className="form-label textOwn">Last Name <span className="error-asterick">*</span></div>									
											<input className="form-input" type="text" onChange={this.handleChange1} name="last_name" value={this.state.last_name} />
										</div>								
									</div>
									<div className="input-col col-xs-12 col-sm-6">
										<div className="form-group focus-2">
											<div className="form-label textOwn">Email Address <span className="error-asterick">*</span></div>									
											<input className="form-input" type="email" onChange={this.handleChange1} value={this.state.email} name="email"/>
										</div>								
									</div>
									
							
									<div className="input-col col-xs-12 col-sm-6">
										<div className="form-label textOwn">Country <span className="error-asterick">*</span></div>
		
										<div className="form-group focus-2">
										<select className="" name="country_id" onChange={this.handleChange1} value={this.state.country_id} className="form-input" >
                                                   <option selected="selected" value="">Select Country of Origin</option>

                                                   {this.state.countrylistData.map(item => (
                                                      <option value={item.id}>{item.name}</option>
                                                   ))}
                                               
                                                </select>
												</div>		
									</div>
									<div className="input-col col-xs-12 col-sm-12 ">
										<div className="form-group focus-2">
											<div className="form-label textOwn">City <span className="error-asterick">*</span></div>									
											<input className="form-input" type="text" name="city" onChange={this.handleChange1} value={this.state.city}/>
										</div>								
									</div>
								
									<div className="input-col col-xs-12 col-sm-12">
										<div className="form-group focus-2 description-field">
											<div className="form-label textOwn">Description <span className="error-asterick">*</span></div>									
											<textarea className="form-control form-input" name="description" onChange={this.handleChange1} value={this.state.description}> Hello,</textarea>
										</div>								
									</div>
									<div className="input-col col-xs-12 col-sm-12">
										<div className="form-group focus-2">
											<div className="form-label textOwn">Follower</div>									
											<input className="form-input" type="text" name="follower" onChange={this.handleChange1} value={this.state.follower}/>
										</div>								
									</div>


									<div className="input-col col-xs-12 col-sm-12">
										<div className="be-large-post-align mr-0 ml-0">
												<div className="social-input form-group focus-2 mb-5">
													<div className="s_icon">
														
														<a className="social-btn color-1" href="#"><i className="fa fa-facebook"></i></a>
													</div>
													<div className="s_input">
														<input className="form-input" onChange={this.handleChange1} type="text" name="facebook" value={this.state.facebook}/>
													</div>
												</div>
												<div className="social-input form-group focus-2 mb-5">
													<div className="s_icon">
														
														<a className="social-btn color-3" href="#"><i className="fa fa-youtube"></i></a>
													</div>
													<div className="s_input">
														<input className="form-input" onChange={this.handleChange1} type="text" name="youtube" value={this.state.youtube}/>
													</div>
												</div>
												<div className="social-input form-group focus-2 mb-5">
													<div className="s_icon">
														
														<a className="social-btn color-2" href="#"><i className="fa fa-twitter"></i></a>
													</div>
													<div className="s_input">
														<input className="form-input" onChange={this.handleChange1} type="text" name="twitter" value={this.state.twitter}/>
													</div>
												</div>
												
												<div className="social-input form-group focus-2 ">
													<div className="s_icon">
														
														<a className="social-btn color-5" href="#"><i className="fa fa-instagram"></i></a>
													</div>
													<div className="s_input">
														<input className="form-input" onChange={this.handleChange1} type="text" name="insta" value={this.state.insta}/>
													</div>
												</div>
												<div className="input-col col-xs-12 mt-5 createNFTS">
										             <button className="btn color-1 size-1 btn-right" type="submit" onClick={this.submitForm} 
													 disabled={!this.state.description || !this.state.first_name || !this.state.last_name
													|| !this.state.email || !this.state.city || !this.state.country_id.length >0}
													 >Verify</button>							
									          </div>																													
											</div>
											</div>

								</div>
							</div>
						</div>
					</div>	
					</div>		
				</div>				
		</>
		}
			
		</div>
		</div>
  <Footer/>
  </body>
  </>
  )
  }
  }