import React, { useContext, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import { Helmet } from "react-helmet-async";
import { Button, CircularProgress } from "@mui/material";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confPassword, setConfNewPassword] = useState("");
  const [message, setMessage] = useState("")
  const email = localStorage.getItem("verify-email");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const context = useContext(MyContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newPassword === "") {
        context.setAlertBox({
            open: true,
            color: "error",
            msg: "password can not be blank!"
        })
        return false;
    }
    
    if (confPassword === "") {
        context.setAlertBox({
            open: true,
            color: "error",
            msg: "confirm password can not be blank!"
        })
        return false;
    }
    
    if (confPassword !== newPassword) {
        context.setAlertBox({
            open: true,
            color: "error",
            msg: "password not match"
        })
        return false;
    }
      setIsLoading(true)
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/resetPassword`,
        { email, newPassword }
      );
      setIsLoading(false)
      context.setAlertBox({
        open: true,
        error: false,
        msg: "Password Reset successfully",
      });
      navigate("/signIn");
    } catch (error) {
      setIsLoading(false)
      context.setAlertBox({
        open: true,
        error: false,
        msg: error.response?.data?.msg || "Failed to reset password.",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Reset Password - Hibuyshopping | Recover Your Account Access</title>
        <meta
          name="description"
          content="Reset your password on Hibuyshopping to regain access to your account. Follow the instructions to securely update your password and continue enjoying a personalized shopping experience on Pakistan's leading e-commerce platform."
        />
        <meta
          name="keywords"
          content="reset password, Hibuyshopping, account recovery, password reset, secure password update, e-commerce account, recover access, Pakistani e-commerce, multi-vendor store"
        />
        <meta name="author" content="Hibuyshopping Team" />
      </Helmet>
      {/* <div className="verify-container">
        <div className="verify-box">
          <h1>Reset Password</h1>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="mb-1">
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                placeholder="Enter new password"
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="verify-input"
              />
            </div>
            <button type="submit" className="btn btn-blue w-100">
              Reset Password
            </button>
          </form>
        </div>
      </div> */}
      <div className="forgot-password-container-wrapper">
        <div className="overlay">
          
      <div className="forgot-password-container">
        <h2>Reset Password</h2>
        <p>Please enter the account that you want to reset the password.</p>
        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Password"
            className="input-field"
            required
          />
          <input
            type="text"
            value={confPassword}
            onChange={(e) => setConfNewPassword(e.target.value)}
            placeholder="Confirm Password"
            className="input-field"
            required
          />
          
          <Button type="submit" className="btn btn-blue w-100 btn-big">{
            isLoading ? <CircularProgress color="inherit" /> : "Reset Password"
            }</Button>
          {message && <p className="verify-message">{message}</p>}
        </form>
      </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
