import React, { useContext, useState } from "react";
import axios from "axios";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@mui/material";
import "../VerifyCode/OtpVerification.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/forgotPassword`,
        { email }
      );
      context.setAlertBox({
        open: true,
        error: false,
        msg: "Verification email sending to your email",
      });
      localStorage.setItem("verify-email", email);
      navigate("/user/verify-email");
    } catch (error) {
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
        <title>Forgot Password - Hibuyshopping | Reset Your Account Password</title>

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
          property="og:title"
          content="Forgot Password - Hibuyshopping | Reset Your Account Password"
        />
        <meta
          property="og:description"
          content="Use Hibuyshopping's Forgot Password page to securely reset your account password. Enter your email to get instructions on how to regain access to your account and continue shopping seamlessly."
        />
        <meta
          property="og:image"
          content="https://hibuyshopping.com/user/forget-password"
        />
        <meta property="og:url" content="https://hibuyshopping.com/user/forget-password" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Forgot Password - Hibuyshopping | Reset Your Account Password"
        />
        <meta
          name="twitter:description"
          content="Recover your Hibuyshopping account by resetting your password. Enter your email to receive detailed instructions and regain access securely."
        />
        <meta
          name="twitter:image"
          content="https://hibuyshopping.com/user/forget-password"
        />
      </Helmet>
      <div className="verify-container">
        <div className="verify-box">
          <h1 className="">Forgot Password</h1>
          <p>
            Please enter the account email that you want to reset the password.
          </p>
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="verify-input"
              />
            </div>
            <Button type="submit" className="btn btn-blue w-100">
              Send Code
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
