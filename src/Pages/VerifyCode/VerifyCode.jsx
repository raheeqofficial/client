import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./OtpVerification.css";
import { MyContext } from "../../App";
import { Helmet } from "react-helmet-async";
import { Button, CircularProgress } from "@mui/material";

const VerifyPage = () => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const history = useNavigate();
  const context = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    context.setisHeaderFooterShow(true);
  }, []);

  const handleVerify = async (e) => {
    e.preventDefault()
    const email = localStorage.getItem("userEmail");
    if (!email) {
      setMessage("Email not found");
      return;
    }

    try {
      setIsLoading(true)
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/verify-code/verify`,
        { email, code }
      );
      setIsLoading(false)
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
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      setMessage("Please enter valid verification code");
      console.error("Verification error:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Verify Account - Hibuyshopping</title>
        <meta
          name="description"
          content="Verify your Hibuyshopping account to complete the registration process. Follow the instructions sent to your email or phone to confirm your account and start enjoying a personalized shopping experience."
        />
        <meta
          name="keywords"
          content="Hibuyshopping, account verification, complete registration, email verification, phone verification, secure account, multi-vendor store, e-commerce verification"
        />
        <meta name="author" content="Hibuyshopping Team" />
      </Helmet>
      {/* <div className="verify-container">
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
      </div> */}
      <div className="forgot-password-container-wrapper">
        <div className="overlay">
          
      <div className="forgot-password-container">
        <h2>Verify it's You</h2>
        <p>Enter the verification code sent to your email</p>
        <form className="forgot-password-form" onSubmit={handleVerify}>
          <input
            type="number"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter verification code"
            className="input-field"
            required
          />
          
          <Button type="submit" className="btn btn-blue w-100 btn-big">{
            isLoading ? <CircularProgress color="inherit" /> : "Verify Email"
            }</Button>
          {message && <p className="verify-message">{message}</p>}
        </form>
        <Link to={'/signUp'} className="go-back">
          Go back
        </Link>
      </div>
        </div>
      </div>
    </>
  );
};

export default VerifyPage;
