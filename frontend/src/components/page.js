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

export default class page extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    render() {
        return (    

            <>
             <Header/>
             <body class="page-login" style={{backgroundColor: "#fff"}}>
             <div id="content-block">
		<div class="container custom-container be-detail-container">
			<div class="row">
				<div class="col-md-9 col-md-push-3">
					<div class="be-large-post">
						<div class="info-block">
						<div class="be-large-post-align">
							<span><i class="fa fa-thumbs-o-up"></i> 253</span>
							<span><i class="fa fa-eye"></i> 753</span>
							<span><i class="fa fa-comment-o"></i> 50</span>
						</div>
						</div>
						<div class="blog-content  be-large-post-align">
							<h5 class="be-post-title to">Integer Blandit Velit Nec Purus Convallis</h5>
							<span class="be-text-tags">
								<a href="blog-detail-2.html" class="be-post-tag">Interactiob design</a>, 
								<a href="blog-detail-2.html" class="be-post-tag">UI/UX</a>,  
								<a href="blog-detail-2.html" class="be-post-tag">Web Design</a>
							</span>
							<div class="clear"></div>
							<div class="post-text">
								<div class="be-large-post-slider type-wide">
									<div class="swiper-container thumbnails-preview" data-autoplay="0" data-loop="1" data-speed="500" data-center="0" data-slides-per-view="1">
						                <div class="swiper-wrapper">
					                    	<div class="swiper-slide active" data-val="0">
					                    		 <img class="img-responsive img-full" src="images/s1.jpg" alt=""/>
					                    		 <div class="slider-text">Ut pulvinar tellus sed elit luctus aliquet. Suspendisse hendrerit sapien a aliquet porttitor. In hendrerit consequat neque eget egestas. In a consectetur felis. In euismod lectus eros, quis sollicitudi.</div>
					                    	</div>
					                    	<div class="swiper-slide" data-val="1">
					                    		 <img class="img-responsive img-full" src="images/s2.jpg" alt=""/>
					                    		 <div class="slider-text">Ut pulvinar tellus sed elit luctus aliquet. Suspendisse hendrerit sapien a aliquet porttitor. In hendrerit consequat neque eget egestas. In a consectetur felis. In euismod lectus eros, quis sollicitudi.</div>			                    		 
					                    	</div>
					                    	<div class="swiper-slide" data-val="2">
					                    		 <img class="img-responsive img-full" src="images/s1.jpg" alt=""/>
					                    		 <div class="slider-text">Ut pulvinar tellus sed elit luctus aliquet. Suspendisse hendrerit sapien a aliquet porttitor. In hendrerit consequat neque eget egestas. In a consectetur felis. In euismod lectus eros, quis sollicitudi.</div>			                    		 
					                    	</div>
					                    	<div class="swiper-slide" data-val="3">
					                    		 <img class="img-responsive img-full" src="images/s1.jpg" alt=""/>
					                    		 <div class="slider-text">Ut pulvinar tellus sed elit luctus aliquet. Suspendisse hendrerit sapien a aliquet porttitor. In hendrerit consequat neque eget egestas. In a consectetur felis. In euismod lectus eros, quis sollicitudi.</div>			                    		 
					                    	</div>
					                    	<div class="swiper-slide" data-val="4">
					                    		 <img class="img-responsive img-full" src="images/s5.jpg" alt=""/>
					                    		 <div class="slider-text">Ut pulvinar tellus sed elit luctus aliquet. Suspendisse hendrerit sapien a aliquet porttitor. In hendrerit consequat neque eget egestas. In a consectetur felis. In euismod lectus eros, quis sollicitudi.</div>			                    		 
					                    	</div>
					                    </div>
						                <div class="pagination hidden"></div>
						                <div class="swiper-arrow-left type-2"></div>
						                <div class="swiper-arrow-right type-2"></div>
						            </div>
						            <div class="swiper-container thumbnails" data-autoplay="0" data-loop="0" data-speed="500" data-center="0" data-slides-per-view="responsive" data-xs-slides="3" data-sm-slides="5" data-md-slides="5" data-lg-slides="5" data-add-slides="5">
						                <div class="swiper-wrapper">
											<div class="swiper-slide current active" data-val="0">
												
												<img src="images/ss1.jpg" alt=""/>
											</div>
											<div class="swiper-slide" data-val="1">
												<img src="images/s2c.jpg" alt=""/>
											</div>
											<div class="swiper-slide" data-val="2">
												<img src="images/s3c.jpg" alt=""/>
											</div>
											<div class="swiper-slide" data-val="3">
												<img src="images/s4c.jpg" alt=""/>
											</div>
											<div class="swiper-slide" data-val="4">
												<img src="images/s5c.jpg" alt=""/>
											</div>
										</div>
										<div class="pagination hidden"></div>
									</div>
								</div>
								<p>Fusce dolor libero, efficitur et lobortis at, faucibus nec nunc. Proin fermentum turpis eget nisi facilisis lobortis. Praesent malesuada facilisis maximus. Donec sed lobortis tortor. Ut nec lacinia sapien, sit amet dapibus magna. Vestibulum nunc ex, tempus et volutpat nec, convallis ut massa. Sed ultricies luctus ipsum in placerat.</p>

								<p>Mauris ultrices pharetra lectus sit amet commodo. Fusce ac sagittis magna. Nulla sed ligula sed dui tristique convallis non sit amet dui. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
							</div>
				
						</div>
						<div class="be-large-post-align">
							<h3 class="letf-menu-article">
								Tags
							</h3>
							<div class="tags_block clearfix">
								<ul>
									<li><a href="blog-detail-2.html">photoshop</a></li>
									<li><a href="blog-detail-2.html">national geographic</a></li>
									<li><a href="blog-detail-2.html">nature</a></li>
									<li><a href="blog-detail-2.html">responsive web design</a></li>
									<li><a href="blog-detail-2.html">animals</a></li>
									<li><a href="blog-detail-2.html">digital photography</a></li>
								</ul>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-4">
							<div class="be-post">
								<a href="blog-detail-2.html" class="be-img-block">
								<img src="images/p3.jpg" alt="omg"/>
								</a>
								<a href="blog-detail-2.html" class="be-post-title">Colors of Ramadan</a>
								<span>
									<a href="blog-detail-2.html" class="be-post-tag">Interaction Design</a>, 
									<a href="blog-detail-2.html" class="be-post-tag">UI/UX</a>,  
									<a href="blog-detail-2.html" class="be-post-tag">Web Design</a>
								</span>
								<div class="author-post">
									<img src="images/a5.png" alt class="ava-author"/>
									<span>by <a href="blog-detail-2.html">Hoang Nguyen</a></span>
								</div>
								<div class="info-block">
									<span><i class="fa fa-thumbs-o-up"></i> 360</span>
									<span><i class="fa fa-eye"></i> 789</span>
									<span><i class="fa fa-comment-o"></i> 20</span>
								</div>
							</div>
						</div>
						<div class="col-md-4">
							<div class="be-post">
								<a href="blog-detail-2.html" class="be-img-block">
								<img src="images/p4.jpg" alt="omg"/>
								</a>
								<a href="blog-detail-2.html" class="be-post-title">Leaving Home - L'Officiel Ukraine</a>
								<span>
									<a href="blog-detail-2.html" class="be-post-tag">Interaction Design</a>, 
									<a href="blog-detail-2.html" class="be-post-tag">UI/UX</a>,  
									<a href="blog-detail-2.html" class="be-post-tag">Web Design</a>
								</span>
								<div class="author-post">
									<img src="images/a5.png" alt class="ava-author"/>
									<span>by <a href="blog-detail-2.html">Hoang Nguyen</a></span>
								</div>
								<div class="info-block">
									<span><i class="fa fa-thumbs-o-up"></i> 360</span>
									<span><i class="fa fa-eye"></i> 789</span>
									<span><i class="fa fa-comment-o"></i> 20</span>
								</div>
							</div>
						</div>
						<div class="col-md-4">
							<div class="be-post">
								<a href="blog-detail-2.html" class="be-img-block">
								<img src="images/p5.jpg" alt="omg"/>
								</a>
								<a href="blog-detail-2.html" class="be-post-title">Drive Your World</a>
								<span>
									<a href="blog-detail-2.html" class="be-post-tag">Interaction Design</a>, 
									<a href="blog-detail-2.html" class="be-post-tag">UI/UX</a>,  
									<a href="blog-detail-2.html" class="be-post-tag">Web Design</a>
								</span>
								<div class="author-post">
									<img src="images/a9.png" alt class="ava-author"/>
									<span>by <a href="blog-detail-2.html">Hoang Nguyen</a></span>
								</div>
								<div class="info-block">
									<span><i class="fa fa-thumbs-o-up"></i> 360</span>
									<span><i class="fa fa-eye"></i> 789</span>
									<span><i class="fa fa-comment-o"></i> 20</span>
								</div>
							</div>
						</div>
					</div>
					<div class="be-comment-block">
						<h1 class="comments-title">Comments (3)</h1>
						<p class="about-comment-block">
							You must <a href="blog-detail-2.html" class="be-signup-link">SIGN UP</a>
							 to join the conversation.
						</p>
						<div class="be-comment">
								<div class="be-img-comment">	
									<a href="blog-detail-2.html">
										<img src="images/c1.png" alt class="be-ava-comment"/>
									</a>
								</div>
								<div class="be-comment-content">
									
										<span class="be-comment-name">
											<a href="blog-detail-2.html">Ravi Sah</a>
											</span>
										<span class="be-comment-time">
											<i class="fa fa-clock-o"></i>
											May 27, 2015 at 3:14am
										</span>

									<p class="be-comment-text">
										Pellentesque gravida tristique ultrices. 
										Sed blandit varius mauris, vel volutpat urna hendrerit id. 
										Curabitur rutrum dolor gravida turpis tristique efficitur.
									</p>
								</div>
								
							</div>
						<div class="be-comment">
							<div class="be-img-comment">	
									<a href="blog-detail-2.html">
										<img src="images/c2.png" alt class="be-ava-comment"/>
									</a>
								</div>
								<div class="be-comment-content">
									
										<span class="be-comment-name">
											<a href="blog-detail-2.html">Phoenix, the Creative Studio</a>
									</span>
										<span class="be-comment-time">
											<i class="fa fa-clock-o"></i>
											May 27, 2015 at 3:14am
										</span>

									<p class="be-comment-text">
										Nunc ornare sed dolor sed mattis. In scelerisque dui a arcu mattis, at maximus eros commodo. Cras magna nunc, cursus lobortis luctus at, sollicitudin vel neque. Duis eleifend lorem non ant. Proin ut ornare lectus, vel eleifend est. Fusce hendrerit dui in turpis tristique blandit.
									</p>
									</div>
								
							</div>
						<div class="be-comment">
							<div class="be-img-comment">	
									<a href="blog-detail-2.html">
										<img src="images/c3.png" alt class="be-ava-comment"/>
									</a>
								</div>
								<div class="be-comment-content">
										<span class="be-comment-name">
											<a href="blog-detail-2.html">Dorian Camp</a>
									</span>
										<span class="be-comment-time">
											<i class="fa fa-clock-o"></i>
											May 27, 2015 at 3:14am
										</span>
									<p class="be-comment-text">
										Cras magna nunc, cursus lobortis luctus at, sollicitudin vel neque. Duis eleifend lorem non ant
									</p>
								</div>
						</div>
					</div>
				</div>
				<div class="col-md-3 col-md-pull-9 left-feild">
					<div class="be-user-block">
						<div class="be-user-detail">
							<a class="be-ava-user" href="blog-detail-2.html">
								<img src="images/ava.png" alt=""/>
							</a>
							<p class="be-use-name">Daniel Ng</p>
							<span class="be-user-info">
								Singapore, Singapore
							</span>
						</div>
						<div class="be-user-activity-block">
							<div class="row">
								<div class="col-lg-6">
									<a href="blog-detail-2.html" class="be-user-activity-button be-follow-type"><i class="fa fa-plus"></i>FOLLOW</a>
								</div>
								<div class="col-lg-6">
									<a href="blog-detail-2.html" class="col-lg-6 be-user-activity-button send-btn be-message-type"><i class="fa fa-envelope-o"></i>MESSAGE</a>
								</div>
							</div>
						</div>
						<h5 class="be-title">
							About Project
						</h5>
						<p class="be-text-userblock">
							Fusce dolor libero, efficitur et lobortis at, faucibus nec nunc. Proin fermentum turpis eget nisi facilisis lobortis. Praesent malesuada facilisis maximus. Donec sed lobortis tortor. Ut nec lacinia sapien, sit amet dapibus magna.
						</p>
					</div>
					<a href="blog-detail-2.html" class="be-button-vidget like-btn blue-style"><i class="fa fa-thumbs-o-up"></i>LIKE PROJECT</a>
					<a href="blog-detail-2.html" class="be-button-vidget add-btn grey-style"><i class="fa fa-file-o"></i>ADD TO COLLECTION</a>

					<h3 class="letf-menu-article text-center">Recent Works</h3>
					<div class="swiper-container" data-loop="1" data-speed="500" data-center="0" data-slides-per-view="1">
						<div class="swiper-wrapper">
							<div class="swiper-slide">
								<div class="be-post">
									<a href="blog-detail-2.html" class="be-img-block">
										<img src="images/p9.jpg" height="202" width="269" alt="omg"/>
									</a>
									<a href="blog-detail-2.html" class="be-post-title">NAHA Finalist Hairstylist of the Year Allen Ruiz</a>
										<span>
											<a href="blog-detail-2.html" class="be-post-tag">Art direction</a>, 
											<a href="blog-detail-2.html" class="be-post-tag">Web Design</a>,  
											<a href="blog-detail-2.html" class="be-post-tag">Interactiob design</a>
										</span>
									<div class="author-post">
										<img src="images/ava.png" alt class="ava-author"/>
										<span>by <a href="blog-detail-2.html">Daniel Ng</a></span>
									</div>
									<div class="info-block">
										<span><i class="fa fa-thumbs-o-up"></i> 253</span>
										<span><i class="fa fa-eye"></i> 753</span>
										<span><i class="fa fa-comment-o"></i> 50</span>
									</div>
								</div>
							</div>
							<div class="swiper-slide">
								<div class="be-post">
									<a href="blog-detail-2.html" class="be-img-block">
										<img src="images/p9.jpg" height="202" width="269" alt="omg"/>
									</a>
									<a href="blog-detail-2.html" class="be-post-title">NAHA Finalist Hairstylist of the Year Allen Ruiz</a>
										<span>
											<a href="blog-detail-2.html" class="be-post-tag">Art direction</a>, 
											<a href="blog-detail-2.html" class="be-post-tag">Web Design</a>,  
											<a href="blog-detail-2.html" class="be-post-tag">Interactiob design</a>
										</span>
									<div class="author-post">
										<img src="images/ava.png" alt class="ava-author"/>
										<span>by <a href="blog-detail-2.html">Daniel Ng</a></span>
									</div>
									<div class="info-block">
										<span><i class="fa fa-thumbs-o-up"></i> 253</span>
										<span><i class="fa fa-eye"></i> 753</span>
										<span><i class="fa fa-comment-o"></i> 50</span>
									</div>
								</div>
							</div>
							<div class="swiper-slide">
								<div class="be-post">
									<a href="blog-detail-2.html" class="be-img-block">
										<img src="images/p9.jpg" height="202" width="269" alt="omg"/>
									</a>
									<a href="blog-detail-2.html" class="be-post-title">NAHA Finalist Hairstylist of the Year Allen Ruiz</a>
										<span>
											<a href="blog-detail-2.html" class="be-post-tag">Art direction</a>, 
											<a href="blog-detail-2.html" class="be-post-tag">Web Design</a>,  
											<a href="blog-detail-2.html" class="be-post-tag">Interactiob design</a>
										</span>
									<div class="author-post">
										<img src="images/ava.png" alt class="ava-author"/>
										<span>by <a href="blog-detail-2.html">Daniel Ng</a></span>
									</div>
									<div class="info-block">
										<span><i class="fa fa-thumbs-o-up"></i> 253</span>
										<span><i class="fa fa-eye"></i> 753</span>
										<span><i class="fa fa-comment-o"></i> 50</span>
									</div>
								</div>
							</div>
							<div class="swiper-slide">
								<div class="be-post">
									<a href="blog-detail-2.html" class="be-img-block">
										<img src="images/p9.jpg" height="202" width="269" alt="omg"/>
									</a>
									<a href="blog-detail-2.html" class="be-post-title">NAHA Finalist Hairstylist of the Year Allen Ruiz</a>
										<span>
											<a href="blog-detail-2.html" class="be-post-tag">Art direction</a>, 
											<a href="blog-detail-2.html" class="be-post-tag">Web Design</a>,  
											<a href="blog-detail-2.html" class="be-post-tag">Interactiob design</a>
										</span>
									<div class="author-post">
										<img src="images/ava.png" alt class="ava-author"/>
										<span>by <a href="blog-detail-2.html">Daniel Ng</a></span>
									</div>
									<div class="info-block">
										<span><i class="fa fa-thumbs-o-up"></i> 253</span>
										<span><i class="fa fa-eye"></i> 753</span>
										<span><i class="fa fa-comment-o"></i> 50</span>
									</div>
								</div>
							</div>
						</div>
						<div class="pagination">

						</div>
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
