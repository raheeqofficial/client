import React, { useContext } from "react";
import 'swiper/css';
import 'swiper/css/navigation';
import { MyContext } from "../../App";
import Slider from "react-slick";

const HomeBanner = (props) => {

    const context = useContext(MyContext);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
      };

    return (
        <div className="mt-0 homeBanner">
         <Slider {...settings}>
            {
                        props?.data?.length !== 0 && props?.data?.map((item, index) => {
                            return (
                                    <div className="item" key={index}>
                                        <img src={item?.images[0]} className="w-100" />
                                    </div>
                            )
                        })
                    }
            </Slider>
        </div>
    )
}

export default HomeBanner;