import React, { useContext, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import { Helmet } from "react-helmet-async";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const location = useLocation();
  const email = localStorage.getItem("verify-email");
  const navigate = useNavigate();
  const context = useContext(MyContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/resetPassword`,
        { email, newPassword }
      );
      context.setAlertBox({
        open: true,
        error: false,
        msg: "Password Reset successfully",
      });
      navigate("/signIn");
    } catch (error) {
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
          name="title"
          content="Reset Password - Hibuyshopping | Recover Your Account Access"
        />
        <meta
          name="description"
          content="Reset your password on Hibuyshopping to regain access to your account. Follow the instructions to securely update your password and continue enjoying a personalized shopping experience on Pakistan's leading e-commerce platform."
        />
        <meta
          name="keywords"
          content="reset password, Hibuyshopping, account recovery, password reset, secure password update, e-commerce account, recover access, Pakistani e-commerce, multi-vendor store"
        />
        <meta name="author" content="Hibuyshopping Team" />
        <meta
          property="og:title"
          content="Reset Password - Hibuyshopping | Recover Your Account Access"
        />
        <meta
          property="og:description"
          content="Regain access to your Hibuyshopping account by resetting your password. Follow the secure process to update your password and continue enjoying a tailored shopping experience on Pakistan's top e-commerce platform."
        />
        <meta
          property="og:image"
          content="URL_TO_YOUR_RESET_PASSWORD_PAGE_IMAGE"
        />
        <meta property="og:url" content="URL_TO_YOUR_RESET_PASSWORD_PAGE" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Reset Password - Hibuyshopping | Recover Your Account Access"
        />
        <meta
          name="twitter:description"
          content="Update your password securely on Hibuyshopping to recover your account access. Follow the steps to reset your password and maintain a personalized shopping experience on Pakistan's leading e-commerce site."
        />
        <meta
          name="twitter:image"
          content="URL_TO_YOUR_RESET_PASSWORD_PAGE_IMAGE"
        />
      </Helmet>
      <div className="verify-container">
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
      </div>
    </>
  );
};

export default ResetPassword;
