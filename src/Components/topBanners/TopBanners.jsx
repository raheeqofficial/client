import React, { useEffect, useState } from "react";
import banner1 from "../../assets/images/banners/top-banner-1.jpg";
import banner2 from "../../assets/images/banners/top-banner-2.jpg";
import banner3 from "../../assets/images/banners/top-banner-3.jpg";
import "./topBanner.css";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";

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
        <div class="icon-boxes-container bg-transparent">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-8 col-12 icon-boxes">
                <div class="col-sm-6 col-lg-4">
                  <div class="icon-box icon-box-side">
                    <span class="icon-box-icon">
                      <i class="icon-truck"></i>
                    </span>

                    <div class="icon-box-content">
                      <h3 class="icon-box-title">Payment & Delivery</h3>
                      <p>Free shipping for orders over Rs 50</p>
                    </div>
                  </div>
                </div>

                <div class="col-sm-6 col-lg-4">
                  <div class="icon-box icon-box-side">
                    <span class="icon-box-icon">
                      <i class="icon-rotate-left"></i>
                    </span>

                    <div class="icon-box-content">
                      <h3 class="icon-box-title">Return & Refund</h3>
                      <p>Free 100% money back guarantee</p>
                    </div>
                  </div>
                </div>

                <div class="col-sm-6 col-lg-4">
                  <div class="icon-box icon-box-side">
                    <span class="icon-box-icon">
                      <i class="icon-headphones"></i>
                    </span>

                    <div class="icon-box-content">
                      <h3 class="icon-box-title">Quality Support</h3>
                      <p>Alway online feedback 24/7</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                    <Link to={``}>Men's</Link>
                  </h4>
                  <h3 className="banner-title">
                    <Link to={``}>
                      Summer
                      <br />
                      sale -70% off
                    </Link>
                  </h3>
                  <Link
                    to={``}
                    className="btn underline btn-outline-white-3 banner-link"
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
                  <h4 className="banner-subtitle">
                    <Link to={``}>Kid's</Link>
                  </h4>
                  <h3 className="banner-title">
                    <Link to={``}>
                      2024 Winter
                      <br />
                      up to 50% off
                    </Link>
                  </h3>
                  <Link to={``} className="btn underline banner-link">
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
                  <h4 className="banner-subtitle">
                    <Link to={``}>New in</Link>
                  </h4>
                  <h3 className="banner-title">
                    <Link to={``}>
                      Women’s
                      <br />
                      wear
                    </Link>
                  </h3>
                  <Link
                    to={``}
                    className="btn underline btn-outline-white-3 banner-link"
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
