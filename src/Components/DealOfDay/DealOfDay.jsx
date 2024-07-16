import React, { useEffect, useState } from "react";
import { Button, Rating } from "@mui/material";
import "./dealOfDay.css";
import { fetchDataFromApi } from "../../utils/api";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const DealOfDay = () => {
  const [productsData, setProductsData] = useState([]);

  const discount = 80;
  useEffect(() => {
    fetchDataFromApi(`/api/products?discount=${discount}`).then((res) => {
      setProductsData(res?.products);
      console.log(res?.products);
    });
  }, []);
  return (
    <div className="product-featured">
      <div className="productFeaturedWrapper">
        {productsData?.length !== 0 && (
          <h2 className="title">Deal of the day</h2>
        )}
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {productsData?.length !== 0 &&
          productsData?.map((data, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="showcase-wrapper has-scrollbar">
                <div className="showcase-container">
                  <div className="showcase d-flex">
                    <div className="showcase-banner">
                      <img
                        src={data?.images[0]}
                        alt="shampoo conditionar"
                        className="showcase-img"
                      />
                    </div>
                    <div className="showcase-content">
                      <div className="showcase-rating">
                        <Rating
                          className="info-rating"
                          name="read-only"
                          value={data?.rating}
                          readOnly
                          size="small"
                          precision={0.5}
                        />
                      </div>
                      <a href="#">
                        <h3 className="showcase-title">{data?.name}</h3>
                      </a>
                      <p className="showcase-desc">{data?.description}</p>
                      <div className="price-box">
                        <p className="price">{data?.price}</p>
                        <del>{data?.oldPrice}</del>
                      </div>
                      <div className="showcase-status">
                        <div className="wrapper">
                          <p>
                            already sold: <b>20</b>
                          </p>
                          <p>
                            Avaliable: <b>40</b>
                          </p>
                        </div>
                        <div className="showcase-status-bar"></div>
                      </div>
                      <div className="countdown-box">
                        <p className="countdown-desc">
                          Hurry Up! Offer ends in:
                        </p>
                        <div className="countdown">
                          <div className="countdown-content">
                            <p className="display-number">360</p>
                            <p className="display-text">Days</p>
                          </div>
                          <div className="countdown-content">
                            <p className="display-number">24</p>
                            <p className="display-text">hours</p>
                          </div>
                          <div className="countdown-content">
                            <p className="display-number">59</p>
                            <p className="display-text">Min</p>
                          </div>
                          <div className="countdown-content">
                            <p className="display-number">03</p>
                            <p className="display-text">Sec</p>
                          </div>
                        </div>
                      </div>

                      <Button className="btn btn-blue btn-lg w-100">
                        add to cart
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
      </div>
    </div>
  );
};

export default DealOfDay;
