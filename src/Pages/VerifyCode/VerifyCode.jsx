import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./OtpVerification.css";
import { MyContext } from "../../App";
import { Helmet } from "react-helmet-async";

const VerifyPage = () => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const history = useNavigate();
  const context = useContext(MyContext);

  useEffect(() => {
    context.setisHeaderFooterShow(true);
  }, []);

  const handleVerify = async () => {
    const email = localStorage.getItem("userEmail");
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
        // Redirect to another page or perform other actions
        history("/signIn");
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
        <title>
          Verify Account - Hibuyshopping | Complete Your Account Verification
        </title>
        <meta
          name="title"
          content="Verify Account - Hibuyshopping | Complete Your Account Verification"
        />
        <meta
          name="description"
          content="Verify your Hibuyshopping account to complete the registration process. Follow the instructions sent to your email or phone to confirm your account and start enjoying a personalized shopping experience."
        />
        <meta
          name="keywords"
          content="verify account, Hibuyshopping, account verification, complete registration, email verification, phone verification, secure account, multi-vendor store, e-commerce verification"
        />
        <meta name="author" content="Hibuyshopping Team" />
        <meta
          property="og:title"
          content="Verify Account - Hibuyshopping | Complete Your Account Verification"
        />
        <meta
          property="og:description"
          content="Finalize your Hibuyshopping registration by verifying your account. Follow the verification instructions sent to your email or phone to activate your account and begin a personalized shopping journey."
        />
        <meta
          property="og:image"
          content="URL_TO_YOUR_VERIFY_ACCOUNT_PAGE_IMAGE"
        />
        <meta property="og:url" content="URL_TO_YOUR_VERIFY_ACCOUNT_PAGE" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Verify Account - Hibuyshopping | Complete Your Account Verification"
        />
        <meta
          name="twitter:description"
          content="Complete your Hibuyshopping account verification by following the instructions sent to your email or phone. Activate your account and enjoy a personalized shopping experience."
        />
        <meta
          name="twitter:image"
          content="URL_TO_YOUR_VERIFY_ACCOUNT_PAGE_IMAGE"
        />
      </Helmet>
      <div className="verify-container">
        <div className="verify-box">
          <h1>Verify it's You</h1>
          <p className="mb-4">Enter the verification code sent to your email</p>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter verification code"
            className="verify-input"
          />
          <button onClick={handleVerify} className="verify-button">
            Verify
          </button>
          {message && <p className="verify-message">{message}</p>}
        </div>
      </div>
    </>
  );
};

export default VerifyPage;
