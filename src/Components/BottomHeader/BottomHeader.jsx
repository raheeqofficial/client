import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { IoBagHandleOutline, IoGridOutline, IoHomeOutline } from "react-icons/io5";
import { GrGrid } from "react-icons/gr";
import { IoMdCart } from "react-icons/io";
import { FaUser } from "react-icons/fa";

export default function BottomHeader() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
            <button className="action-btn">
                <IoHomeOutline/>
            </button>
            <button className="action-btn">
                <IoGridOutline/>
            </button>
            <button className="action-btn">
                <IoMdCart/>
                <span className="count">0</span>
            </button>
            <button className="action-btn">
                <FaUser/>
            </button>
        </div>
  );
}
