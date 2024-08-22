import React, { useEffect } from "react";
import "./About.css";
import "./css/style.css";
import about1 from "../../assets/images/about/img-1.jpg";
import about2 from "../../assets/images/about/img-2.jpg";
import brand1 from "../../assets/images/brands/1.png";
import brand2 from "../../assets/images/brands/2.png";
import brand3 from "../../assets/images/brands/3.png";
import brand4 from "../../assets/images/brands/4.png";
import brand5 from "../../assets/images/brands/5.png";
import brand6 from "../../assets/images/brands/6.png";
import brand7 from "../../assets/images/brands/7.png";
import brand8 from "../../assets/images/brands/8.png";
import brand9 from "../../assets/images/brands/9.png";
import team1 from "../../assets/images/team/member-1.jpg";
import team2 from "../../assets/images/team/member-2.jpg";
import team3 from "../../assets/images/team/member-3.jpg";
import user1 from "../../assets/images/testimonials/user-1.jpg";
import user2 from "../../assets/images/testimonials/user-2.jpg";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://hibuyshopping.com/about-us" />
        <title>
          About Us - Hibuyshopping: Pakistan's Premier Multi-Vendor E-Commerce
          Store
        </title>
        <meta
          name="title"
          content="About Us - Hibuyshopping: Pakistan's Premier Multi-Vendor E-Commerce Store"
        />
        <meta
          name="description"
          content="Learn more about Hibuyshopping, Pakistan's leading multi-vendor e-commerce platform. Discover our mission, vision, and the team behind the best online shopping experience in Pakistan."
        />
        <meta
          name="keywords"
          content="about Hibuyshopping, Hibuyshopping mission, Hibuyshopping vision, online shopping Pakistan, e-commerce Pakistan, multi-vendor platform, Pakistani online marketplace, online shopping store, Hibuyshopping team"
        />
        <meta name="author" content="Hibuyshopping Team" />
        <meta
          property="og:description"
          content="At Hibuyshopping, we aim to provide the best online shopping experience in Pakistan. Learn about our journey, our values, and what makes us the top choice for millions of shoppers."
        />
        <meta property="og:url" content="https://hibuyshopping.com/about-us" />
      </Helmet>

      <div className="page-wrapper">
        <main className="main">
          <div className="container">
            <div className="page-header page-header-big text-center">
              <h1 className="page-title text-white">
                About us<span className="text-white">Who we are</span>
              </h1>
            </div>
          </div>
          <div className="page-content pb-0">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 mb-3 mb-lg-0">
                  <h2 className="title">Our Vision</h2>
                  <p>
                    Our vision is to become the leading multi-vendor e-commerce
                    platform, offering a diverse range of quality products at
                    competitive prices while providing an exceptional shopping
                    experience.{" "}
                  </p>
                </div>

                <div className="col-lg-6">
                  <h2 className="title">Our Mission</h2>
                  <p>
                    Our mission is to empower sellers to reach a global audience
                    and provide customers with a seamless shopping experience,
                    featuring a wide selection of products, secure payment
                    methods, and reliable customer service.
                  </p>
                </div>
              </div>

              <div className="mb-5"></div>
            </div>

            <div className="bg-light-2 pt-6 pb-5 mb-4">
              <div className="container">
                <div className="row">
                  <div className="col-lg-5 mb-3 mb-lg-0">
                    <h2 className="title">Who We Are</h2>
                    <p className="mb-2">
                      Welcome to HiBuyShopping, your ultimate destination for a
                      diverse and exciting online shopping experience. At
                      HiBuyShopping, we are more than just an e-commerce
                      platform; we are a community dedicated to bringing you the
                      best products from a variety of vendors all in one place.
                    </p>

                    <Link
                      to={""}
                      className="btn btn-sm btn-minwidth btn-outline-primary-2"
                    >
                      <span>VIEW OUR NEWS</span>
                      <i className="icon-long-arrow-right"></i>
                    </Link>
                  </div>

                  <div className="col-lg-6 offset-lg-1">
                    <div className="about-images">
                      <img src={about1} alt="" className="about-img-front" />
                      <img src={about2} alt="" className="about-img-back" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container">
              {/* <div className="row">
              <div className="col-lg-5">
                <div className="brands-text">
                  <h2 className="title">
                    The world's premium design brands in one destination.
                  </h2>
                  <p>
                    Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In
                    nisi neque, aliquet vel, dapibus id, mattis vel, nis
                  </p>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="brands-display">
                  <div className="row justify-content-center">
                    <div className="col-6 col-sm-4">
                      <a href="#" className="brand">
                        <img src={brand1} alt="Brand Name" />
                      </a>
                    </div>

                    <div className="col-6 col-sm-4">
                      <a href="#" className="brand">
                        <img src={brand2} alt="Brand Name" />
                      </a>
                    </div>

                    <div className="col-6 col-sm-4">
                      <a href="#" className="brand">
                        <img src={brand3} alt="Brand Name" />
                      </a>
                    </div>

                    <div className="col-6 col-sm-4">
                      <a href="#" className="brand">
                        <img src={brand4} alt="Brand Name" />
                      </a>
                    </div>

                    <div className="col-6 col-sm-4">
                      <a href="#" className="brand">
                        <img src={brand5} alt="Brand Name" />
                      </a>
                    </div>

                    <div className="col-6 col-sm-4">
                      <a href="#" className="brand">
                        <img src={brand6} alt="Brand Name" />
                      </a>
                    </div>

                    <div className="col-6 col-sm-4">
                      <a href="#" className="brand">
                        <img src={brand7} alt="Brand Name" />
                      </a>
                    </div>

                    <div className="col-6 col-sm-4">
                      <a href="#" className="brand">
                        <img src={brand8} alt="Brand Name" />
                      </a>
                    </div>

                    <div className="col-6 col-sm-4">
                      <a href="#" className="brand">
                        <img src={brand9} alt="Brand Name" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

              {/* <hr className="mt-4 mb-6" /> */}

              <h2 className="title text-center mb-4">Meet Our Team</h2>

              <div className="row">
                <div className="col-md-4">
                  <div className="member member-anim text-center">
                    <figure className="member-media">
                      <img src={team2} alt="member photo" />

                      <figcaption className="member-overlay">
                        <div className="member-overlay-content">
                          <h3 className="member-title">
                            Raheeq Gill<span>Founder & CEO</span>
                          </h3>
                          <p>
                            Sed pretium, ligula sollicitudin viverra, tortor
                            libero sodales leo, eget blandit nunc.
                          </p>
                          <div className="social-icons social-icons-simple">
                            <a
                              href="#"
                              className="social-icon"
                              title="Facebook"
                              target="_blank"
                            >
                              <i className="icon-facebook-f"></i>
                            </a>
                            <a
                              href="#"
                              className="social-icon"
                              title="Twitter"
                              target="_blank"
                            >
                              <i className="icon-twitter"></i>
                            </a>
                            <a
                              href="#"
                              className="social-icon"
                              title="Instagram"
                              target="_blank"
                            >
                              <i className="icon-instagram"></i>
                            </a>
                          </div>
                        </div>
                      </figcaption>
                    </figure>
                    <div className="member-content">
                      <h3 className="member-title">
                        Raheeq Gill<span>Founder & CEO</span>
                      </h3>
                    </div>
                  </div>
                </div>

                {/* <div className="col-md-4">
                            <div className="member member-anim text-center">
                                <figure className="member-media">
                                    <img src={team2} alt="member photo"/>

                                    <figcaption className="member-overlay">
                                        <div className="member-overlay-content">
                                            <h3 className="member-title">Basit Ali<span>CFO & BUSINESS PARTNER</span></h3>
                                            <p>Sed pretium, ligula sollicitudin viverra, tortor libero sodales leo, eget blandit nunc.</p> 
                                            <div className="social-icons social-icons-simple">
                                                <a href="#" className="social-icon" title="Facebook" target="_blank"><i className="icon-facebook-f"></i></a>
                                                <a href="#" className="social-icon" title="Twitter" target="_blank"><i className="icon-twitter"></i></a>
                                                <a href="#" className="social-icon" title="Instagram" target="_blank"><i className="icon-instagram"></i></a>
                                            </div>
                                        </div>
                                    </figcaption>
                                </figure>
                                <div className="member-content">
                                    <h3 className="member-title">Basit Ali<span>CFO & Business Partner</span></h3>
                                </div>
                            </div>
                        </div> */}

                <div className="col-md-4">
                  <div className="member member-anim text-center">
                    <figure className="member-media">
                      <img src={team2} alt="member photo" />

                      <figcaption className="member-overlay">
                        <div className="member-overlay-content">
                          <h3 className="member-title">
                            Moin Haider<span>SALES & MEDIA PARTNER</span>
                          </h3>
                          <p>
                            Sed pretium, ligula sollicitudin viverra, tortor
                            libero sodales leo, eget blandit nunc.
                          </p>
                          <div className="social-icons social-icons-simple">
                            <a
                              href="#"
                              className="social-icon"
                              title="Facebook"
                              target="_blank"
                            >
                              <i className="icon-facebook-f"></i>
                            </a>
                            <a
                              href="#"
                              className="social-icon"
                              title="Twitter"
                              target="_blank"
                            >
                              <i className="icon-twitter"></i>
                            </a>
                            <a
                              href="#"
                              className="social-icon"
                              title="Instagram"
                              target="_blank"
                            >
                              <i className="icon-instagram"></i>
                            </a>
                          </div>
                        </div>
                      </figcaption>
                    </figure>
                    <div className="member-content">
                      <h3 className="member-title">
                        Moin Haider<span>Media Partner</span>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-2"></div>

            <div className="about-testimonials bg-light-2 pt-6 pb-6">
              <div className="container">
                <h2 className="title text-center mb-3">
                  What Customer Say About Us
                </h2>

                <div
                  className="owl-carousel owl-simple owl-testimonials-photo"
                  data-toggle="owl"
                  data-owl-options='{
                                "nav": false, 
                                "dots": true,
                                "margin": 20,
                                "loop": false,
                                "responsive": {
                                    "1200": {
                                        "nav": true
                                    }
                                }
                            }'
                >
                  <blockquote className="testimonial text-center">
                    <img src={user1} alt="user" />
                    <p>
                      “ Lorem ipsum dolor sit amet, consectetuer adipiscing
                      elit. Pellentesque aliquet nibh nec urna. <br />
                      In nisi neque, aliquet vel, dapibus id, mattis vel, nisi.
                      Sed pretium, ligula sollicitudin laoreet viverra, tortor
                      libero sodales leo, eget blandit nunc tortor eu nibh.
                      Nullam mollis. Ut justo. Suspendisse potenti. ”
                    </p>
                    <cite>
                      Jenson Gregory
                      <span>Customer</span>
                    </cite>
                  </blockquote>

                  <blockquote className="testimonial text-center">
                    <img src={user2} alt="user" />
                    <p>
                      “ Impedit, ratione sequi, sunt incidunt magnam et.
                      Delectus obcaecati optio eius error libero perferendis
                      nesciunt atque dolores magni recusandae! Doloremque quidem
                      error eum quis similique doloribus natus qui ut
                      ipsum.Velit quos ipsa exercitationem, vel unde obcaecati
                      impedit eveniet non. ”
                    </p>

                    <cite>
                      Victoria Ventura
                      <span>Customer</span>
                    </cite>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default About;
