import Sidebar from "../../Components/Sidebar";
import Button from "@mui/material/Button";
import { IoIosMenu } from "react-icons/io";
import { CgMenuGridR } from "react-icons/cg";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { FaAngleDown } from "react-icons/fa6";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useContext, useEffect, useState } from "react";
import ProductItem from "../../Components/ProductItem";
import Pagination from "@mui/material/Pagination";

import { Link, useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";
import { FaFilter } from "react-icons/fa";

import { MyContext } from "../../App";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { BsEmojiExpressionless } from "react-icons/bs";

const DiscountPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [productView, setProductView] = useState("four");
  const [productData, setProductData] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const openDropdown = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    let maxDiscount = 50;
    fetchDataFromApi(`/api/products?discount=${maxDiscount}`)
      .then((res) => {
        setProductData(res);
        setisLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setisLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="loaderContainer">
        <CircularProgress color="inherit" />
      </div>
    );
  }
  if (productData?.products?.length === 0) {
    return (
      <div className="not-ava-msg">
        <h6>
          Sorry, there are no products available in this category at the moment.
          Please check back later or explore other categories.
        </h6>
        <BsEmojiExpressionless />
        <Button className="btn btn-blue btn-lg mt-2">
          <Link to={"/"}>Back</Link>
        </Button>
      </div>
    );
  }
  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://hibuyshopping.com/products/flash-sale/4d9040da-a6ea-4ff0-8ceb-91e44dda3a25bf80965f-a231-4289-9805-c1f0ed86a73d" />
        <title>
          Exclusive 50% Discount - Hibuyshopping | Save Big on Top Brands in
          Pakistan
        </title>
        <meta
          name="title"
          content="Exclusive 50% Discount - Hibuyshopping | Save Big on Top Brands in Pakistan"
        />
        <meta
          name="description"
          content="Enjoy a massive 50% discount on selected products at Hibuyshopping! Shop now and save big on top brands across fashion, electronics, home goods, and more. Don't miss out on these limited-time offers available in Pakistan's leading multi-vendor e-commerce store."
        />
        <meta
          name="keywords"
          content="50% discount, Hibuyshopping, exclusive offers, online discounts, save big, fashion sale, electronics sale, home goods discount, top brands, limited-time offers, Pakistani e-commerce, multi-vendor store"
        />
        <meta name="author" content="Hibuyshopping Team" />
        <meta
          property="og:description"
          content="Unlock a 50% discount on selected products at Hibuyshopping! Shop now to take advantage of massive savings on top brands across various categories. Limited-time offer available at Pakistan's leading multi-vendor e-commerce platform."
        />
        <meta
          property="og:url"
          content="https://hibuyshopping.com/products/flash-sale/4d9040da-a6ea-4ff0-8ceb-91e44dda3a25bf80965f-a231-4289-9805-c1f0ed86a73d"
        />
      </Helmet>
      <section className="product_Listing_Page">
        <div className="container">
          <div className="productListing w-100">
            <div className="content_right">
              <div className="showBy mt-0 mb-3 d-flex align-items-center">
                <div className="d-flex align-items-center btnWrapper">
                  <Button className={"act"}>
                    <IoIosMenu />
                  </Button>
                  <Button className={"act"}>
                    <CgMenuGridR />
                  </Button>
                  <Button className={"act"}>
                    <TfiLayoutGrid4Alt />
                  </Button>
                </div>

                <div className="ml-auto showByFilter">
                  <Button onClick={handleClick}>
                    Show 9 <FaAngleDown />
                  </Button>
                  <Menu
                    className="w-100 showPerPageDropdown"
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={openDropdown}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={handleClose}>10</MenuItem>
                    <MenuItem onClick={handleClose}>20</MenuItem>
                    <MenuItem onClick={handleClose}>30</MenuItem>
                    <MenuItem onClick={handleClose}>40</MenuItem>
                    <MenuItem onClick={handleClose}>50</MenuItem>
                    <MenuItem onClick={handleClose}>60</MenuItem>
                  </Menu>
                </div>
              </div>

              <div className="productListing-data">
                {isLoading === true ? (
                  <div className="loading d-flex align-items-center justify-content-center">
                    <CircularProgress color="inherit" />
                  </div>
                ) : (
                  <>
                    {productData?.products?.map((item, index) => {
                      return (
                        <ProductItem
                          key={index}
                          itemView={productView}
                          item={item}
                        />
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DiscountPage;
