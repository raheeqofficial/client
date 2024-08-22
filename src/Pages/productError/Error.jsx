import React from "react";
import img from "../../assets/images/404.png";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Helmet } from "react-helmet-async";

const Error = () => {
  return (
    <>
      <Helmet>
        <title>Error - Hibuyshopping</title>
        <meta
          name="description"
          content="Oops! The page you're looking for couldn't be found. Return to Hibuyshopping and continue exploring our wide range of products and categories."
        />
        <meta
          name="keywords"
          content="Error, Hibuyshopping.com, online shopping website, online shop, online store website, clothing websites, online shopping sites, best online clothing stores, shopping websites, shopping sites, clothing online stores, best online shopping websites, good online clothing stores, store website, best online shopping sites, best online store, best online clothes shopping, clothes online, top online clothing stores, clothing store online shopping, website online shop, internet shopping sites, all online shopping websites, good online shopping sites, best online clothes shops, good online shops, online shops for clothes, good online shopping websites, top shopping sites, e-commerce store, online store, buy online, buy clothes online, online fashion store, discount shopping online, shop online for electronics, buy shoes online, women's clothes online, top-selling products online, online sale, e-store, online jewellery shopping, clothing sales online, cheap clothing brands, men's sale clothing, women's sale clothing, Hibuyshopping.com, multivendor online store, shopping needs, multivendor online store, clothing, footwear, fashion, kitchen accessories, latest fashion trends, home essentials, unique gifts, seamless shopping experience, customer service, variety of choices, multivendor marketplace, quality and variety, online shopping in Pakistan, newest fashion trends, renowned brands, seasonal collections, Pakistani brands, shawls, sweaters, t-shirts, caps, hoodies, sleeves, trousers, kurtas, kurtis, coats, shrugs, jackets, boots, sneakers, flats, high heels, khussa, stitched and unstitched clothes, chic accessories, jewelry, watches, scarves, hijabs, perfumes, hottest new arrivals, timeless style, modern trends, high-quality fashion wear, elegant dresses, stylish shoes, trendy handbags, top 10 online branded shopping sites, competitive prices, 24/7 service, fast delivery, effortless shopping,
       designer collections, seamless online shopping experience "
        />
      </Helmet>
      <div className="errorContainer">
        <div className="errorWrapper">
          <div className="imgBox">
            <img
              width="200"
              height="200"
              src={img}
              alt="external-Not-Found-web-maintenance-sapphire-kerismaker"
            />
          </div>
          <div className="textBox">
            <h5>We are sorry an error has eccoured</h5>
            <p>We seem to have lost this page but we don't want to lose you</p>
            <Link to={"/"}>
              <Button className="btn btn-blue btn-lg">BACK TO MY HOME</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error;
