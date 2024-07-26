import React, { useContext } from "react";
import 'swiper/css';
import 'swiper/css/navigation';
import { MyContext } from "../../App";
import Slider from "react-slick";
import './homeBanner.css'
import mutedVideo from '../../assets/videos/homeBanner.mp4'
import banner480w from '../../assets/images/banners/slide-1-480w.jpg'

const HomeBanner = (props) => {

    const context = useContext(MyContext);
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
    };

    return (
        <div className="page-wrapper homeBanner">
            <main className="main">
                <div class="mt-2"></div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-9 col-xxl-8 offset-lg-3 offset-xxl-2">
                            <div className="intro-slider-container slider-container-ratio mb-2">
                                {/* <div className="intro-slider owl-carousel owl-simple owl-nav-inside" data-toggle="owl" data-owl-options='{
                                    "nav": false, 
                                    "dots": true
                                }'>
                                <div className="intro-slide">
                                    <figure className="slide-image">
                                        <picture>
                                            <source media="(max-width: 480px)" srcset={banner480w}/>
                                            <img src={banner480w} alt="Image Desc"/>
                                        </picture>
                                    </figure>

                                    <div className="intro-content">
                                        <h3 className="intro-subtitle">New Arrivals</h3>
                                        <h1 className="intro-title text-white">
                                            The New Way <br/>To Buy Furniture
                                        </h1>

                                        <div className="intro-text text-white">
                                            Spring Collections 2019
                                        </div>

                                        <a href="category.html" className="btn btn-primary">
                                            <span>Discover Now</span>
                                            <i className="icon-long-arrow-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div> */}
                                <div className="homeBannerItem">
                                <video autoPlay muted loop>
                                    <source src={mutedVideo} />
                                </video>
                                </div>
                                {/* <span className="slider-loader"></span> */}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
        // <div className="homeBanner">
        //     <Slider {...settings}>
        //     {
        //                 props?.data?.length !== 0 && props?.data?.map((item, index) => {
        //                     return (
        //                             <div className="item" key={index}>
        //                                 <img src={item?.images[0]} className="w-100" />
        //                             </div>
        //                     )
        //                 })
        //             }
        //     </Slider> 
        //     <div className="item">
        // <video autoPlay muted loop>
        // <source src={mutedVideo} />
        //  </video>

        //     </div> 

        //  </div>
    )
}

export default HomeBanner;