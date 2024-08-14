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
        <title>
          Shopping & Delivery - Hibuyshopping | Seamless Shopping Experience and
          Fast Delivery
        </title>
        <meta
          name="title"
          content="Shopping & Delivery - Hibuyshopping | Seamless Shopping Experience and Fast Delivery"
        />
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
          property="og:title"
          content="Shopping & Delivery - Hibuyshopping | Seamless Shopping Experience and Fast Delivery"
        />
        <meta
          property="og:description"
          content="Explore Hibuyshopping's shopping and delivery services. Learn about our efficient shopping process, diverse delivery options, and delivery time estimates. Experience a hassle-free shopping journey with fast delivery on Pakistan's top e-commerce platform."
        />
        <meta
          property="og:image"
          content="URL_TO_YOUR_SHOPPING_AND_DELIVERY_PAGE_IMAGE"
        />
        <meta
          property="og:url"
          content="URL_TO_YOUR_SHOPPING_AND_DELIVERY_PAGE"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Shopping & Delivery - Hibuyshopping | Seamless Shopping Experience and Fast Delivery"
        />
        <meta
          name="twitter:description"
          content="Learn about Hibuyshopping's shopping and delivery options. Discover our streamlined shopping process, available delivery methods, and delivery times for a smooth and efficient shopping experience."
        />
        <meta
          name="twitter:image"
          content="URL_TO_YOUR_SHOPPING_AND_DELIVERY_PAGE_IMAGE"
        />
      </Helmet>
      <HelpNav />
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
          <div className="helpQuestions">
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
          </div>
        </div>
      </section>
    </>
  );
};

export default ShippingAndDelivery;
