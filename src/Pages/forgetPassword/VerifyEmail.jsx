import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import { Helmet } from "react-helmet-async";

const VerifyEmail = () => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const history = useNavigate();
  const context = useContext(MyContext);

  const handleVerify = async () => {
    const email = localStorage.getItem("verify-email");
    if (!email) {
      setMessage("Email not found");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/verify-code/verify`,
        { email, code }
      );
      if (response.data.success === true) {
        context.setAlertBox({
          open: true,
          error: false,
          msg: "User verified successfully!",
        });
        history(`/user/reset-password?email=${email}`);
      } else if (response.data.success === false) {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage("Please enter valid verification code");
      console.error("Verification error:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Verify Email - Hibuyshopping | Confirm Your Email Address</title>
        <meta
          name="title"
          content="Verify Email - Hibuyshopping | Confirm Your Email Address"
        />
        <meta
          name="description"
          content="Verify your email address to complete the registration process on Hibuyshopping. Follow the instructions sent to your email to confirm your account and start shopping with Pakistan's leading e-commerce platform."
        />
        <meta
          name="keywords"
          content="verify email, Hibuyshopping, email confirmation, account activation, e-commerce registration, confirm email, multi-vendor store, secure account, registration process"
        />
        <meta name="author" content="Hibuyshopping Team" />
        <meta
          property="og:title"
          content="Verify Email - Hibuyshopping | Confirm Your Email Address"
        />
        <meta
          property="og:description"
          content="Complete your registration by verifying your email address on Hibuyshopping. Follow the steps in the email we sent to activate your account and start enjoying a seamless shopping experience."
        />
        <meta
          property="og:image"
          content="URL_TO_YOUR_VERIFY_EMAIL_PAGE_IMAGE"
        />
        <meta property="og:url" content="URL_TO_YOUR_VERIFY_EMAIL_PAGE" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Verify Email - Hibuyshopping | Confirm Your Email Address"
        />
        <meta
          name="twitter:description"
          content="Verify your email address to activate your Hibuyshopping account. Follow the instructions in the email we sent you to complete your registration and begin shopping on Pakistan's top e-commerce platform."
        />
        <meta
          name="twitter:image"
          content="URL_TO_YOUR_VERIFY_EMAIL_PAGE_IMAGE"
        />
      </Helmet>
      <div className="verify-container">
        <div className="verify-box">
          <h1>Verify it's You</h1>
          <p className="mb-1">Enter the verification code sent to your email</p>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter verification code"
            className="verify-input"
          />
          <button onClick={handleVerify} className="btn btn-blue w-100">
            Verify
          </button>
          {message && <p className="verify-message">{message}</p>}
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
