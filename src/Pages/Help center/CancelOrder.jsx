import React, { useContext, useState } from "react";
import axios from "axios";
import "./OrderCancellationForm.css";
import HelpNav from "./HelpNav";
import { MyContext } from "../../App";
import { Helmet } from "react-helmet-async";
import { TbShoppingCartCancel } from "react-icons/tb";
import { Button } from "@mui/material";

const OrderCancellationForm = () => {
  const [orderId, setOrderId] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const context = useContext(MyContext);

  const handleCancelOrder = async (e) => {
    e.preventDefault();
    if (context.isLogin === true) {
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_API_URL}/api/orders/cancel/${orderId}`,
          { reason }
        );
        if (response.data.success) {
          setMessage("Order cancelled successfully");
          setOrderId("");
          setReason("");
        } else {
          setMessage(response.data.message);
        }
      } catch (error) {
        setMessage(error.response?.data?.message || "Error: Invalid Order ID");
      }
    } else {
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Please login first for order cancellation",
      });
    }
  };

  return (
    <>
    <Helmet>
      <title>Cancel order - EliphStore</title>
      <meta
        name="description"
        content="Experience the future of online shopping at Eliphstore, where innovation meets tradition. Support a global community of creators and entrepreneurs with every purchase. Shop smart, shop Eliphstore!."
      />
      <meta
        name="keywords"
        content="Cancel order, Eliphstore.com, online shopping website, online shop, online store website, clothing websites, online shopping sites, best online clothing stores, shopping websites, shopping sites, clothing online stores, best online shopping websites, good online clothing stores, store website, best online shopping sites, best online store, best online clothes shopping, clothes online, top online clothing stores, clothing store online shopping, website online shop, internet shopping sites, all online shopping websites, good online shopping sites, best online clothes shops, good online shops, online shops for clothes, good online shopping websites, top shopping sites, e-commerce store, online store, buy online, buy clothes online, online fashion store, discount shopping online, shop online for electronics, buy shoes online, women's clothes online, top-selling products online, online sale, e-store, online jewellery shopping, clothing sales online, cheap clothing brands, men's sale clothing, women's sale clothing, Eliphstore.com, multivendor online store, shopping needs, multivendor online store, clothing, footwear, fashion, kitchen accessories, latest fashion trends, home essentials, unique gifts, seamless shopping experience, customer service, variety of choices, multivendor marketplace, quality and variety, online shopping in Pakistan, newest fashion trends, renowned brands, seasonal collections, Pakistani brands, shawls, sweaters, t-shirts, caps, hoodies, sleeves, trousers, kurtas, kurtis, coats, shrugs, jackets, boots, sneakers, flats, high heels, khussa, stitched and unstitched clothes, chic accessories, jewelry, watches, scarves, hijabs, perfumes, hottest new arrivals, timeless style, modern trends, high-quality fashion wear, elegant dresses, stylish shoes, trendy handbags, top 10 online branded shopping sites, competitive prices, 24/7 service, fast delivery, effortless shopping,
       designer collections, seamless online shopping experience "
      />
    </Helmet>
      <HelpNav />
      <div className="form-container cancelOrderPage">
        <form className="cancellation-form" onSubmit={handleCancelOrder}>
          <h2 className="hd">Cancel Order</h2>
          <div className="form-group">
            <label htmlFor="orderId" className="sml-hd">Order ID</label>
            <input
              type="text"
              id="orderId"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="reason" className="sml-hd">Reason for Cancellation</label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            ></textarea>
          </div>
          <Button type="submit" className="btn btn-blue btn-big w-100 mt-1">
            Cancel Order &nbsp; <TbShoppingCartCancel/>
          </Button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </>
  );
};

export default OrderCancellationForm;
