import React, { useContext } from "react";
import HelpNav from "./HelpNav";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { data } from '../../data/shippingAndDelivery'
import { IoArrowBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";
import { Helmet } from "react-helmet-async";

const ShippingAndDelivery = () => {
  const context = useContext(MyContext);
  return (
    <>
    <Helmet>
      <title>Shopping & delivery - Hibuyshopping</title>
      <meta
        name="description"
        content="Experience the future of online shopping at Hibuyshopping, where innovation meets tradition. Support a global community of creators and entrepreneurs with every purchase. Shop smart, shop Hibuyshopping!."
      />
      <meta
        name="keywords"
        content="Shopping & delivery, Hibuyshopping.com, online shopping website, online shop, online store website, clothing websites, online shopping sites, best online clothing stores, shopping websites, shopping sites, clothing online stores, best online shopping websites, good online clothing stores, store website, best online shopping sites, best online store, best online clothes shopping, clothes online, top online clothing stores, clothing store online shopping, website online shop, internet shopping sites, all online shopping websites, good online shopping sites, best online clothes shops, good online shops, online shops for clothes, good online shopping websites, top shopping sites, e-commerce store, online store, buy online, buy clothes online, online fashion store, discount shopping online, shop online for electronics, buy shoes online, women's clothes online, top-selling products online, online sale, e-store, online jewellery shopping, clothing sales online, cheap clothing brands, men's sale clothing, women's sale clothing, Hibuyshopping.com, multivendor online store, shopping needs, multivendor online store, clothing, footwear, fashion, kitchen accessories, latest fashion trends, home essentials, unique gifts, seamless shopping experience, customer service, variety of choices, multivendor marketplace, quality and variety, online shopping in Pakistan, newest fashion trends, renowned brands, seasonal collections, Pakistani brands, shawls, sweaters, t-shirts, caps, hoodies, sleeves, trousers, kurtas, kurtis, coats, shrugs, jackets, boots, sneakers, flats, high heels, khussa, stitched and unstitched clothes, chic accessories, jewelry, watches, scarves, hijabs, perfumes, hottest new arrivals, timeless style, modern trends, high-quality fashion wear, elegant dresses, stylish shoes, trendy handbags, top 10 online branded shopping sites, competitive prices, 24/7 service, fast delivery, effortless shopping,
       designer collections, seamless online shopping experience "
      />
    </Helmet>
      <HelpNav />
      <section className="helpCenter">
      <div className="helpCenterWrapper">
        <Link to={'/help-center'} onClick={() => context.setisHeaderFooterShow(true)}><IoArrowBackSharp/></Link>
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
