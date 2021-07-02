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

export default class newtalent extends Component {

    constructor(props) {
        super(props)
		// alert(JSON.parse(Cookies.get('loginSuccess')))
		this.loginData = (!Cookies.get('loginSuccess'))? [] : JSON.parse(Cookies.get('loginSuccess'));
		this.state = {
			user_id: this.loginData.data.id,
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
			nft_hash : '',
			country_id: [],
            countrylistData: [],
			image_file: null,
			image_preview: '',
			product_name : '',
			product_description: '',
			profile_pic : '' ,
    }
	this.submitForm = this.submitForm.bind(this)
	}

    componentDidMount() {
		this.countryList()
		this.getProfilePicAPI();
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
	 
handleImagePreview = (e) => {
    let image_as_base64 = URL.createObjectURL(e.target.files[0])
    let image_as_files = e.target.files[0];
    let file_type = '';
    if (image_as_files.type.indexOf('image') === 0) {
        file_type = 'image';
    } else {
        file_type = 'video';
    }

    this.setState({
        image_preview: image_as_base64,
        image_file: image_as_files,
        file_type: file_type,
    })


}


	 async submitForm(e) {
		e.preventDefault()
		// let formData = new FormData();

		// formData.append('user_id', this.loginData.data.id);
		// formData.append('first_name', this.state.first_name);
		// formData.append('last_name', this.state.last_name);
		// formData.append('email', this.state.email);
		// formData.append('country_id', this.state.country_id);
		// formData.append('description', this.state.description);
	
		let formData1 = new FormData();

		formData1.append('file', this.state.image_file);
		
		const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
		var resIPF =  await axios.post(url,
			  formData1,
			  {
				  headers: {
					  'Content-Type': `multipart/form-data; boundary= ${formData1._boundary}`,
					  'pinata_api_key': 'b26a087893e3f0033bbf',
					  'pinata_secret_api_key': '269ca812d8e34ee37b44b09e966b4be8a13c01921e892438f3d3d834ee0a4681'
				  }
			  }
		  );
	  
	  this.state.nft_hash = resIPF.data.IpfsHash
	//   formData.append('nft_hash', resIPF.data.IpfsHash);
	  
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
			// 	window.location.reload()
			// }, 200);
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
		<div className="container be-detail-container">
		<ToastContainer/>
			<div className="row">
				<div className="col-xs-12 col-md-4 left-feild">
					<div className="be-user-block style-4">
						<div className="be-user-detail">
							<a className="be-ava-user style-2" href="#">
								<img src={`${config.imageUrl1}/${this.state.profile_pic.profile_pic}`} alt=""/> 
							</a>
							
							<p className="be-use-name">Leigh Taylor</p>
							<div className="be-user-info">
								Barnsley, United Kingdom
							</div>
							
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
											<div className="form-label">First Name</div>
											<input className="form-input" type="text" onChange={this.handleChange1} name="first_name" value={this.state.first_name} />
										</div>							
									</div>
									<div className="input-col col-xs-12 col-sm-6">
										<div className="form-group focus-2">
											<div className="form-label">Last Name</div>									
											<input className="form-input" type="text" onChange={this.handleChange1} name="last_name" value={this.state.last_name} />
										</div>								
									</div>
									<div className="input-col col-xs-12 col-sm-6">
										<div className="form-group focus-2">
											<div className="form-label">Email Address</div>									
											<input className="form-input" type="email" onChange={this.handleChange1} value={this.state.email} name="email"/>
										</div>								
									</div>
									
							
									<div className="input-col col-xs-12 col-sm-6">
										<div className="form-label">Country</div>
										{/* <div className="be-drop-down icon-none">
											<span className="be-dropdown-content"> United Kingdom </span>
											<ul className="drop-down-list">
											{this.state.countrylistData.map(item => (
                                                      <option value={item.id}>{item.name}</option>
                                                   ))}
											</ul>
										</div> */}
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
											<div className="form-label">City</div>									
											<input className="form-input" type="text" name="city" onChange={this.handleChange1} value={this.state.city}/>
										</div>								
									</div>
								
									<div className="input-col col-xs-12 col-sm-12">
										<div className="form-group focus-2 description-field">
											<div className="form-label">Description</div>									
											<textarea className="form-control" name="description" onChange={this.handleChange1} value={this.state.description}> Hello,</textarea>
										</div>								
									</div>
									<div className="input-col col-xs-12 col-sm-12">
										<div className="form-group focus-2">
											<div className="form-label">Follower</div>									
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
												<div className="input-col col-xs-12 mt-5">
										             <button className="btn color-1 size-1 btn-right" type="submit" onClick={this.submitForm} >Verify</button>							
									          </div>																													
											</div>
											</div>

								</div>
							</div>
						</div>
					</div>	
					{/* <div className="sec personal-information mt-5" data-sec="basic-information">
						<div className="be-large-post">
							<div className="info-block style-2">
								<div className="be-large-post-align "><h3 className="info-block-label">NFT Details</h3></div>
							</div>
							<div className="be-large-post-align ">
								<div className="row">
									<div className="input-col col-xs-12 col-sm-6">
										<div className="form-group focus-2">
											<a className="be-ava-user style-2" href="#">
												<img src="images/p13.jpg" alt="" className="btn-rounded"/> 
											</a>
										</div>								
									</div>
									<div className="input-col col-xs-12 col-sm-12">
										<div className="form-group fg_icon focus-2">
											<div className="form-label">Product Name</div>
											<input className="form-input" type="text" onChange={this.handleChange1} name="product_name"  value={this.state.product_name}/>
										</div>							
									</div>
									<div className="input-col col-xs-12 col-sm-12">
										<div className="form-group focus-2">
											<div className="form-label">Product Description</div>									
											<textarea className="form-control" onChange={this.handleChange1} name="product_description" value={this.state.product_description} ></textarea>
										</div>								
									</div>
									<div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="control-label mb-10">Image</label>
                                                                <input type="file" accept=".jpg,.jpeg,.png" onChange={this.handleImagePreview}  className="form-control" placeholder="Image File"   />
                                                            </div>
                                                        </div>
																												
							</div>
										
									
								</div>
							</div>




									<div className="input-col col-xs-12">
										<button className="btn color-1 size-1 btn-right" type="submit" onClick={this.submitForm} >Submit</button>							
									</div>								
						</div>
					 */}
						
					</div>		
				</div>				
			</div>
		</div>

  <Footer/>
  </body>
  </>
  )
  }
  }