import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineInboxStack } from "react-icons/hi2";

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
    <div className="successPage">
      <h1 className="hd">Thank you for your order</h1>
        <div className="successBox">
            <h5>ORDER CONFIRMATION</h5>
            <p>{user?.name} your order has been sucessful!</p>
            <p>Thank you for choosing <b>RG store</b>. You can check your order from here.</p>
            <Link to={'/orders'}><Button className=" btn-blue btn-lg"><HiOutlineInboxStack/> &nbsp; My Orders</Button></Link>
        </div>
    </div>
  );
};

export default Success;
