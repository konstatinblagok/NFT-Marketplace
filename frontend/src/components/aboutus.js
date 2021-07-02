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

export default class aboutus extends Component {

    constructor(props) {
        super(props)
        this.loginData = (!Cookies.get('loginSuccess'))? [] : JSON.parse(Cookies.get('loginSuccess'));
       
    }

    componentDidMount() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
  
    }    

    render() {
        return (    

            <>
            <Header/>
            <body className="page-login" style={{backgroundColor: "#fff"}}>

            <div id="content-block" className="mb-0">
    <div className="head-bg">
            <div className="head-bg-img"></div>
            <div className="head-bg-content" style={{height: "400px"}}>
               <h1>About Us</h1>
            </div>
         </div>

    <div className="container-fluid">
      <div className="info-blocks" style={{background:"transparent"}}>
        <div className="info-entry left table-block">
          <div className="row table-row">
            <div className="table-cell col-xs-12 col-sm-6">
              <img className="img-responsive img-full" src="images/info_block_1.jpg" alt/>
            </div>
            <div className="table-cell col-xs-12 col-sm-6">
              <div className="info-text">
                <h3 className="block-title">What is Infinity8?</h3>
                <div className="row">
                  <div className="col-xs-12 col-sm-6">
                    <h4>Our Mission</h4>
                    <p>Every digital creation available through MakersPlace is an authentic and truly unique digital creation, signed and issued by the creator — made possible by blockchain technology. Even if the digital creation is copied, it won't be the authentic and originally signed version.</p>
                  </div>
                  <div className="col-xs-12 col-sm-6">
                    <h4>Your career</h4>
                    <p>Proin ullamcorper nibh eget posuere congue. Nullam mollis tempus dictum. Suspendisse nisl dui, sollicitudin vel massa ac, luctus suscipit enim. Morbi vehicula massa a metus dapibus, et mattis ex aliquet.</p>

                    <p>Suspendisse potenti. Etiam congue, lectus in euismod facilisis, diam odio vulputate mauris, nec accumsan nulla libero vitae velit. In hac habitasse platea dictumst.</p>
                  </div>                  
                </div>
              </div>
            </div>
          </div>
        </div>
        <br/><br/>
        <div className="info-entry right table-block" style={{backgroundColor: "#fafafa"}}>
          <div className="row table-row">
            <div className="table-cell col-xs-12 col-sm-6">
              <div className="info-text">
                <h3 className="block-title">Work With Us</h3>
                  <h4><i className="fa fa-camera"></i> Photoshoot as work</h4>
                  <p>Aliquam id rhoncus enim, non malesuada dui. Phasellus at orci sed justo pharetra aliquet sed non urna. Aliquam erat volutpat. Cras feugiat ullamcorper nunc id tempor. Etiam et sapien consectetur, vehicula purus quis, ultrices lectus. Praesent congue lectus sit amet eros sagittis consequat. Phasellus nec diam non enim condimentum dapibus id non ligula. Sed euismod vitae odio vitae condimentum.</p>

                  <h4><i className="fa fa-thumb-tack"></i> Pushpin to desk in a room</h4>
                  <p>Proin ullamcorper nibh eget posuere congue. Nullam mollis tempus dictum. Suspendisse nisl dui, sollicitudin vel massa ac, luctus suscipit enim. Morbi vehicula massa a metus dapibus, et mattis ex aliquet.</p>

                  <p>Suspendisse potenti. Etiam congue, lectus in euismod facilisis, diam odio vulputate mauris, nec accumsan nulla libero vitae velit. In hac habitasse platea dictumst.</p>                 
              </div>
            </div>
            <div className="table-cell col-xs-12 col-sm-6">
              <img className="img-responsive img-full" src="images/info_block_2.jpg" alt/>
            </div>            
          </div>
        </div>        

      </div>
    </div>
    <div className="container-fluid">
      <div className="info-blocks" style={{background:"transparent"}}>
        <div className="info-entry left table-block">
          <div className="row table-row">
            <div className="table-cell col-xs-12 col-sm-6">
              <img className="img-responsive img-full" src="images/info_block_1.jpg" alt/>
            </div>
            <div className="table-cell col-xs-12 col-sm-6">
              <div className="info-text">
                <h3 className="block-title">Work With Us</h3>
                <div className="row">
                  <div className="col-xs-12 col-sm-6">
                    <h4>Why our team</h4>
                    <p>Aliquam id rhoncus enim, non malesuada dui. Phasellus at orci sed justo pharetra aliquet sed non urna. Aliquam erat volutpat. Cras feugiat ullamcorper nunc id tempor. Etiam et sapien consectetur, vehicula purus quis, ultrices lectus. Praesent congue lectus sit amet eros sagittis consequat. Phasellus nec diam non enim condimentum dapibus id non ligula. Sed euismod vitae odio vitae condimentum.</p>
                  </div>
                  <div className="col-xs-12 col-sm-6">
                    <h4>Your career</h4>
                    <p>Proin ullamcorper nibh eget posuere congue. Nullam mollis tempus dictum. Suspendisse nisl dui, sollicitudin vel massa ac, luctus suscipit enim. Morbi vehicula massa a metus dapibus, et mattis ex aliquet.</p>

                    <p>Suspendisse potenti. Etiam congue, lectus in euismod facilisis, diam odio vulputate mauris, nec accumsan nulla libero vitae velit. In hac habitasse platea dictumst.</p>
                  </div>                  
                </div>
              </div>
            </div>
          </div>
        </div>
        <br/><br/>
        <div className="info-entry right table-block" style={{backgroundColor: "#fafafa"}}>
          <div className="row table-row">
            <div className="table-cell col-xs-12 col-sm-6">
              <div className="info-text">
                <h3 className="block-title">Work With Us</h3>
                  <h4><i className="fa fa-camera"></i> Photoshoot as work</h4>
                  <p>Aliquam id rhoncus enim, non malesuada dui. Phasellus at orci sed justo pharetra aliquet sed non urna. Aliquam erat volutpat. Cras feugiat ullamcorper nunc id tempor. Etiam et sapien consectetur, vehicula purus quis, ultrices lectus. Praesent congue lectus sit amet eros sagittis consequat. Phasellus nec diam non enim condimentum dapibus id non ligula. Sed euismod vitae odio vitae condimentum.</p>

                  <h4><i className="fa fa-thumb-tack"></i> Pushpin to desk in a room</h4>
                  <p>Proin ullamcorper nibh eget posuere congue. Nullam mollis tempus dictum. Suspendisse nisl dui, sollicitudin vel massa ac, luctus suscipit enim. Morbi vehicula massa a metus dapibus, et mattis ex aliquet.</p>

                  <p>Suspendisse potenti. Etiam congue, lectus in euismod facilisis, diam odio vulputate mauris, nec accumsan nulla libero vitae velit. In hac habitasse platea dictumst.</p>                 
              </div>
            </div>
            <div className="table-cell col-xs-12 col-sm-6">
              <img className="img-responsive img-full" src="images/info_block_2.jpg" alt/>
            </div>            
          </div>
        </div>        

      </div>
    </div>
    <div className="container">
      <div className="block">
        <h3 className="block-title">Start your own collection today</h3>
        <br/><br/>
        {/* <!-- <div className="block-subtitle">Nulla id risus urna. Ut commodo leo quis </div> --> */}

        <div className="swiper-container" data-autoplay="5000" data-loop="0" data-speed="300" data-center="0" data-slides-per-view="responsive" data-xs-slides="1" data-sm-slides="2" data-md-slides="3" data-lg-slides="3" data-add-slides="3">
                    <div className="swiper-wrapper">
                      <div className="swiper-slide" data-val="0">
              <div className="service-entry">
                <img className="service-icon" src="images/service_1.png" alt/>
                <h4 className="service-title">Collect</h4>
                <div className="service-text">Morbi efficitur feugiat erat a efficitur. Donec interdum, nunc ac elementum auctor, dui nisl placerat odio</div>
                <a className="btn color-1 size-2 hover-1">read more</a>
              </div>
                        </div>
                      <div className="swiper-slide" data-val="1">
              <div className="service-entry">
                <img className="service-icon" src="images/service_2.png" alt/>
                <h4 className="service-title">Show Off</h4>
                <div className="service-text">Fusce id euismod diam, quis venenatis ipsum. Quisque lacinia non dui id fermentum. Ut libero nulla, auctor nec</div>
                <a className="btn color-1 size-2 hover-1">read more</a>
              </div>
                        </div>
                      <div className="swiper-slide" data-val="2">
              <div className="service-entry">
                <img className="service-icon" src="images/service_3.png" alt/>
                <h4 className="service-title">Invest</h4>
                <div className="service-text">Curabitur tincidunt eros et felis eleifend, sed pharetra leo scelerisque. In accumsa</div>
                <a className="btn color-1 size-2 hover-1">read more</a>
              </div>
                        </div>
                      {/* <!-- <div className="swiper-slide" data-val="3">
              <div className="service-entry">
                <img className="service-icon" src="images/service_1.png" alt/>
                <h4 className="service-title">Ideas for everyone</h4>
                <div className="service-text">Morbi efficitur feugiat erat a efficitur. Donec interdum, nunc ac elementum auctor, dui nisl placerat odio</div>
                <a className="btn color-1 size-2 hover-1">read more</a>
              </div>
                        </div>
                      <div className="swiper-slide" data-val="4">
              <div className="service-entry">
                <img className="service-icon" src="images/service_2.png" alt/>
                <h4 className="service-title">Developing pages</h4>
                <div className="service-text">Fusce id euismod diam, quis venenatis ipsum. Quisque lacinia non dui id fermentum. Ut libero nulla, auctor nec</div>
                <a className="btn color-1 size-2 hover-1">read more</a>
              </div>
                        </div>
                      <div className="swiper-slide" data-val="5">
              <div className="service-entry">
                <img className="service-icon" src="images/service_3.png" alt/>
                <h4 className="service-title">Easy in touch</h4>
                <div className="service-text">Curabitur tincidunt eros et felis eleifend, sed pharetra leo scelerisque. In accumsa</div>
                <a className="btn color-1 size-2 hover-1">read more</a>
              </div>
                        </div>  -->                                                     */}
                    </div>
                    <div className="pagination">
                      
                    </div>
                </div>
      </div>
    </div>
    
  </div>
           </body>
            <Footer/>
            </>
        )
    }
}