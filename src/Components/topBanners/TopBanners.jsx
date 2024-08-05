import React, { useEffect, useState } from "react";
import banner1 from "../../assets/images/banners/top-banner-1.jpg";
import banner2 from "../../assets/images/banners/top-banner-2.jpg";
import banner3 from "../../assets/images/banners/top-banner-3.jpg";
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
        <div class="bg-transparent mb-2">
            <img src={topImg} alt="banner bottom img"/>
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="banner banner-overlay text-white">
                <Link to={``}>
                  <img src={banner1} alt="Banner" />
                </Link>

                <div className="banner-content banner-content-right">
                  <h4 className="banner-subtitle">
                  </h4>
                  <h3 className="top-banner-title">
                    <Link to={``}>
                      Mens wear
                      <br />
                      sale -70% off
                    </Link>
                  </h3>
                  <Link
                    to={``}
                    className="topBannerBtn"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="banner banner-overlay color-grey">
                <Link to={``}>
                  <img src={banner2} alt="Banner" />
                </Link>

                <div className="banner-content">
                  
                  <h3 className="top-banner-title">
                    <Link to={``}>
                      Kids wear
                      <br />
                      up to 50% off
                    </Link>
                  </h3>
                  <Link to={``} className="topBannerBtn">
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="banner banner-overlay text-white">
                <Link to={``}>
                  <img src={banner3} alt="Banner" />
                </Link>

                <div className="banner-content banner-content-right mr">
                  <h3 className="top-banner-title">
                    <Link to={``}>
                      Women’s
                      <br />
                      wear
                    </Link>
                  </h3>
                  <Link
                    to={``}
                    className="topBannerBtn"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TopBanners;
