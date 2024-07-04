import * as React from "react";
import { IoGridOutline, IoHomeOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { IoMdCart } from "react-icons/io";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";
import { CiShop } from "react-icons/ci";

export default function BottomMenu() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const context = React.useContext(MyContext);

  const handleClick = (index) => {
    setValue(index);
    context.setisHeaderFooterShow(true);
  };
  return (
    // <div className="botomHeader">
    //   <Tabs
    //     value={value}
    //     onChange={handleChange}
    //     aria-label="icon label tabs example"
    //   >
    //     <Tab icon={<PhoneIcon />} label="RECENTS" />
    //     <Tab icon={<FavoriteIcon />} label="FAVORITES" />
    //     <Tab icon={<PersonPinIcon />} label="NEARBY" />
    //   </Tabs>
    // </div>
    <div className="mobile-bottom-navigation">
      {/* <button className="action-btn" data-mobile-menu-open-btn>
                <PhoneIcon/>
            </button>
            <button className="action-btn">
                <IoBagHandleOutline/>
                <span className="count">0</span>
            </button> */}
      <Link to={"/"} onClick={() => handleClick(0)}>
        <button className="action-btn">
        <div className="flex1">
        <IoHomeOutline className={`${value === 0 ? "active" : "menu-btn"}`} />
            <p className={`${value === 0 ? "active" : "menu-btn"}`}>Home</p>
          </div>
        </button>
      </Link>
      <Link to={"/categories"} onClick={() => handleClick(1)}>
        <button className="action-btn">
        <div className="flex1">
        <IoGridOutline className={`${value === 1 ? "active" : "menu-btn"}`} />
            <p className={`${value === 1 ? "active" : "menu-btn"}`}>Category</p>
          </div>
        </button>
      </Link>
      <Link to={"/shops"} onClick={() => handleClick(2)}>
        <button className="action-btn">
          <div className="flex1">
            <CiShop
              style={{ fontSize: "30px" }}
              className={`${value === 2 ? "active" : "menu-btn"}`}
            />
            <p className={`${value === 2 ? "active" : "menu-btn"}`}>shops</p>
          </div>
        </button>
      </Link>
      <Link to={"/cart"} onClick={() => handleClick(3)}>
        <button className="action-btn">
        <div className="flex1">
        <IoMdCart className={`${value === 3 ? "active" : "menu-btn"}`} />
            <p className={`${value === 3 ? "active" : "menu-btn"}`}>Cart</p>
          </div>
          <span className="count">{context.cartData?.length}</span>
        </button>
      </Link>
      <Link
        to={context.isLogin === true ? "/account" : "/signIn"}
        onClick={() => handleClick(4)}
      >
        <button className="action-btn">
          <div className="flex1">
            <FiUser className={`${value === 4 ? "active" : "menu-btn"}`} />
            <p className={`${value === 4 ? "active" : "menu-btn"}`}>Account</p>
          </div>
        </button>
      </Link>
    </div>
  );
}
