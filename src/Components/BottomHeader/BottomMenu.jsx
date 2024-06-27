import * as React from "react";
import { IoBagHandleOutline, IoGridOutline, IoHomeOutline } from "react-icons/io5";
import { GrGrid } from "react-icons/gr";
import { FiUser } from "react-icons/fi";
import { IoMdCart } from "react-icons/io";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";

export default function BottomMenu() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const context = React.useContext(MyContext)

  const handleClick = (index) => {
    setValue(index)
    context.setisHeaderFooterShow(true)
  }
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
            <Link to={'/'}onClick={() => handleClick(0)}>
            <button className="action-btn">
                <IoHomeOutline  className={`${value === 0 ? 'active' : 'menu-btn'}`} />
            </button>
            </Link>
            <Link to={'/categories'} onClick={()=>handleClick(1)}>
            <button className="action-btn">
                <IoGridOutline className={`${value === 1 ? 'active' : 'menu-btn'}`}/>
            </button>
            </Link>
            <Link to={'/cart'} onClick={()=>handleClick(2)}>
            <button className="action-btn">
                <IoMdCart className={`${value === 2 ? 'active' : 'menu-btn'}`}/>
                <span className="count">{context.cartData?.length}</span>
            </button>
            </Link>
            <Link to={context.isLogin === true ? '/account' : '/signIn'} onClick={()=>handleClick(3)}>
            <button className="action-btn">
                <FiUser className={`${value === 3 ? 'active' : 'menu-btn'}`}/>
            </button>
            </Link>
        </div>
  );
}
