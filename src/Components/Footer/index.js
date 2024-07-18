import { LuShirt } from "react-icons/lu";
import { TbTruckDelivery } from "react-icons/tb";
import { CiBadgeDollar } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { TbDiscount } from "react-icons/tb";
import { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { FaSquareFacebook, FaSquareInstagram, FaSquareXTwitter } from "react-icons/fa6";
import Fade from '@mui/material/Fade';
import AddIcon from '@mui/icons-material/Add';
import { BiMinus } from "react-icons/bi";

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
                <div className="topInfo row">
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
                </div>



                <div className="mt-5 linksWrap">
                    <div className="col">
                        <h5>Customer Care</h5>
                        <ul>
                            <li><Link to={'/help-center'}>Help Center</Link></li>
                            <li><Link to={'#'}>Returns & Refunds</Link></li>
                            <li><Link to={'#'}>Contact Us</Link></li>
                            <li><Link to={'#'}>Become a Seller</Link></li>
                        </ul>
                    </div>

                    <div className="col">
                        <h5>About Us</h5>
                        <ul>
                            <li><Link to={'#'}>About Us</Link></li>
                            <li><Link to={'#'}>Privacy Statement</Link></li>
                            <li><Link to={'#'}>Terms & Conditions</Link></li>
                        </ul>
                    </div>

                    <div className="col">
                        <h5>Follow Us</h5>
                        <div className="socials">
                            <span><Link to={'#'}><FaSquareFacebook /></Link></span>
                            <span><Link to={'#'}><FaSquareInstagram /></Link></span>
                            <span><Link to={'#'}><FaSquareXTwitter /></Link></span>
                        </div>
                    </div>

                    <div className="col">
                        <h5>Shipping</h5>
                        <p>We are only provide shipping services for <b>Pakistan</b></p>
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