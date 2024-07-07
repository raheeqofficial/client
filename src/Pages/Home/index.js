import HomeBanner from "../../Components/HomeBanner";
import banner1 from '../../assets/images/banner1.jpg';
import banner2 from '../../assets/images/banner2.jpg';
import Button from '@mui/material/Button';
import React, { useContext, useEffect, useState } from "react";
import 'swiper/css';
import 'swiper/css/navigation';
import ProductItem from "../../Components/ProductItem";
import HomeCat from "../../Components/HomeCat";

import banner3 from '../../assets/images/banner3.jpg';
import banner4 from '../../assets/images/banner4.jpg';

import { MyContext } from "../../App";
import { fetchDataFromApi } from "../../utils/api";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import newsLetterImg from '../../assets/images/newsletter.png';
import { IoMailOutline } from "react-icons/io5";
import { Box } from "@mui/material";
import DealOfDay from "../../Components/DealOfDay/DealOfDay";
import { useNavigate } from "react-router-dom";



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
        fetchDataFromApi("/api/products?page=1&perPage=8").then((res) => {
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
            setisLoading(true)
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
        <>
            {
                homeSlides?.length !== 0 && <HomeBanner data={homeSlides} />
            }


            {
                context.categoryData?.length !== 0 && <HomeCat catData={context.categoryData} />
            }



            <section className="homeProducts">
                <div className="container">
                    <div className="row homeProductsRow">
                        <div className="col-md-3">
                            <div className="sticky">
                                <div className="banner">
                                    <img src={banner1} className="cursor w-100" />
                                </div>

                                <div className="banner mt-4">
                                    <img src={banner2} className="cursor w-100" />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-9 productRow">

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



                            <div className="d-flex mt-4 mb-4 bannerSec">
                                <div className="banner" onClick={() => handleDiscountClick(40)}>
                                    <img src={banner3} className="cursor w-100" />
                                </div>

                                <div className="banner">
                                    <img src={banner4} className="cursor w-100" />
                                </div>

                                <div className="banner">
                                    <img src={banner4} className="cursor w-100" />
                                </div>

                            </div>



                            <div className="newProducts">
                            <div className="d-flex align-items-center mt-3">
                                <div className="info w-75">
                                    <h3 className="mb-0 hd">NEW PRODUCTS</h3>
                                    <p className="text-light text-sml mb-0">New products with updated stocks.</p>
                                </div>

                            </div>

                            <div className="product_row productRow2 w-100 mt-4">
                                {
                                    productsData?.products?.length !== 0 && productsData?.products?.slice(0).reverse().map((item, index) => {
                                        return (
                                            <ProductItem key={index} item={item} />
                                        )
                                    })
                                }
                            </div>
                            </div>
                            {/* <DealOfDay/> */}
                            <div className="popularProducts">
                            <div className="catTabs mt-4">
                                <div className="tabsHd">
                                    <h3 className="mb-0">#Popular Products</h3>
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
                                    filterData?.length !== 0 && filterData?.slice(0)?.reverse()?.map((item, index) => {
                                        return (

                                            <ProductItem key={index} item={item} />
                                        )
                                    })
                                }
                            </div>
                            </div>



                        </div>

                    </div>

                </div>

            </section>
            <section className="newsLetterSection mt-3 mb-3 d-flex align-items-center">
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
            </section>
        </>
    )
}

export default Home;