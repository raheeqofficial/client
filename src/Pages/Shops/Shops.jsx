import React, { useEffect, useState } from "react";
import { fetchDataFromApi } from "../../utils/api";
import { Link } from "react-router-dom";
import ContinuousSnowfall from "../../Components/continuesSnowFall/ContinuesSnowfall";
import './Shop.css'
import shopImg from '../../assets/images/shops.jpg'
import { Helmet } from "react-helmet-async";

const Shops = () => {
  const [shopData, setShopData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetchDataFromApi("/api/shop").then((res) => {
      setShopData(res);
      console.log(res)
      setIsLoading(false);
    });
  }, []);
  if (isLoading) {
    return (
      <div className="loaderContainer">
        <span class="loader"></span>
      </div>
    );
  }
  return (
    <>
    <Helmet>
    <title>Shops - EliphStore</title>
    
      <meta
        name="description"
        content="Experience the future of online shopping at Eliphstore, where innovation meets tradition. Support a global community of creators and entrepreneurs with every purchase. Shop smart, shop Eliphstore!."
      />
      <meta
        name="keywords"
        content="Shops, Eliphstore.com, online shopping website, online shop, online store website, clothing websites, online shopping sites, best online clothing stores, shopping websites, shopping sites, clothing online stores, best online shopping websites, good online clothing stores, store website, best online shopping sites, best online store, best online clothes shopping, clothes online, top online clothing stores, clothing store online shopping, website online shop, internet shopping sites, all online shopping websites, good online shopping sites, best online clothes shops, good online shops, online shops for clothes, good online shopping websites, top shopping sites, e-commerce store, online store, buy online, buy clothes online, online fashion store, discount shopping online, shop online for electronics, buy shoes online, women's clothes online, top-selling products online, online sale, e-store, online jewellery shopping, clothing sales online, cheap clothing brands, men's sale clothing, women's sale clothing, Eliphstore.com, multivendor online store, shopping needs, multivendor online store, clothing, footwear, fashion, kitchen accessories, latest fashion trends, home essentials, unique gifts, seamless shopping experience, customer service, variety of choices, multivendor marketplace, quality and variety, online shopping in Pakistan, newest fashion trends, renowned brands, seasonal collections, Pakistani brands, shawls, sweaters, t-shirts, caps, hoodies, sleeves, trousers, kurtas, kurtis, coats, shrugs, jackets, boots, sneakers, flats, high heels, khussa, stitched and unstitched clothes, chic accessories, jewelry, watches, scarves, hijabs, perfumes, hottest new arrivals, timeless style, modern trends, high-quality fashion wear, elegant dresses, stylish shoes, trendy handbags, top 10 online branded shopping sites, competitive prices, 24/7 service, fast delivery, effortless shopping,
       designer collections, seamless online shopping experience "
      />
    </Helmet>
      <section className="shopPage">
    <div className="topImage">
    <ContinuousSnowfall/>
    <h3 className="mb-3 hd text-center">Welcome to Vender Stores</h3>
    </div>
      <div className="container">
        <div className="shopPageWrapper">
          {shopData?.length !== 0 &&
            shopData?.map((shop, index) => {
              return (
                <Link to={`/shops/${shop._id}`} key={index}>
                  <div className="item text-center cursor">
                    <img
                      src={shopImg}
                      width={100}
                      height={100}
                      alt="shop"
                    />
                  </div>
                  <h6 className="text-center">
                    {shop?.name.length > 17
                      ? shop?.name.substr(0, 15) + "..."
                      : shop?.name}
                  </h6>
                </Link>
              );
            })}
        </div>
      </div>
    </section>
    </>
  );
};

export default Shops;
