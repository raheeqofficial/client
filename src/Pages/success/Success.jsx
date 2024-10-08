import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { HiOutlineInboxStack } from "react-icons/hi2";
import { Helmet } from "react-helmet-async";
const Success = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token !== "" && token !== undefined && token !== null) {
      const userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>
          Order Placed Successfully - Hibuyshopping
        </title>
        <meta
          name="description"
          content="Your order has been successfully placed on Hibuyshopping! Thank you for shopping with us. You will receive a confirmation email shortly with the details of your order and tracking information. Enjoy your shopping experience on Pakistan's leading e-commerce platform."
        />
        <meta
          name="keywords"
          content="order placed successfully, Hibuyshopping, order confirmation, thank you for your order, e-commerce order, shopping experience, order details, tracking information, Pakistani e-commerce, multi-vendor store"
        />
        <meta name="author" content="Hibuyshopping Team" />
      </Helmet>
      <div className="successPage">
        <h1 className="hd">Thank you for your order</h1>
        <div className="successBox">
          <h5>ORDER CONFIRMATION</h5>
          <p>{user?.name} your order has been sucessful!</p>
          <p>
            Thank you for choosing <b>RG store</b>. You can check your order
            from here.
          </p>
          <Link to={"/orders"}>
            <Button className=" btn-blue btn-lg">
              <HiOutlineInboxStack /> &nbsp; My Orders
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Success;
