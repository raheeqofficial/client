import React, { useState } from "react";
import axios from "axios";
import "./HelpCenter.css";
import { GiReturnArrow } from "react-icons/gi";
import { Button } from "@mui/material";
import { Helmet } from "react-helmet-async";

const ReturnOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const reasons = [
    "Defective product",
    "Wrong item received",
    "Product not as described",
    "Size issue",
    "Color issue",
    "Shipping damage",
    "Duplicate order",
    "Changed mind",
    "Other",
  ];
  const handleReturnRequest = async (e) => {
    e.preventDefault();
    const reason = selectedReason === "Other" ? customReason : selectedReason;
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/orders/return`,
        { orderId, reason }
      );
      setSuccess(response.data.message);
      setOrderId("");
      setSelectedReason("");
      setCustomReason("");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://hibuyshopping.com/help-center/return-order" />
        <title>
          Return Order - Hibuyshopping | Easy Order Returns and Exchanges
        </title>
        <meta
          name="title"
          content="Return Order - Hibuyshopping | Easy Order Returns and Exchanges"
        />
        <meta
          name="description"
          content="Request an order return on Hibuyshopping with ease. Use our Return Order page to initiate returns, provide reasons, and manage your order exchanges. Enjoy a hassle-free return process on Pakistan's leading e-commerce platform."
        />
        <meta
          name="keywords"
          content="return order, Hibuyshopping, order returns, order exchanges, easy returns, manage returns, e-commerce return process, Pakistani e-commerce, multi-vendor store, hassle-free returns"
        />
        <meta name="author" content="Hibuyshopping Team" />
        <meta property="og:url" content="https://hibuyshopping.com/help-center/return-order" />
      </Helmet>
      <div className="returnPage">
        <div className="container">
          <div className="returnDialog">
            <h1 className="hd">Request Return</h1>
            <form onSubmit={handleReturnRequest}>
              <div>
                <label htmlFor="orderId">Order ID:</label>
                <input
                  type="text"
                  id="orderId"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  required
                />
              </div>
              <div className="mt-1 select-container">
                <label htmlFor="returnReason">Reason for Return:</label>
                <select
                  className="select-box"
                  id="returnReason"
                  value={selectedReason}
                  onChange={(e) => setSelectedReason(e.target.value)}
                  required
                >
                  <option value="">Select a reason</option>
                  {reasons.map((reason, index) => (
                    <option key={index} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>
              </div>
              {selectedReason === "Other" && (
                <div className="mt-1">
                  <label htmlFor="customReason">Please specify:</label>
                  <textarea
                    id="customReason"
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    required
                  />
                </div>
              )}

              <Button type="submit" className="btn btn-blue btn-big w-100 mt-1">
                Request Return &nbsp; <GiReturnArrow />
              </Button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReturnOrder;
