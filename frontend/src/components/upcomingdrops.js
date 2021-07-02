import React, { Component } from 'react';
 import axios from 'axios';
 import Header from '../directives/header'
 import Footer from '../directives/footer'
 import config from '../config/config'
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import Countdown,{zeroPad} from 'react-countdown';
import { LazyLoadImage  } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
const headers = {
    'Content-Type': 'application/json'
 };

export default class upcomingdrops extends Component {

    constructor(props) {
        super(props)
        this.state = {
         getListUpcoming:[],
        }
    }

    componentDidMount() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.getItemUpcoming()

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

       //=======================================  Imaages show according to category  =====================

   async getItemUpcoming() {
      await axios({
         method: 'post',
         url: `${config.apiUrl}listItem`,
         data: {"limit":"0", "category_id": "-1" }
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
                        <br/>
                        <div  className="row _post-container_">
                        {this.state.getListUpcoming.length === 0 ? 
                 <h4 className="text-center upcomigClass" style={{color:'#fff'}}>There isn't any assest available.</h4>:
                     this.state.getListUpcoming.map(item => (
                 
                 <div className="category-1 mix col-md-4">
                    <div className="be-post">
                    {item.is_sold === 0 ? 
                           '':
                           <div className="soldOut">
                           <img src="images/sold.png"/>
                        </div>
                        }
                       <Link to={`${config.baseUrl}itemdetails/${item.item_edition_id}`} className="be-img-block">
                       <img effect="blur"  src={`${config.imageUrl}${item.image}`} alt="omg"/>
                       </Link>
                       <div className="timer">
                       <Countdown
                           date={this.getTimeOfStartDate(item.start_date)}
                           renderer={this.CountdownTimer}
                        />
                       </div>
                       <Link to={`${config.baseUrl}itemdetails/${item.item_edition_id}`} className="be-post-title">
                          {item.name}</Link>
                          {/* <Link to={`${config.baseUrl}itemdetails/${item.item_edition_id}`} class="be-post-title price price-data">$ {item.price}</Link> */}

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

         </div>
      </div>
          <Footer/>
            </>

        )
    }
}