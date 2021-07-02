import React, { Component } from 'react';
 import axios from 'axios';
 import Header from '../directives/header'
 import Footer from '../directives/footer'
 import config from '../config/config'
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const headers = {
    'Content-Type': 'application/json'
 };

export default class viewyourcollection extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    render() {
        return (    

            <>
  <Header/>
  <body>
      {/* <!-- THE LOADER --> */}
      {/* <div className="be-loader">
         <div className="spinner">
            <img src="images/logo-new.png" alt width="200"/>
            <p className="circle">
               <span className="ouro">
               <span className="left"><span className="anim"></span></span>
               <span className="right"><span className="anim"></span></span>
               </span>
            </p>
         </div>
      </div> */}
  <div id="content-block">
         <div className="head-bg">
            {/* <!-- <div className="head-bg-img"></div> --> */}
            <div className="head-bg-content">
        
               <div className="container">
                  <div className="col-md-3">
                  </div>
                  <div className="col-md-6">
                   
                  </div>
                  <div className="col-md-3">
                  </div>
               </div>
            </div>
         </div>
       
         <div className="container-fluid custom-container">
           
            <br/>
            <div className="container-fluid custom-container">
               <div className="container">
                  <div className="row">
                     <div className="col-md-6">
                        <div className="col-sm-3">
                           <a className="" id="navbar_store_logo" mptrackaction="store:navbar:logo" data-storeid="angelarium" href="/angelarium/">
                              <div className="img_wrp">
                                 <img src="images/emporium.jpg"/>
                              </div>
                           </a>
                        </div>
                        <div className="col-sm-9">
                           <div className="follow-banner row ml-0 pl-lg-1">
                              <div className="col-12 mb-2 pl-lg-2">
                                 <a mptrackaction="store:navbar:logo" data-storeid="angelarium" href="/angelarium/">
                                    <h3 className="follow-exp mt-1 mt-md-0 mb-0 ">
                                       Eggleston Emporium
                                    </h3>
                                 </a>
                              </div>
                              <div className="col-12 mb-2 pl-md-2 pl-0 pt-1 pt-md-0">
                                 <a href="" className="all_followers"><span className="follower_count">13937</span> followers</a> •
                                 <a href="" className="all_following"><span className="following_count">8</span> following</a> •
                                  <a href="#" className="learn-more-tooltip " data-toggle="tooltip" >82370 views</a> 
                              </div>
                              <div className="col-12 pl-md-2 pl-0 pt-1 pt-md-0">
                                 <form  method="POST" className="user_follow_form">
                                    <input type="hidden" name="csrfmiddlewaretoken" value=""/>
                                    <input type="hidden" name="delete" className="delete-follow" value="0"/>
                                    <button type="button" className="btn size-1 color-5 ">Follow</button>
                                    <button type="button" className="btn follow-btn btn-xsm btn-secondary follow unfollow login-required d-none">Unfollow</button>
                                 </form>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="col-md-6 text-right">
                        <ul className="link-feature">
                           {/* <!-- <a href="#Creation">Creation</a> --> */}
                           <a href="#Collection">Collection</a>
                           {/* <!-- <a href="#About">About</a> --> */}
                        </ul>
                     </div>
                     <div className="col-md-12 pad-spc">
                        <br/>
                        <div className="tab-wrapper style-1">
                           <div className="tab-nav-wrapper">
                              <div className="nav-tab  clearfix d-flex">
                              <div className="new-collection text-white" data-toggle="modal" data-target="#new-collection">
                                    <span>+ New Collection</span>
                                 </div>
                                 <div className="new-collection text-white" data-toggle="modal" data-target="#add-collection">
                                    <span>+ Add Nft</span>
                                 </div>
                                 <div className="nav-tab-item active">
                                    <span>All</span>
                                 </div>
                                 <div className="nav-tab-item">
                                    <span>Category1</span>
                                 </div>
                                  <div className="nav-tab-item">
                                    <span>Category2</span>
                                 </div>
                             
                              </div>
                           </div>
                           <div className="tabs-content clearfix">
                              <div className="tab-info active" style={{display: "block"}}>
                                 <div className=" custom-container ">
                                    <div className="container hot-bid">
                                       <div className="row">
                                                     
                                          <div className="col-md-12">
                                             <br/>
                                             <div className="row _post-container_">
                                               
                                                <div className="category-2 mix col-md-4">
                                                   <div className="be-post">
                                                      <a href="#page2.html" className="be-img-block">
                                                      <img src="images/p2.jpg" alt="omg"/>
                                                      </a>

                                                      <div className="mb-4">
                                                      <a href="#page2.html" className="be-post-title" style={{display: "inline"}}>Treebeard</a><a href="#page2.html" className="be-post-title price">$249</a>
                                                      </div>
                                                      <div className="author-post">
                                                      </div>
                                                   </div>
                                                </div>
                                                <div className="category-3 mix col-md-4">
                                                   <div className="be-post">
                                                      <a href="#page3.html" className="be-img-block">
                                                      <img src="images/p3.jpg" alt="omg"/>
                                                      </a>
                                                      <div className="mb-4">
                                                      <a href="#page2.html" className="be-post-title" style={{display: "inline"}}>Colors of Ramadan</a><a href="#page2.html" className="be-post-title price">$249</a>
                                                      </div>
                                                     
                                                      <span>
                                                      </span>
                                                      <div className="author-post">
                                                      </div>
                                                   </div>
                                                </div>
                                                <div className="category-4 mix col-md-4">
                                                   <div className="be-post">
                                                      <a href="#page1.html" className="be-img-block">
                                                      <img src="images/p4.jpg" alt="omg"/>
                                                      </a>
                                                      <div className="mb-4">
                                                      <a href="#page2.html" className="be-post-title" style={{display: "inline"}}>Leaving Home - L'Officiel Ukraine</a><a href="#page2.html" className="be-post-title price">$249</a>
                                                      </div>
                                                   
                                                      <span>
                                                      </span>
                                                      <div className="author-post">
                                                      </div>
                                                   </div>
                                                </div>
                                                 <div className="category-2 mix col-md-4">
                                                   <div className="be-post">
                                                      <a href="#page2.html" className="be-img-block">
                                                      <img src="images/p10.jpg" alt="omg"/>
                                                      </a>
                                                      <div className="mb-4">
                                                      <a href="#page2.html" className="be-post-title" style={{display: "inline"}}>Treebeard</a><a href="#page2.html" className="be-post-title price">$249</a>
                                                      </div>
                                                      <div className="author-post">
                                                      </div>
                                                      <span>
                                                      </span>
                                                      <div className="author-post">
                                                      </div>
                                                   </div>
                                                </div>
                                                <div className="category-3 mix col-md-4">
                                                   <div className="be-post">
                                                      <a href="#page3.html" className="be-img-block">
                                                      <img src="images/p9.jpg" alt="omg"/>
                                                      </a>
                                                      <div className="mb-4">
                                                      <a href="#page2.html" className="be-post-title" style={{display: "inline"}}>Leaving Home - L'Officiel Ukraine</a><a href="#page2.html" className="be-post-title price">$249</a>
                                                      </div>
                                                      <div className="author-post">
                                                      </div>
                                                      <span>
                                                      </span>
                                                      <div className="author-post">
                                                      </div>
                                                   </div>
                                                </div>
                                                <div className="category-4 mix col-md-4">
                                                   <div className="be-post">
                                                      <a href="#page1.html" className="be-img-block">
                                                      <img src="images/p8.jpg" alt="omg"/>
                                                      </a>
     
                                                      <div className="mb-4">
                                                      <a href="#page2.html" className="be-post-title" style={{display: "inline"}}>Leaving Home - L'Officiel Ukraine</a><a href="#page2.html" className="be-post-title price">$249</a>
                                                      </div>
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
                              <div className="tab-info" style={{display: "none"}}>
                                  <div className=" custom-container ">
                                    <div className="container hot-bid">
                                       <div className="row">
                                                    
                                          <div className="col-md-12">
                                             <br/>
                                             <div className="row _post-container_">
                                           
                                                <div className="category-2 mix col-md-4">
                                                   <div className="be-post">
                                                      <a href="#page2.html" className="be-img-block">
                                                      <img src="images/p2.jpg" alt="omg"/>
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
                                                      <img src="images/p3.jpg" alt="omg"/>
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
                                                      <img src="images/p4.jpg" alt="omg"/>
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
                                                      <img src="images/p10.jpg" alt="omg"/>
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
                                                      <img src="images/p9.jpg" alt="omg"/>
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
                                                      <img src="images/p8.jpg" alt="omg"/>
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
                              <div className="tab-info" style={{display: "none"}}>
                                 <div className="row">
                                    <div className="col-ml-12 col-xs-12 col-md-12">
                                       <div className="table-responsive">
                                          <table id="default-ordering" className="table" style={{width:"100%"}}>
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
                                                   <td><img src="https://tv-inventory.s3.eu-west-2.amazonaws.com/terravirtuaart/images/small/asw_rsq_5.png" className="profile-img" alt="avatar" width="64px"/></td>
                                                   <td>Goona</td>
                                                   <td>$200</td>
                                                   <td>2</td>
                                                 
                                                </tr>
                                                <tr>
                                                   <td>2</td>
                                                   <td><img src="https://tv-inventory.s3.eu-west-2.amazonaws.com/terravirtuaart/images/small/asw_rsq_5.png" className="profile-img" alt="avatar" width="64px"/></td>
                                                   <td>Goona</td>
                                                   <td>$300</td>
                                                   <td>3</td>
 
                                                </tr>
                                                <tr>
                                                   <td>3</td>
                                                   <td><img src="https://tv-inventory.s3.eu-west-2.amazonaws.com/terravirtuaart/images/small/asw_rsq_5.png" className="profile-img" alt="avatar" width="64px"/></td>
                                                   <td>Goona</td>
                                                   <td>$400</td>
                                                   <td>4</td>
                                  
                                                </tr>
                                                <tr>
                                                   <td>4</td>
                                                   <td><img src="https://tv-inventory.s3.eu-west-2.amazonaws.com/terravirtuaart/images/small/asw_rsq_5.png" className="profile-img" alt="avatar" width="64px"/></td>
                                                   <td>Goona</td>
                                                   <td>$500</td>
                                                   <td>5</td>
                             
                                                </tr>
                                                <tr>
                                                   <td>5</td>
                                                   <td><img src="https://tv-inventory.s3.eu-west-2.amazonaws.com/terravirtuaart/images/small/asw_rsq_5.png" className="profile-img" alt="avatar" width="64px"/></td>
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
                              <div className="tab-info" style={{display: "none"}}>
                                 <div className="col-sm-12">
                                    <div className="table-responsive">
                                       <table id="default-ordering" className="table" style={{width:"100%"}}>
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
                                                <td><img src="https://tv-inventory.s3.eu-west-2.amazonaws.com/terravirtuaart/images/small/asw_rsq_5.png" className="profile-img" alt="avatar" width="64px"/></td>
                                                <td>Goona</td>
                                                <td>$200</td>
                                                <td>2</td>
                                               
                                             </tr>
                                             <tr>
                                                <td>2</td>
                                                <td><img src="https://tv-inventory.s3.eu-west-2.amazonaws.com/terravirtuaart/images/small/asw_rsq_5.png" className="profile-img" alt="avatar" width="64px"/></td>
                                                <td>Goona</td>
                                                <td>$300</td>
                                                <td>3</td>
                                              
                                             </tr>
                                             <tr>
                                                <td>3</td>
                                                <td><img src="https://tv-inventory.s3.eu-west-2.amazonaws.com/terravirtuaart/images/small/asw_rsq_5.png" className="profile-img" alt="avatar" width="64px"/></td>
                                                <td>Goona</td>
                                                <td>$400</td>
                                                <td>4</td>
                                              
                                             </tr>
                                             <tr>
                                                <td>4</td>
                                                <td><img src="https://tv-inventory.s3.eu-west-2.amazonaws.com/terravirtuaart/images/small/asw_rsq_5.png" className="profile-img" alt="avatar" width="64px"/></td>
                                                <td>Goona</td>
                                                <td>$500</td>
                                                <td>5</td>
                                               
                                             </tr>
                                             <tr>
                                                <td>5</td>
                                                <td><img src="https://tv-inventory.s3.eu-west-2.amazonaws.com/terravirtuaart/images/small/asw_rsq_5.png" className="profile-img" alt="avatar" width="64px"/></td>
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
                  </div>
               </div>
            </div>
         </div>
         <br/>
      </div>

      <div id="search-filters-modal" className="modal fade" role="dialog" style={{display: "none"}} aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered">
       
        <div className="modal-content">
            <div className="modal-header">
                <h4 className="modal-title  text-center w-100">Apply Filters</h4>
                <button type="button" className="close" data-dismiss="modal" style={{marginTop: "-21px"}}>×</button>
            </div>
            <form id="filter_form" methd="GET">
                <div className="row p-3">

                    <div className="col-sm-12 mt-2 pt-1 mb-2">
                        <span className="h6">Editions</span>
                    </div>

                    <div className="col-sm-6 mb-3">
                        <div className="form-group mb-0">
                            <input className="form-input" type="text" id="min_editions" name="min_editions" placeholder="Minimum" value=""/>
                        </div>
                    </div>
                    <div className="col-sm-6 mb-3">
                        <div className="form-group mb-0">
                            <input className="form-input" type="text" id="max_editions" name="max_editions" placeholder="Maximum" value=""/>
                        </div>
                    </div>

                    <div className="col-sm-12 mb-2 mt-1">
                        <span className="h6">Price</span>
                    </div>
                    <div className="col-sm-6 mb-3">
                        <div className="form-group mb-0">
                            <input className="form-input" type="text" id="min_price" name="min_price" placeholder="Minimum (USD)" value=""/>
                        </div>
                    </div>
                    <div className="col-sm-6 mb-3">
                        <div className="form-group mb-0">
                            <input className="form-input" type="text" id="max_price" name="max_price" placeholder="Maximum (USD)" value=""/>
                        </div>
                    </div>

                    <div className="col-sm-4 mb-2 mt-1">
                        <span className="h6">Has Offers</span>
                        <div className="form-group mt-2">
                            <label className="switch">
                              <input type="checkbox" id="has_offers" name="has_offers"/>
                              <span className="slider round"></span>
                            </label>
                        </div>
                    </div>

                    
                    <div className="col-sm-4 mb-2 mt-1">
                        <span className="h6">For Sale</span>
                        <div className="form-group mt-2 mb-0">
                            <label className="switch">
                              <input type="checkbox" id="available" name="available"/>
                              <span className="slider round"></span>
                            </label>
                        </div>
                    </div>
                    <div className="col-sm-4 mb-2 mt-1">
                        <span className="h6">Sold Out</span>
                        <div className="form-group mt-2 mb-0">
                            <label className="switch">
                              <input type="checkbox" id="sold_out" name="sold_out"/>
                              <span className="slider round"></span>
                            </label>
                        </div>
                    </div>
                    


                    <div className="col-sm-12 mt-2 pt-2">
                        <input type="submit" className="btn-primary btn btn-lg col-sm-12" value="Save"/>
                    </div>

                    <div className="col-sm-12 mt-2 text-center">
                        <a href="#" className="clear-search-filters col-sm-12">Clear all</a>
                    </div>
                    
                    
                </div>

            </form>
        </div>
    </div>
</div>
      

      <div id="new-collection" className="modal fade" role="dialog" style={{display: "none"}} aria-hidden="false">
    <div className="modal-dialog modal-dialog-centered">
        {/* <!-- Modal content--> */}
        <div className="modal-content">
            <div className="modal-header">
                <h4 className="modal-title  text-center w-100">Add a New Collection</h4>
                <button type="button" className="close" data-dismiss="modal">×</button>
            </div>
            <form id="add_category_form" >
                <div className="row p-3">
                    <div className="col-12 px-3 d-none error-message">
                        <div className="alert alert-danger mb-3 error-message-content" role="alert">
                        </div>
                    </div>
        
                    <div className="col-12 mb-3">
                        <div className="form-group">
                            <input className="form-input" type="text" name="category_name" placeholder="Collection Name" value=""/>
                        </div>
                    </div>
                    {/* <div className="input-col col-12 mb-3">
                    <div className="form-group focus-2 mb-0">
                      <textarea className="form-input" required="" placeholder="Description"></textarea>
                    </div>
                  </div> */}
                    {/* <div className="col-12 mb-3">
                        <input type="checkbox" name="hidden"/> Hidden
                    </div> */}
                    <div className="col-12">
                        <input type="submit" className="btn-primary btn size-1 col-sm-12 btn-lg" value="Add"/>
                    </div>
                </div>

                <input type="hidden" name="category_type" value="2"/>
                <input type="hidden" id="add_category_url" value="/store/categories/"/>
            </form>
        </div>
    </div>
</div>

<div id="add-collection" className="modal fade" role="dialog" style={{display: "none"}} aria-hidden="true">
         <div className="modal-dialog modal-dialog-centered">
            {/* <!-- Modal content--> */}
            <div className="modal-content">
               <div className="modal-header">
                  <h4 className="modal-title  text-center w-100">Add Nft</h4>
                  <button type="button" className="close" data-dismiss="modal">×</button>
               </div>
               <div className="">
              
              <div className="p-5">
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
                      <div className="form-label">Nft Name</div>
                      <input className="form-input" type="text"/>
                    </div>              
                  </div>
                  <div className="input-col col-xs-12 col-sm-12">
                    <div className="form-group focus-2">
                      <div className="form-label">Nft Description</div>                 
                      <textarea className="form-control"></textarea>
                    </div>                
                  </div>
                  <div className="input-col col-xs-12 col-sm-12">
                    <div className="form-group focus-2">
                      <div className="form-label">Add Nft Price</div>                 
                      <input className="form-input" type="text"/>
                    </div>                
                  </div>
                  <div className="input-col col-xs-12 col-sm-12 mb-4">
                    <div className="form-group focus-2">
                      
                      <input className="form-input" type="file"/>
                    </div>                
                  </div>
                  <div className="input-col col-xs-12">
                    <button className="btn btn-primary  size-1 btn-right">Add</button>              
                  </div>
                  
                                                        
              </div>
                    
                  
                </div>
              </div>
            </div>
            </div>
         </div>
  
  
      {/* </div> */}

{/* <div id="new-collection" className="modal fade in" role="dialog" style={{display: "block"}} ariaHidden="">
    <div className="modal-dialog modal-dialog-centered">
        {/* <!-- Modal content--> */}
        {/* <div className="modal-content">
            <div className="modal-header">
                <h4 className="modal-title  text-center w-100">Add a New Collection</h4>
                <button type="button" className="close" data-dismiss="modal">×</button>
            </div>
            <form id="add_category_form">
                <div className="row p-3">
                    <div className="col-12 px-3 d-none error-message">
                        <div className="alert alert-danger mb-3 error-message-content" role="alert">
                        </div>
                    </div>
        
                    <div className="col-12 mb-3">
                        <div className="form-group">
                            <input className="form-input" type="text" name="category_name" placeholder="Collection Name" value=""/>
                        </div>
                    </div>
                    <div className="input-col col-12 mb-3">
                    <div className="form-group focus-2 mb-0">
                      <textarea className="form-input" required="" placeholder="Description"></textarea>
                    </div>
                  </div>
                    <div className="col-12 mb-3">
                        <input type="checkbox" name="hidden"/> Hidden
                    </div>
                    <div className="col-12">
                        <input type="submit" className="btn-primary btn size-1 col-sm-12 btn-lg" value="Add"/>
                    </div>
                </div>

                <input type="hidden" name="category_type" value="2"/>
                <input type="hidden" id="add_category_url" value="/store/categories/"/>
            </form>
        </div>
    </div>
</div> */} 

</body>

  <Footer/>
  </>
        )
    }
}