import Rating from '@mui/material/Rating';
import { TfiFullscreen } from "react-icons/tfi";
import Button from '@mui/material/Button';
import { IoMdHeartEmpty } from "react-icons/io";
import { useContext, useEffect, useRef, useState } from 'react';
import { MyContext } from '../../App';
import { Link } from 'react-router-dom';

import Slider from "react-slick";
import { IoIosImages } from "react-icons/io";
import { fetchDataFromApi, postData } from '../../utils/api';
import { FaHeart } from "react-icons/fa";

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ProductItem = (props) => {

    const [isHovered, setIsHovered] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isAddedToMyList, setSsAddedToMyList] = useState(false);

    const context = useContext(MyContext);

    const sliderRef = useRef();

    var settings = {
        dots: true,
        infinite: true,
        loop: true,
        speed: 200,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: 100
    };

    const viewProductDetails = (id) => {
        context.openProductDetailsModal(id, true);
    }

    const handleMouseEnter = (id) => {
        if (isLoading === false) {
            setIsHovered(true);
            setTimeout(() => {
                if (sliderRef.current) {
                    sliderRef.current.slickPlay();
                }
            }, 20);
        }

        const user = JSON.parse(localStorage.getItem("user"));

        fetchDataFromApi(`/api/my-list?productId=${id}&userId=${user?.userId}`).then((res) => {
            if (res.length !== 0) {
                setSsAddedToMyList(true);
            }
        })

    }


    const handleMouseLeave = () => {
        if (isLoading === false) {
            setIsHovered(false);
            setTimeout(() => {
                if (sliderRef.current) {
                    sliderRef.current.slickPause();
                }
            }, 20);
        }
    }


    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }, []);

    const addToMyList = (id) => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user !== undefined && user !== null && user !== "") {
            const data = {
                productTitle: props?.item?.name,
                countInStock: props?.item?.countInStock,
                shop: props?.item?.shop,
                staticId: props?.item?.staticId,
                productSize: props?.item?.size,
                productWeight: props?.item?.productWeight,
                productColor: props?.item?.color,
                productRam: props?.item?.productRam,
                image: props.item?.images[0],
                rating: props?.item?.rating,
                price: props?.item?.price,
                productId: props?.item?.staticId,
                userId: user?.userId
            }
            postData(`/api/my-list/add/`, data).then((res) => {
                if (res.status !== false) {
                    context.setAlertBox({
                        open: true,
                        error: false,
                        msg: "the product added in my list"
                    })



                    fetchDataFromApi(`/api/my-list?staticId=${id}&userId=${user?.userId}`).then((res) => {
                        if (res.length !== 0) {
                            setSsAddedToMyList(true);
                        }
                    })


                } else {
                    context.setAlertBox({
                        open: true,
                        error: true,
                        msg: res.msg
                    })
                }

            })
        } else {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Please Login to continue"
            })
        }

    }

    return (
        <>
            {
                isLoading ? (
                    <div className="product-skeleton">
                        <Skeleton height={300} width={200} />
                        <Skeleton height={20} width={150} />
                        <Skeleton height={20} width={100} />
                        <Skeleton height={20} width={50} />
                    </div>
                ) : (
                    <div className={`productItem ${props.itemView}`}
                        onMouseEnter={() => handleMouseEnter(props?.itemView === 'recentlyView' ? props.item?.staticId : props.item?.staticId)}
                        onMouseLeave={handleMouseLeave}
                    >

                        <div className="img_rapper">
                            <Link to={`/product/${props?.itemView === 'recentlyView' ? props.item?.staticId : props.item?.staticId}`}>
                                <div className='productItemSliderWrapper'>
                                    {
                                        isHovered === true &&
                                        <Slider {...settings} ref={sliderRef} className='productItemSlider'>
                                            {
                                                props.item?.images?.map((image, index) => {
                                                    return (
                                                        <div className='slick-slide' key={index}>
                                                            <img src={image} className="w-100" />
                                                        </div>
                                                    )
                                                })
                                            }

                                        </Slider>
                                    }

                                </div>

                                {
                                    isLoading === true ?
                                        <Skeleton variant="rectangular" width={300} height={400}>
                                            <IoIosImages />
                                        </Skeleton>

                                        :

                                        <img src={props.item?.images[0]} className="w-100" />
                                }




                            </Link>

                            <span className="badge badge-primary">{props.item?.discount}%</span>
                            <div className="actions">
                                <Button onClick={() => viewProductDetails(props?.itemView === 'recentlyView' ? props.item?.staticId : props.item?.staticId)}><TfiFullscreen /></Button>

                                <Button className={isAddedToMyList === true && 'active'} onClick={() => addToMyList(props?.itemView === 'recentlyView' ? props.item?.staticId : props.item?.staticId)}>
                                    {
                                        isAddedToMyList === true ? <FaHeart style={{ fontSize: '20px' }} />
                                            :
                                            <IoMdHeartEmpty style={{ fontSize: '20px' }} />
                                    }

                                </Button>
                            </div>

                        </div>

                        <div className="info">
                            <div className='infoWrapper'>
                                <Link to={`/product/${props?.itemView === 'recentlyView' ? props.item?.staticId : props.item?.staticId}`}><h4>{props?.item?.name?.substr(0, 30) + '...'}</h4></Link>

                                {
                                    props?.item?.countInStock >= 1 ? <span className="text-success d-block">In Stock</span>
                                        :

                                        <span className="text-danger d-block">Out of Stock</span>

                                }

                                <Rating className="info-rating" name="read-only" value={props?.item?.rating} readOnly size="small" precision={0.5} />

                                <div className="d-flex">
                                    <span className="oldPrice">Rs {props?.item?.oldPrice}</span>
                                    <span className="netPrice text-danger ml-2">Rs {props?.item?.price}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                )
            }




            {/*<ProductModal/> */}
        </>
    )
}

export default ProductItem