import React, { Component } from 'react';
 import axios from 'axios';
 import Header from '../directives/header'
 import Footer from '../directives/footer'
 import config from '../config/config'
import { Link } from 'react-router-dom';
// import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const headers = {
    'Content-Type': 'application/json'
 };

export default class transaction extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    render() {
        return (    

            <>
             <Header/>
             <div id="content-block">
      <div className="head-bg">
        
       
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
                           <h3><strong>Transaction</strong></h3>
                        </div>
                        <div className="col-md-6 text-right">
                    
                        </div>
                        <div className="col-md-12">
                           <br/>
                           <div className="tab-wrapper style-1 transactionhistory">
                              <div className="tab-nav-wrapper">
                                 <div className="nav-tab  clearfix">
                                    <div className="nav-tab-item active">
                                       <span>Incomming</span>
                                    </div>
                                    <div className="nav-tab-item">
                                       <span>Outgoing</span>
                                    </div>
          
                                    
                                 </div>
                              </div>
                              <div className="tabs-content clearfix">
                                 <div className="tab-info active" style={{display: "block"}}>
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
         
             <Footer/>
             </>
        )
    }
}