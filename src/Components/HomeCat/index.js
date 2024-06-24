import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Link } from "react-router-dom";

import { MyContext } from "../../App";

const HomeCat = (props) => {

    const context = useContext(MyContext);

    return (
        <section className="homeCat">
            <div className="container">
            <h3 className="mb-3 hd text-center">Featured Categories</h3>
            <div className="homeCatBox">
                                    
                {
                        props.catData?.length !== 0 && props.catData?.map((cat, index) => {
                            return (
                                
                                <Link to={`/products/category/${cat.id}`} key={index}>
                                <div className="item text-center cursor" style={{ background: cat.color }}>
                                    <img src={cat.images[0]} />
                                </div>
                                <h6>{cat?.name.length > 17 ? cat?.name.substr(0,15) + '...' : cat?.name}</h6>
                            </Link>
                                    
                            )
                        })
                    }
                    </div>
            </div>
        </section>
    )
}

export default HomeCat;