import React, { Component } from 'react';
 import axios from 'axios';
 import Header from '../directives/header'
 import Footer from '../directives/footer'
 import config from '../config/config'
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import Countdown,{zeroPad} from 'react-countdown';
import Cookies from 'js-cookie';
import { Player } from 'video-react';
import ReactAudioPlayer from 'react-audio-player';
import { LazyLoadImage  } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Loader from "react-loader-spinner";

const headers = {
    'Content-Type': 'application/json'
 };
const btnFill = {
   background:'linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.7)), url("images/main-bg.jpg")'
   // background:"linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.7))", `url("images/main-bg.jpg")`
}
export default class home extends Component {

    constructor(props) {
        super(props)
        this.state = {
         getListArt:[],
         getListSport:[],
         getListMusic:[],
         getListUpcoming:[],
         getTelentUserData:[],
         getcategoryData:[],
         getCategoryByIdArray:[],
         getWebImageData:[],
         activeBtn:'0',
         email:'',
         subscricbeSuccess:'0',
         subscricbeFAilure:'0',
         subscribeMsg:'',
         spinLoader:'0',
         defaultImage:0
        }
      this.addSubscriberAPI = this.addSubscriberAPI.bind(this)
      this.onChange = this.onChange.bind(this)   
      this.loginData = (!Cookies.get('loginSuccess'))?[]:JSON.parse(Cookies.get('loginSuccess'));
      
      if(window.location.href.split('=')[1] > 0){
            Cookies.set('cryptoPaiment','success');
            if(Cookies.get('create_item_process')){
               if(Cookies.get('create_item_realestat')){
                  window.location.href = `${config.baseUrl}featurescreatorrealestate/${this.loginData.data?.id}`   
               }else{
                  window.location.href = `${config.baseUrl}featurescreator/${this.loginData.data?.id}`
               }
            }else if(Cookies.get('resellItemItemProcess')){
               window.location.href = `${config.baseUrl}yourpurchase`
            }else{
               window.location.href = `${config.baseUrl}purchasedetail`
            }
      }
      else if(window.location.href.split('?')[1]){
            Cookies.set('cryptoPaiment','failed');
            if(Cookies.get('create_item_process')){
               if(Cookies.get('create_item_realestat')){
                  window.location.href = `${config.baseUrl}featurescreatorrealestate/${this.loginData.data?.id}`   
               }else{
                  window.location.href = `${config.baseUrl}featurescreator/${this.loginData.data?.id}`
               }
            }else if(Cookies.get('resellItemItemProcess')){
               window.location.href = `${config.baseUrl}yourpurchase`
            }else{
               window.location.href = `${config.baseUrl}yourpurchase`        
            }
      }

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

    componentDidMount() {
      this.getItemArt()
      this.getItemMusic()
      this.getItemSport()
      this.getItemUpcoming()
      this.getTelentUserAPI()
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.getcategoryAPI()
      this.getCategoryByIdAPI()
      this.getWebImageAPI()
    }

   onChange = e =>{
      this.setState({
          [e.target.name] : e.target.value
       })
   }



    //====================================  Add subscriber API =============================

    async addSubscriberAPI(e) {
       e.preventDefault()
       this.setState({
         spinLoader:'1'
       })
      await axios({
         method: 'post',
         url: `${config.apiUrl}addSubscriber`,
         data:{'email':this.state.email}
      }).then(response => {
         if (response.data.success === true) {
               this.setState({
                  email:'',
                  subscricbeSuccess:'1',
                  subscribeMsg:response.data.msg,
            subscricbeFAilure:'0',
            spinLoader:'0'

               })
         }
      })
      .catch(err => {
         this.setState({
            email:'',
            subscricbeFAilure:'1',
            subscribeMsg:err.response.data.msg,
            subscricbeSuccess:'0',
            spinLoader:'0'
         })
         
      });
    }

    
    async getcategoryAPI() {
      await axios({
         method: 'get',
         url: `${config.apiUrl}getcategory`,
         
      }).then(response => {
         if (response.data.success === true) {
           this.setState({
             getcategoryData: response.data?.response
           })
           
         }
      })
    }

     //====================================  CAtegory API =============================

     async getWebImageAPI() {
        this.setState({
           defaultImage:0
        })
      await axios({
         method: 'get',
         url: `${config.apiUrl}getWebImage`,
      }).then(response => {
         if (response.data.success === true) {
           this.setState({
             getWebImageData: response.data?.response[0],
             defaultImage:1
           })
         }
      })
    }

    //=======================================  Imaages show according to category  =====================

    async getItemArt() {
      await axios({
         method: 'post',
         url: `${config.apiUrl}listAdminItem`,
         data: { "limit":"3","category_id": 1 }
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

   //=======================================  Imaages show according to category  =====================

   async getItemMusic() {
      await axios({
         method: 'post',
         url: `${config.apiUrl}listAdminItem`,
         data: { "limit":"3","category_id": 2 }
      })
         .then(result => {
            if (result.data.success === true) {
               this.setState({
                  getListMusic: result.data.response
               })
            }
            else if (result.data.success === false) {
            }
         }).catch(err => {
         });
   }

   //=======================================  Imaages show according to category  =====================

   async getItemSport() {
      await axios({
         method: 'post',
         url: `${config.apiUrl}listAdminItem`,
         data: { "limit":"3","category_id": 3 }
      })
         .then(result => {
            if (result.data.success === true) {
               this.setState({
                  getListSport: result.data.response
               })
            }
            else if (result.data.success === false) {
            }
         }).catch(err => {
         });
   }

   //=======================================  Imaages show according to category  =====================

   async getItemUpcoming() {
      await axios({
         method: 'post',
         url: `${config.apiUrl}listAdminItem`,
         data: { "limit":"3","category_id": "-1" }
      })
         .then(result => {
            if (result.data.success === true) {
               this.setState({
                  getListUpcoming: result.data.response
               })
            }
            else if (result.data.success === false) {
            }
         }).catch(err => {
         });
   }

      //=======================================  New Talent  =====================

      async getTelentUserAPI() {
         await axios({
            method: 'post',
            url: `${config.apiUrl}getUserTelent`,
            data: { limit:'4' }
         })
            .then(result => {
               if (result.data.success === true) {
                  this.setState({
                     getTelentUserData: result.data.response
                  })
               }
               else if (result.data.success === false) {
               }
            }).catch(err => {
            });
      }

      getCategoryByIdAPI(id){
         if(id === undefined || id === '0'){
            id = '0'
         }
         this.setState({
            activeBtn:id
         })           
         axios({
            method:'post',
            url: `${config.apiUrl}listAdminItem`,
            headers: { "Authorization": this.loginData?.msg },
            data: {'category_id':id,'limit':9}
            })
            .then(response => {
               
            
               if (response.data.success === true) {
                  this.setState({
                     getCategoryByIdArray:response.data.response
                  })   
               }
            
               else if (response.data.success === false) {
                  this.setState({
                     getCategoryByIdArray:[]
                  })
               }
            })
            .catch(err => {
               this.setState({
                  getCategoryByIdArray:[]
               })
            })
      }

      //=====================================  load the data   =========================================

loading(){
   setTimeout(() => {
      window.location.reload()
   }, );
   }
      

    render() {
        return (    

            <>
  <Header/>

{/* <div className="loaderBars">

<Loader type="Bars" color="#00BFFF" height={80} width={80} />
</div> */}
      <div id="content-block">  
      <div className="head-bg" style={{height:this.state.getWebImageData.length === 0 ? '549px':''}}>

      {this.state.getWebImageData.length === 0 ? <div className="caroselHeight loaderBars">
<Loader type="Bars" color="#00BFFF" height={40} width={40} />
</div>:
<div className="caroselHeight">



{/* {this.state.defaultImage === 0 ? 
                <img effect="blur"  src="images/imgpsh_fullsize_anim.jpg" alt="Los Angeles" style={{width:"100%",height:'549'}}/>: */}
<Carousel showThumbs="false" autoPlay="true" interval="10000" infiniteLoop>
                {/* <div>
                <img effect="blur"  src={`${config.imageUrl1}${this.state.getWebImageData?.slider1}`} alt="Los Angeles" style={{width:"100%"}}/>
                {this.state.getWebImageData?.text1 === '' || this.state.getWebImageData?.text1 === null || this.state.getWebImageData?.text1 === undefined || this.state.getWebImageData?.text1 === "<p><br></p>" ? '' :
                <div className="carousel-caption" style={{background: "#060891ad",boxShadow: "0 10px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 1"}}>
                   <div dangerouslySetInnerHTML={{ __html: this.state.getWebImageData?.text1 }}></div>
                
         </div> 
    }
                </div> */}
                <div>
                <img effect="blur"  src={`${config.imageUrl1}${this.state.getWebImageData?.slider2}`} alt="Chicago" style={{width:"100%"}} onClick={this.loading.bind(this)} href={`${config.baseUrl}itemdetails`} />
                {this.state.getWebImageData?.text2 === '' || this.state.getWebImageData?.text2 === null || this.state.getWebImageData?.text2 === undefined || this.state.getWebImageData?.text2 === "<p><br></p>" ? '' :
                <div className="carousel-caption" style={{background: "#060891ad",boxShadow: "0 10px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 1"}}>
                   <div dangerouslySetInnerHTML={{ __html: this.state.getWebImageData?.text2 }}></div>
                
         </div> 
    }
                </div>
                <div>
                <img effect="blur"  src={`${config.imageUrl1}${this.state.getWebImageData?.slider3}`} alt="New york" style={{width:"100%"}} onClick={this.loading.bind(this)} href={`${config.baseUrl}itemdetails`}/>
                {this.state.getWebImageData?.text3 === '' || this.state.getWebImageData?.text3 === null || this.state.getWebImageData?.text3 === undefined || this.state.getWebImageData?.text3 === "<p><br></p>" ? '' :
        <div className="carousel-caption" style={{background: "#060891ad",boxShadow: "0 10px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 1"}}>
        <div dangerouslySetInnerHTML={{ __html: this.state.getWebImageData?.text3 }}></div>
          {/* <span>&nbsp;<Link to={`${config.baseUrl}support`} onClick={this.loading.bind(this)} targrt="_blank" style={{marginTop:'8px'}} className="btn btn-primary">click here</Link></span> */}
         
        </div> 
    }
                </div>
            </Carousel>


{/* } */}
</div>

  
}
    </div>
        
      <div className="container-fluid custom-container pr-0 pl-0">
        <div className="">
         <ToastContainer/>
   
   <div className="container-fluid custom-container upcomming-drops" id="upcomming-drops" style={{display:"none"}}>
     <div className="container">
        <div className="row">
           <div className="col-md-6">
              <h3><strong>Upcoming Drops</strong></h3>
           </div>
           <div className="col-md-6 text-right">
              <div><Link to={`${config.baseUrl}upcomingdrops`} onClick={this.loading.bind(this)} style={{color: "#fff"}}>View all &nbsp;<i style={{fontSize: "17px"}} className="fa fa-angle-right"></i></Link></div>
           </div>
           <div className="col-md-12">
              <br/>
            
               {this.state.getListUpcoming === '' ? 
               <div  className="row _post-container_" style={{height:'200px'}}>
               <div className="caroselHeight loaderBars">
               <Loader type="Bars" color="#00BFFF" height={40} width={40} />
               </div>
               </div>: 
                  <div  className="row _post-container_">
                  {this.state.getListUpcoming.length === 0 ? 
                  <h4 className="text-center upcomigClass">There isn't any assets available.</h4>:
                  this.state.getListUpcoming.map(item => (
                  
                   <div className="category-1 mix col-md-4">
                      <div className="be-post">
                      <Link to={item.file_type === 'video' ? '#/':`${config.baseUrl}itemdetails/${item.item_edition_id}`} className="be-img-block">
  {item.file_type === 'audio' ? 
     <img effect="blur"  src="https://ipfs.io/ipfs/QmcwrJKCnvNuxKP22TpYptN3hM76jmwL6kt4BbieBgCCba" alt="omg"/>:''
  }
  
        {item.file_type === 'image'  ? 
        <img effect="blur"  src={`${config.imageUrl}${item.image}`} alt="omg"/>:
        item.file_type === 'video' ? 
        <Player className="preview_image_data" src={`${config.imageUrl}${item.image}`}/> :
        <ReactAudioPlayer
           src={`${config.imageUrl}${item.image}`}
           
           controls
           />    
                }
               
       </Link>
                        
                        <div className="timer">
                           
                        <Countdown
                            date={this.getTimeOfStartDate(item.start_date)}
                            renderer={this.CountdownTimer}
                         />
                        </div>
                        <div className="mb-4">
                        <Link to={`${config.baseUrl}itemdetails/${item.item_edition_id}`} target="_blank" className="be-post-title">
                           {item.name}</Link>
                           {/* <Link to={`${config.baseUrl}itemdetails/${item.item_edition_id}`} target="_blank" className="be-post-title price price-data">$ {item.price}</Link> */}
                           </div>
                        <span>
                        
                        </span>
                        <div className="author-post">
                           
                           
                        </div>
                        
                     </div>
                  </div>
               ))}
                  
               </div>
            
            }
           </div>
        </div>
     </div>
  </div>
   
  <br/>
  <div className="container-fluid custom-container newsletter" style={btnFill}>
               <div className="container">
                  <div className="row">
                     <div className="col-md-2">
                        
                     </div>
                     <div className="col-md-8 text-center newsletter-form">
                     {/* //=========================  for success msg  =============== */}
                     <div className="alert alert-success alert-dismissible fade sucessmsg row" role="alert" style={{marginLeft:'auto',marginRight:'auto',display:this.state.subscricbeSuccess === '0'?'none':'block'}}>
                       
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                           <span aria-hidden="true">&times;</span>
                        </button>
                        <strong>{this.state.subscribeMsg}</strong> 
                     </div>

                     {/* //============================= for fasli masg ============= */}

                     <div className="alert alert-warning alert-dismissible fade warningMsg row" role="alert" style={{marginLeft:'auto',marginRight:'auto',display:this.state.subscricbeFAilure === '0'?'none':'block'}}>
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                           <span aria-hidden="true">&times;</span>
                        </button>
                        <strong>{this.state.subscribeMsg}</strong> 
                        </div>

                        <h3>Stay up to date with Vulnerary</h3>
                        <br/>
                        <form onSubmit={this.addSubscriberAPI} className="subscribe-form">
                           <input type="email" placeholder="Enter your email address"
                           name="email" value={this.state.email} onChange={this.onChange}/> 
                           <div className="submit-block" style={{width: "138px"}}>

                           {this.state.spinLoader === '0' ? 
                           <>
            <span className="">&nbsp;Subscribe</span>
            <input type="submit" disabled={!this.state.email}/>
            </> :
             <>
             <span className="" style={{right:'76px'}}>&nbsp;Subscribe</span><i style={{right:'-106px'}} className="fa fa-spinner fa-spin validat"></i>
             <input type="submit" disabled={!this.state.email}/>
             </>
         
          }
           
                           </div>
                        </form>
                     </div>
                     <div className="col-md-2">
                        
                     </div>
                     
                  </div>
               </div>
            </div>
           
            <br/><br/>
      <div className="container-fluid custom-container " id="art" style={{display:"none"}}>
         <div className="container hot-bid">
            <div className="row">
               <div className="col-md-6">
                  <h3><strong>Art</strong></h3>
               </div>
               <div className="col-md-6 text-right">
                  <div><Link to={`${config.baseUrl}artviewall`} onClick={this.loading.bind(this)} style={{color: "#fff"}}>View all &nbsp;<i style={{fontSize: "17px"}} className="fa fa-angle-right"></i></Link></div>
               </div>
               <div className="col-md-12">
                  <br/>
                  {this.state.getListArt.length === '' ? 
                <div  className="row _post-container_" style={{height:'200px'}}>
                <div className="caroselHeight loaderBars">
                <Loader type="Bars" color="#00BFFF" height={40} width={40} />
                </div>
                </div>:   
                <div  className="row _post-container_">
                {this.state.getListArt.map(item => (
                    <div className="category-2 mix col-md-4">
                       
                    <div className="be-post">
                       {item.is_sold === 0 ? 
                       '':<div className="soldOut">
                       <img src="images/sold.png"/>
                    </div>
                    }


                    
                    <Link to={item.file_type === 'video' ? '#/':`${config.baseUrl}itemdetails/${item.item_edition_id}`} className="be-img-block">
{item.file_type === 'audio' ? 
<img effect="blur"  src="https://ipfs.io/ipfs/QmcwrJKCnvNuxKP22TpYptN3hM76jmwL6kt4BbieBgCCba" alt="omg"/>:''
}

  {item.file_type === 'image'  ? 
  <img effect="blur"  src={`${config.imageUrl}${item.image}`} alt="omg"/>:
  item.file_type === 'video' ? 
  <Player className="preview_image_data" src={`${config.imageUrl}${item.image}`}/> :
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
                       <Link to={`${config.baseUrl}itemdetails/${item.item_edition_id}`} target="_blank" className="be-post-title">
                          {item.name}
                       </Link>
                      <Link to={`${config.baseUrl}itemdetails/${item.item_edition_id}`} target="_blank" className="be-post-title price price-data">$ {item.price}</Link>

                       <span>
                       
                       </span>
                       <div className="author-post">
                          
                          
                       </div>
                       
                    </div>
                 </div>
                
                ))}
              </div>
          
               }
                   </div>
            </div>
         </div>
      </div>
      <br/>
         <div className="container-fluid custom-container" style={{display:"none"}}>
            <div className="container">
               <div className="row">
                  <div className="col-md-6">
                     <h3><strong>Music</strong></h3>
                  </div>
                  <div className="col-md-6 text-right">
                     <div><Link to={`${config.baseUrl}musicviewall`} onClick={this.loading.bind(this)} style={{color: "#fff"}}>View all &nbsp;<i style={{fontSize: "17px"}} className="fa fa-angle-right"></i></Link></div>
                  </div>
                  <div className="col-md-12">
                     <br/>
                     {this.state.getListMusic === '' ? 
                   <div  className="row _post-container_" style={{height:'200px'}}>
                   <div className="caroselHeight loaderBars">
                   <Loader type="Bars" color="#00BFFF" height={40} width={40} />
                   </div>
                   </div>:   
                    <div  className="row _post-container_">
                    {this.state.getListMusic.map(item => (

                        <div className="category-1 mix col-md-4">
                           <div className="be-post">
                           {item.is_sold === 0 ? 
                           '':<div className="soldOut">
                           <img src="images/sold.png"/>
                        </div>
                        }
                           <Link to={item.file_type === 'video' ? '#/':`${config.baseUrl}itemdetails/${item.item_edition_id}`} className="be-img-block">
{item.file_type === 'audio' ? 
   <img effect="blur"  src="https://ipfs.io/ipfs/QmcwrJKCnvNuxKP22TpYptN3hM76jmwL6kt4BbieBgCCba" alt="omg"/>:''
}

      {item.file_type === 'image'  ? 
      <img effect="blur"  src={`${config.imageUrl}${item.image}`} alt="omg"/>:
      item.file_type === 'video' ? 
      <Player className="preview_image_data" src={`${config.imageUrl}${item.image}`}/> :
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
                              <Link to={`${config.baseUrl}itemdetails/${item.item_edition_id}`} target="_blank"
                               className="be-post-title">{item.name}</Link>
                          <Link to={`${config.baseUrl}itemdetails/${item.item_edition_id}`} target="_blank" className="be-post-title price price-data" style={{marginTop:'-40px'}}>$ {item.price}</Link>

                              {/* <span> */}
                             
                              <div className="author-post">
                                 
                                 
                              </div>
                              
                           </div>
                        </div>
                    ))}
                     
                     </div>
                 
                  }
                     </div>
               </div>
            </div>
         </div>
             <br/><br/>
             <div className="container-fluid custom-container " style={{display:"none"}}>
         <div className="container hot-bid">
            <div className="row">
               <div className="col-md-6">
                  <h3><strong>Sport</strong></h3>
               </div>
               <div className="col-md-6 text-right">
                  <div><Link to={`${config.baseUrl}sportviewall`} style={{color: "#fff"}}>View all &nbsp;<i style={{fontSize: "17px"}} className="fa fa-angle-right"></i></Link></div>
               </div>
               <div className="col-md-12">
                  <br/>
                  {this.state.getListSport === '' ? 
               <div  className="row _post-container_" style={{height:'200px'}}>
               <div className="caroselHeight loaderBars">
               <Loader type="Bars" color="#00BFFF" height={40} width={40} />
               </div>
               </div>:   
                <div  className="row _post-container_">
                {this.state.getListSport.map(item => (
                 
                   <div className="category-2 mix col-md-4">
                      <div className="be-post">
                      {item.is_sold === 0 ? 
                         '':<div className="soldOut">
                         <img src="images/sold.png"/>
                      </div>
                      }
                      <Link to={item.file_type === 'video' ? '#/':`${config.baseUrl}itemdetails/${item.item_edition_id}`} className="be-img-block">
{item.file_type === 'audio' ? 
 <img effect="blur"  src="https://ipfs.io/ipfs/QmcwrJKCnvNuxKP22TpYptN3hM76jmwL6kt4BbieBgCCba" alt="omg"/>:''
}

    {item.file_type === 'image'  ? 
    <img effect="blur"  src={`${config.imageUrl}${item.image}`} alt="omg"/>:
    item.file_type === 'video' ? 
    <Player className="preview_image_data" src={`${config.imageUrl}${item.image}`}/> :
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
                         <Link to={`${config.baseUrl}itemdetails/${item.item_edition_id}`} target="_blank" className="be-post-title">{item.name}</Link>
                        <Link to={`${config.baseUrl}itemdetails/${item.item_edition_id}`} target="_blank" className="be-post-title price price-data">$ {item.price}</Link>

                         <span>
                         
                         </span>
                         <div className="author-post">
                            
                            
                         </div>
                         
                      </div>
                   </div>
                ))}
</div>
            
               }
                  </div>
            </div>
         </div>
      </div>
      <br/><br/> 
      
            <div className="container-fluid custom-container" style={{display:"none"}}>
               <div className="container">
                  <div className="row">
                     <div className="col-md-6">
                        <h3><strong>Featured Creators</strong></h3>
                     </div>
                     <div className="col-md-6 text-right">
                        <div><Link to={`${config.baseUrl}allcreator`} style={{color: "#fff"}}>
                           View all &nbsp;<i style={{fontSize: "17px"}} className="fa fa-angle-right"></i></Link></div>
                     </div>
                     <div className="col-md-12">
                        <br/>
                        <div  className="row ">
                           {this.state.getTelentUserData.map(item => (
                              <Link to={`${config.baseUrl}featurescreator/${item.user_id}`} target="_blank">
                           <div className="col-md-3">
                              <div className="main-left-sidebar no-margin mb-5">
                                 <div className="user-data full-width">
                                    <div className="user-profile">
                                    {/* // http://www.vigneshwartours.com/wp-content/uploads/2016/08/himachal-Pradesh-banner.jpg */}
                                       {/* {item.banner === '' || item.banner === null || item.banner === undefined ?} */}
                                       <div className="username-dt" style={{backgroundImage: item.banner === '' || item.banner === null || item.banner === undefined 
                                       ?
                                       "url('http://www.vigneshwartours.com/wp-content/uploads/2016/08/himachal-Pradesh-banner.jpg')":
                                        `url(${config.imageUrl1}${item.banner})`}}>
                                          <div className="usr-pic">
                                             <img effect="blur"  src={item.profile_pic === null || item.profile_pic === '' || item.profile_pic === undefined 
                                             ? 'images/noimage.png' 
                                             :
                                             `${config.imageUrl1}${item.profile_pic}`} style={{width:'100px',height:'98px'}} alt=""/>
                                          </div>
                                       </div>
                                       {/* <!--username-dt end--> */}
                                       <div className="user-specs">
                                          <h4>{item.first_name} {item.last_name}</h4>
                                          {/* <Link to={`${config.baseUrl}featurescreator/${item.user_id}`}>@{item.user_name}</Link> */}
                                       </div>
                                    </div>
                                    {/* <!--user-profile end--> */}
                                 </div>
                                 {/* <!--user-data end--> */}
                              </div>
                           </div>
                           </Link>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>          
            <br/><br/>
               <div className="container-fluid custom-container explore">
                  <div className="container">
                     <div className="row">
                        <div className="col-md-6">
                           <h3><strong>Explore</strong></h3>
                        </div>
                        <div className="col-md-6 text-right">
                           {/* <!-- <div><a href="##">View all</a></div> --> */}
                        </div>
                        <div className="col-md-12">
                           <br/>
                           <div className="tab-wrapper style-1">
                              <div className="tab-nav-wrapper">
                                 <div className="nav-tab  clearfix scrollmenu">
                                    <div className={`nav-tab-item ${(this.state.activeBtn == 0)?`active`:``} `}>
                                       <span onClick={this.getCategoryByIdAPI.bind(this,'0')}>All</span>
                                    </div>
                                       {this.state.getcategoryData.map(item => (
                                    <div className={`nav-tab-item ${(this.state.activeBtn == item.id)?`active`:``} `} onClick={this.getCategoryByIdAPI.bind(this,item.id)}>
                                       <span>
                                          {item.name}
                                          </span>
                                    </div>
                                          ))}
                                    
                                 </div>
                              </div>
                              <div className="tabs-content clearfix">
                                 <div className="tab-info active" style={{display: "block"}}>
                                    <div className="row">
                                       {this.state.getCategoryByIdArray.length === 0 
                                       ? <h3 className="text-center">No Item in this product.</h3>:
                                       this.state.getCategoryByIdArray.map(item => (
                                          <div className="col-ml-12 col-xs-6 col-md-4">
                                          <div className="be-post">
                                          {item.is_sold === 0 ? 
                                             '':<div className="soldOut">
                                             <img src="images/sold.png"/>
                                          </div>
                                          }
                                              <Link to={item.file_type === 'video' ? '#/':`${config.baseUrl}itemdetails/${item.item_edition_id}`} className="be-img-block">
                                          {item.file_type === 'audio' ? 
                                             <img effect="blur"  src="https://ipfs.io/ipfs/QmcwrJKCnvNuxKP22TpYptN3hM76jmwL6kt4BbieBgCCba" alt="omg"/>:''
                                       }
                                       
                                                {item.file_type === 'image'  ? 
                                                <img effect="blur"  src={`${config.imageUrl}${item.image}`} alt="omg"/>:
                                                item.file_type === 'video' ? 
                                                <Player className="preview_image_data" src={`${config.imageUrl}${item.image}`}/> :
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
                                             <Link to={`${config.baseUrl}itemdetails/${item.item_edition_id}`} target="_blank" onClick={this.loading.bind(this)} style={{display:'inline'}} className="be-post-title">
                                                {item.name}</Link>
                                                <Link to={`${config.baseUrl}itemdetails/${item.item_edition_id}`} target="_blank" onClick={this.loading.bind(this)} className="be-post-title price">$ {item.price}</Link>
                                             </div>
                                             
                                             <div className="author-post">
                                                
                                                
                                             </div>
                                                                         
                                          </div>
                                       </div>
                                    
                                       ))}
                                       </div>
                                 </div>
                                 <br/>
                                 <br/>
                                 <div className="tab-info" style={{display: "none"}}>
                                    <div className="row">
                                       <div className="col-ml-12 col-xs-6 col-md-4">
                                          <div className="be-post">
                                             <a href="#page1.html" className="be-img-block">
                                             <img effect="blur"  src="images/p8.jpg" alt="omg"/>
                                             </a>
                                             <a href="#page1.html" className="be-post-title">Racing Queensland</a>
                                             
                                             <div className="author-post">
                                                
                                                
                                             </div>
                                                                         
                                          </div>
                                       </div>
                                       <div className="col-ml-12 col-xs-6 col-md-4">
                                          <div className="be-post">
                                             <a href="#page1.html" className="be-img-block">
                                             <img effect="blur"  src="images/p12.jpg" alt="omg"/>
                                             </a>
                                             <a href="#page1.html" className="be-post-title">Face</a>
                                             
                                             <div className="author-post">
                                                
                                                
                                             </div>
                                                                        
                                          </div>
                                       </div>
                                       <div className="col-ml-12 col-xs-6 col-md-4">
                                          <div className="be-post">
                                             <a href="#page1.html" className="be-img-block">
                                             <img effect="blur"  src="images/p2.jpg" alt="omg"/>
                                             </a>
                                             <a href="#page1.html" className="be-post-title">Treebeard</a>
                                             
                                             <div className="author-post">
                                                
                                                
                                             </div>
                                                                        
                                          </div>
                                       </div>
                                       <div className="col-ml-12 col-xs-6 col-md-4">
                                          <div className="be-post">
                                             <a href="#page1.html" className="be-img-block">
                                             <img effect="blur"  src="images/p3.jpg" alt="omg"/>
                                             </a>
                                             <a href="#page1.html" className="be-post-title">Colors of Ramadan</a>
                                             
                                                                       
                                          </div>
                                       </div>
                                       <div className="col-ml-12 col-xs-6 col-md-4">
                                          <div className="be-post">
                                             <a href="#page1.html" className="be-img-block">
                                             <img effect="blur"  src="images/p4.jpg" alt="omg"/>
                                             </a>
                                             <a href="#page1.html" className="be-post-title">Leaving Home - L'Officiel Ukraine</a>
                                             
                                             <div className="author-post">
                                                
                                                
                                             </div>
                                                                       
                                          </div>
                                       </div>
                                       <div className="col-ml-12 col-xs-6 col-md-4">
                                          <div className="be-post">
                                             <a href="#page1.html" className="be-img-block">
                                             <img effect="blur"  src="images/p7.jpg" alt="omg"/>
                                             </a>
                                             <a href="#page1.html" className="be-post-title">raindrops monochrome</a>
                                             
                                             <div className="author-post">
                                                
                                                
                                             </div>
                                                                          
                                          </div>
                                       </div>
                                       <div className="col-ml-12 col-xs-6 col-md-4">
                                          <div className="be-post">
                                             <a href="#page1.html" className="be-img-block">
                                             <img effect="blur"  src="images/p9.jpg" alt="omg"/>
                                             </a>
                                             <a href="#page1.html" className="be-post-title">NAHA Finalist Hairstylist of the Year Allen Ruiz</a>
                                             
                                             <div className="author-post">
                                                
                                                
                                             </div>
                                                                          
                                          </div>
                                       </div>
                                       <div className="col-ml-12 col-xs-6 col-md-4">
                                          <div className="be-post">
                                             <a href="#page1.html" className="be-img-block">
                                             <img effect="blur"  src="images/p13.jpg" alt="omg"/>
                                             </a>
                                             <a href="#page1.html" className="be-post-title">Stay Ahead Series</a>
                                             
                                             <div className="author-post">
                                                
                                                
                                             </div>
                                                                        
                                          </div>
                                       </div>
                                       <div className="col-ml-12 col-xs-6 col-md-4">
                                          <div className="be-post">
                                             <a href="#page1.html" className="be-img-block">
                                             <img effect="blur"  src="images/p14.jpg" alt="omg"/>
                                             </a>
                                             <a href="#page1.html" className="be-post-title">Faber-Castell / Psychological Problems</a>
                                             
                                             <div className="author-post">
                                                
                                                
                                             </div>
                                                                        
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="tab-info" style={{display: "none"}}>
                                    <div className="row">
                                       <div className="col-ml-12 col-xs-6 col-md-4">
                                          <div className="be-post style-4">
                                             <a href="#page1.html" className="be-img-block">
                                             <img effect="blur"  src="images/p16.jpg" alt="omg"/>
                                             </a>
                                             <a href="#page1.html" className="be-post-title">Wisdom For My Children, Life Lessons Through</a>
                                             <div className="author-post clearfix">
                                                
                                                
                                                
                                             </div>
                                          </div>
                                       </div>
                                       <div className="col-ml-12 col-xs-6 col-md-4">
                                          <div className="be-post style-4">
                                             <a href="#page1.html" className="be-img-block">
                                             <img effect="blur"  src="images/p17.jpg" alt="omg"/>
                                             </a>
                                             <a href="#page1.html" className="be-post-title">Créations Namale</a>
                                             <div className="author-post clearfix">
                                                
                                                
                                                                                  
                                             </div>
                                          </div>
                                       </div>
                                       <div className="col-ml-12 col-xs-6 col-md-4">
                                          <div className="be-post style-4">
                                             <a href="#page1.html" className="be-img-block">
                                             <img effect="blur"  src="images/p18.jpg" alt="omg"/>
                                             </a>
                                             <a href="#page1.html" className="be-post-title">Crossfit : 15.4 Open Workout</a>
                                             <div className="author-post clearfix">
                                                
                                                
                                                
                                             </div>
                                          </div>
                                       </div>
                                       <div className="col-ml-12 col-xs-6 col-md-4">
                                          <div className="be-post style-4">
                                             <a href="#page1.html" className="be-img-block">
                                             <img effect="blur"  src="images/p15.jpg" alt="omg"/>
                                             </a>
                                             <a href="#page1.html" className="be-post-title">Garry Simpson - Bridges - Intelligent Life Magazine</a>
                                             <div className="author-post clearfix">
                                                
                                                
                                                
                                             </div>
                                          </div>
                                       </div>
                                       <div className="col-ml-12 col-xs-6 col-md-4">
                                          <div className="be-post style-4">
                                             <a href="#page1.html" className="be-img-block">
                                             <img effect="blur"  src="images/p14.jpg" alt="omg"/>
                                             </a>
                                             <a href="#page1.html" className="be-post-title">Faber-Castell / Psychological Problems</a>
                                             <div className="author-post clearfix">
                                                
                                                
                                                
                                             </div>
                                          </div>
                                       </div>
                                       <div className="col-ml-12 col-xs-6 col-md-4">
                                          <div className="be-post style-4">
                                             <a href="#page1.html" className="be-img-block">
                                             <img effect="blur"  src="images/p13.jpg" alt="omg"/>
                                             </a>
                                             <a href="#page1.html" className="be-post-title">Stay Ahead Series</a>
                                             <div className="author-post clearfix">
                                                
                                                
                                                
                                             </div>
                                          </div>
                                       </div>
                                       <div className="col-ml-12 col-xs-6 col-md-4">
                                          <div className="be-post style-4">
                                             <a href="#page1.html" className="be-img-block">
                                             <img effect="blur"  src="images/p12.jpg" alt="omg"/>
                                             </a>
                                             <a href="#page1.html" className="be-post-title">Face</a>
                                             <div className="author-post clearfix">
                                                
                                                
                                                
                                             </div>
                                          </div>
                                       </div>
                                       <div className="col-ml-12 col-xs-6 col-md-4">
                                          <div className="be-post style-4">
                                             <a href="#page1.html" className="be-img-block">
                                             <img effect="blur"  src="images/p19.jpg" alt="omg"/>
                                             </a>
                                             <a href="#page1.html" className="be-post-title">Promoção Facas Extra</a>
                                             <div className="author-post clearfix">
                                                
                                                
                                                
                                             </div>
                                          </div>
                                       </div>
                                       <div className="col-ml-12 col-xs-6 col-md-4">
                                          <div className="be-post style-4">
                                             <a href="#page1.html" className="be-img-block">
                                             <img effect="blur"  src="images/p11.jpg" alt="omg"/>
                                             </a>
                                             <a href="#page1.html" className="be-post-title">Tropicalia</a>
                                             <div className="author-post clearfix">
                                                
                                                
                                                
                                             </div>
                                          </div>
                                       </div>
                                       <div className="col-ml-12 col-xs-6 col-md-4">
                                          <div className="be-post style-4">
                                             <a href="#page1.html" className="be-img-block">
                                             <img effect="blur"  src="images/p10.jpg" alt="omg"/>
                                             </a>
                                             <a href="#page1.html" className="be-post-title">tomorrow</a>
                                             <div className="author-post clearfix">
                                                
                                                
                                                
                                             </div>
                                          </div>
                                       </div>
                                       <div className="col-ml-12 col-xs-6 col-md-4">
                                          <div className="be-post style-4">
                                             <a href="#page1.html" className="be-img-block">
                                             <img effect="blur"  src="images/p9.jpg" alt="omg"/>
                                             </a>
                                             <a href="#page1.html" className="be-post-title">NAHA Finalist Hairstylist of the Year Allen Ruiz</a>
                                             <div className="author-post clearfix">
                                                
                                                
                                                
                                             </div>
                                          </div>
                                       </div>
                                       <div className="col-ml-12 col-xs-6 col-md-4">
                                          <div className="be-post style-4">
                                             <a href="#page1.html" className="be-img-block">
                                             <img effect="blur"  src="images/p8.jpg" alt="omg"/>
                                             </a>
                                             <a href="#page1.html" className="be-post-title">Racing Queensland</a>
                                             <div className="author-post clearfix">
                                                
                                                
                                                
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="tab-info" style={{display: "none"}}>
                                    <div className="collection">
                                       <h3 className="menu-article">Creative Ideas</h3>
                                       <div className="collection-header">
                                          <span><i className="fa fa-user"></i>by <a href="#page1.html">Leigh Taylor</a> </span>
                                          <span><i className="fa fa-thumbs-o-up"></i> 360</span>
                                          <span><i className="fa fa-eye"></i> 789</span>
                                       </div>
                                       <div className="collection-entry">
                                          <a href="#page1.html" className="portfolio-link type-2 clearfix">
                                             <img effect="blur"  src="images/collection_1.jpg" alt=""/>
                                             <img effect="blur"  src="images/collection_2.jpg" alt=""/>
                                             <img effect="blur"  src="images/collection_3.jpg" alt=""/>
                                             <img effect="blur"  src="images/collection_4.jpg" alt=""/>
                                             <img effect="blur"  src="images/collection_5.jpg" alt=""/>
                                             <div className="color_bg">
                                                <span>view gallery</span>
                                                <span className="child"></span>
                                             </div>
                                          </a>
                                       </div>
                                    </div>
                                    <div className="collection">
                                       <h3 className="menu-article">Creative Agency</h3>
                                       <div className="collection-header">
                                          <span><i className="fa fa-user"></i>by <a href="#page1.html">Leigh Taylor</a> </span>
                                          <span><i className="fa fa-thumbs-o-up"></i> 360</span>
                                          <span><i className="fa fa-eye"></i> 789</span>
                                       </div>
                                       <div className="collection-entry">
                                          <a href="#page1.html" className="portfolio-link type-2 clearfix">
                                             <img effect="blur"  src="images/collection_6.jpg" alt=""/>
                                             <img effect="blur"  src="images/collection_7.jpg" alt=""/>
                                             <img effect="blur"  src="images/collection_8.jpg" alt=""/>
                                             <img effect="blur"  src="images/collection_9.jpg" alt=""/>
                                             <img effect="blur"  src="images/collection_10.jpg" alt=""/>
                                             <div className="color_bg">
                                                <span>view gallery</span>
                                                <span className="child"></span>
                                             </div>
                                          </a>
                                       </div>
                                    </div>
                                    <div className="collection">
                                       <h3 className="menu-article">Creative Agency</h3>
                                       <div className="collection-header">
                                          <span><i className="fa fa-user"></i>by <a href="#page1.html">Inspiration Art</a> </span>
                                          <span><i className="fa fa-thumbs-o-up"></i> 360</span>
                                          <span><i className="fa fa-eye"></i> 789</span>
                                       </div>
                                       <div className="collection-entry">
                                          <a href="#page1.html" className="portfolio-link type-2 clearfix">
                                             <img effect="blur"  src="images/collection_11.jpg" alt=""/>
                                             <img effect="blur"  src="images/collection_12.jpg" alt=""/>
                                             <img effect="blur"  src="images/collection_13.jpg" alt=""/>
                                             <img effect="blur"  src="images/collection_14.jpg" alt=""/>
                                             <img effect="blur"  src="images/collection_15.jpg" alt=""/>
                                             <div className="color_bg">
                                                <span>view gallery</span>
                                                <span className="child"></span>
                                             </div>
                                          </a>
                                       </div>
                                    </div>
                                    <div className="collection">
                                       <h3 className="menu-article">Ideas For Personal Site</h3>
                                       <div className="collection-header">
                                          <span><i className="fa fa-user"></i>by <a href="#page1.html">Inspiration Art</a> </span>
                                          <span><i className="fa fa-thumbs-o-up"></i> 360</span>
                                          <span><i className="fa fa-eye"></i> 789</span>
                                       </div>
                                       <div className="collection-entry">
                                          <a href="#page1.html" className="portfolio-link type-2 clearfix">
                                             <img effect="blur"  src="images/collection_16.jpg" alt=""/>
                                             <img effect="blur"  src="images/collection_17.jpg" alt=""/>
                                             <img effect="blur"  src="images/collection_18.jpg" alt=""/>
                                             <img effect="blur"  src="images/collection_19.jpg" alt=""/>
                                             <img effect="blur"  src="images/collection_20.jpg" alt=""/>
                                             <div className="color_bg">
                                                <span>view gallery</span>
                                                <span className="child"></span>
                                             </div>
                                          </a>
                                       </div>
                                    </div>
                                    <div className="collection">
                                       <h3 className="menu-article">Inspiration Photos</h3>
                                       <div className="collection-header">
                                          <span><i className="fa fa-user"></i>by <a href="#page1.html">Inspiration Art</a> </span>
                                          <span><i className="fa fa-thumbs-o-up"></i> 360</span>
                                          <span><i className="fa fa-eye"></i> 789</span>
                                       </div>
                                       <div className="collection-entry">
                                          <a href="#page1.html" className="portfolio-link type-2 clearfix">
                                             <img effect="blur"  src="images/collection_16.jpg" alt=""/>
                                             <img effect="blur"  src="images/collection_17.jpg" alt=""/>
                                             <img effect="blur"  src="images/collection_18.jpg" alt=""/>
                                             <img effect="blur"  src="images/collection_19.jpg" alt=""/>
                                             <img effect="blur"  src="images/collection_20.jpg" alt=""/>
                                             <div className="color_bg">
                                                <span>view gallery</span>
                                                <span className="child"></span>
                                             </div>
                                          </a>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="tab-info" style={{display: "none"}}>
                                    <div className="row">
                                       <div className="col-ml-12 col-xs-6 col-md-4">
                                          <div className="be-post">
                                             <a href="#page1.html" className="be-img-block">
                                             <img effect="blur"  src="images/p8.jpg" alt="omg"/>
                                             </a>
                                             <a href="#page1.html" className="be-post-title">Racing Queensland</a>
                                             
                                             <div className="author-post">
                                                
                                                
                                             </div>
                                                                        
                                          </div>
                                       </div>
                                       <div className="col-ml-12 col-xs-6 col-md-4">
                                          <div className="be-post">
                                             <a href="#page1.html" className="be-img-block">
                                             <img effect="blur"  src="images/p12.jpg" alt="omg"/>
                                             </a>
                                             <a href="#page1.html" className="be-post-title">Face</a>
                                             
                                             <div className="author-post">
                                                
                                                
                                             </div>
                                                                        
                                          </div>
                                       </div>
                                       <div className="col-ml-12 col-xs-6 col-md-4">
                                          <div className="be-post">
                                             <a href="#page1.html" className="be-img-block">
                                             <img effect="blur"  src="images/p2.jpg" alt="omg"/>
                                             </a>
                                             <a href="#page1.html" className="be-post-title">Treebeard</a>
                                             
                                             <div className="author-post">
                                                
                                                
                                             </div>
                                                                          
                                          </div>
                                       </div>
                                       <div className="col-ml-12 col-xs-6 col-md-4">
                                          <div className="be-post">
                                             <a href="#page1.html" className="be-img-block">
                                             <img effect="blur"  src="images/p3.jpg" alt="omg"/>
                                             </a>
                                             <a href="#page1.html" className="be-post-title">Colors of Ramadan</a>
                                             
                                                                       
                                          </div>
                                       </div>
                                       <div className="col-ml-12 col-xs-6 col-md-4">
                                          <div className="be-post">
                                             <a href="#page1.html" className="be-img-block">
                                             <img effect="blur"  src="images/p4.jpg" alt="omg"/>
                                             </a>
                                             <a href="#page1.html" className="be-post-title">Leaving Home - L'Officiel Ukraine</a>
                                             
                                             <div className="author-post">
                                                
                                                
                                             </div>
                                                                     
                                          </div>
                                       </div>
                                       <div className="col-ml-12 col-xs-6 col-md-4">
                                          <div className="be-post">
                                             <a href="#page1.html" className="be-img-block">
                                             <img effect="blur"  src="images/p7.jpg" alt="omg"/>
                                             </a>
                                             <a href="#page1.html" className="be-post-title">raindrops monochrome</a>
                                             
                                             <div className="author-post">
                                                
                                                
                                             </div>
                                                                         
                                          </div>
                                       </div>
                                       <div className="col-ml-12 col-xs-6 col-md-4">
                                          <div className="be-post">
                                             <a href="#page1.html" className="be-img-block">
                                             <img effect="blur"  src="images/p9.jpg" alt="omg"/>
                                             </a>
                                             <a href="#page1.html" className="be-post-title">NAHA Finalist Hairstylist of the Year Allen Ruiz</a>
                                             
                                             <div className="author-post">
                                                
                                                
                                             </div>
                                                                       
                                          </div>
                                       </div>
                                       <div className="col-ml-12 col-xs-6 col-md-4">
                                          <div className="be-post">
                                             <a href="#page1.html" className="be-img-block">
                                             <img effect="blur"  src="images/p13.jpg" alt="omg"/>
                                             </a>
                                             <a href="#page1.html" className="be-post-title">Stay Ahead Series</a>
                                             
                                             <div className="author-post">
                                                
                                                
                                             </div>
                                                                         
                                          </div>
                                       </div>
                                       <div className="col-ml-12 col-xs-6 col-md-4">
                                          <div className="be-post">
                                             <a href="#page1.html" className="be-img-block">
                                             <img effect="blur"  src="images/p14.jpg" alt="omg"/>
                                             </a>
                                             <a href="#page1.html" className="be-post-title">Faber-Castell / Psychological Problems</a>
                                             
                                             <div className="author-post">
                                                
                                                
                                             </div>
                                                                        
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="tab-info" style={{display: "none"}}>
                                    <div className="row">
                                       <div className="col-ml-12 col-xs-6 col-md-4">
                                          <div className="be-post style-4">
                                             <a href="#page1.html" className="be-img-block">
                                             <img effect="blur"  src="images/p16.jpg" alt="omg"/>
                                             </a>
                                             <a href="#page1.html" className="be-post-title">Wisdom For My Children, Life Lessons Through</a>
                                             <div className="author-post clearfix">
                                                
                                                
                                                
                                             </div>
                                          </div>
                                       </div>
                                       <div className="col-ml-12 col-xs-6 col-md-4">
                                          <div className="be-post style-4">
                                             <a href="#page1.html" className="be-img-block">
                                             <img effect="blur"  src="images/p17.jpg" alt="omg"/>
                                             </a>
                                             <a href="#page1.html" className="be-post-title">Créations Namale</a>
                                             <div className="author-post clearfix">
                                                
                                                
                                                                                  
                                             </div>
                                          </div>
                                       </div>
                                       <div className="col-ml-12 col-xs-6 col-md-4">
                                          <div className="be-post style-4">
                                             <a href="#page1.html" className="be-img-block">
                                             <img effect="blur"  src="images/p18.jpg" alt="omg"/>
                                             </a>
                                             <a href="#page1.html" className="be-post-title">Crossfit : 15.4 Open Workout</a>
                                             <div className="author-post clearfix">
                                                
                                                
                                                
                                             </div>
                                          </div>
                                       </div>
                                       <div className="col-ml-12 col-xs-6 col-md-4">
                                          <div className="be-post style-4">
                                             <a href="#page1.html" className="be-img-block">
                                             <img effect="blur"  src="images/p15.jpg" alt="omg"/>
                                             </a>
                                             <a href="#page1.html" className="be-post-title">Garry Simpson - Bridges - Intelligent Life Magazine</a>
                                             <div className="author-post clearfix">
                                                
                                                
                                                
                                             </div>
                                          </div>
                                       </div>
                                       <div className="col-ml-12 col-xs-6 col-md-4">
                                          <div className="be-post style-4">
                                             <a href="#page1.html" className="be-img-block">
                                             <img effect="blur"  src="images/p14.jpg" alt="omg"/>
                                             </a>
                                             <a href="#page1.html" className="be-post-title">Faber-Castell / Psychological Problems</a>
                                             <div className="author-post clearfix">
                                                
                                                
                                                
                                             </div>
                                          </div>
                                       </div>
                                       <div className="col-ml-12 col-xs-6 col-md-4">
                                          <div className="be-post style-4">
                                             <a href="#page1.html" className="be-img-block">
                                             <img effect="blur"  src="images/p13.jpg" alt="omg"/>
                                             </a>
                                             <a href="#page1.html" className="be-post-title">Stay Ahead Series</a>
                                             <div className="author-post clearfix">
                                                
                                                
                                                
                                             </div>
                                          </div>
                                       </div>
                                       <div className="col-ml-12 col-xs-6 col-md-4">
                                          <div className="be-post style-4">
                                             <a href="#page1.html" className="be-img-block">
                                             <img effect="blur"  src="images/p12.jpg" alt="omg"/>
                                             </a>
                                             <a href="#page1.html" className="be-post-title">Face</a>
                                             <div className="author-post clearfix">
                                                
                                                
                                                
                                             </div>
                                          </div>
                                       </div>
                                       <div className="col-ml-12 col-xs-6 col-md-4">
                                          <div className="be-post style-4">
                                             <a href="#page1.html" className="be-img-block">
                                             <img effect="blur"  src="images/p19.jpg" alt="omg"/>
                                             </a>
                                             <a href="#page1.html" className="be-post-title">Promoção Facas Extra</a>
                                             <div className="author-post clearfix">
                                                
                                                
                                                
                                             </div>
                                          </div>
                                       </div>
                                       <div className="col-ml-12 col-xs-6 col-md-4">
                                          <div className="be-post style-4">
                                             <a href="#page1.html" className="be-img-block">
                                             <img effect="blur"  src="images/p11.jpg" alt="omg"/>
                                             </a>
                                             <a href="#page1.html" className="be-post-title">Tropicalia</a>
                                             <div className="author-post clearfix">
                                                
                                                
                                                
                                             </div>
                                          </div>
                                       </div>
                                       <div className="col-ml-12 col-xs-6 col-md-4">
                                          <div className="be-post style-4">
                                             <a href="#page1.html" className="be-img-block">
                                             <img effect="blur"  src="images/p10.jpg" alt="omg"/>
                                             </a>
                                             <a href="#page1.html" className="be-post-title">tomorrow</a>
                                             <div className="author-post clearfix">
                                                
                                                
                                                
                                             </div>
                                          </div>
                                       </div>
                                       <div className="col-ml-12 col-xs-6 col-md-4">
                                          <div className="be-post style-4">
                                             <a href="#page1.html" className="be-img-block">
                                             <img effect="blur"  src="images/p9.jpg" alt="omg"/>
                                             </a>
                                             <a href="#page1.html" className="be-post-title">NAHA Finalist Hairstylist of the Year Allen Ruiz</a>
                                             <div className="author-post clearfix">
                                                
                                                
                                                
                                             </div>
                                          </div>
                                       </div>
                                       <div className="col-ml-12 col-xs-6 col-md-4">
                                          <div className="be-post style-4">
                                             <a href="#page1.html" className="be-img-block">
                                             <img effect="blur"  src="images/p8.jpg" alt="omg"/>
                                             </a>
                                             <a href="#page1.html" className="be-post-title">Racing Queensland</a>
                                             <div className="author-post clearfix">
                                                
                                                
                                                
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="tab-info" style={{display: "none"}}>
                                    <div className="collection">
                                       <h3 className="menu-article">Creative Ideas</h3>
                                       <div className="collection-header">
                                          <span><i className="fa fa-user"></i>by <a href="#page1.html">Leigh Taylor</a> </span>
                                          <span><i className="fa fa-thumbs-o-up"></i> 360</span>
                                          <span><i className="fa fa-eye"></i> 789</span>
                                       </div>
                                       <div className="collection-entry">
                                          <a href="#page1.html" className="portfolio-link type-2 clearfix">
                                             <img effect="blur"  src="images/collection_1.jpg" alt=""/>
                                             <img effect="blur"  src="images/collection_2.jpg" alt=""/>
                                             <img effect="blur"  src="images/collection_3.jpg" alt=""/>
                                             <img effect="blur"  src="images/collection_4.jpg" alt=""/>
                                             <img effect="blur"  src="images/collection_5.jpg" alt=""/>
                                             <div className="color_bg">
                                                <span>view gallery</span>
                                                <span className="child"></span>
                                             </div>
                                          </a>
                                       </div>
                                    </div>
                                    <div className="collection">
                                       <h3 className="menu-article">Creative Agency</h3>
                                       <div className="collection-header">
                                          <span><i className="fa fa-user"></i>by <a href="#page1.html">Leigh Taylor</a> </span>
                                          <span><i className="fa fa-thumbs-o-up"></i> 360</span>
                                          <span><i className="fa fa-eye"></i> 789</span>
                                       </div>
                                       <div className="collection-entry">
                                          <a href="#page1.html" className="portfolio-link type-2 clearfix">
                                             <img effect="blur"  src="images/collection_6.jpg" alt=""/>
                                             <img effect="blur"  src="images/collection_7.jpg" alt=""/>
                                             <img effect="blur"  src="images/collection_8.jpg" alt=""/>
                                             <img effect="blur"  src="images/collection_9.jpg" alt=""/>
                                             <img effect="blur"  src="images/collection_10.jpg" alt=""/>
                                             <div className="color_bg">
                                                <span>view gallery</span>
                                                <span className="child"></span>
                                             </div>
                                          </a>
                                       </div>
                                    </div>
                                    <div className="collection">
                                       <h3 className="menu-article">Creative Agency</h3>
                                       <div className="collection-header">
                                          <span><i className="fa fa-user"></i>by <a href="#page1.html">Inspiration Art</a> </span>
                                          <span><i className="fa fa-thumbs-o-up"></i> 360</span>
                                          <span><i className="fa fa-eye"></i> 789</span>
                                       </div>
                                       <div className="collection-entry">
                                          <a href="#page1.html" className="portfolio-link type-2 clearfix">
                                             <img effect="blur"  src="images/collection_11.jpg" alt=""/>
                                             <img effect="blur"  src="images/collection_12.jpg" alt=""/>
                                             <img effect="blur"  src="images/collection_13.jpg" alt=""/>
                                             <img effect="blur"  src="images/collection_14.jpg" alt=""/>
                                             <img effect="blur"  src="images/collection_15.jpg" alt=""/>
                                             <div className="color_bg">
                                                <span>view gallery</span>
                                                <span className="child"></span>
                                             </div>
                                          </a>
                                       </div>
                                    </div>
                                    <div className="collection">
                                       <h3 className="menu-article">Ideas For Personal Site</h3>
                                       <div className="collection-header">
                                          <span><i className="fa fa-user"></i>by <a href="#page1.html">Inspiration Art</a> </span>
                                          <span><i className="fa fa-thumbs-o-up"></i> 360</span>
                                          <span><i className="fa fa-eye"></i> 789</span>
                                       </div>
                                       <div className="collection-entry">
                                          <a href="#page1.html" className="portfolio-link type-2 clearfix">
                                             <img effect="blur"  src="images/collection_16.jpg" alt=""/>
                                             <img effect="blur"  src="images/collection_17.jpg" alt=""/>
                                             <img effect="blur"  src="images/collection_18.jpg" alt=""/>
                                             <img effect="blur"  src="images/collection_19.jpg" alt=""/>
                                             <img effect="blur"  src="images/collection_20.jpg" alt=""/>
                                             <div className="color_bg">
                                                <span>view gallery</span>
                                                <span className="child"></span>
                                             </div>
                                          </a>
                                       </div>
                                    </div>
                                    <div className="collection">
                                       <h3 className="menu-article">Inspiration Photos</h3>
                                       <div className="collection-header">
                                          <span><i className="fa fa-user"></i>by <a href="#page1.html">Inspiration Art</a> </span>
                                          <span><i className="fa fa-thumbs-o-up"></i> 360</span>
                                          <span><i className="fa fa-eye"></i> 789</span>
                                       </div>
                                       <div className="collection-entry">
                                          <a href="#page1.html" className="portfolio-link type-2 clearfix">
                                             <img effect="blur"  src="images/collection_16.jpg" alt=""/>
                                             <img effect="blur"  src="images/collection_17.jpg" alt=""/>
                                             <img effect="blur"  src="images/collection_18.jpg" alt=""/>
                                             <img effect="blur"  src="images/collection_19.jpg" alt=""/>
                                             <img effect="blur"  src="images/collection_20.jpg" alt=""/>
                                             <div className="color_bg">
                                                <span>view gallery</span>
                                                <span className="child"></span>
                                             </div>
                                          </a>
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
            </div>
                  

         </div>
  
         
         <Footer/>
         
         </>
        )
    }
}