import React from 'react'
import './About.css'
import './css/style.css'
import about1 from '../../assets/images/about/img-1.jpg'
import about2 from '../../assets/images/about/img-2.jpg'
import brand1 from '../../assets/images/brands/1.png'
import brand2 from '../../assets/images/brands/2.png'
import brand3 from '../../assets/images/brands/3.png'
import brand4 from '../../assets/images/brands/4.png'
import brand5 from '../../assets/images/brands/5.png'
import brand6 from '../../assets/images/brands/6.png'
import brand7 from '../../assets/images/brands/7.png'
import brand8 from '../../assets/images/brands/8.png'
import brand9 from '../../assets/images/brands/9.png'
import team1 from '../../assets/images/team/member-1.jpg'
import team2 from '../../assets/images/team/member-2.jpg'
import team3 from '../../assets/images/team/member-3.jpg'
import user1 from '../../assets/images/testimonials/user-1.jpg'
import user2 from '../../assets/images/testimonials/user-2.jpg'

const About = () => {
  return (
    <div className='page-wrapper'>
        <main className="main">
        <nav aria-label="breadcrumb" class="breadcrumb-nav border-0 mb-0">
                <div class="container">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                        <li class="breadcrumb-item"><a href="#">Pages</a></li>
                        <li class="breadcrumb-item active" aria-current="page">About us</li>
                    </ol>
                </div>
        </nav>
        <div class="container">
	        	<div class="page-header page-header-big text-center">
        			<h1 class="page-title text-white">About us<span class="text-white">Who we are</span></h1>
	        	</div>
        </div>
        <div class="page-content pb-0">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 mb-3 mb-lg-0">
                            <h2 class="title">Our Vision</h2>
                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. </p>
                        </div>
                        
                        <div class="col-lg-6">
                            <h2 class="title">Our Mission</h2>
                            <p>Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. <br/>Praesent elementum hendrerit tortor. Sed semper lorem at felis. </p>
                        </div>
                    </div>

                    <div class="mb-5"></div>
                </div>

                <div class="bg-light-2 pt-6 pb-5 mb-6 mb-lg-8">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-5 mb-3 mb-lg-0">
                                <h2 class="title">Who We Are</h2>
                                <p class="lead text-primary mb-3">Pellentesque odio nisi, euismod pharetra a ultricies <br/>in diam. Sed arcu. Cras consequat</p>
                                <p class="mb-2">Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Suspendisse potenti. Sed egestas, ante et vulputate volutpat, uctus metus libero eu augue. </p>

                                <a href="blog.html" class="btn btn-sm btn-minwidth btn-outline-primary-2">
                                    <span>VIEW OUR NEWS</span>
                                    <i class="icon-long-arrow-right"></i>
                                </a>
                            </div>

                            <div class="col-lg-6 offset-lg-1">
                                <div class="about-images">
                                    <img src={about1} alt="" class="about-img-front"/>
                                    <img src={about2} alt="" class="about-img-back"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="container">
                    <div class="row">
                        <div class="col-lg-5">
                            <div class="brands-text">
                                <h2 class="title">The world's premium design brands in one destination.</h2>
                                <p>Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nis</p>
                            </div>
                        </div>
                        <div class="col-lg-7">
                            <div class="brands-display">
                                <div class="row justify-content-center">
                                    <div class="col-6 col-sm-4">
                                        <a href="#" class="brand">
                                            <img src={brand1} alt="Brand Name"/>
                                        </a>
                                    </div>

                                    <div class="col-6 col-sm-4">
                                        <a href="#" class="brand">
                                            <img src={brand2} alt="Brand Name"/>
                                        </a>
                                    </div>

                                    <div class="col-6 col-sm-4">
                                        <a href="#" class="brand">
                                            <img src={brand3} alt="Brand Name"/>
                                        </a>
                                    </div>

                                    <div class="col-6 col-sm-4">
                                        <a href="#" class="brand">
                                            <img src={brand4} alt="Brand Name"/>
                                        </a>
                                    </div>

                                    <div class="col-6 col-sm-4">
                                        <a href="#" class="brand">
                                            <img src={brand5} alt="Brand Name"/>
                                        </a>
                                    </div>

                                    <div class="col-6 col-sm-4">
                                        <a href="#" class="brand">
                                            <img src={brand6} alt="Brand Name"/>
                                        </a>
                                    </div>

                                    <div class="col-6 col-sm-4">
                                        <a href="#" class="brand">
                                            <img src={brand7} alt="Brand Name"/>
                                        </a>
                                    </div>

                                    <div class="col-6 col-sm-4">
                                        <a href="#" class="brand">
                                            <img src={brand8} alt="Brand Name"/>
                                        </a>
                                    </div>

                                    <div class="col-6 col-sm-4">
                                        <a href="#" class="brand">
                                            <img src={brand9} alt="Brand Name"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr class="mt-4 mb-6"/>

                    <h2 class="title text-center mb-4">Meet Our Team</h2>

                    <div class="row">
                        <div class="col-md-4">
                            <div class="member member-anim text-center">
                                <figure class="member-media">
                                    <img src={team2} alt="member photo"/>

                                    <figcaption class="member-overlay">
                                        <div class="member-overlay-content">
                                            <h3 class="member-title">Raheeq Gill<span>Founder & CEO</span></h3>
                                            <p>Sed pretium, ligula sollicitudin viverra, tortor libero sodales leo, eget blandit nunc.</p> 
                                            <div class="social-icons social-icons-simple">
                                                <a href="#" class="social-icon" title="Facebook" target="_blank"><i class="icon-facebook-f"></i></a>
                                                <a href="#" class="social-icon" title="Twitter" target="_blank"><i class="icon-twitter"></i></a>
                                                <a href="#" class="social-icon" title="Instagram" target="_blank"><i class="icon-instagram"></i></a>
                                            </div>
                                        </div>
                                    </figcaption>
                                </figure>
                                <div class="member-content">
                                    <h3 class="member-title">Samanta Grey<span>Founder & CEO</span></h3>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="member member-anim text-center">
                                <figure class="member-media">
                                    <img src={team2} alt="member photo"/>

                                    <figcaption class="member-overlay">
                                        <div class="member-overlay-content">
                                            <h3 class="member-title">Basit Ali<span>Sales & Finance Manager</span></h3>
                                            <p>Sed pretium, ligula sollicitudin viverra, tortor libero sodales leo, eget blandit nunc.</p> 
                                            <div class="social-icons social-icons-simple">
                                                <a href="#" class="social-icon" title="Facebook" target="_blank"><i class="icon-facebook-f"></i></a>
                                                <a href="#" class="social-icon" title="Twitter" target="_blank"><i class="icon-twitter"></i></a>
                                                <a href="#" class="social-icon" title="Instagram" target="_blank"><i class="icon-instagram"></i></a>
                                            </div>
                                        </div>
                                    </figcaption>
                                </figure>
                                <div class="member-content">
                                    <h3 class="member-title">Bruce Sutton<span>Sales & Finance Manager</span></h3>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="member member-anim text-center">
                                <figure class="member-media">
                                    <img src={team2} alt="member photo"/>

                                    <figcaption class="member-overlay">
                                        <div class="member-overlay-content">
                                            <h3 class="member-title">Moin Haider<span>Product & Marketing Manager</span></h3>
                                            <p>Sed pretium, ligula sollicitudin viverra, tortor libero sodales leo, eget blandit nunc.</p> 
                                            <div class="social-icons social-icons-simple">
                                                <a href="#" class="social-icon" title="Facebook" target="_blank"><i class="icon-facebook-f"></i></a>
                                                <a href="#" class="social-icon" title="Twitter" target="_blank"><i class="icon-twitter"></i></a>
                                                <a href="#" class="social-icon" title="Instagram" target="_blank"><i class="icon-instagram"></i></a>
                                            </div>
                                        </div>
                                    </figcaption>
                                </figure>
                                <div class="member-content">
                                    <h3 class="member-title">Janet Joy<span>Product Manager</span></h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mb-2"></div>

                <div class="about-testimonials bg-light-2 pt-6 pb-6">
                    <div class="container">
                        <h2 class="title text-center mb-3">What Customer Say About Us</h2>

                        <div class="owl-carousel owl-simple owl-testimonials-photo" data-toggle="owl" 
                            data-owl-options='{
                                "nav": false, 
                                "dots": true,
                                "margin": 20,
                                "loop": false,
                                "responsive": {
                                    "1200": {
                                        "nav": true
                                    }
                                }
                            }'>
                            <blockquote class="testimonial text-center">
                                <img src={user1} alt="user"/>
                                <p>“ Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Pellentesque aliquet nibh nec urna. <br/>In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti. ”</p>
                                <cite>
                                    Jenson Gregory
                                    <span>Customer</span>
                                </cite>
                            </blockquote>

                            <blockquote class="testimonial text-center">
                                <img src={user2} alt="user"/>
                                <p>“ Impedit, ratione sequi, sunt incidunt magnam et. Delectus obcaecati optio eius error libero perferendis nesciunt atque dolores magni recusandae! Doloremque quidem error eum quis similique doloribus natus qui ut ipsum.Velit quos ipsa exercitationem, vel unde obcaecati impedit eveniet non. ”</p>

                                <cite>
                                    Victoria Ventura
                                    <span>Customer</span>
                                </cite>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
  )
}

export default About