import React, { useContext } from "react";
import HelpNav from "./HelpNav";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { data } from "../../data/shippingAndDelivery";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";
import { Helmet } from "react-helmet-async";

const ShippingAndDelivery = () => {
  const context = useContext(MyContext);
  return (
    <>
      <Helmet>
      <link rel="canonical" href="https://hibuyshopping.com/help-center/shipping-delivery" />
        <title>
          Shopping & Delivery - Hibuyshopping
        </title>
        <meta
          name="description"
          content="Discover Hibuyshopping's shopping and delivery options. Learn about our seamless shopping process, available delivery methods, and estimated delivery times. Enjoy a smooth and efficient shopping experience with fast delivery on Pakistan's leading e-commerce platform."
        />
        <meta
          name="keywords"
          content="shopping and delivery, Hibuyshopping, e-commerce delivery, shopping experience, delivery methods, fast delivery, delivery times, Pakistani e-commerce, multi-vendor store, seamless shopping"
        />
        <meta name="author" content="Hibuyshopping Team" />
        <meta
          property="og:url"
          content="https://hibuyshopping.com/help-center/shipping-delivery"
        />
      </Helmet>
      <section className="helpCenter">
        <div className="helpCenterWrapper">
          <Link
            to={"/help-center"}
            className="mt-1 mb-1"
            onClick={() => context.setisHeaderFooterShow(true)}
          >
            <Button className="btn btn-blue  mt-1 mb-1">
              <IoArrowBackSharp />
            </Button>
          </Link>
          {/* <div className="helpQuestions">
            <h1>Customers Questions</h1>
            <div className="accordianBox mb-3 mt-3">
              {data.map((data) => (
                <Accordion key={data.id}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <b>{data.question}</b>
                  </AccordionSummary>
                  <AccordionDetails>{data.answer}</AccordionDetails>
                </Accordion>
              ))}
            </div>
          </div> */}
          <h2 className="hd">Shipping and Delivery</h2>
              <div className="accordianBox mb-1 mt-1">
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <b>Q5: How long will it take for my order to arrive?</b>
                  </AccordionSummary>
                  <AccordionDetails>
                    A: Delivery times vary based on your location and the
                    shipping method selected. Standard shipping typically takes
                    5-7 business days, while expedited shipping takes 2-3
                    business days.
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <b>Q7: Can I track my order?</b>
                  </AccordionSummary>
                  <AccordionDetails>
                    A: Yes, once your order is confirmed, you can track your
                    order. Simply follow these steps:
                    <br />
                    1.
                    <b>Visit the Help Center</b> : Go to our Help Center on the
                    website. <br /> 2.<b>Find the Order Track Option</b> : Look
                    for the order track section.
                    <br />
                    <br />
                    If you need further assistance, feel free to contact our
                    customer service team.
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <b>Q7: Do you ship internationally?</b>
                  </AccordionSummary>
                  <AccordionDetails>
                    A: Yes, we offer international shipping to many countries.
                    Shipping fees and delivery times vary depending on the
                    destination.
                    <br />
                    <br />
                    If you need further assistance, feel free to contact our
                    customer service team(support@hibuyshopping.com).
                  </AccordionDetails>
                </Accordion>
              </div>
        </div>
      </section>
    </>
  );
};

export default ShippingAndDelivery;
