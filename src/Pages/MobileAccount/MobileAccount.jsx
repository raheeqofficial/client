import React, { useContext, useEffect } from "react";
import { BsBox2 } from "react-icons/bs";
import { IoIosHeartEmpty } from "react-icons/io";
import { RiUserSettingsLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { LiaHandsHelpingSolid } from "react-icons/lia";
import { MyContext } from "../../App";
import { Button } from "@mui/material";

const MobileAccount = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const context = useContext(MyContext);
  return (
    <>
      {context.windowWidth < 768 && (
        <div className="mb-account">
          {context.isLogin === true ? (
            <>
              <div className="mb-account-heading">
                <h3 className="mb-0">My Account</h3>
              </div>
              <div className="mb-account-para">
                <p className="mb-0">Hello, Welcome to store</p>
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
            </>
          ) : (
            <div className="notLogin">
              <Link to={"/signIn"}>
                <Button className="btn btn-blue btn-big">LOGIN/SIGNUP</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MobileAccount;
