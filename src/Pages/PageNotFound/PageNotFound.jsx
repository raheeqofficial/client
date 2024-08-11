import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
    <Helmet>
      <title>Page not found - Hibuyshopping</title>
      <meta
        name="description"
        content="Experience the future of online shopping at Hibuyshopping, where innovation meets tradition. Support a global community of creators and entrepreneurs with every purchase. Shop smart, shop Hibuyshopping!."
      />
      <meta
        name="keywords"
        content="Page not found, Hibuyshopping.com, online shopping website, online shop, online store website, clothing websites, online shopping sites, best online clothing stores, shopping websites, shopping sites, clothing online stores, best online shopping websites, good online clothing stores, store website, best online shopping sites, best online store, best online clothes shopping, clothes online, top online clothing stores, clothing store online shopping, website online shop, internet shopping sites, all online shopping websites, good online shopping sites, best online clothes shops, good online shops, online shops for clothes, good online shopping websites, top shopping sites, e-commerce store, online store, buy online, buy clothes online, online fashion store, discount shopping online, shop online for electronics, buy shoes online, women's clothes online, top-selling products online, online sale, e-store, online jewellery shopping, clothing sales online, cheap clothing brands, men's sale clothing, women's sale clothing, Hibuyshopping.com, multivendor online store, shopping needs, multivendor online store, clothing, footwear, fashion, kitchen accessories, latest fashion trends, home essentials, unique gifts, seamless shopping experience, customer service, variety of choices, multivendor marketplace, quality and variety, online shopping in Pakistan, newest fashion trends, renowned brands, seasonal collections, Pakistani brands, shawls, sweaters, t-shirts, caps, hoodies, sleeves, trousers, kurtas, kurtis, coats, shrugs, jackets, boots, sneakers, flats, high heels, khussa, stitched and unstitched clothes, chic accessories, jewelry, watches, scarves, hijabs, perfumes, hottest new arrivals, timeless style, modern trends, high-quality fashion wear, elegant dresses, stylish shoes, trendy handbags, top 10 online branded shopping sites, competitive prices, 24/7 service, fast delivery, effortless shopping,
       designer collections, seamless online shopping experience "
      />
    </Helmet>
      <div className="pageNotFound">
      <h1>Uh-Oh...</h1>
      <p className="zoom-area">
        <b>Page</b> you were looking for does not exists.{" "}
      </p>
      <section className="error-container">
        <span>
          <span>4</span>
        </span>
        <span>0</span>
        <span>
          <span>4</span>
        </span>
      </section>
      <div className="link-container">
        <Link
          to={'/'}
          className="more-link"
        >
          Back to Home
        </Link>
      </div>
    </div>
    </>
  );
};

export default PageNotFound;
