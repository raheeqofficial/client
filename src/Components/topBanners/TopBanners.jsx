import React from 'react'
import banner1 from '../../assets/images/banners/top-banner-1.jpg'
import banner2 from '../../assets/images/banners/top-banner-2.jpg'
import banner3 from '../../assets/images/banners/top-banner-3.jpg'
import './topBanner.css'

const TopBanners = () => {
  return (
    <div className='page-wrapper topBanner'>
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
                                        <p>Free shipping for orders over $50</p>
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
                            <a href="#">
                                <img src={banner1} alt="Banner"/>
                            </a>

                            <div className="banner-content banner-content-right">
                                <h4 className="banner-subtitle"><a href="#">Men's</a></h4>
                                <h3 className="banner-title"><a href="#">Summer<br/>sale -70% off</a></h3>
                                <a href="#" className="btn underline btn-outline-white-3 banner-link">Shop Now</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-4">
                        <div className="banner banner-overlay color-grey">
                            <a href="#">
                                <img src={banner2} alt="Banner"/>
                            </a>

                            <div className="banner-content">
                                <h4 className="banner-subtitle"><a href="#">Kid's</a></h4>
                                <h3 className="banner-title"><a href="#">2024 Winter<br/>up to 50% off</a></h3>
                                <a href="#" className="btn underline banner-link">Shop Now</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-4">
                        <div className="banner banner-overlay text-white">
                            <a href="#">
                                <img src={banner3} alt="Banner"/>
                            </a>

                            <div className="banner-content banner-content-right mr">
                                <h4 className="banner-subtitle"><a href="#">New in</a></h4>
                                <h3 className="banner-title"><a href="#">Women’s<br/>wear</a></h3>
                                <a href="#" className="btn underline btn-outline-white-3 banner-link">Shop Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
  )
}

export default TopBanners