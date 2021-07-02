import React, { Component } from 'react';
 import axios from 'axios';
 import Header from '../directives/header'
 import Footer from '../directives/footer'
 import config from '../config/config'
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie'
import { Player } from 'video-react';
import ReactAudioPlayer from 'react-audio-player';
import { LazyLoadImage  } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Countdown,{zeroPad} from 'react-countdown';
import Loader from "react-loader-spinner";

const headers = {
    'Content-Type': 'application/json'
 };

export default class realstatelist extends Component {

    constructor(props) {
        super(props)
        this.loginData = (!Cookies.get('loginSuccess'))?[]:JSON.parse(Cookies.get('loginSuccess'))
        this.state={
         getitemData:[],
         getWebImageData:[],
         defaultImage:0
        }
    }

    componentDidMount() {
         this.getitemAPI()
         this.getWebImageAPI()
    }


      //====================================  CAtegory API =============================
      // getRealEstateImage
      async getWebImageAPI() {
         this.setState({
            defaultImage:0
         })
         await axios({
            method: 'get',
            url: `${config.apiUrl}getRealEstateImage`,
            headers: { "Authorization": this.loginData?.message },
         }).then(response => {
            if (response.data.success === true) {
              this.setState({
                getWebImageData: response.data?.response[0],
                defaultImage:1
              })
            }
         })
       }
 //=======================================  getitem  =====================

async getitemAPI() {
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
               getitemData: result.data.response,
            })
         }
         else if (result.data.success === false) {
         }
      }).catch(err => {
      });
}

    //  is_approved :0 => Pending
    //  is_approved :1 => Approval
    //  is_approved :2 => Reject
    //  is_approved :3 => not applied
   async talentStatusAPIS(){
      await axios({
         method: 'post',
         url: `${config.apiUrl}getRealEstateStatus`,
         data: {'user_id':this.loginData.data.id}
      })
         .then(result => {
            if (result.data.success === true) {
               if(result.data.response[0].real_estate_status === 2 || result.data.response[0].real_estate_status === 3 || result.data.response[0].real_estate_status === 0){
                  
                
                window.location.href = `${config.baseUrl}createyourownrealestate`
               }
               else if(result.data.response[0].real_estate_status === 1){
                //    alert('2')
                
                
                 window.location.href = `${config.baseUrl}featurescreatorrealestate/${this.loginData.data.id}`
               }
               // else if(result.data.response[0].real_estate_status === 0){
               //   toast.error('Your Account is in process to get verify from admin side, Please wait to "Create NFT".', {
               //      position: toast.POSITION.TOP_CENTER
               //    });
               // }
            }
            else if (result.data.success === false) {
            }
         }).catch(err => {
         });
      }

      loginCheck1(){
         if(this.loginData.length === 0){
            window.location.href = `${config.baseUrl}login`
         }
         else{
            this.talentStatusAPIS()
          
      }
   }

   loading(){
      setTimeout(() => {
         window.location.reload()
      }, 500);
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

    render() {
        return (    

            <>
  <Header/>
  <div id="content-block">
  <div className="head-bg" style={{height:this.state.getWebImageData.length === 0 ? '500px':''}}>
  {/* {this.state.defaultImage === 0 ? 
   <img effect="blur"  src="images/realstatedefault.jpg" alt="Los Angeles" style={{width:"100%",height:'400px'}}/>: */}
   {this.state.getWebImageData.length === 0 ? <div className="caroselHeight loaderBars">
<Loader type="Bars" color="#00BFFF" height={40} width={40} />
</div>:
  
  <Carousel showThumbs="false" autoPlay="true" interval="10000" infiniteLoop>
                <div>
                <img effect="blur"  src={`${config.imageUrl1}${this.state.getWebImageData?.slider1}`} alt="Los Angeles" style={{width:"100%",height:'400px'}}/>
                {this.state.getWebImageData?.text1 === '' || this.state.getWebImageData?.text1 === null || this.state.getWebImageData?.text1 === undefined || this.state.getWebImageData?.text1 === "<p><br></p>" ? '' :
                <div class="carousel-caption" style={{background: "#060891ad",boxShadow: "0 10px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 1"}}>
                   <div dangerouslySetInnerHTML={{ __html: this.state.getWebImageData?.text1 }}></div>
                
         </div> 
    }
                </div>
                <div>
                <img effect="blur"  src={`${config.imageUrl1}${this.state.getWebImageData?.slider2}`} alt="Chicago" style={{width:"100%",height:'400px'}} onClick={this.loading.bind(this)} href={`${config.baseUrl}itemdetails`} />
                {this.state.getWebImageData?.text2 === '' || this.state.getWebImageData?.text2 === null || this.state.getWebImageData?.text2 === undefined || this.state.getWebImageData?.text2 === "<p><br></p>" ? '' :
                <div class="carousel-caption" style={{background: "#060891ad",boxShadow: "0 10px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 1"}}>
                   <div dangerouslySetInnerHTML={{ __html: this.state.getWebImageData?.text2 }}></div>
         </div> 
                }
                </div>
                <div>
                <img effect="blur"  src={`${config.imageUrl1}${this.state.getWebImageData?.slider3}`} alt="New york" style={{width:"100%",height:'400px'}} onClick={this.loading.bind(this)} href={`${config.baseUrl}itemdetails`}/>
                {this.state.getWebImageData?.text3 === '' || this.state.getWebImageData?.text3 === null || this.state.getWebImageData?.text3 === undefined || this.state.getWebImageData?.text3 === "<p><br></p>" ? '' :
                <div class="carousel-caption" style={{background: "#060891ad",boxShadow: "0 10px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 1"}}>
        <div dangerouslySetInnerHTML={{ __html: this.state.getWebImageData?.text3 }}></div>
          <span>&nbsp;<Link to={`${config.baseUrl}support`} onClick={this.loading.bind(this)} targrt="_blank" style={{marginTop:'8px'}} className="btn btn-primary">click here</Link></span>
         
        </div>
    }
                </div>
            </Carousel>
    }
   
   {/* } */}
         {/* <div id="myCarousel" className="carousel slide" data-ride="carousel">
    <ol className="carousel-indicators">
      <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
      <li data-target="#myCarousel" data-slide-to="1"></li>
      <li data-target="#myCarousel" data-slide-to="2"></li>
    </ol>

    <div className="carousel-inner">
      <div className="item active">

        <img effect="blur"  src={`${config.imageUrl1}${this.state.getWebImageData?.slider1}`} alt="Los Angeles" style={{width:"100%",height:'400px'}}/>
      
      </div>

      <div className="item">

        <img effect="blur"  src={`${config.imageUrl1}${this.state.getWebImageData?.slider2}`} alt="Chicago" style={{width:"100%",height:'400px'}} onClick={this.loading.bind(this)} href={`${config.baseUrl}itemdetails`} />
       
      </div>
    
      <div className="item">
        
        <img effect="blur"  src={`${config.imageUrl1}${this.state.getWebImageData?.slider3}`} alt="New york" style={{width:"100%",height:'400px'}} onClick={this.loading.bind(this)} href={`${config.baseUrl}itemdetails`}/>
      
      </div>
    </div>

    <a className="left carousel-control" href="#myCarousel" data-slide="prev">
      <span className="fa fa-chevron-left"></span>
      <span className="sr-only">Previous</span>
    </a>
    <a className="right carousel-control" href="#myCarousel" data-slide="next">
      <span className="fa fa-chevron-right"></span>
      <span className="sr-only">Next</span>
    </a>
  </div>
          */}
         
         
         {/* <!-- <div className="head-bg-img"></div> --> */}
         
      </div>
      
          
         <div className="container-fluid custom-container">
           <ToastContainer/>
            <div className="container-fluid custom-container upcomming-drops pr-0 pl-0" id="upcomming-drops">
               <div className="container">
                  <div className="row">
                     <div className="col-xs-12 col-md-12">
                            <div className="row">
                              <div className="col-sm-9">
                
                              </div>
                              <div className="col-sm-3">
                                <div className="be-vidget back-block mb-4 btn-right">
                                      <a className="btn full btn-primary size-1 hover-2" onClick={this.loginCheck1.bind(this)} >Create you own Listing</a>
                                </div>
                              </div>
              
                            </div>
                          </div>
                      
                     <br/><br/><br/>
                     <div className="col-md-12">
                        <br/>
                        {this.state.getitemData === ''? 
                      <div  className="row _post-container_" style={{height:'200px'}}>
                      <div className="caroselHeight loaderBars">
                      <Loader type="Bars" color="#00BFFF" height={40} width={40} />
                      </div>
                      </div>: 
                        <div  className="row _post-container_">
                
                           {this.state.getitemData.map(item => (
                              <div className="category-1 mix col-md-4">
                              <div className="be-post">
                              {item.is_sold === 0 ? 
                           '':
                           <div className="soldOut">
                           <img src="images/sold.png"/>
                        </div>
                        }
                              <Link to={item.file_type === 'video' ? '#/':`${config.baseUrl}itemdetails/${item.item_edition_id}`} className="be-img-block">
{item.file_type === 'audio' ? 
   <img effect="blur" src="https://ipfs.io/ipfs/QmcwrJKCnvNuxKP22TpYptN3hM76jmwL6kt4BbieBgCCba" alt="omg"/>:''
}

      {item.file_type === 'image'  ? 
      <img effect="blur" src={`${config.imageUrl}${item.image}`} alt="omg"/>:
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
                                 
                                 <Link onClick={this.loading.bind(this)} to={`${config.baseUrl}itemdetails/${item.item_edition_id}`} className="be-post-title">{item.name}</Link>
                          <Link onClick={this.loading.bind(this)} to={`${config.baseUrl}itemdetails/${item.item_edition_id}`} class="be-post-title price price-data">$ {item.price}</Link>
                                
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
         </div>
      </div>
  <Footer/>
  </>
        )
    }
}