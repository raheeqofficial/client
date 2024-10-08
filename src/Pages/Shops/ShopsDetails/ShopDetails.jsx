import React, { useContext, useEffect, useState } from "react";
import { fetchDataFromApi } from "../../../utils/api";
import { useParams } from "react-router-dom";
import ProductItem from "../../../Components/ProductItem";
import { Box, Button, CircularProgress } from "@mui/material";
import { MyContext } from "../../../App";
import { FaSquareWhatsapp } from "react-icons/fa6";
import axios from "axios";
import "../Shop.css";
import { Helmet } from "react-helmet-async";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const ShopDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [filterData, setFilterData] = useState([]);
  const [subCat, setSubCat] = useState([]);
  const context = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState();
  const [shop, setShop] = useState(null);
  const [isFollowing, setIsFollowing] = useState(null);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    const cat = decodeURIComponent(subCat[newValue]?.subCat);
    setSelectedCat(cat);
  };

  const selectCat = (cat) => {
    setSelectedCat(cat);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);

    // Fetch all products
    fetchDataFromApi(`/api/products?shop=${id}`).then((res) => {
      setData(res.products);
      setFilterData(res.products);
      setIsLoading(false);
    });

    // Fetch subcategories
    fetchDataFromApi(`/api/subCat?shop=${id}`).then((res) => {
      setSubCat(res.subCatList);
      setIsLoading(false);
    });
  }, [id]);

  useEffect(() => {
    const fetchShopDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/shop/${id}`
        );
        setShop(response.data);
      } catch (error) {
        console.error("Error fetching shop details", error);
      }
    };

    const checkIfFollowing = async () => {
      if (context.isLogin === true) {
        const { userId } = JSON.parse(localStorage.getItem("user"));
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/user/${userId}`
          );
          const followedShops = response.data.followedShops.map(
            (shop) => shop._id
          );
          console.log(followedShops);
          setIsFollowing(followedShops.includes(id));
        } catch (error) {
          console.error("Error checking if following", error);
        }
      }
    };

    const storedIsFollowing = localStorage.getItem("isFollowingShop-" + id);
    setIsFollowing(storedIsFollowing === "true");
    checkIfFollowing();

    fetchShopDetails();
  }, [id]);

  const handleFollow = async () => {
    if (context.isLogin === true) {
      const { userId } = JSON.parse(localStorage.getItem("user"));
      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/user/follow/${id}`,
          { userId }
        );
        setIsFollowing(true);
        setShop((prevShop) => ({
          ...prevShop,
          followersCount: prevShop.followersCount + 1,
        }));
        localStorage.setItem("isFollowingShop-" + id, true);
      } catch (error) {
        console.error("Error following shop", error);
      }
    } else {
      context.setAlertBox({
        open: true,
        error: true,
        msg: "You need to login first",
      });
    }
  };

  const handleUnfollow = async () => {
    const { userId } = JSON.parse(localStorage.getItem("user"));
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/unfollow/${id}`,
        { userId }
      );
      setIsFollowing(false);
      setShop((prevShop) => ({
        ...prevShop,
        followersCount: prevShop.followersCount - 1,
      }));
      localStorage.removeItem("isFollowingShop-" + id);
    } catch (error) {
      console.error("Error unfollowing shop", error);
    }
  };

  const handleWhatsAppClick = () => {
    if (shop?.whatsappNumber) {
      const whatsappURL = `https://wa.me/${shop.whatsappNumber}?text=Hello, I'm interested in your products!`;
      window.open(whatsappURL, "_blank");
    } else {
      console.error("Shop's WhatsApp number not found");
    }
  };

  useEffect(() => {
    if (selectedCat !== null) {
      const encodedCategory = encodeURIComponent(selectedCat);
      setIsLoading(true);
      fetchDataFromApi(
        `/api/products?shop=${id}&subCatName=${encodedCategory}`
      ).then((res) => {
        setFilterData(res.products);
        setIsLoading(false);
      });
    } else {
      // Reset filterData when no category is selected
      setFilterData(data);
    }
  }, [selectedCat, id, data]);

  if (isLoading) {
    return (
      <div className="loaderContainer">
        <CircularProgress color="inherit" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
      <link rel="canonical" href="https://hibuyshopping.com/shops/:id" />
        <title>{`${shop?.name} - Hibuyshopping | ${shop?.name}`}</title>
        <meta
          name="description"
          content={`Explore the details of the ${shop?.name} on Hibuyshopping. Discover the shop's unique products, special offers, and more. Learn about the vendor's offerings and browse their collection to find what you're looking for on Pakistan's leading e-commerce platform.`}
        />
        <meta
          name="keywords"
          content={`vendor shop detail, Hibuyshopping, ${shop?.name}, vendor products, shop offers, shop details, multi-vendor store, e-commerce vendor, Pakistani e-commerce, online shopping`}
        />
        <meta name="author" content="Hibuyshopping Team" />
        <meta property="og:url" content="https://hibuyshopping.com/shops/:id" />
      </Helmet>
      <div className="shopDetailPage">
        <div className="topImage">
          <div className="topImgWrapper">
            <div className="vendorContainer">
              <div className="vendorWrapper">
                <div className="vendorImgBox">
                  <img
                    width="40"
                    height="40"
                    src="https://img.icons8.com/skeuomorphism/40/shop.png"
                    alt="shop"
                  />
                </div>
                <div className="vendorTextBox">
                  <p className="pb-0">{shop?.name}</p>
                  <div className="d-flex">
                    <p className="pb-0 pr-2">Vendor Store</p> |
                    <p className="pl-2">{shop?.followersCount} followers</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="shopButtons">
              <Button className="whatsApp" onClick={handleWhatsAppClick}>
                <FaSquareWhatsapp />
              </Button>
              {isFollowing === true ? (
                <Button onClick={handleUnfollow} className={"unfollow"}>
                  Following
                </Button>
              ) : (
                <Button onClick={handleFollow} className={"follow"}>
                  Follow
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="container">
          <div className="popularProducts">
            <div className="catTabs mt-4">
              <div className="catTabsName">
                <div
                  onChange={handleChange}
                  value={value}
                  className="category-container-tabs"
                >
                  {subCat?.map((item, index) => {
                    const decodedCat = decodeURIComponent(item?.subCat);
                    return (
                      <div
                        key={index}
                        onClick={() => selectCat(decodedCat)}
                        className={`category-item-tab ${
                          selectedCat === decodedCat ? "active" : ""
                        }`}
                      >
                        {decodedCat}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="product_row productRow2 w-100 mt-2 mb-3">
              {filterData.length > 0 ? (
                filterData
                  .slice(0)
                  .reverse()
                  .map((item, index) => <ProductItem key={index} item={item} />)
              ) : (
                <div className="no-products-message">
                  No products available for this category.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopDetails;
