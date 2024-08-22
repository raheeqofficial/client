import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Link } from "react-router-dom";
import './homeCat.css'
import { MyContext } from "../../App";

const HomeCat = (props) => {

    const context = useContext(MyContext);

    return (
        <section className="homeCat">
            <div className="homeCatWrapper">
                <h3 className="hd text-center">Featured Categories</h3>
                <div className="homeCatBox">

                    {
                        props.catData?.length !== 0 && props.catData?.map((cat, index) => {
                            return (

                                <Link to={`/products/category/${cat.id}`} key={index}>
                                    <div className="homeCatBoxWrapper">
                                        <div className="homeCatImgWrapper">
                                            <img src={cat.images[0]} alt={cat.name} />
                                        </div>
                                        <h6>{cat?.name.length > 15 ? cat?.name.substr(0, 15) + '...' : cat?.name}</h6>
                                    </div>
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