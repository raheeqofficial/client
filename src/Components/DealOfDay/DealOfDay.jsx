import React, { useContext, useEffect, useState } from "react";
import { Button, Rating } from "@mui/material";
import "./dealOfDay.css";
import { fetchDataFromApi } from "../../utils/api";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

const DealOfDay = () => {
  const [productsData, setProductsData] = useState([]);
  const [days, setDays] = useState(2);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const discount = 80;
  useEffect(() => {
    fetchDataFromApi(`/api/products?discount=${discount}`).then((res) => {
      setProductsData(res?.products);
      console.log(res?.products);
    });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + 2); // Add 2 days to the current date
      targetDate.setHours(0, 0, 0, 0); // Set target time to midnight

      const now = new Date();
      const distance = targetDate.getTime() - now.getTime();

      // Calculate remaining days, hours, minutes, and seconds
      setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((distance % (1000 * 60)) / 1000));

      if (distance < 0) {
        clearInterval(intervalId);
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const leadingZero = (num) => (num < 10 ? `0${num}` : num);
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
                  <Link to={`product/${data?.staticId}`}>
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
                            Avaliable: <b>{data?.countInStock}</b>
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
                            <p className="display-number">{days}</p>
                            <p className="display-text">Days</p>
                          </div>
                          <div className="countdown-content">
                            <p className="display-number">{leadingZero(hours)}</p>
                            <p className="display-text">hours</p>
                          </div>
                          <div className="countdown-content">
                            <p className="display-number">{leadingZero(minutes)}</p>
                            <p className="display-text">Min</p>
                          </div>
                          <div className="countdown-content">
                            <p className="display-number">{leadingZero(seconds)}</p>
                            <p className="display-text">Sec</p>
                          </div>
                        </div>
                      </div>

                      <Button className="btn btn-blue btn-lg w-100">
                        See more details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
                  </Link>
              </SwiperSlide>
            );
          })}
      </Swiper>
      </div>
    </div>
  );
};

export default DealOfDay;
