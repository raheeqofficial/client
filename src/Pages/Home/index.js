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
import { Box } from "@mui/material";
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
          <span class="loader"></span>
        </div>;
    }
    return (
        <div className="homeBox">
        <Helmet>
          <title>EliphStore multi-vendor online shop</title>
          <meta
            name="description"
            content="Experience the future of online shopping at Eliphstore, where innovation meets tradition. Support a global community of creators and entrepreneurs with every purchase. Shop smart, shop Eliphstore!."
          />
          <meta
            name="keywords"
            content="EliphStore multi-vendor online shop, Eliphstore.com, online shopping website, online shop, online store website, clothing websites, online shopping sites, best online clothing stores, shopping websites, shopping sites, clothing online stores, best online shopping websites, good online clothing stores, store website, best online shopping sites, best online store, best online clothes shopping, clothes online, top online clothing stores, clothing store online shopping, website online shop, internet shopping sites, all online shopping websites, good online shopping sites, best online clothes shops, good online shops, online shops for clothes, good online shopping websites, top shopping sites, e-commerce store, online store, buy online, buy clothes online, online fashion store, discount shopping online, shop online for electronics, buy shoes online, women's clothes online, top-selling products online, online sale, e-store, online jewellery shopping, clothing sales online, cheap clothing brands, men's sale clothing, women's sale clothing, Eliphstore.com, multivendor online store, shopping needs, multivendor online store, clothing, footwear, fashion, kitchen accessories, latest fashion trends, home essentials, unique gifts, seamless shopping experience, customer service, variety of choices, multivendor marketplace, quality and variety, online shopping in Pakistan, newest fashion trends, renowned brands, seasonal collections, Pakistani brands, shawls, sweaters, t-shirts, caps, hoodies, sleeves, trousers, kurtas, kurtis, coats, shrugs, jackets, boots, sneakers, flats, high heels, khussa, stitched and unstitched clothes, chic accessories, jewelry, watches, scarves, hijabs, perfumes, hottest new arrivals, timeless style, modern trends, high-quality fashion wear, elegant dresses, stylish shoes, trendy handbags, top 10 online branded shopping sites, competitive prices, 24/7 service, fast delivery, effortless shopping,
           designer collections, seamless online shopping experience "
          />
          <meta itemprop="priceCurrency" content="PKR"/>
        </Helmet>
            {
                homeSlides?.length !== 0 && <HomeBanner data={homeSlides} />
            }


            {/* {
                context.categoryData?.length !== 0 && <HomeCat catData={context.categoryData} />
            } */}
            <TopBanners/>

            <SaleCards/>
            <FiftyPerSaleCard/>
            <DealOfDay/>

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
            {/* <section className="newsLetterSection mt-3 mb-3 d-flex align-items-center">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <p className="text-white mb-1">$20 discount for your first order</p>
                            <h3 className="text-white">Join our newsletter and get...</h3>
                            <p className="text-light">Join our email subscription now to get updates on<br /> promotions and coupons.</p>


                            <form className="mt-4">
                                <IoMailOutline />
                                <input type="text" placeholder="Your Email Address" />
                                <Button>Subscribe</Button>
                            </form>

                        </div>

                        <div className="col-md-6">
                            <img src={newsLetterImg} />
                        </div>
                    </div>
                </div>
            </section> */}
            <div className="seoContent">
                <div className="seoContentWrapper">
                    <div className="seoItem">
                        <h2>Eliphstore.com: Your One-Stop Multivendor Online Store</h2>
                        <p>We are a comprehensive multivendor online store catering to all your shopping needs. Our platform brings together a diverse range of products from various vendors, offering an extensive selection of clothing, footwear, fashion and kitchen accessories, and more. Whether you’re searching for the latest fashion trends, home essentials, or unique gifts, our extensive catalog ensures you find everything in one convenient place. Enjoy a seamless shopping experience with top-notch customer service and a variety of choices that suit every style and budget. Shop with us and discover
                        the convenience of a multivendor marketplace where quality and variety meet.</p>
                    </div>
                    <div className="seoItem">
                        <h2>Discover the Latest Trends at Eliphstore.com</h2>
                        <p>In Pakistan, your ultimate destination for online shopping is Eliphstore. Browse and purchase the newest fashion trends from renowned brands in the country. We offer something for every family member—kids, men, and women. Explore the freshest seasonal collections to fulfill all your fashion desires. Whether preparing for the chilly winter or the scorching summer, you can find the latest offerings from genuine Pakistani brands. At Eliphstore, we meet your needs year-round. Shop for shawls, sweaters, t-shirts, caps, hoodies, sleeves, trousers, kurtas, kurtis, coats, shrugs, jackets, boots, sneakers, flats, high heels, khussa, stitched and unstitched clothes, 
                        and chic accessories like jewelry, watches, scarves, hijabs, perfumes, and much more.</p>
                    </div>
                    <div className="seoItem">
                        <h2>Shop the Hottest New Arrivals at Eliphstore.com</h2>
                        <p>Experience the smart choice with Eliphstore, where timeless style meets modern trends. Explore our curated collection of high-quality fashion wear, footwear, kitchen accessories, and more. Whether you're looking for elegant dresses, stylish shoes,
                        trendy handbags, or chic jewelry, we have something for everyone.</p>
                        <p>Ranked among Pakistan’s top 10 online branded shopping sites, Eliphstore is your go-to destination for staying ahead in fashion. Shop from the comfort of your home and keep your wardrobe updated with the latest styles at competitive prices. Our platform offers 24/7 service and fast delivery, ensuring that shopping is always a pleasure and fashion remains a statement for everyone.</p>
                        <p>No need to wait for the right moment or market hours. Browse, select, and buy anytime, from anywhere, with ease and affordability. Welcome to effortless shopping with Eliphstore!</p>
                    </div>
                    <div className="seoItem">
                        <h2>Discover Online Fashion Shopping in Pakistan</h2>
                        <p>Experience the ease, affordability, and speed of online shopping in Pakistan with Eliphstore. Enjoy the latest and trendiest Pakistani fashion delivered right to your doorstep. Our mission is to offer the finest designer collections of clothing for women, men, and designer shoes, along with a variety of accessories, through a seamless online shopping experience.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;