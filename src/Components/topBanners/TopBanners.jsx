import React, { useEffect, useState } from "react";
import banner1 from "../../assets/images/banners/mens_wear.png";
import banner2 from "../../assets/images/banners/womens_wear.png";
import banner3 from "../../assets/images/banners/kids_wear.png";
import "./topBanner.css";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import topImg from '../../assets/images/Payment & Delivery.png'

const TopBanners = () => {
  const [id, setId] = useState("");
  useEffect(() => {
    const fetchId = () => {
      const newId = `${uuid()}${uuid()}`;
      setId(newId);
    };
    fetchId();
  }, []);
  return (
    <div className="page-wrapper topBanner">
      <main className="main">
        <div className="bg-transparent mb-2">
            <img src={topImg} alt="banner bottom img"/>
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="banner banner-overlay text-white">
                <Link to={`/products/listing?men`}>
                  <img src={banner1} alt="Banner" />
                </Link>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="banner banner-overlay color-grey">
                <Link to={`/products/listing?women`}>
                  <img src={banner2} alt="Banner" />
                </Link>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="banner banner-overlay text-white">
                <Link to={`/products/listing?kids`}>
                  <img src={banner3} alt="Banner" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TopBanners;
