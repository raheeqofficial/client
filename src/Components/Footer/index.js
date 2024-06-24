import { LuShirt } from "react-icons/lu";
import { TbTruckDelivery } from "react-icons/tb";
import { TbDiscount2 } from "react-icons/tb";
import { CiBadgeDollar } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fade from '@mui/material/Fade';
import AddIcon from '@mui/icons-material/Add';
import { BiMinus } from "react-icons/bi";
import { FacebookRounded } from "@mui/icons-material";

const Footer = () => {
    const [expanded, setExpanded] = useState(false);

    const handleExpansion = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    };
    return (
        <>

            <footer>
                <div className="container">
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
                            <span><TbDiscount2 /></span>
                            <span className="ml-2">Daily Mega Discounts</span>
                        </div>

                        <div className="col d-flex align-items-center">
                            <span><CiBadgeDollar /></span>
                            <span className="ml-2">Best price on the market</span>
                        </div>
                    </div>



                    <div className="row mt-5 linksWrap">
                        <div className="col">
                            <h5>FRUIT & VEGETABLES</h5>
                            <ul>
                                <li><Link to="#">Fresh Vegetables</Link></li>
                                <li><Link to="#">Herbs & Seasonings</Link></li>
                                <li><Link to="#">Fresh Fruits</Link></li>
                                <li><Link to="#">Cuts & Sprouts</Link></li>
                                <li><Link to="#">Exotic Fruits & Veggies</Link></li>
                                <li><Link to="#">Packaged Produce</Link></li>
                                <li><Link to="#">Party Trays</Link></li>
                            </ul>
                        </div>

                        <div className="col">
                            <h5>BREAKFAST & DAIRY</h5>
                            <ul>
                                <li><Link to="#">Fresh Vegetables</Link></li>
                                <li><Link to="#">Herbs & Seasonings</Link></li>
                                <li><Link to="#">Fresh Fruits</Link></li>
                                <li><Link to="#">Cuts & Sprouts</Link></li>
                                <li><Link to="#">Exotic Fruits & Veggies</Link></li>
                                <li><Link to="#">Packaged Produce</Link></li>
                                <li><Link to="#">Party Trays</Link></li>
                            </ul>
                        </div>

                        <div className="col">
                            <h5>MEAT & SEAFOOD</h5>
                            <ul>
                                <li><Link to="#">Fresh Vegetables</Link></li>
                                <li><Link to="#">Herbs & Seasonings</Link></li>
                                <li><Link to="#">Fresh Fruits</Link></li>
                                <li><Link to="#">Cuts & Sprouts</Link></li>
                                <li><Link to="#">Exotic Fruits & Veggies</Link></li>
                                <li><Link to="#">Packaged Produce</Link></li>
                                <li><Link to="#">Party Trays</Link></li>
                            </ul>
                        </div>

                        <div className="col">
                            <h5>BEVERAGES</h5>
                            <ul>
                                <li><Link to="#">Fresh Vegetables</Link></li>
                                <li><Link to="#">Herbs & Seasonings</Link></li>
                                <li><Link to="#">Fresh Fruits</Link></li>
                                <li><Link to="#">Cuts & Sprouts</Link></li>
                                <li><Link to="#">Exotic Fruits & Veggies</Link></li>
                                <li><Link to="#">Packaged Produce</Link></li>
                                <li><Link to="#">Party Trays</Link></li>
                            </ul>
                        </div>

                        <div className="col">
                            <h5>BREADS & BAKERY</h5>
                            <ul>
                                <li><Link to="#">Fresh Vegetables</Link></li>
                                <li><Link to="#">Herbs & Seasonings</Link></li>
                                <li><Link to="#">Fresh Fruits</Link></li>
                                <li><Link to="#">Cuts & Sprouts</Link></li>
                                <li><Link to="#">Exotic Fruits & Veggies</Link></li>
                                <li><Link to="#">Packaged Produce</Link></li>
                                <li><Link to="#">Party Trays</Link></li>
                            </ul>
                        </div>
                    </div>



                    <div className="copyright mt-3 pt-3 pb-3 d-flex">
                        <p className="mb-0">Copyright 2024. All rights reserved</p>
                        <ul className="list list-inline ml-auto mb-0 socials">
                            <li className="list-inline-item">
                                <Link to="#"><FaFacebookF /></Link>
                            </li>

                            <li className="list-inline-item">
                                <Link to="#"><FaTwitter /></Link>
                            </li>

                            <li className="list-inline-item">
                                <Link to="#"><FaInstagram /></Link>
                            </li>
                        </ul>
                    </div>


                </div>
            </footer>
            <div className="mb-footer">
                <div className="mb-accordian">
                <Accordion
                    expanded={expanded}
                    onChange={handleExpansion}
                    slots={{ transition: Fade }}
                    slotProps={{ transition: { timeout: 400 } }}
                    sx={{
                        '& .MuiAccordion-region': { height: expanded ? 'auto' : 0 },
                        '& .MuiAccordionDetails-root': { display: expanded ? 'block' : 'none' },
                    }}
                >
                    <AccordionSummary
                        expandIcon={expanded  === true ? <BiMinus /> : <AddIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography>Custom transition using Fade</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    expanded={expanded}
                    onChange={handleExpansion}
                    slots={{ transition: Fade }}
                    slotProps={{ transition: { timeout: 400 } }}
                    sx={{
                        '& .MuiAccordion-region': { height: expanded ? 'auto' : 0 },
                        '& .MuiAccordionDetails-root': { display: expanded ? 'block' : 'none' },
                    }}
                >
                    <AccordionSummary
                        expandIcon={expanded  === true ? <BiMinus /> : <AddIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography>Custom transition using Fade</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    expanded={expanded}
                    onChange={handleExpansion}
                    slots={{ transition: Fade }}
                    slotProps={{ transition: { timeout: 400 } }}
                    sx={{
                        '& .MuiAccordion-region': { height: expanded ? 'auto' : 0 },
                        '& .MuiAccordionDetails-root': { display: expanded ? 'block' : 'none' },
                    }}
                >
                    <AccordionSummary
                        expandIcon={expanded  === true ? <BiMinus /> : <AddIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography>Custom transition using Fade</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                </div>
                <div className="mb-copyright">
                <div className="mb-social">
                    <Link to={'#'}><FacebookRounded/></Link>
                    <Link to={'#'}><FacebookRounded/></Link>
                    <Link to={'#'}><FacebookRounded/></Link>
                    <Link to={'#'}><FacebookRounded/></Link>
                </div>
                <div className="mb-cr-txt">
                    <p>Made by Raheeq. All rights reserved</p>
                </div>
                </div>
            </div>
        </>
    )
}

export default Footer;