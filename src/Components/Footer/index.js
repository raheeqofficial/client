
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaSquareFacebook, FaSquareInstagram, FaSquareXTwitter } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { FaRegEnvelope } from "react-icons/fa";
import './footer.css'
import payments from '../../assets/images/payments.png'
import logo from '../../assets/images/eliph stores-7.png'

const Footer = () => {
    const [expanded, setExpanded] = useState(false);
    const [expanded1, setExpanded1] = useState(false);
    const [expanded2, setExpanded2] = useState(false);

    const handleCustomerCare = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    };
    const handleAboutUs = () => {
        setExpanded1((prevExpanded) => !prevExpanded);
    };
    const handleSocialMedia = () => {
        setExpanded2((prevExpanded) => !prevExpanded);
    };
    return (
        <>
            <div className="page-wrapper eliphFooter">
            <footer className="footer footer-2">
            <div className="icon-boxes-container">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-lg-3">
                            <div className="icon-box icon-box-side">
                                <span className="icon-box-icon text-dark">
                                    <i className="icon-rocket"></i>
                                </span>
                                <div className="icon-box-content">
                                    <h3 className="icon-box-title">Free Shipping</h3>
                                    <p>orders $50 or more</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-lg-3">
                            <div className="icon-box icon-box-side">
                                <span className="icon-box-icon text-dark">
                                    <i className="icon-rotate-left"></i>
                                </span>

                                <div className="icon-box-content">
                                    <h3 className="icon-box-title">Free Returns</h3>
                                    <p>within 30 days</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-lg-3">
                            <div className="icon-box icon-box-side">
                                <span className="icon-box-icon text-dark">
                                    <i className="icon-info-circle"></i>
                                </span>

                                <div className="icon-box-content">
                                    <h3 className="icon-box-title">Get 20% Off 1 Item</h3>
                                    <p>When you sign up</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-lg-3">
                            <div className="icon-box icon-box-side">
                                <span className="icon-box-icon text-dark">
                                    <i className="icon-life-ring"></i>
                                </span>

                                <div className="icon-box-content">
                                    <h3 className="icon-box-title">We Support</h3>
                                    <p>24/7 amazing services</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        	<div className="footer-newsletter bg-image">
        		<div className="container">
        			<div className="heading text-center">
                        <h3 className="title">Get The Latest Deals</h3>
                        <p className="title-desc">and receive <span>$20 coupon</span> for first shopping</p>
                    </div>

                    <div className="row">
                    	<div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                            <form action="#">
    							<div className="input-group">
    								<input type="email" className="form-control" placeholder="Enter your Email Address" aria-label="Email Adress" aria-describedby="newsletter-btn" required/>
    								<div className="input-group-append">
    									<button className="btn btn-primary" type="submit" id="newsletter-btn"><span>Subscribe</span><i className="icon-long-arrow-right"></i></button>
    								</div>
    							</div>
                            </form>
                    	</div>
                    </div>
        		</div>
        	</div>

        	<div className="footer-middle">
	            <div className="container">
	            	<div className="row">
	            		<div className="col-sm-12 col-lg-6">
	            			<div className="widget widget-about">
	            				<img src={logo} className="footer-logo" alt="Footer Logo" width="105" height="25"/>
	            				<p>Praesent dapibus, neque id cursus ucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus. </p>
	            				
	            				<div className="widget-about-info">
	            					<div className="row">
	            						<div className="col-sm-6 col-md-4">
	            							<span className="widget-about-title">Got Question? Call us 24/7</span>
	            							<a href="tel: +92 3144363910">+92 3144363910</a>
	            						</div>
	            						<div className="col-sm-6 col-md-8">
	            							<span className="widget-about-title">Payment Method</span>
	            							<figure className="footer-payments">
							        			<img src={payments} alt="Payment methods" width="272" height="20"/>
							        		</figure>
	            						</div>
	            					</div>
	            				</div>
	            			</div>
	            		</div>

	            		<div className="col-sm-4 col-lg-2">
	            			<div className="widget">
	            				<h4 className="widget-title">Information</h4>

	            				<ul className="widget-list">
	            					<li><Link to={'/about'}>About Eliph</Link></li>
	            					<li><Link to={'#'}>How to shop on Eliph</Link></li>
	            					<li><Link to={'#'}>FAQ</Link></li>
	            					<li><Link to={'/contact'}>Contact us</Link></li>
	            					<li><Link to={'/signUp'}>Sign Up</Link></li>
	            				</ul>
	            			</div>
	            		</div>

	            		<div className="col-sm-4 col-lg-2">
	            			<div className="widget">
	            				<h4 className="widget-title">Customer Service</h4>

	            				<ul className="widget-list">
	            					<li><Link to={'/help-center'}>Help Center</Link></li>
	            					<li><Link to={'#'}>Money-back guarantee!</Link></li>
	            					<li><Link to={'#'}>Returns</Link></li>
	            					<li><Link to={'#'}>Shipping</Link></li>
	            					<li><Link to={'#'}>Terms and conditions</Link></li>
	            					<li><Link to={'#'}>Privacy Policy</Link></li>
	            				</ul>
	            			</div>
	            		</div>

	            		<div className="col-sm-4 col-lg-2">
	            			<div className="widget">
	            				<h4 className="widget-title">My Account</h4>

	            				<ul className="widget-list">
	            					<li><Link to={'/signIn'}>Sign In</Link></li>
	            					<li><Link to="/cart">View Cart</Link></li>
	            					<li><Link to={'/my-list'}>My Wishlist</Link></li>
	            					<li><Link to={'#'}>Track My Order</Link></li>
	            					<li><Link to={'/help-center'}>Help</Link></li>
	            				</ul>
	            			</div>
	            		</div>
	            	</div>
	            </div>
	        </div>

	        <div className="footer-bottom">
	        	<div className="container">
	        		<p className="footer-copyright">Copyright © 2024 Eliph Store. All Rights Reserved.</p>
	        		<ul className="footer-menu">
	        			<li><a to={'#'}>Terms Of Use</a></li>
	        			<li><a to={'#'}>Privacy Policy</a></li>
	        		</ul>

	        		<div className="social-icons social-icons-color">
	        			<span className="social-label">Social Media</span>
    					<a to={'#'} className="social-icon social-facebook" title="Facebook" target="_blank"><i className="icon-facebook-f"></i></a>
    					<a to={'#'} className="social-icon social-twitter" title="Twitter" target="_blank"><i className="icon-twitter"></i></a>
    					<a to={'#'} className="social-icon social-instagram" title="Instagram" target="_blank"><i className="icon-instagram"></i></a>
    					<a to={'#'} className="social-icon social-youtube" title="Youtube" target="_blank"><i className="icon-youtube"></i></a>
    					<a to={'#'} className="social-icon social-pinterest" title="Pinterest" target="_blank"><i className="icon-pinterest"></i></a>
    				</div>
	        	</div>
	        </div>
        </footer>
            </div>
            {/* <footer>
                <div className="linksWrap">
                    <div className="col">
                        <h5>Customer Care</h5>
                        <ul>
                            <li><Link to={'/help-center'}>Help Center</Link></li>
                            <li><Link to={'#'}>Returns & Refunds</Link></li>
                            <li><Link to={'/contact'}>Contact Us</Link></li>
                            <li><a target="_blank" href="https://seller-nu.vercel.app">Become a Seller</a></li>
                        </ul>
                    </div>

                    <div className="col">
                        <h5>About Us</h5>
                        <ul>
                            <li><Link to={'/about'}>About Us</Link></li>
                            <li><Link to={'#'}>Privacy Statement</Link></li>
                            <li><Link to={'#'}>Terms & Conditions</Link></li>
                        </ul>
                    </div>

                    <div className="col">
                        <h5>Contact Us</h5>
                        <div className="footer-nav-list">
                            <div className="footer-nav-item d-flex">
                                    <FiMapPin/>
                                <p className="footer-nav-link">
                                    Model town Lahore Pakistan
                                </p>
                            </div>
                            <div className="footer-nav-item d-flex">
                                    <FaPhoneAlt/>
                                <a href="tel: +92 3144363910" className="footer-nav-link">+92 3144363910</a>
                            </div>
                            <div className="footer-nav-item d-flex">
                                    <FaRegEnvelope/>
                                <a href="mailto: support@eliphstore.com" className="footer-nav-link">support@eliphstore.com</a>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <h5>Follow Us</h5>
                        <div className="socials">
                            <span><Link to={'#'}><FaSquareFacebook /></Link></span>
                            <span><Link to={'#'}><FaSquareInstagram /></Link></span>
                            <span><Link to={'#'}><FaSquareXTwitter /></Link></span>
                        </div>
                    </div>

                </div>
            </footer>
            <div className="copyright">
                <p className="mb-0">Copyright 2024. All rights reserved</p>
            </div> */}
        </>
    )
}

export default Footer;