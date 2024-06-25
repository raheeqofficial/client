import Dialog from '@mui/material/Dialog';
import { MdClose } from "react-icons/md";
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import { useContext, useEffect, useState } from 'react';
import QuantityBox from '../QuantityBox';
import { IoIosHeartEmpty } from "react-icons/io";
import { MdOutlineCompareArrows } from "react-icons/md";
import { MyContext } from '../../App';
import ProductZoom from '../ProductZoom';
import { IoCartSharp } from "react-icons/io5";
import { fetchDataFromApi, postData } from '../../utils/api';
import { FaHeart } from "react-icons/fa";
import { CircularProgress } from '@mui/material';
import { AiOutlineShoppingCart } from "react-icons/ai";


const ProductModal = (props) => {

    const [productQuantity, setProductQuantity] = useState();
    const [chengeQuantity, setchengeQuantity] = useState(0);
    let [cartFields, setCartFields] = useState({});
    
    const [activeWeight, setActiveWeight] = useState(null);
    const [activeColor, setActiveColor] = useState(null);
    const [activeRam, setActiveRam] = useState(null);
    const [activeTabs, setActiveTabs] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [activeSize, setActiveSize] = useState(null);
    const [isAddedToMyList, setSsAddedToMyList] = useState(false);
    const [tabError, setTabError] = useState(false);
    const [weightTabError, setWeightTabError] = useState(false);
    const [colorTabError, setColorTabError] = useState(false);
    const [ramTabError, setRamTabError] = useState(false);

    const context = useContext(MyContext);
    const isActiveSize = (index) => {
        setActiveSize(index);
        setTabError(false);
    }
    const isActiveWeight = (index) => {
        setActiveWeight(index)
        setWeightTabError(false);
    }
    const isActiveColor = (index) => {
        setActiveColor(index)
        setColorTabError(false);
    }
    const isActiveRam = (index) => {
        setActiveRam(index)
        setRamTabError(false);
    }

    useEffect(() => {
        if (props?.data?.productRam.length === 0 && props?.data?.productWeight.length === 0 && props?.data?.size.length === 0) {
            setActiveSize(1);
                setActiveRam(1);
                setActiveWeight(1);
                setActiveColor(1);
        }

        const user = JSON.parse(localStorage.getItem("user"));

        fetchDataFromApi(`/api/my-list?productId=${props?.data?.id}&userId=${user?.userId}`).then((res) => {
            if (res.length !== 0) {
                setSsAddedToMyList(true);
            }
        })

    }, [])

    const quantity = (val) => {
        setProductQuantity(val);
        setchengeQuantity(val)
    }

    const isActive = (index) => {
        setActiveSize(index);
        setTabError(false);
    }

    // const selectedItem = (item, quantityVal) => {
    //     if (chengeQuantity !== 0) {
    //         setIsLoading(true);
    //         const user = JSON.parse(localStorage.getItem("user"));
    //         cartFields.productTitle = item?.productTitle
    //         cartFields.image = item?.image
    //         cartFields.rating = item?.rating
    //         cartFields.price = item?.price
    //         cartFields.quantity = quantityVal
    //         cartFields.subTotal = parseInt(item?.price * quantityVal)
    //         cartFields.productId = item?.id
    //         cartFields.userId = user?.userId

    //         //console.log(item?._id)

    //         editData(`/api/cart/${item?._id}`, cartFields).then((res) => {
    //             setTimeout(() => {
    //                 setIsLoading(false);
    //                 const user = JSON.parse(localStorage.getItem("user"));
    //                 fetchDataFromApi(`/api/cart?userId=${user?.userId}`).then((res) => {
    //                     setCartData(res);
    //                 })
    //             }, 1000)
    //         })
    //     }

    // }


    // const addtoCart = () => {

    //     if (activeSize !== null) {
    //         const user = JSON.parse(localStorage.getItem("user"));

    //         cartFields.productTitle = props?.data?.name
    //         cartFields.productSize = props?.data?.size
    //         cartFields.productWeight = props?.data?.productWeight
    //         cartFields.productColor = props?.data?.color
    //         cartFields.productRam = props?.data?.productRam
    //         cartFields.image = props?.data?.images[0]
    //         cartFields.rating = props?.data?.rating
    //         cartFields.price = props?.data?.price
    //         cartFields.quantity = productQuantity
    //         cartFields.subTotal = parseInt(props?.data?.price * productQuantity)
    //         cartFields.productId = props?.data?.id
    //         cartFields.userId = user?.userId


    //         context.addToCart(cartFields);
    //     } else {
    //         setTabError(true);
    //     }

    // }
    const addtoCart = () => {
        const hasSize = props?.data?.size?.length > 0 
        const hasRam = props?.data?.productRam?.length > 0;
        const hasWeight = props?.data?.productWeight?.length > 0;
        const hasColor = props?.data?.color?.length > 0;
    
        if ((hasSize && activeSize !== null) || (hasWeight && activeWeight !== null) || (hasColor && activeColor !== null) || (hasRam && activeRam !== null)) {
            const user = JSON.parse(localStorage.getItem("user"));
            const selectedSize = props?.data?.size?.length !== 0 ? props?.data.size[activeSize] : null
            const selectedWeight = props?.data?.productWeight?.length !== 0 ? props?.data.productWeight[activeWeight] : null
            const selectedColor = props?.data?.color?.length !== 0 ? props?.data.color[activeColor] : null
            const selectedRam = props?.data?.productRam?.length !== 0 ? props?.data.productRam[activeRam] : null


            cartFields.productTitle = props?.data?.name
            cartFields.productSize = selectedSize
            cartFields.productWeight = selectedWeight
            cartFields.productRam = selectedRam
            cartFields.productColor = selectedColor
            cartFields.image = props?.data?.images[0]
            cartFields.rating = props?.data?.rating
            cartFields.price = props?.data?.price
            cartFields.quantity = productQuantity
            cartFields.subTotal = parseInt(props?.data?.price * productQuantity)
            cartFields.productId = props?.data?.id
            cartFields.userId = user?.userId


            context.addToCart(cartFields);
        } else {
            setTabError(!hasSize || activeSize === null);
            setColorTabError(!hasColor || activeColor === null);
            setWeightTabError(!hasWeight || activeWeight === null);
            setRamTabError(!hasRam || activeRam === null);
        }

    }


    const addToMyList = (id) => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user !== undefined && user !== null && user !== "") {
            const data = {
                productTitle: props?.data?.name,
                productSize: props?.data?.size,
                productWeight: props?.data?.productWeight,
                productColor: props?.data?.color,
                productRam: props?.data?.productRam,
                image: props?.data?.images[0],
                rating: props?.data?.rating,
                price: props?.data?.price,
                productId: id,
                userId: user?.userId
            }
            postData(`/api/my-list/add/`, data).then((res) => {
                if (res.status !== false) {
                    context.setAlertBox({
                        open: true,
                        error: false,
                        msg: "the product added in my list"
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
            <Dialog open={context.isOpenProductModal} className="productModal" onClose={() => context.setisOpenProductModal(false)}>
                <Button className='close_' onClick={() => context.setisOpenProductModal(false)}><MdClose /></Button>
                <h4 class="mb-1 font-weight-bold pr-5">{props?.data?.name}</h4>
                <div className='d-flex align-items-center'>
                    <div className='d-flex align-items-center mr-4'>
                        <span>Brands:</span>
                        <span className='ml-2'><b>{props?.data?.brand}</b> </span>
                    </div>

                    <Rating name="read-only" value={parseInt(props?.data?.rating)} size="small" precision={0.5} readOnly />
                </div>


                <hr />


                <div className='row mt-2 productDetaileModal'>
                    <div className='col-md-5'>
                        <ProductZoom images={props?.data?.images} discount={props?.data?.discount} />
                    </div>

                    <div className='col-md-7'>
                        <div className='d-flex info align-items-center mb-3'>
                            <span className='oldPrice lg mr-2'>Rs: {props?.data?.oldPrice}</span>
                            <span className='netPrice text-danger lg'>Rs: {props?.data?.price}</span>
                        </div>

                        <span className="badge bg-success">IN STOCK</span>

                        <p className='mt-3'>Rs: {props?.data?.description}</p>



                        {
                            props?.data?.productRam?.length !== 0 &&
                            <div className='productSize d-flex align-items-center'>
                                <span>RAM:</span>
                                <ul className={`list list-inline mb-0 pl-4 ${ramTabError === true && 'error'}`}>
                                    {
                                        props?.data?.productRam?.map((item, index) => {
                                            return (
                                                <li className='list-inline-item'><a className={`tag ${activeRam === index ? 'active' : ''}`} onClick={() => isActiveRam(index)}>{item}</a></li>
                                            )
                                        })
                                    }

                                </ul>
                            </div>
                        }


                        {
                            props?.data?.size?.length !== 0 &&
                            <div className='productSize d-flex align-items-center'>
                                <span>Size:</span>
                                <ul className={`list list-inline mb-0 pl-4 ${tabError === true && 'error'}`}>
                                    {
                                        props?.data?.size?.map((item, index) => {
                                            return (
                                                <li className='list-inline-item'><a className={`tag ${activeSize === index ? 'active' : ''}`} onClick={() => isActiveSize(index)}>{item}</a></li>
                                            )
                                        })
                                    }

                                </ul>
                            </div>
                        }


                        {
                            props?.data?.productWeight?.length !== 0 &&
                            <div className='productSize d-flex align-items-center'>
                                <span>Weight:</span>
                                <ul className={`list list-inline mb-0 pl-4 ${weightTabError === true && 'error'}`}>
                                    {
                                        props?.data?.productWeight?.map((item, index) => {
                                            return (
                                                <li className='list-inline-item'><a className={`tag ${activeWeight === index ? 'active' : ''}`} onClick={() => isActiveWeight(index)}>{item}</a></li>
                                            )
                                        })
                                    }

                                </ul>
                            </div>
                        }
                        {
                                props?.data?.color?.length !== 0 &&
                                <div className='productSize d-flex align-items-center'>
                                    <span>Color:</span>
                                    <ul className={`list list-inline mb-0 pl-4 ${colorTabError === true && 'error'}`}>
                                        {
                                            props?.data?.color?.map((item, index) => {
                                                return (
                                                    <li className='list-inline-item'><a className={`tag ${activeColor === index ? 'active' : ''}`} onClick={() => isActiveColor(index)}>{item}</a></li>
                                                )
                                            })
                                        }

                                    </ul>
                                </div>
                            }


                        <div className='d-flex align-items-center'>
                            <QuantityBox quantity={quantity} item={props?.data} />

                            <div className='lgBtn'>
                            <Button className=' btn-blue bg-red btn-lg btn-big btn-round ml-3' onClick={() => addtoCart()}><IoCartSharp />
                                {
                                    context.addingInCart === true ? "adding..." : " Add to cart"
                                }
                            </Button>
                            </div>
                            <div className='smBtn'>
                            <Button className=' btn-blue bg-red btn-lg btn-big btn-round ml-3' onClick={() => addtoCart()}><IoCartSharp />
                                {
                                    context.addingInCart === true && <AiOutlineShoppingCart/>
                                }
                            </Button>
                            </div>
                        </div>


                        <div className='d-flex align-items-center mt-5 actions'>
                            <Button className='btn-round btn-sml' variant="outlined" onClick={() => addToMyList(props?.data?.id)} >

                                {
                                    isAddedToMyList === true ?
                                    <>
                                        <FaHeart className="text-danger" />
                                        &nbsp; ADDED TO WISHLIST
                                    </>

                                    :

                                <>
                                    <IoIosHeartEmpty />
                                    &nbsp; ADD TO WISHLIST
                                </>
                                }


                            </Button>
                            <Button className='btn-round btn-sml ml-3' variant="outlined"><MdOutlineCompareArrows /> &nbsp; COMPARE</Button>
                        </div>

                    </div>

                </div>



            </Dialog>
        </>
    )
}

export default ProductModal;