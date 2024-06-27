import React from "react";
import { BsBox2 } from "react-icons/bs";
import { IoIosHeartEmpty } from "react-icons/io";
import { RiUserSettingsLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { LiaHandsHelpingSolid } from "react-icons/lia";

const MobileAccount = () => {
  return (
    <div className="mb-account">
      <div className="mb-account-heading">
      <h3>My Account</h3>
      </div>
      <div className="mb-wrapper">
        <Link to={""}>
          <div className="mb-box">
            <p>
              <RiUserSettingsLine />
            </p>
            <p>Account Setting</p>
          </div>
        </Link>
        <hr />
        <Link to={"/orders"}>
          <div className="mb-box">
            <p>
              <BsBox2 />
            </p>
            <p>My Orders</p>
          </div>
        </Link>
        <hr />
        <Link to={"/my-list"}>
          <div className="mb-box">
            <p>
              <IoIosHeartEmpty />
            </p>
            <p>My Wishlist</p>
          </div>
        </Link>
        <hr className="w-100" />
        <Link to={"/help-center"}>
          <div className="mb-box">
            <p>
              <LiaHandsHelpingSolid />
            </p>
            <p>Help Center</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MobileAccount;
