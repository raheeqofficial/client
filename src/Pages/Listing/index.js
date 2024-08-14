import Sidebar from "../../Components/Sidebar";
import Button from '@mui/material/Button';
import { IoIosMenu } from "react-icons/io";
import { CgMenuGridR } from "react-icons/cg";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { FaAngleDown } from "react-icons/fa6";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useContext, useEffect, useState } from "react";
import ProductItem from "../../Components/ProductItem";
import Pagination from '@mui/material/Pagination';

import { Link, useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import CircularProgress from '@mui/material/CircularProgress';
import { FaFilter } from "react-icons/fa";

import { MyContext } from "../../App";
import axios from "axios";
import { BsEmojiExpressionless } from "react-icons/bs";

const Listing = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [productView, setProductView] = useState('four');
    const [productData, setProductData] = useState([]);
    const [isLoading, setisLoading] = useState(false);

    const [isOpenFilter, setIsOpenFilter] = useState(false);

    const openDropdown = Boolean(anchorEl);

    const context = useContext(MyContext);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const { id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);

        let url = window.location.href;
        let apiEndPoint = "";

        if (url.includes('subCat')) {
            apiEndPoint = `/api/products?subCat=${id}`
        }
        if (url.includes('category')) {
            apiEndPoint = `/api/products?category=${id}`
        }

        setisLoading(true);
        fetchDataFromApi(`${apiEndPoint}`).then((res) => {
            setProductData(res)
            setisLoading(false);
        })
    }, [id]);


    const filterData = (subCatId) => {
        setisLoading(true);

        fetchDataFromApi(`/api/products?subCatId=${subCatId}`).then((res) => {
            setProductData(res);
            setisLoading(false);
        })
    }

    const filterByPrice = (price, subCatId) => {
        setisLoading(true);

        fetchDataFromApi(`/api/products?minPrice=${price[0]}&maxPrice=${price[1]}&subCatId=${subCatId}`).then((res) => {
            setProductData(res)
            console.log(res)
            setisLoading(false);
        })
    }

    const filterByRating = async (rating, subCatId) => {

        setisLoading(true);
        const result = await axios.get(`http://localhost:4000/api/products?rating=${rating}&subCatId=${subCatId}`)
        setProductData(result?.data)
        setisLoading(false)
    }


    const handleChange = (event, value) => {
        setisLoading(true);
        window.scrollTo({
            top: 200,
            behavior: 'smooth',
        })
        fetchDataFromApi(`/api/products?subCatId=${id}&page=${value}&perPage=6`).then((res) => {
            setProductData(res);
            setisLoading(false);
        })
    };
    const openFilters = () => {
        setIsOpenFilter(!isOpenFilter)
    }

    if (isLoading) {
        return <div className="loaderContainer">
          <CircularProgress color="inherit" />
        </div>;
    }
    if (productData?.products?.length === 0) {
        return (
          <div className="not-ava-msg">
            <h6>
              Sorry, there are no products available in this category at the moment.
              Please check back later or explore other categories.
            </h6>
            <BsEmojiExpressionless/>
            <Button className="btn btn-blue btn-lg mt-2"><Link to={'/'}>Back</Link></Button>
          </div>
        );
      }
    return (
        <>
            <section className="product_Listing_Page">
                <div className="container">
                    <div className="productListing w-100">
                        {/* <Sidebar filterData={filterData} filterByPrice={filterByPrice} filterByRating={filterByRating} isOpenFilter={isOpenFilter} /> */}

                        <div className="content_right">
                            <div className="showBy mt-0 mb-3 d-flex align-items-center ">
                                <p>Showing result for</p>
                            </div>

                            <div className="productListing-data">
                                {
                                    isLoading === true ?
                                        <div className="d-flex align-items-center justify-content-center">
                                            <CircularProgress color="inherit" />
                                        </div>
                                        :

                                        <>
                                            {
                                                productData?.products?.map((item, index) => {
                                                    return (
                                                        <ProductItem key={index} itemView={productView} item={item} />
                                                    )
                                                })
                                            }
                                        </>

                                }



                            </div>
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

export default Listing;