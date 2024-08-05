import React, { useContext, useEffect, useState } from "react";
import { Button, Rating } from "@mui/material";
import "./dealOfDay.css";
import { fetchDataFromApi } from "../../utils/api";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import banner from "../../assets/images/banner-5.jpg";
import deal from "../../assets/images/product-1.jpg";

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
      setHours(
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      );
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
    // <div className="product-featured">
    //   <div className="productFeaturedWrapper">
    //     {productsData?.length !== 0 && (
    //       <h2 className="title">Deal of the day</h2>
    //     )}
    // <Swiper
    //   slidesPerView={1}
    //   spaceBetween={0}
    //   navigation={true}
    //   modules={[Navigation]}
    //   className="mySwiper"
    // >
    //     {productsData?.length !== 0 &&
    //       productsData?.map((data, index) => {
    //         return (
    //           <SwiperSlide key={index}>
    //               <Link to={`product/${data?.staticId}`}>
    //               <div className="showcase-wrapper has-scrollbar">
    //             <div className="showcase-container">
    //               <div className="showcase d-flex">
    //                 <div className="showcase-banner">
    //                   <img
    //                     src={data?.images[0]}
    //                     alt="shampoo conditionar"
    //                     className="showcase-img"
    //                   />
    //                 </div>
    //                 <div className="showcase-content">
    //                   <div className="showcase-rating">
    //                     <Rating
    //                       className="info-rating"
    //                       name="read-only"
    //                       value={data?.rating}
    //                       readOnly
    //                       size="small"
    //                       precision={0.5}
    //                     />
    //                   </div>
    //                   <a href="#">
    //                     <h3 className="showcase-title">{data?.name}</h3>
    //                   </a>
    //                   <p className="showcase-desc">{data?.description}</p>
    //                   <div className="price-box">
    //                     <p className="price">{data?.price}</p>
    //                     <del>{data?.oldPrice}</del>
    //                   </div>
    //                   <div className="showcase-status">
    //                     <div className="wrapper">
    //                       <p>
    //                         already sold: <b>20</b>
    //                       </p>
    //                       <p>
    //                         Avaliable: <b>{data?.countInStock}</b>
    //                       </p>
    //                     </div>
    //                     <div className="showcase-status-bar"></div>
    //                   </div>
    //                   <div className="countdown-box">
    //                     <p className="countdown-desc">
    //                       Hurry Up! Offer ends in:
    //                     </p>
    // <div className="countdown">
    //   <div className="countdown-content">
    //     <p className="display-number">{days}</p>
    //     <p className="display-text">Days</p>
    //   </div>
    //   <div className="countdown-content">
    //     <p className="display-number">{leadingZero(hours)}</p>
    //     <p className="display-text">hours</p>
    //   </div>
    //   <div className="countdown-content">
    //     <p className="display-number">{leadingZero(minutes)}</p>
    //     <p className="display-text">Min</p>
    //   </div>
    //   <div className="countdown-content">
    //     <p className="display-number">{leadingZero(seconds)}</p>
    //     <p className="display-text">Sec</p>
    //   </div>
    // </div>
    //                   </div>

    //                   <Button className="btn btn-blue btn-lg w-100">
    //                     See more details
    //                   </Button>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //               </Link>
    //           </SwiperSlide>
    //         );
    //       })}
    //   </Swiper>
    //   </div>
    // </div>
    <div className="page-wrapper dealDay">
      <main className="main">
        <div className="bg-light deal-container pt-3">
          <div className="container">
            <div className="row">
              {/* <div className="col-lg-9">
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
                          
                          <div className="deal">
                            <div className="deal-content">
                              <h4>Limited Quantities</h4>
                              <h2>Deal of the Day</h2>

                              <h3 className="product-title">
                                <Link to={`product/${data?.staticId}`}>{data?.name}</Link>
                              </h3>

                              <div className="product-price">
                                <span className="new-price">Rs {data?.price}</span>
                                <span className="old-price">Was Rs {data?.oldPrice}</span>
                              </div>

                              <div
                                className="deal-countdown"
                                data-until="+10h"
                              ></div>

                              <Link to={`product/${data?.staticId}`} className="btn btn-primary">
                                <span>Shop Now</span>
                                <i className="icon-long-arrow-right"></i>
                              </Link>
                            </div>
                            <div className="deal-image">
                              <Link to={`product/${data?.staticId}`}>
                                <img
                                  src={data?.images[0]}
                                  alt={data?.name}
                                />
                              </Link>
                            </div>
                          </div>
                          
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
              </div> */}
              <div class="col-lg-9">
                <div class="deal">
                  <div class="deal-content">
                    <h4 className="blue-color">Limited Quantities</h4>
                    <h2>Deal of the Day</h2>

                    <h3 class="product-title">
                      <Link to="#">Rocking Chair</Link>
                    </h3>

                    <div class="product-price">
                      <span class="new-price">Rs 1949.00</span>
                      <span class="old-price">Was Rs 5940.00</span>
                    </div>

                    <div class="deal-countdown" data-until="+10h">
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
                          <p className="display-number">
                            {leadingZero(minutes)}
                          </p>
                          <p className="display-text">Min</p>
                        </div>
                        <div className="countdown-content">
                          <p className="display-number">
                            {leadingZero(seconds)}
                          </p>
                          <p className="display-text">Sec</p>
                        </div>
                      </div>
                    </div>

                    <Link to="#" class="btn btn-outline-gray banner-link">
                      <span>Shop Now</span>
                      <i class="icon-long-arrow-right"></i>
                    </Link>
                  </div>
                  <div class="deal-image">
                    <a href="product.html">
                      <img src={deal} alt="image" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-3">
                <div className="banner banner-overlay banner-overlay-light text-center d-none d-lg-block">
                  <a href="#">
                    <img src={banner} alt="Banner" />
                  </a>

                  <div className="banner-content banner-content-top banner-content-center">
                    <h4 className="banner-subtitle">The Best Choice</h4>
                    <h3 className="banner-title">Wicker Loom Chair</h3>
                    <div className="banner-text text-primary">Rs 1149.99</div>
                    <Link to="#" className="btn btn-outline-gray banner-link">
                      Shop Now<i className="icon-long-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DealOfDay;
