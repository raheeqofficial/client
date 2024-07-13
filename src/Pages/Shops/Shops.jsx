import React, { useEffect, useState } from "react";
import { fetchDataFromApi } from "../../utils/api";
import { Link } from "react-router-dom";
import ContinuousSnowfall from "../../Components/continuesSnowFall/ContinuesSnowfall";

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
    <section className="homeCat shopPage">
    <div className="topImage">
    <ContinuousSnowfall/>
    <h3 className="mb-3 hd text-center">Welcome to Raheeq Vender Stores</h3>
    </div>
      <div className="container">
        <div className="homeCatBox">
          {shopData?.length !== 0 &&
            shopData?.map((shop, index) => {
              return (
                <Link to={`/shops/${shop._id}`} key={index}>
                  <div className="item text-center cursor">
                    <img
                      src="https://img.icons8.com/officel/80/shop.png"
                      alt="shop"
                    />
                  </div>
                  <h6>
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
  );
};

export default Shops;
