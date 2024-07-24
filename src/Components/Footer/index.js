
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaSquareFacebook, FaSquareInstagram, FaSquareXTwitter } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { FaRegEnvelope } from "react-icons/fa";
import './footer.css'

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

            <footer>
                {/* <div className="topInfo row">
                    <div className="col d-flex align-items-center">
                        <span><LuShirt /></span>
                        <span className="ml-2">Everyday fresh products</span>
                    </div>

                    <div className="col d-flex align-items-center">
                        <span><TbTruckDelivery /></span>
                        <span className="ml-2">Free delivery for order over $70</span>
                    </div>

                    <div className="col d-flex align-items-center">
                        <span><TbDiscount /></span>
                        <span className="ml-2">Daily Mega Discounts</span>
                    </div>

                    <div className="col d-flex align-items-center">
                        <span><CiBadgeDollar /></span>
                        <span className="ml-2">Best price on the market</span>
                    </div>
                </div> */}



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
                        <div class="footer-nav-list">
                            <div class="footer-nav-item d-flex">
                                    <FiMapPin/>
                                <p class="footer-nav-link">
                                    Model town Lahore Pakistan
                                </p>
                            </div>
                            <div class="footer-nav-item d-flex">
                                    <FaPhoneAlt/>
                                <a href="tel: +92 3144363910" class="footer-nav-link">+92 3144363910</a>
                            </div>
                            <div class="footer-nav-item d-flex">
                                    <FaRegEnvelope/>
                                <a href="mailto: support@eliphstore.com" class="footer-nav-link">support@eliphstore.com</a>
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
            </div>
        </>
    )
}

export default Footer;