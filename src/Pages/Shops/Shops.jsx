import React, { useEffect, useState } from "react";
import { fetchDataFromApi } from "../../utils/api";
import { Link } from "react-router-dom";
import ContinuousSnowfall from "../../Components/continuesSnowFall/ContinuesSnowfall";
import "./Shop.css";
import shopImg from "../../assets/images/shops.jpg";
import { Helmet } from "react-helmet-async";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { IoIosImages } from "react-icons/io";
import { CircularProgress } from "@mui/material";

const Shops = () => {
  const [shopData, setShopData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetchDataFromApi("/api/shop").then((res) => {
      setShopData(res);
      setIsLoading(false);
    });
  }, []);
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
        <title>Vendor Shops - Hibuyshopping | Explore Shops and Products from Multiple Vendors</title>
        <meta
          name="title"
          content="Vendor Shops - Hibuyshopping | Explore Shops and Products from Multiple Vendors"
        />
        <meta
          name="description"
          content="Discover a variety of shops and products from multiple vendors on Hibuyshopping. Explore different vendor shops, browse their offerings, and find unique products tailored to your preferences on Pakistan's leading e-commerce platform."
        />
        <meta
          name="keywords"
          content="vendor shops, Hibuyshopping, explore shops, multi-vendor stores, e-commerce vendors, shop listings, Pakistani e-commerce, vendor products, online shopping"
        />
        <meta name="author" content="Hibuyshopping Team" />
        <meta
          property="og:title"
          content="Vendor Shops - Hibuyshopping | Explore Shops and Products from Multiple Vendors"
        />
        <meta
          property="og:description"
          content="Browse a diverse range of vendor shops and products on Hibuyshopping. Explore offerings from various vendors and find unique items tailored to your interests. Experience the best of multi-vendor shopping on Pakistan's top e-commerce platform."
        />
        <meta
          property="og:image"
          content="https://hibuyshopping.com/shops"
        />
        <meta property="og:url" content="https://hibuyshopping.com/shops" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Vendor Shops - Hibuyshopping | Explore Shops and Products from Multiple Vendors"
        />
        <meta
          name="twitter:description"
          content="Explore different vendor shops and their unique products on Hibuyshopping. Discover a wide range of offerings from multiple vendors and enhance your shopping experience on Pakistan's leading e-commerce platform."
        />
        <meta
          name="twitter:image"
          content="https://hibuyshopping.com/shops"
        />
      </Helmet>
      <section className="shopPage">
        <div className="topImage">
          <ContinuousSnowfall />
          <h3 className="hd text-center">Welcome to Vender Stores</h3>
        </div>
        <div className="container">
          <div className="shopPageWrapper">
            {isLoading ? (
              <div className="product-skeleton">
                <Skeleton height={300} width={200} />
                <Skeleton height={20} width={150} />
                <Skeleton height={20} width={100} />
                <Skeleton height={20} width={50} />
              </div>
            ) : (
              shopData?.length !== 0 &&
              shopData?.map((shop, index) => {
                return (
                  <Link to={`/shops/${shop._id}`} key={index}>
                    <div className="item text-center cursor">
                      {isLoading ? (
                        <Skeleton
                          variant="rectangular"
                          width={100}
                          height={100}
                        >
                          <IoIosImages />
                        </Skeleton>
                      ) : (
                        <img
                          src={shopImg}
                          width={100}
                          height={100}
                          alt="shop"
                        />
                      )}
                    </div>
                    <h6 className="text-center shopHeading">
                      {shop?.name.length > 17
                        ? shop?.name.substr(0, 15) + "..."
                        : shop?.name}
                    </h6>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Shops;
