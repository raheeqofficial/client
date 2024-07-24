import Sidebar from "../../Components/Sidebar";
import Button from '@mui/material/Button';
import { IoIosMenu } from "react-icons/io";
import { CgMenuGridR } from "react-icons/cg";
import { HiViewGrid } from "react-icons/hi";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { FaAngleDown } from "react-icons/fa6";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useContext, useEffect, useState } from "react";
import ProductItem from "../../Components/ProductItem";
import Pagination from '@mui/material/Pagination';

import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import CircularProgress from '@mui/material/CircularProgress';
import { FaFilter } from "react-icons/fa";
import { MyContext } from "../../App";
import { BsEmojiDizzy } from "react-icons/bs";
import { Helmet } from "react-helmet-async";

const SearchPage = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [productView, setProductView] = useState('four');
    const [productData, setProductData] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const openDropdown = Boolean(anchorEl);
    const [isOpenFilter, setIsOpenFilter] = useState(false);

    const context = useContext(MyContext);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    useEffect(() => {
        window.scrollTo(0, 0);
        setisLoading(true);
        setTimeout(() => {
            setProductData(context.searchData)
            setisLoading(false);
        }, 3000);
    }, [context.searchData]);


    const filterData = (subCatId) => {
        setisLoading(true);

        fetchDataFromApi(`/api/products?subCatId=${subCatId}`).then((res) => {
            setProductData(res.products);
            setisLoading(false);
        })
    }

    const filterByPrice = (price, subCatId) => {
        setisLoading(true);

        fetchDataFromApi(`/api/products?minPrice=${price[0]}&maxPrice=${price[1]}&subCatId=${subCatId}`).then((res) => {
            setProductData(res.products)
            setisLoading(false);
        })
    }

    const filterByRating = (rating, subCatId) => {

        setisLoading(true);
        fetchDataFromApi(`/api/products?rating=${rating}&subCatId=${subCatId}`).then((res) => {
            setProductData(res.products)
            setisLoading(false);
        })
    }


    const openFilters = () => {
        setIsOpenFilter(!isOpenFilter)
    }

    return (
        <>
        <Helmet>
        <title>Search - EliphStore</title>
        
          <meta
            name="description"
            content="Experience the future of online shopping at Eliphstore, where innovation meets tradition. Support a global community of creators and entrepreneurs with every purchase. Shop smart, shop Eliphstore!."
          />
          <meta
            name="keywords"
            content="Search, Eliphstore.com, online shopping website, online shop, online store website, clothing websites, online shopping sites, best online clothing stores, shopping websites, shopping sites, clothing online stores, best online shopping websites, good online clothing stores, store website, best online shopping sites, best online store, best online clothes shopping, clothes online, top online clothing stores, clothing store online shopping, website online shop, internet shopping sites, all online shopping websites, good online shopping sites, best online clothes shops, good online shops, online shops for clothes, good online shopping websites, top shopping sites, e-commerce store, online store, buy online, buy clothes online, online fashion store, discount shopping online, shop online for electronics, buy shoes online, women's clothes online, top-selling products online, online sale, e-store, online jewellery shopping, clothing sales online, cheap clothing brands, men's sale clothing, women's sale clothing, Eliphstore.com, multivendor online store, shopping needs, multivendor online store, clothing, footwear, fashion, kitchen accessories, latest fashion trends, home essentials, unique gifts, seamless shopping experience, customer service, variety of choices, multivendor marketplace, quality and variety, online shopping in Pakistan, newest fashion trends, renowned brands, seasonal collections, Pakistani brands, shawls, sweaters, t-shirts, caps, hoodies, sleeves, trousers, kurtas, kurtis, coats, shrugs, jackets, boots, sneakers, flats, high heels, khussa, stitched and unstitched clothes, chic accessories, jewelry, watches, scarves, hijabs, perfumes, hottest new arrivals, timeless style, modern trends, high-quality fashion wear, elegant dresses, stylish shoes, trendy handbags, top 10 online branded shopping sites, competitive prices, 24/7 service, fast delivery, effortless shopping,
           designer collections, seamless online shopping experience "
          />
        </Helmet>
            <section className="product_Listing_Page">
                <div className="container">
                    <div className="productListing">
                        {/* <Sidebar filterData={filterData} filterByPrice={filterByPrice} filterByRating={filterByRating}  isOpenFilter={isOpenFilter} /> */}

                        <div className="content_right">

                            <div className="showBy mt-0 mb-3 d-flex align-items-center">
                                <div className="d-flex align-items-center btnWrapper">
                                    <Button className={'act'}><IoIosMenu />
                                    </Button>

                                    <Button className={'act'}>
                                        <CgMenuGridR /></Button>
                                    <Button className={'act'}><TfiLayoutGrid4Alt /></Button>
                                </div>

                                <div className="ml-auto showByFilter">
                                    <Button onClick={handleClick}>Show 9 <FaAngleDown /></Button>
                                    <Menu
                                        className="w-100 showPerPageDropdown"
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={openDropdown}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem onClick={handleClose}>10</MenuItem>
                                        <MenuItem onClick={handleClose}>20</MenuItem>
                                        <MenuItem onClick={handleClose}>30</MenuItem>
                                        <MenuItem onClick={handleClose}>40</MenuItem>
                                        <MenuItem onClick={handleClose}>50</MenuItem>
                                        <MenuItem onClick={handleClose}>60</MenuItem>
                                    </Menu>
                                </div>
                            </div>
                            {
                                isLoading === true ?
                                    <div className="loading d-flex align-items-center justify-content-center">
                                        <CircularProgress color="inherit" />
                                    </div> :
                                    productData?.length === 0 ? <div className="no-result">
                                        <BsEmojiDizzy /> &nbsp;
                                        <p className="mb-0 ml-2">No data found</p>
                                    </div> : (
                                        <div className="productListing-data">
                                            <>
                                                {
                                                    productData?.length !== 0 && productData?.map((item, index) => {
                                                        return (
                                                            <>
                                                                <ProductItem key={index} itemView={productView} item={item} />
                                                            </>

                                                        )
                                                    })
                                                }
                                            </>



                                        </div>
                                    )}





                        </div>
                    </div>
                </div>
            </section>


            {/* {
                context.windowWidth < 992 &&
                <>
                    {
                        context.isOpenNav === false &&
                        <div className="fixedBtn row">
                            <div className="col">
                                <Button className='btn-blue bg-red btn-lg btn-big' onClick={openFilters}>
                                    <FaFilter />
                                    {isOpenFilter === true ? 'Close Filters' : 'Open Filters'}

                                </Button>
                            </div>
                        </div>
                    }
                </>

            } */}


        </>
    )
}

export default SearchPage;