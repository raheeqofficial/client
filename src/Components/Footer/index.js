
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoLogoTiktok } from "react-icons/io5";
import './footer.css'
import payments from '../../assets/images/payments.png'
import logo from '../../assets/images/eliph stores-7.png'
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import Confetti from 'react-confetti';
import footerImg from '../../assets/images/Payment & Delivery.png'

const Footer = () => {
    const [expanded, setExpanded] = useState(false);
    const [expanded1, setExpanded1] = useState(false);
    const [expanded2, setExpanded2] = useState(false);
    const [id, setId] = useState('')
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/subscription/create`, { email });
            setMessage(response.data.message);
            setEmail(''); // Clear the form
            setShowConfetti(true);
            setTimeout(() => {
                setShowConfetti(false);
              }, 5000);
        } catch (error) {
            setMessage(error.response ? error.response.data.message : 'Error occurred.');
        }
    };
    useEffect(() => {
        const fetchId = () => {
            const newId = `${uuidv4()}${uuidv4()}`;
            setId(newId);
        }
        fetchId()
    }, [])

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
                    <div className="icon-box-container">
                            <img src={footerImg} alt="footer banner"/>
                    </div>

                    <div className="footer-newsletter bg-image">
                        {showConfetti && <Confetti />}
                        <div className="container">
                            <div className="heading text-center">
                                <h3 className="title">Get The Latest Deals</h3>
                                <p className="title-desc">Subscribe our newslette and get latest product prices</p>
                            </div>

                            <div className="row">
                                <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                                    <form onSubmit={handleSubmit}>
                                        <div className="input-group">
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Enter your Email Address"
                                                aria-label="Email Address"
                                                aria-describedby="newsletter-btn"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                            <div className="input-group-append">
                                                <button className="btn btn-primary" type="submit" id="newsletter-btn">
                                                    <span>Subscribe</span>
                                                    <i className="icon-long-arrow-right"></i>
                                                </button>
                                            </div>
                                        </div>
                                        {message && <p>{message}</p>}
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
                                        <img src={logo} className="footer-logo" alt="Footer Logo" width="105" height="25" />
                                        <p>Eliphstore is a cutting-edge multi-vendor e-commerce platform offering a seamless shopping experience. With a diverse range of products from various sellers, Eliphstore ensures quality, convenience, and competitive pricing, making it the go-to destination for all your shopping needs. </p>

                                        <div className="widget-about-info">
                                            <div className="row">
                                                <div className="col-sm-6 col-md-4">
                                                    <span className="widget-about-title">Got Question? Call us 24/7</span>
                                                    <a href="tel: +92 3144363910">+92 3144363910</a>
                                                </div>
                                                <div className="col-sm-6 col-md-8">
                                                    <span className="widget-about-title">Payment Method</span>
                                                    <figure className="footer-payments">
                                                        <img src={payments} alt="Payment methods" width="272" height="20" />
                                                    </figure>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-4 col-lg-2">
                                    <div className="widget">
                                        <h4 className="f-widget-title">Information</h4>

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
                                        <h4 className="f-widget-title">Customer Service</h4>

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
                                        <h4 className="f-widget-title">My Account</h4>

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
                                <li><Link to={`/terms-of-use/${id}`}>Terms Of Use</Link></li>
                                <li><Link to={`/privacy-policy/${id}`}>Privacy Policy</Link></li>
                            </ul>

                            <div className="social-icons social-icons-color">
                                <span className="social-label">Social Media</span>
                                <a href="https://www.facebook.com/people/EliphStore/61562441211111/?mibextid=ZbWKwL" target="_blank" className="social-icon social-facebook" title="Facebook" ><i className="icon-facebook-f"></i></a>
                                <a to={'#'} className="social-icon social-twitter" title="Twitter" target="_blank"><i className="icon-twitter"></i></a>
                                <a href="https://www.instagram.com/eliphstoreofficial/?utm_source=qr&igsh=MXdkZ3c4YjQ0OWRzag%3D%3D" className="social-icon social-instagram" title="Instagram" target="_blank"><i className="icon-instagram"></i></a>
                                {/* <a to={'#'} className="social-icon social-youtube" title="Youtube" target="_blank"><i className="icon-youtube"></i></a> */}
                                <a href="https://www.tiktok.com/@eliphstore?_t=8oNFf7Td5Qz&_r=1" className="social-icon social-pinterest" title="Tiktok" target="_blank"><IoLogoTiktok /></a>
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