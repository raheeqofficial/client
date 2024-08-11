import React, { useContext, useEffect, useState } from "react";
import 'swiper/css';
import 'swiper/css/navigation';
import { MyContext } from "../../App";
import Slider from "react-slick";
import './homeBanner.css'
import mutedVideo from '../../assets/videos/homeBanner.mp4'
import banner480w from '../../assets/images/banners/slide-1-480w.jpg'
import { fetchDataFromApi } from "../../utils/api";
import { Link } from "react-router-dom";

const HomeBanner = (props) => {

    
    const [selected, setSelected] = useState(0)
    const [catData, setCatData] = useState([])
    const [cosmeticData, setCosmeticData] = useState([])
    const [cosmeticSubCatData, setCosmeticSubCatData] = useState([])
    const [skinCareData, setSKinCareData] = useState([])
    const [straightenersData, setStraightenersData] = useState([])

    useEffect(()=>{
        fetchDataFromApi('/api/category').then((res) => {
            setCatData(res.categoryList)
        })
        fetchDataFromApi('/api/category?name=Cosmetics').then((res) => {
            setCosmeticData(res.categoryList)
        })
        fetchDataFromApi(`/api/products?subCatName=Skin care&page=1&perPage=3`).then((res) => {
            setSKinCareData(res.products)
        })
        fetchDataFromApi(`/api/products?subCatName=Curlers & Straighteners&page=1&perPage=1`).then((res) => {
            setStraightenersData(res.products)
        })
    },[]);

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
                <div className="mt-2"></div>
                <div className="container-fluid">
                    <div className="row"> 
                    <div className="col-md-3 homeBannerLeftWrapper">
                            <div className="homeBanner-left">
                                <div className="homeBannerLeftContainer">
                                    <ul>
                                    {
                                                catData?.length !== 0 && catData?.map((cat, index) =>(
                                                    <li className="homeBannerLeft" key={index}><Link to={`/products/category/${cat.id}`}><img src={cat.images[0]}/><p>{cat?.name}</p></Link></li>
                                                ))
                                    }
                                    </ul>
                                   
                                </div>
                            </div>
                            {/* <nav className="side-nav">
                                        <ul className="menu-vertical sf-arrows">
                                            <li className="megamenu-container arrowMenu">
                                            {
                                            cosmeticData?.length !== 0 && cosmeticData?.map((cat, index) => (
                                                <>
                                                    <Link className="sf-with-ul" key={index} to={`/products/category/${cat.id}`}><div className="arrowMenuWrapper"><img src={cat.images[0]}/><p>{cat?.name}</p></div></Link>
                                                    
                                                </>
                                            ))
                                        }

                                                <div className="megamenu">
                                                    <div className="row no-gutters">
                                                        <div className="col-md-8">
                                                            <div className="menu-col">
                                                                <div className="row">
                                                                    <div className="col">
                                                                        <div className="menu-title">Skin Care</div>
                                                                        <ul>
                                                                            {
                                                                                skinCareData?.length !== undefined && skinCareData?.map((data, index) => (
                                                                                    <li key={index}><Link to={`/product/${data.staticId}`}>{data.name}</Link></li>
                                                                                ))
                                                                            }
                                                                            
                                                                        </ul>

                                                                        <div className="menu-title">Curlers & Straighteners</div>
                                                                        <ul>
                                                                        {
                                                                                straightenersData?.length !== undefined && straightenersData?.map((data, index) => (
                                                                                    <li key={index}><Link to={`/product/${data.staticId}`}>{data.name}</Link></li>
                                                                                ))
                                                                            }
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            </ul>
                                    </nav> */}
                        </div>
                        <div className="col-md-9">
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
                                <video autoPlay muted loop preload="metadata">
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