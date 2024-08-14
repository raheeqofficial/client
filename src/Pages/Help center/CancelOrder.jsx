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
        <title>Cancel Order - Hibuyshopping | Easily Cancel Your Orders</title>
        <meta
          name="title"
          content="Cancel Order - Hibuyshopping | Easily Cancel Your Orders"
        />
        <meta
          name="description"
          content="Cancel your orders with ease on Hibuyshopping. Use our Cancel Order page to request an order cancellation, provide a reason, and manage your order status effectively. Ensure a smooth process for handling cancellations on Pakistan's leading e-commerce platform."
        />
        <meta
          name="keywords"
          content="cancel order, Hibuyshopping, order cancellation, manage orders, e-commerce cancellation, request cancellation, multi-vendor store, order status, Pakistani e-commerce, smooth process"
        />
        <meta name="author" content="Hibuyshopping Team" />
        <meta
          property="og:title"
          content="Cancel Order - Hibuyshopping | Easily Cancel Your Orders"
        />
        <meta
          property="og:description"
          content="Request to cancel your orders easily on Hibuyshopping. Use our Cancel Order page to provide reasons and manage your order status. Enjoy a seamless cancellation process on Pakistan's top e-commerce platform."
        />
        <meta
          property="og:image"
          content="https://hibuyshopping.com/help-center/cancel-order"
        />
        <meta property="og:url" content="https://hibuyshopping.com/help-center/cancel-order" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Cancel Order - Hibuyshopping | Easily Cancel Your Orders"
        />
        <meta
          name="twitter:description"
          content="Easily cancel your orders on Hibuyshopping. Visit our Cancel Order page to manage your order status, submit cancellation requests, and handle cancellations smoothly."
        />
        <meta
          name="twitter:image"
          content="https://hibuyshopping.com/help-center/cancel-order"
        />
      </Helmet>
      <HelpNav />
      <div className="form-container cancelOrderPage">
        <form className="cancellation-form" onSubmit={handleCancelOrder}>
          <h2 className="hd">Cancel Order</h2>
          <div className="form-group">
            <label htmlFor="orderId" className="sml-hd">
              Order ID
            </label>
            <input
              type="text"
              id="orderId"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="reason" className="sml-hd">
              Reason for Cancellation
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            ></textarea>
          </div>
          <Button type="submit" className="btn btn-blue btn-big w-100 mt-1">
            Cancel Order &nbsp; <TbShoppingCartCancel />
          </Button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </>
  );
};

export default OrderCancellationForm;
