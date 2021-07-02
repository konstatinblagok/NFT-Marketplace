import React, { Component } from 'react';
 import axios from 'axios';
 import Header from '../directives/header'
 import Footer from '../directives/footer'
 import config from '../config/config'
 import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Loader from "react-loader-spinner";

const headers = {
    'Content-Type': 'application/json'
 };

export default class allcreator extends Component {

    constructor(props) {
        super(props)
        this.loginData = (!Cookies.get('loginSuccess'))? [] : JSON.parse(Cookies.get('loginSuccess'));
       this.state = {
        talentStatusAPIDataSquare:[],
        talentStatusAPIDataCircle:[],
        loaderImage:0
       }
    }

    componentDidMount() {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        this.talentStatusAPI()

    }    

    async talentStatusAPI(){
      this.setState({
         loaderImage:0
      })
      await axios({
         method: 'get',
         url: `${config.apiUrl}allTalentList`,
         data: {}
      })
         .then(result => {
          if (result.data.success === true) {
                 this.setState({
                    talentStatusAPIDataCircle:result.data.circle,
                    talentStatusAPIDataSquare:result.data.square,
                    loaderImage:1
                 })
          }
          else if (result.data.success === false) {
            this.setState({
               loaderImage:1
            })
          }
         }).catch(err => {
            this.setState({
               loaderImage:1
            })
         });
      }

    render() {
        return (    

            <>
            <Header/>
            
            <div id="content-block">
         <br/><br/>
         <div className="container-fluid custom-container">
           
            <div className="container-fluid custom-container upcomming-drops" id="upcomming-drops">
            {this.state.loaderImage === 0 ? 
    <div  className="container" style={{height:'200px'}}>
    <div className="caroselHeight loaderBars" style={{top:'25%',bottom:'50%'}}>
    <Loader type="Bars" color="#00BFFF" height={40} width={40} />
    </div>
    </div>:
               
               <div className="container">
                  <div className="row">
                     <div className="col-md-12">
                        <h3><strong>Featured Creations (view all)</strong></h3>
                     </div>
                     <div className="col-md-12">
                        <br/>
                        <div className="row flex-row flex-nowrap side-scroll nopadding featured-item-wrapper">
                        {this.state.talentStatusAPIDataCircle.map(item => (
          <div className="featured_creation_item ">
          <div className="featured_item_wrp">
             <div className="featured_item creation_content mr-2 mr-md-3">
                <div className="product_item product_feed_item item grid_item_container" feedindex="" productid="107477" overlayurl="/overlay/store/moondayy/kittycoin-2-of-10-66413/product-page/">
                   <div className="item-content compact" data-video-src="https://mkpcdn.com/videos/4323d0987095f6e1a825405dbae208f1_740096.mp4">
                      <Link to={`${config.baseUrl}itemdetails/${item.item_edition_id}`} className="muted product_url overlay_handler" mptrackaction="store:grid:image" data-storeid="moondayy" href="#" target="_blank">
                         <div style={{position:'relative'}} className="media-container">
                         <img src={item.image === null || item.image === '' || item.image === undefined 
                            ? 'images/team2.jpg' 
                            :
                            `${config.imageUrl}${item.image}`} width="100%" className="overlay_handler img-fluid item_image" style={{width:'100px',height:'96px'}}/>
                           
                            <div className="loader-container h-100">
                               <div className="row text-center justify-content-center">
                                  <div className="col-12 align-middle">
                                     <div className="feed-image-loader align-middle d-none">
                                        <img src="/static/img/feed-image-loader.svg" className="w-100"/>
                                     </div>
                                  </div>
                               </div>
                            </div>
                         </div>
                      </Link>
                      <div className="hover_content_wrp d-none ">
                         <div className="row overlay_handler">
                            <a href="#" className="heavy w-100" target="_BLANK">
                               <div className="col-12">
                                  <h5 className="weak nopadding product_title" style={{lineHeight:'1em'}}>kittycoin</h5>
                               </div>
                            </a>
                         </div>
                         <div className="row">
                            <div className="col-12" style={{paddingTop:'.6em'}}>
                               <a href="#" className="heavy w-100 store_url h9 collab-storename" target="_BLANK">moondayy</a>
                            </div>
                         </div>
                         <a className="muted price-details" mptrackaction="store:grid:image" data-storeid="moondayy" href="#" target="_BLANK">
                            <div className="overlay_handler row hover_details" style={{paddingTop:'2em'}}>
                               <div className="col-12">
                                  <div className="h6 float-left mb-1">
                                     Ξ 0.3 (<strong>$1,144.37</strong>)
                                  </div>
                                  <span className="float-right edition">
                                  Edition of 10
                                  </span>
                               </div>
                               <div className="col-12">
                                  <div className="row" style={{fontSize:'.9em'}}>
                                     <div className="col-6">
                                        <span className="primary weak">View details</span>
                                        <div className="icon right-arrow" style={{width: '5px', height: '8px', display:'inline-block',marginLeft: '3px'}}>
                                        </div>
                                     </div>
                                     <div className="col-6 text-right">
                                     </div>
                                  </div>
                               </div>
                            </div>
                         </a>
                      </div>
                      <div className="mobile_details d-md-none py-1 d-none">
                         <div className="row">
                            <a href="#" className="overlay_handler heavy" target="_BLANK">
                               <div className="col-12 mt-1" style={{lineHeight:'1.5em'}}>
                                  <span className="h8 weak nopadding">kittycoin</span>
                               </div>
                            </a>
                         </div>
                         <div className="row">
                            <div className="col-12" style={{fontSize:'1.2em',lineHeight:'2em',marginTop:'1px'}}>
                               <a href="#" className="heavy">
                               <span className="h9 float-left">moondayy</span>
                               </a>
                            </div>
                         </div>
                         <div className="row mt-1">
                            <a className="w-100 heavy" href="#" target="_BLANK">
                               <div className="col-12">
                                  <span className="float-left" style={{fontSize:'1.4em'}}>
                                  <span style={{marginRight:'2em'}}>
                                  Ξ 0.3 (<strong>$1,144.37</strong>)
                                  </span>
                                  <span className="edition float-right">
                                  2 of 10
                                  </span>
                                  </span>
                               </div>
                            </a>
                         </div>
                      </div>
                   </div>
                   <Link to={`${config.baseUrl}featurescreator/${item.user_id}`} target="_blank" className="heavy overlay_handler muted">
                      <div className="creator_profile">
                      <img src={item.profile_pic === null || item.profile_pic === '' || item.profile_pic === undefined 
                        ? 'images/team2.jpg' 
                        :
                        `${config.imageUrl1}${item.profile_pic}`}  className="profile_picture"/>
                        
                      </div>
                      <div className="creator_name text-truncate text-center">
                         <span className="h8 text-muted">{item.first_name}</span>
                      </div>
                   </Link>
                </div>
             </div>
          </div>
       </div>

                        ))}
                       </div>
                     </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                        <br/>
                        <div  className="row _post-container_ profile-banner">
                        {this.state.talentStatusAPIDataSquare.map(item => (
                           <div className="category-1 mix col-md-3">
                              <div className="be-post" style={{borderRadius:'0px'}}>
                                 <Link to={`${config.baseUrl}featurescreator/${item.user_id}`} className="be-img-block" style={{borderRadius:'0px'}} target="_blank">
                                 <img src={item.profile_pic === null || item.profile_pic === '' || item.profile_pic === undefined 
                                    ? 'images/team2.jpg' 
                                    :
                                    `${config.imageUrl1}${item.profile_pic}`} alt=""/>
                                 </Link>
                                <div className="author-post">
                                    <Link to={`${config.baseUrl}itemdetails/${item.item_edition_id}`} target="_blank">
                                <img src={item.image === null || item.image === '' || item.image === undefined 
                                ? 'images/team2.jpg' 
                                :
                                `${config.imageUrl}${item.image}`} alt=""/>
                                </Link>
                                </div>
                                 
                                 <a href="#page1.html" className="be-post-title">{item.first_name}</a>
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
    }
            </div>
            <br/>
         </div>
      </div>
      
 
            <Footer/>
            </>
        )
    }
}