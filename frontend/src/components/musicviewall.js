import React, { Component } from 'react';
 import axios from 'axios';
 import Header from '../directives/header'
 import Footer from '../directives/footer'
 import config from '../config/config'
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Player } from 'video-react';
import ReactAudioPlayer from 'react-audio-player';
import { LazyLoadImage  } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Countdown,{zeroPad} from 'react-countdown';
import Loader from "react-loader-spinner";

const headers = {
    'Content-Type': 'application/json'
 };

export default class viewall extends Component {

    constructor(props) {
        super(props)
        this.state = {
           getListMusic:[],
        }
    }

    componentDidMount() {
      this.getItemMusic()
      window.scrollTo({ top: 0, behavior: 'smooth' });

    }

       //=======================================  Imaages show according to category  =====================

   async getItemMusic() {
      await axios({
         method: 'post',
         url: `${config.apiUrl}listItem`,
         data: { "limit":"0","category_id": 2 }
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
       <br/><br/>
      
         <div className="container-fluid custom-container">
           
            <div className="container-fluid custom-container upcomming-drops" id="upcomming-drops">
               <div className="container">
                  <div className="row">
                     <div className="col-md-12">
                       <h3><strong>Music</strong></h3>
                        <hr/>
                      </div>
                      
                     
                     <div className="col-md-12">
                        <br/>

                        {this.state.getListMusic.length === 0? 
                      <div  className="row _post-container_" style={{height:'200px'}}>
                      <div className="caroselHeight loaderBars">
                      <Loader type="Bars" color="#00BFFF" height={40} width={40} />
                      </div>
                      </div>: 
                        <div  className="row _post-container_">
                    {this.state.getListMusic.map(item => (

                        <div className="category-2 mix col-md-4">
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
                              <Link to={`${config.baseUrl}itemdetails/${item.item_edition_id}`} className="be-post-title">{item.name}</Link>
                              {/* <span> */}
                              <Link to={`${config.baseUrl}itemdetails/${item.item_edition_id}`} class="be-post-title price price-data">$ {item.price}</Link>
                             
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