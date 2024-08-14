import HomeBanner from "../../Components/HomeBanner";
import banner1 from '../../assets/images/banner1.jpg';
import banner2 from '../../assets/images/banner2.jpg';
import Button from '@mui/material/Button';
import React, { useContext, useEffect, useState } from "react";
import 'swiper/css';
import 'swiper/css/navigation';
import ProductItem from "../../Components/ProductItem";
import './home.css'

import { MyContext } from "../../App";
import { fetchDataFromApi } from "../../utils/api";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box, CircularProgress } from "@mui/material";
import DealOfDay from "../../Components/DealOfDay/DealOfDay";
import { Link, useNavigate } from "react-router-dom";
import SaleCards from "../../Components/SaleCards/SaleCards";
import FiftyPerSaleCard from "../../Components/fiftyPerSaleCard/FiftyPerSaleCard";
import { Helmet } from "react-helmet-async";
import TopBanners from "../../Components/topBanners/TopBanners";

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [productsData, setProductsData] = useState([]);
    const [selectedCat, setselectedCat] = useState();
    const [filterData, setFilterData] = useState([]);
    const [homeSlides, setHomeSlides] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [TFDiscount, setTFDiscount] = useState([])
    const navigate = useNavigate()

    const [value, setValue] = React.useState(0);

    const context = useContext(MyContext);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const selectCat = (cat) => {
        const decodedCat = decodeURIComponent(cat);
        setselectedCat(decodedCat);
    };


    useEffect(() => {
        window.scrollTo(0, 0);

        setselectedCat(context.categoryData[0]?.name)
        setisLoading(true)

        fetchDataFromApi(`/api/products/featured`).then((res) => {
            setFeaturedProducts(res)
            setisLoading(false)
        })


        setisLoading(true)
        fetchDataFromApi("/api/products").then((res) => {
            setProductsData(res);
            setisLoading(false)
        })

        setisLoading(true)
        fetchDataFromApi("/api/homeBanner").then((res) => {
            setHomeSlides(res);
            setisLoading(false)
        })
        let minDiscount = 20;
        let maxDiscount = 40;
        fetchDataFromApi(`/api/products?discount=${maxDiscount}`).then((res) => {
            // setProductsData(res);
            // const products = res?.products
            // const filteredProducts = products.filter(product => product.discount >= minDiscount && product.discount <= maxDiscount);
            // setTFDiscount(filteredProducts)
            console.log(res)
            setisLoading(false);
        }).catch((error) => {
            console.error("Error fetching products:", error);
            setisLoading(false);
        });

    }, [])

    const handleDiscountClick = (discount) => {
        navigate(`/products/all?discount=${discount}`)
    }


    useEffect(() => {
        if (context.categoryData[0] !== undefined)
            setselectedCat(context.categoryData[0].name)
    }, [context.categoryData]);

    const cleanCategoryName = (name) => {
        return decodeURIComponent(name).replace(/(\d+%)|('s )/g, '');
    };
    // useEffect(() => {
    //     if (selectedCat !== undefined) {
    //         fetchDataFromApi(`/api/products?catName=${selectedCat}`).then((res) => {
    //             setFilterData(res.products);
    //             console.log(res.products)
    //             console.log(selectedCat)
    //         })
    //     }

    // }, [selectedCat]);
    useEffect(() => {
        if (selectedCat !== undefined) {
            const encodedCategory = encodeURIComponent(selectedCat);
            setisLoading(false)
            fetchDataFromApi(`/api/products?catName=${encodedCategory}`).then((res) => {
                setFilterData(res.products);
                setisLoading(false)
            });
        }
    }, [selectedCat]);
    if (isLoading) {
        return <div className="loaderContainer">
            <CircularProgress color="inherit" />
        </div>;
    }
    return (
        <div className="homeBox">
            <Helmet>
                <title>Welcome to Hibuyshopping - Pakistan's Premier Multi-Vendor E-Commerce Store</title>
                <meta name="title" content="Welcome to Hibuyshopping - Pakistan's Premier Multi-Vendor E-Commerce Store" />
                <meta name="description" content="Explore Hibuyshopping, your ultimate multi-vendor e-commerce destination in Pakistan. Discover a wide range of products from top brands, exclusive deals, and unbeatable discounts across fashion, electronics, home goods, and more. Shop now and experience the best in online shopping!" />
                <meta name="keywords" content="multi-vendor e-commerce store, online shopping Pakistan, buy electronics online, fashion shopping Pakistan, Pakistani online marketplace, online clothing store Pakistan, best online shopping sites, discount codes Pakistan, buy mobile phones Pakistan, online groceries Pakistan, electronics sale Pakistan, fashion trends Pakistan, mobile accessories Pakistan, online home appliances, buy laptops online Pakistan, online beauty products, Pakistani online clothing, latest gadgets Pakistan, online furniture store Pakistan, online shopping for men, online shopping for women, Pakistani fashion brands, health and wellness products, online kids clothing, best deals on electronics, Pakistani online retailers, buy jewelry online Pakistan" />
                <meta name="author" content="Hibuyshopping Team" />
                <meta property="og:title" content="Hibuyshopping - Pakistan's Premier Multi-Vendor E-Commerce Store" />
                <meta property="og:description" content="Discover Hibuyshopping, Pakistan's top multi-vendor e-commerce platform. Shop a diverse range of products from fashion to electronics, enjoy exclusive deals, and find the best discounts. Join our community and start shopping now!" />
                <meta property="og:image" content="https://hibuyshopping.com/" />
                <meta property="og:url" content="https://hibuyshopping.com/" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Hibuyshopping - Pakistan's Premier Multi-Vendor E-Commerce Store" />
                <meta name="twitter:description" content="Explore Hibuyshopping for the best in online shopping. From top brands and exclusive deals to a wide range of products, experience Pakistan's leading multi-vendor e-commerce platform today." />
                <meta name="twitter:image" content="https://hibuyshopping.com/" />

                <meta itemprop="priceCurrency" content="PKR" />
            </Helmet>
            {
                homeSlides?.length !== 0 && <HomeBanner data={homeSlides} />
            }
            <TopBanners />

            <SaleCards />
            <FiftyPerSaleCard />
            <DealOfDay />

            <section className="homeProducts">
                <div className="container">
                    <div className="row homeProductsRow">
                        {/* <div className="col-md-3">
                            <div className="sticky">
                                <div className="banner">
                                    <img src={banner1} className="cursor w-100" />
                                </div>

                                <div className="banner mt-4">
                                    <img src={banner2} className="cursor w-100" />
                                </div>
                            </div>
                        </div> */}

                        <div className="col-md-12 productRow">

                            <div className="featuredProducts">
                                <div className="d-flex align-items-center mt-4">
                                    <div className="info">
                                        <h3 className="mb-0 hd">featured products</h3>
                                        <p className="text-light text-sml mb-0">Do not miss the current offers until the end of March.</p>
                                    </div>


                                </div>

                                <div className="product_row productRow2 w-100 mt-4">
                                    {
                                        featuredProducts?.length !== 0 && featuredProducts?.slice(0)?.reverse()?.map((item, index) => {
                                            return (
                                                <ProductItem key={index} item={item} />
                                            )
                                        })
                                    }


                                </div>
                            </div>



                            <div className="newProducts">
                                <div className="d-flex align-items-center mt-3">
                                    <div className="info w-75">
                                        <h3 className="mb-0 hd">All PRODUCTS</h3>
                                        <p className="text-light text-sml mb-0">All products with updated stocks.</p>
                                    </div>

                                </div>

                                <div className="product_row productRow2 w-100 mt-4">
                                    {
                                        productsData?.products?.length !== 0 && productsData?.products?.map((item, index) => {
                                            return (
                                                <ProductItem key={index} item={item} />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="popularProducts">
                                <div className="catTabs mt-4">
                                    <div className="tabsHd">
                                        <h3 className="mb-0">#Trending Products</h3>
                                        <p className="mb-0">Do not miss the current offers until the end of March.</p>
                                    </div>

                                    <div className="catTabsName">
                                        <Box sx={{ maxWidth: { xs: 350, sm: 680 }, bgcolor: 'background.paper' }}>
                                            <Tabs
                                                value={value}
                                                onChange={handleChange}
                                                variant="scrollable"
                                                scrollButtons="auto"
                                                className="filterTabs"
                                            >
                                                {
                                                    context.categoryData?.map((item, index) => {
                                                        const decodedCat = decodeURIComponent(item?.name)
                                                        const cleanedCatName = cleanCategoryName(item?.name);

                                                        return (
                                                            <Tab key={index} className="item" label={decodedCat}
                                                                onClick={() => selectCat(decodedCat)} />
                                                        )
                                                    })
                                                }
                                            </Tabs>
                                        </Box>
                                    </div>

                                </div>


                                <div className="product_row productRow2 w-100 mt-4 mb-3">
                                    {
                                        filterData?.length !== 0 ? filterData?.slice(0)?.reverse()?.map((item, index) => {
                                            return (
                                                <ProductItem key={index} item={item} />
                                            )
                                        }) : <div><p>No Products for display</p></div>
                                    }
                                </div>
                            </div>



                        </div>

                    </div>

                </div>

            </section>
            <div className="seoContent">
                <div className="seoContentWrapper">
                    <div className="seoItem">
                        <h2>Hibuyshopping.com: Your One-Stop Multivendor Online Store</h2>
                        <p>We are a comprehensive multivendor online store catering to all your shopping needs. Our platform brings together a diverse range of products from various vendors, offering an extensive selection of clothing, footwear, fashion and kitchen accessories, and more. Whether you’re searching for the latest fashion trends, home essentials, or unique gifts, our extensive catalog ensures you find everything in one convenient place. Enjoy a seamless shopping experience with top-notch customer service and a variety of choices that suit every style and budget. Shop with us and discover
                            the convenience of a multivendor marketplace where quality and variety meet.</p>
                    </div>
                    <div className="seoItem">
                        <h2>Discover the Latest Trends at Hibuyshopping.com</h2>
                        <p>In Pakistan, your ultimate destination for online shopping is Hibuyshopping. Browse and purchase the newest fashion trends from renowned brands in the country. We offer something for every family member—kids, men, and women. Explore the freshest seasonal collections to fulfill all your fashion desires. Whether preparing for the chilly winter or the scorching summer, you can find the latest offerings from genuine Pakistani brands. At Hibuyshopping, we meet your needs year-round. Shop for shawls, sweaters, t-shirts, caps, hoodies, sleeves, trousers, kurtas, kurtis, coats, shrugs, jackets, boots, sneakers, flats, high heels, khussa, stitched and unstitched clothes,
                            and chic accessories like jewelry, watches, scarves, hijabs, perfumes, and much more.</p>
                    </div>
                    <div className="seoItem">
                        <h2>Shop the Hottest New Arrivals at Hibuyshopping.com</h2>
                        <p>Experience the smart choice with Hibuyshopping, where timeless style meets modern trends. Explore our curated collection of high-quality fashion wear, footwear, kitchen accessories, and more. Whether you're looking for elegant dresses, stylish shoes,
                            trendy handbags, or chic jewelry, we have something for everyone.</p>
                        <p>Ranked among Pakistan’s top 10 online branded shopping sites, Hibuyshopping is your go-to destination for staying ahead in fashion. Shop from the comfort of your home and keep your wardrobe updated with the latest styles at competitive prices. Our platform offers 24/7 service and fast delivery, ensuring that shopping is always a pleasure and fashion remains a statement for everyone.</p>
                        <p>No need to wait for the right moment or market hours. Browse, select, and buy anytime, from anywhere, with ease and affordability. Welcome to effortless shopping with Hibuyshopping!</p>
                    </div>
                    <div className="seoItem">
                        <h2>Discover Online Fashion Shopping in Pakistan</h2>
                        <p>Experience the ease, affordability, and speed of online shopping in Pakistan with Hibuyshopping. Enjoy the latest and trendiest Pakistani fashion delivered right to your doorstep. Our mission is to offer the finest designer collections of clothing for women, men, and designer shoes, along with a variety of accessories, through a seamless online shopping experience.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;