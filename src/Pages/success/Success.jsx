import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { HiOutlineInboxStack } from "react-icons/hi2";
import { Helmet } from "react-helmet-async";
const Success = () => {
    const [user, setUser] = useState()

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token !== "" && token !== undefined && token !== null) {
          const userData = JSON.parse(localStorage.getItem("user"));    
          setUser(userData);
        }
    }, [])

  return (
    <>
    <Helmet>
    <title>Success - EliphStore</title>
    
      <meta
        name="description"
        content="Experience the future of online shopping at Eliphstore, where innovation meets tradition. Support a global community of creators and entrepreneurs with every purchase. Shop smart, shop Eliphstore!."
      />
      <meta
        name="keywords"
        content="Success, Eliphstore.com, online shopping website, online shop, online store website, clothing websites, online shopping sites, best online clothing stores, shopping websites, shopping sites, clothing online stores, best online shopping websites, good online clothing stores, store website, best online shopping sites, best online store, best online clothes shopping, clothes online, top online clothing stores, clothing store online shopping, website online shop, internet shopping sites, all online shopping websites, good online shopping sites, best online clothes shops, good online shops, online shops for clothes, good online shopping websites, top shopping sites, e-commerce store, online store, buy online, buy clothes online, online fashion store, discount shopping online, shop online for electronics, buy shoes online, women's clothes online, top-selling products online, online sale, e-store, online jewellery shopping, clothing sales online, cheap clothing brands, men's sale clothing, women's sale clothing, Eliphstore.com, multivendor online store, shopping needs, multivendor online store, clothing, footwear, fashion, kitchen accessories, latest fashion trends, home essentials, unique gifts, seamless shopping experience, customer service, variety of choices, multivendor marketplace, quality and variety, online shopping in Pakistan, newest fashion trends, renowned brands, seasonal collections, Pakistani brands, shawls, sweaters, t-shirts, caps, hoodies, sleeves, trousers, kurtas, kurtis, coats, shrugs, jackets, boots, sneakers, flats, high heels, khussa, stitched and unstitched clothes, chic accessories, jewelry, watches, scarves, hijabs, perfumes, hottest new arrivals, timeless style, modern trends, high-quality fashion wear, elegant dresses, stylish shoes, trendy handbags, top 10 online branded shopping sites, competitive prices, 24/7 service, fast delivery, effortless shopping,
       designer collections, seamless online shopping experience "
      />
    </Helmet>
      <div className="successPage">
      <h1 className="hd">Thank you for your order</h1>
        <div className="successBox">
            <h5>ORDER CONFIRMATION</h5>
            <p>{user?.name} your order has been sucessful!</p>
            <p>Thank you for choosing <b>RG store</b>. You can check your order from here.</p>
            <Link to={'/orders'}><Button className=" btn-blue btn-lg"><HiOutlineInboxStack/> &nbsp; My Orders</Button></Link>
        </div>
    </div>
    </>
  );
};

export default Success;
