import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { MyContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button, CircularProgress } from "@mui/material";
import "../VerifyCode/OtpVerification.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const context = useContext(MyContext);
  const navigate = useNavigate();
  useEffect(() => {
    context.setisHeaderFooterShow(true)
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/forgotPassword`,
        { email }
      );
      setIsLoading(false)
      context.setAlertBox({
        open: true,
        error: false,
        msg: "Verification email sending to your email",
      });
      localStorage.setItem("verify-email", email);
      navigate("/user/verify-email");
    } catch (error) {
      setIsLoading(false)
      context.setAlertBox({
        open: true,
        error: false,
        msg: error.response?.data?.msg || "Failed to send reset email.",
      });
    }
  };

  return (
    <>
      <Helmet>
      <link rel="canonical" href="https://hibuyshopping.com/user/forget-password" />
        <title>
          Forgot Password - Hibuyshopping | Reset Your Account Password
        </title>

        <meta
          name="title"
          content="Forgot Password - Hibuyshopping | Reset Your Account Password"
        />
        <meta
          name="description"
          content="Recover access to your Hibuyshopping account with our Forgot Password page. Enter your email to receive instructions for resetting your password and regain access to your account securely."
        />
        <meta
          name="keywords"
          content="forgot password, Hibuyshopping, password reset, account recovery, e-commerce, multi-vendor store, secure login, account access, password recovery, reset password instructions"
        />
        <meta name="author" content="Hibuyshopping Team" />
        <meta
          property="og:url"
          content="https://hibuyshopping.com/user/forget-password"
        />
      </Helmet>
      <div className="forgot-password-container-wrapper">
        <div className="overlay">
          
      <div className="forgot-password-container">
        <h2>Forgot your password?</h2>
        <p>Please enter the account that you want to reset the password.</p>
        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Please enter your Email"
            className="input-field"
            required
          />
          
          <Button type="submit" className="btn btn-blue w-100 btn-big">{
            isLoading ? <CircularProgress color="inherit" /> : "Send Code"
            }</Button>
        </form>
        <Link to={'/signIn'} className="go-back">
          Go back
        </Link>
      </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
