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

export default class realstate extends Component {

    constructor(props) {
        super(props)
        this.state = {
         getListArt:[],
        }
    }

    componentDidMount() {
      this.getItemArt()
      window.scrollTo({ top: 0, behavior: 'smooth' });

    }

    //=======================================  Imaages show according to category  =====================

    async getItemArt() {
      await axios({
         method: 'post',
         url: `${config.apiUrl}getRealEstateItem`,
         data: {
            user_id : "0",
            user_collection_id:"0",
            limit:"0"
        }
      })
         .then(result => {
            if (result.data.success === true) {
               this.setState({
                  getListArt: result.data.response
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
            <div id="content-block">
       <br/><br/>
           
         <div className="container-fluid custom-container pl-0 pr-0">
          
            <div className="container-fluid custom-container upcomming-drops" id="upcomming-drops">
               <div className="container">
                  <div className="row">
                     <div className="col-md-12">
                       <h3><strong>Real Estate</strong></h3>
                        <hr/>
                      </div>
                      
                     
                     <div className="col-md-12">
                        <br/>
                        <div  className="row _post-container_">
                    {this.state.getListArt.map(item => (
                        <div className="category-2 mix col-md-4">
                        <div className="be-post">
                           <Link to={`${config.baseUrl}itemdetails/${item.item_edition_id}`} className="be-img-block">
                           <img src={`${config.imageUrl}${item.image}`} alt="omg"/>
                           </Link>
                           <Link to={`${config.baseUrl}itemdetails/${item.item_edition_id}`} className="be-post-title">
                              {item.name}
                           </Link>
                          <Link to={`${config.baseUrl}itemdetails/${item.item_edition_id}`} class="be-post-title price price-data">$ {item.price}</Link>

                           <span>
                           
                           </span>
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
            <br/>
         </div>
      </div>

            <Footer/>
            </>
            )
            }
            }