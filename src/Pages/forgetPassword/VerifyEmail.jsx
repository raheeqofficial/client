import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import { Helmet } from "react-helmet-async";
import { Button, CircularProgress } from "@mui/material";

const VerifyEmail = () => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const history = useNavigate();
  const context = useContext(MyContext);
  const [otp, setOtp] = useState();
  const [isLoading, setIsLoading] = useState(false)
  const inputs = useRef([]);


  const handleVerify = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("verify-email");
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
        history(`/user/reset-password?email=${email}`);
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
        <title>Verify Email - Hibuyshopping | Confirm Your Email Address</title>
        <meta
          name="description"
          content="Verify your email address to complete the registration process on Hibuyshopping. Follow the instructions sent to your email to confirm your account and start shopping with Pakistan's leading e-commerce platform."
        />
        <meta name="author" content="Hibuyshopping Team" />
      </Helmet>
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
        <Link to={'/user/forget-password'} className="go-back">
          Go back
        </Link>
      </div>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
