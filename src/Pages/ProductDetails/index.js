import ProductZoom from "../../Components/ProductZoom";
import Rating from '@mui/material/Rating';
import QuantityBox from "../../Components/QuantityBox";
import Button from '@mui/material/Button';
import { BsCartFill } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineCompareArrows } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';
import RelatedProducts from "./RelatedProducts";

import { useNavigate, useParams } from "react-router-dom";
import { fetchDataFromApi, postData } from "../../utils/api";
import CircularProgress from '@mui/material/CircularProgress';
import { MyContext } from "../../App";
import { FaHeart } from "react-icons/fa";

import moment from 'moment';
import axios from "axios";
import { Helmet } from "react-helmet-async";

const formatDate = (isoDate) => {
  return moment(isoDate).format('DD/MM/YYYY hh:mm A');
};

const ProductDetails = () => {
    const history = useNavigate();
    const [activeSize, setActiveSize] = useState(null);
    const [activeWeight, setActiveWeight] = useState(null);
    const [activeColor, setActiveColor] = useState(null);
    const [activeRam, setActiveRam] = useState(null);
    const [activeTabs, setActiveTabs] = useState(0);
    const [productData, setProductData] = useState([]);
    const [relatedProductData, setRelatedProductData] = useState([]);
    const [recentlyViewdProducts, setRecentlyViewdProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [reviewsData, setreviewsData] = useState([]);
    const [isAddedToMyList, setSsAddedToMyList] = useState(false);

    let [cartFields, setCartFields] = useState({});
    let [productQuantity, setProductQuantity] = useState();
    const [tabError, setTabError] = useState(false);
    const [weightTabError, setWeightTabError] = useState(false);
    const [colorTabError, setColorTabError] = useState(false);
    const [ramTabError, setRamTabError] = useState(false);

    const { id } = useParams();

    const context = useContext(MyContext);
    const [error, setError] = useState(null);

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
    const { staticId } = useParams();

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const url = `/api/products/staticId/${staticId}`;
    //             console.log('Fetching URL:', url); 
    //             const response = await axios.get(url);
    //             console.log('Response:', response.data);
    //         } catch (error) {
    //             console.error('Error fetching product:', error.response?.data || error.message);
    //         }
    //     };

    //     fetchData();
    // }, [staticId]);

    useEffect(() => {
        window.scrollTo(0, 0);
        setActiveSize(null);
        setActiveColor(null);
        setActiveWeight(null);
        setActiveWeight(null);
        const fetchProduct = async () => {
          try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/staticId/${id}`);
            setProductData(res?.data);
            if (res?.data?.productRam?.length === 0 && res?.data?.productWeight?.length === 0 && res?.data?.size?.length === 0 && res?.data?.color?.length === 0) {
                setActiveSize(1);
                setActiveRam(1);
                setActiveWeight(1);
                setActiveColor(1);
            }
            fetchDataFromApi(`/api/products?subCatId=${res?.data?.subCatId}`)
                .then((res) => {
                    const filteredData = res?.products?.filter(item => item.id !== id);
                    setRelatedProductData(filteredData)
                })
            fetchDataFromApi(`/api/products/recentlyViewd`).then((response) => {
                setRecentlyViewdProducts(response);
                console.log(response)
            })
            postData(`/api/products/recentlyViewd`, res?.data);
          } catch (err) {
            if (axios.isAxiosError(err)) {
              if (err.response && err.response.status === 404) {
                history('/product/error');
              } else {
                setError('An unexpected error occurred');
              }
            } else {
              setError('An unexpected error occurred');
            }
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchProduct();
        fetchDataFromApi(`/api/productReviews?productId=${id}`).then((res) => {
            setreviewsData(res)
        })


        const user = JSON.parse(localStorage.getItem("user"));

        fetchDataFromApi(`/api/my-list?productId=${id}&userId=${user?.userId}`).then((res) => {
            if (res.length !== 0) {
                setSsAddedToMyList(true);
            }
        })
      }, [id, history]);

    useEffect(() => {
        
        
        // fetchDataFromApi(`/api/products/staticId/${id}`).then((res) => {
        //     try {
        //        if(res.eroor !== true){
        //         setProductData(res);
                // if (res?.productRam?.length === 0 && res?.productWeight?.length === 0 && res?.size?.length === 0 && res?.color?.length === 0) {
                //     setActiveSize(1);
                //     setActiveRam(1);
                //     setActiveWeight(1);
                //     setActiveColor(1);
                // }
                // fetchDataFromApi(`/api/products?subCatId=${res?.subCatId}`)
                //     .then((res) => {
                //         const filteredData = res?.products?.filter(item => item.id !== id);
                //         setRelatedProductData(filteredData)
                //     })
                // fetchDataFromApi(`/api/products/recentlyViewd`).then((response) => {
                //     setRecentlyViewdProducts(response);
                //     console.log(response)
                // })
                // postData(`/api/products/recentlyViewd`, res);
        //        }else{
        //         context.setAlertBox({
        //             open: true,
        //             error: true,
        //             msg: res.msg
        //         }
        //     );
        //         setIsLoading(false)
        //        }
        //     } catch (err) {
        //         console.log(err)
        //     }
        // })


        

    }, [id]);


    const [rating, setRating] = useState(1);
    const [reviews, setReviews] = useState({
        productId: "",
        customerName: "",
        customerId: "",
        review: "",
        shop:"",
        staticId:"",
        customerRating: 0
    });

    const onChangeInput = (e) => {
        setReviews(() => ({
            ...reviews,
            [e.target.name]: e.target.value
        }))
    }

    const changeRating = (e) => {
        setRating(e.target.value)
        reviews.customerRating = e.target.value
    }

    const addReview = (e) => {
        e.preventDefault();

        const user = JSON.parse(localStorage.getItem("user"));

        reviews.customerName = user?.name;
        reviews.customerId = user?.userId;
        reviews.productId = id
        reviews.shop = productData?.shop
        reviews.staticId = productData?.staticId

        setIsLoading(true);

        postData("/api/productReviews/add", reviews).then((res) => {
            setIsLoading(false);

            reviews.customerRating = 1;

            setReviews({
                review: "",
                customerRating: 1
            })
            setIsLoading(false)
            fetchDataFromApi(`/api/productReviews?productId=${id}`).then((res) => {
                setreviewsData(res);
            })
            setIsLoading(false)
        })

    }

    const quantity = (val) => {
        setProductQuantity(val)
    }

    const addtoCart = () => {
        const hasSize = productData?.size?.length > 0 
        const hasRam = productData?.productRam?.length > 0;
        const hasWeight = productData?.productWeight?.length > 0;
        const hasColor = productData?.color?.length > 0;
    
        if (((hasSize && activeSize !== null) ) || (hasWeight && activeWeight !== null)  || ((hasRam && activeRam !== null) && (hasColor && activeColor !== null))) {
            const user = JSON.parse(localStorage.getItem("user"));
            const selectedSize = productData?.size?.length !== 0 ? productData.size[activeSize] : null
            const selectedWeight = productData?.productWeight?.length !== 0 ? productData.productWeight[activeWeight] : null
            const selectedColor = productData?.color?.length !== 0 ? productData.color[activeColor] : null
            const selectedRam = productData?.productRam?.length !== 0 ? productData.productRam[activeRam] : null
            cartFields.productTitle = productData?.name
            cartFields.shop = productData?.shop
            cartFields.staticId = productData?.staticId
            cartFields.productSize = selectedSize
            cartFields.productWeight = selectedWeight
            cartFields.productRam = selectedRam
            cartFields.productColor = selectedColor
            cartFields.image = productData?.images[0]
            cartFields.rating = productData?.rating
            cartFields.price = productData?.price
            cartFields.quantity = productQuantity
            cartFields.subTotal = parseInt(productData?.price * productQuantity)
            cartFields.productId = productData?.id
            cartFields.userId = user?.userId


            context.addToCart(cartFields);
        } else {
            setTabError(!hasSize || activeSize === null);
            setColorTabError(!hasColor || activeColor === null);
            setWeightTabError(!hasWeight || activeWeight === null);
            setRamTabError(!hasRam || activeRam === null);
        }

    }

    const selectedItem = () => {

    }
    const gotoReviews = () => {
        window.scrollTo({
            top: 550,
            behavior: 'smooth',
        })

        setActiveTabs(2)
    }



    const addToMyList = (id) => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user !== undefined && user !== null && user !== "") {
            const data = {
                productTitle: productData?.name,
                shop: productData?.shop,
                productSize: productData?.size,
                staticId: productData?.staticId,
                productWeight: productData?.productWeight,
                productColor: productData?.color,
                productRam: productData?.productRam,
                image: productData?.images[0],
                rating: productData?.rating,
                price: productData?.price,
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

            
                    fetchDataFromApi(`/api/my-list?productId=${id}&userId=${user?.userId}`).then((res) => {
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
        
    <Helmet>
    <title>{productData?.name ? `${productData.name} - EliphStore` : 'EliphStore'}</title>
    
      <meta
        name="description"
        content="Experience the future of online shopping at Eliphstore, where innovation meets tradition. Support a global community of creators and entrepreneurs with every purchase. Shop smart, shop Eliphstore!."
      />
      <meta
        name="keywords"
        content="Product details, Eliphstore.com, online shopping website, online shop, online store website, clothing websites, online shopping sites, best online clothing stores, shopping websites, shopping sites, clothing online stores, best online shopping websites, good online clothing stores, store website, best online shopping sites, best online store, best online clothes shopping, clothes online, top online clothing stores, clothing store online shopping, website online shop, internet shopping sites, all online shopping websites, good online shopping sites, best online clothes shops, good online shops, online shops for clothes, good online shopping websites, top shopping sites, e-commerce store, online store, buy online, buy clothes online, online fashion store, discount shopping online, shop online for electronics, buy shoes online, women's clothes online, top-selling products online, online sale, e-store, online jewellery shopping, clothing sales online, cheap clothing brands, men's sale clothing, women's sale clothing, Eliphstore.com, multivendor online store, shopping needs, multivendor online store, clothing, footwear, fashion, kitchen accessories, latest fashion trends, home essentials, unique gifts, seamless shopping experience, customer service, variety of choices, multivendor marketplace, quality and variety, online shopping in Pakistan, newest fashion trends, renowned brands, seasonal collections, Pakistani brands, shawls, sweaters, t-shirts, caps, hoodies, sleeves, trousers, kurtas, kurtis, coats, shrugs, jackets, boots, sneakers, flats, high heels, khussa, stitched and unstitched clothes, chic accessories, jewelry, watches, scarves, hijabs, perfumes, hottest new arrivals, timeless style, modern trends, high-quality fashion wear, elegant dresses, stylish shoes, trendy handbags, top 10 online branded shopping sites, competitive prices, 24/7 service, fast delivery, effortless shopping,
       designer collections, seamless online shopping experience "
      />
    </Helmet>
            <section className="productDetails section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 pl-5 part1">
                            <ProductZoom images={productData?.images} discount={productData?.discount} />
                        </div>

                        <div className="col-md-7 pl-5 pr-5 part2">
                            <h2 className="hd text-capitalize">{productData?.name}</h2>
                            <ul className="list list-inline d-flex align-items-center">
                                <li className="list-inline-item">
                                    <div className="d-flex align-items-center">
                                        <span className="text-light mr-2">Brands : </span>
                                        <span>{productData?.brand}</span>
                                    </div>
                                </li>

                                <li className="list-inline-item">
                                    <div className="d-flex align-items-center">
                                        <Rating name="read-only" value={parseInt(productData?.rating)} precision={0.5} readOnly size="small" />

                                        <span className="text-light cursor ml-2" onClick={gotoReviews}>{reviewsData?.length} Review</span>
                                    </div>
                                </li>

                            </ul>



                            <div className="d-flex info mb-3">
                                <span className="oldPrice">Rs: {productData?.oldPrice}</span>
                                <span className="netPrice text-danger ml-2">Rs: {productData?.price}</span>
                            </div>

                            {
                                productData?.countInStock >= 1 ?
                                    <span className="badge badge-success">IN STOCK</span>
                                    :
                                    <span className="badge badge-danger">OUT OF STOCK</span>
                            }



                            <p className="mt-3">Rs: {productData?.description}
                            </p>


                            {
                                productData?.productRam?.length !== 0 &&
                                <div className='productSize d-flex align-items-center'>
                                    <span>RAM:</span>
                                    <ul className={`list list-inline mb-0 pl-4 ${ramTabError === true && 'error'}`}>
                                        {
                                            productData?.productRam?.map((item, index) => {
                                                return (
                                                    <li className='list-inline-item'><a className={`tag ${activeRam === index ? 'active' : ''}`} onClick={() => isActiveRam(index)}>{item}</a></li>
                                                )
                                            })
                                        }

                                    </ul>
                                </div>
                            }


                            {
                                productData?.size?.length !== 0 &&
                                <div className='productSize d-flex align-items-center'>
                                    <span>Size:</span>
                                    <ul className={`list list-inline mb-0 pl-4 ${tabError === true && 'error'}`}>
                                        {
                                            productData?.size?.map((item, index) => {
                                                return (
                                                    <li className='list-inline-item'><a className={`tag ${activeSize === index ? 'active' : ''}`} onClick={() => isActiveSize(index)}>{item}</a></li>
                                                )
                                            })
                                        }

                                    </ul>
                                </div>
                            }


                            {
                                productData?.productWeight?.length !== 0 &&
                                <div className='productSize d-flex align-items-center'>
                                    <span>Weight:</span>
                                    <ul className={`list list-inline mb-0 pl-4 ${weightTabError === true && 'error'}`}>
                                        {
                                            productData?.productWeight?.map((item, index) => {
                                                return (
                                                    <li className='list-inline-item'><a className={`tag ${activeWeight === index ? 'active' : ''}`} onClick={() => isActiveWeight(index)}>{item}</a></li>
                                                )
                                            })
                                        }

                                    </ul>
                                </div>
                            }
                            {
                                productData?.color?.length !== 0 &&
                                <div className='productSize d-flex align-items-center'>
                                    <span>Color:</span>
                                    <ul className={`list list-inline mb-0 pl-4 ${colorTabError === true && 'error'}`}>
                                        {
                                            productData?.color?.map((item, index) => {
                                                return (
                                                    <li className='list-inline-item'><a className={`tag ${activeColor === index ? 'active' : ''}`} onClick={() => isActiveColor(index)}>{item}</a></li>
                                                )
                                            })
                                        }

                                    </ul>
                                </div>
                            }


                            <div className="d-flex align-items-center mt-3 actions_">
                                <QuantityBox quantity={quantity} item={productData} selectedItem={selectedItem} />
                                

                                <div className="d-flex align-items-center btnActions">
                                <Button className={`btn-blue btn-lg btn-big btn-round bg-red ${productData?.countInStock === 0 && 'btn-disabled'}`} disabled={productData?.countInStock === 0} onClick={() => addtoCart()}>
                                    <BsCartFill /> &nbsp;
                                    {
                                        context.addingInCart === true ? "adding..." : " Add to cart"
                                    }

                                </Button>

                                <Tooltip title={`${isAddedToMyList === true ? 'Added to Wishlist' : 'Add to Wishlist'}`} placement="top">
                                    <Button className={`btn-blue btn-lg btn-big btn-circle ml-4 ${isAddedToMyList === true && 'active'}`} onClick={() => addToMyList(id)}>
                                        {
                                            isAddedToMyList === true ? <FaHeart className="text-danger" />

                                                :
                                                <FaRegHeart />
                                        }

                                    </Button>
                                </Tooltip>

                                <Tooltip title="Add to Compare" placement="top">
                                    <Button className="btn-blue btn-lg btn-big btn-circle ml-2">
                                        <MdOutlineCompareArrows />
                                    </Button>
                                </Tooltip>

                                </div>

                            </div>


                        </div>
                    </div>


                    <br />



                    <div className='card mt-5 p-5 detailsPageTabs'>
                        <div className='customTabs'>
                            <ul className='list list-inline'>
                                <li className='list-inline-item'>
                                    <Button className={`${activeTabs === 0 && 'active'}`}
                                        onClick={() => {
                                            setActiveTabs(0)
                                        }}
                                    >Description</Button>
                                </li>
                                <li className='list-inline-item'>
                                    <Button className={`${activeTabs === 1 && 'active'}`}
                                        onClick={() => {
                                            setActiveTabs(1)

                                        }}
                                    >Additional info</Button>
                                </li>
                                <li className='list-inline-item'>
                                    <Button className={`${activeTabs === 2 && 'active'}`}
                                        onClick={() => {
                                            setActiveTabs(2)

                                        }}
                                    >Reviews ({reviewsData?.length})</Button>
                                </li>

                            </ul>


                            <br />

                            {
                                activeTabs === 0 &&
                                <div className='tabContent'>
                                    {productData?.description}
                                </div>

                            }


                            {
                                activeTabs === 1 &&

                                <div className='tabContent'>
                                    <div className='table-responsive'>
                                        <table className='table table-bordered'>
                                            <tbody>
                                                <tr className="stand-up">
                                                    <th>Stand Up</th>
                                                    <td>
                                                        <p>35″L x 24″W x 37-45″H(front to back wheel)</p>
                                                    </td>
                                                </tr>
                                                <tr className="folded-wo-wheels">
                                                    <th>Folded (w/o wheels)</th>
                                                    <td>
                                                        <p>32.5″L x 18.5″W x 16.5″H</p>
                                                    </td>
                                                </tr>
                                                <tr className="folded-w-wheels">
                                                    <th>Folded (w/ wheels)</th>
                                                    <td>
                                                        <p>32.5″L x 24″W x 18.5″H</p>
                                                    </td>
                                                </tr>
                                                <tr className="door-pass-through">
                                                    <th>Door Pass Through</th>
                                                    <td>
                                                        <p>24</p>
                                                    </td>
                                                </tr>
                                                <tr className="frame">
                                                    <th>Frame</th>
                                                    <td>
                                                        <p>Aluminum</p>
                                                    </td>
                                                </tr>
                                                <tr className="weight-wo-wheels">
                                                    <th>Weight (w/o wheels)</th>
                                                    <td>
                                                        <p>20 LBS</p>
                                                    </td>
                                                </tr>
                                                <tr className="weight-capacity">
                                                    <th>Weight Capacity</th>
                                                    <td>
                                                        <p>60 LBS</p>
                                                    </td>
                                                </tr>
                                                <tr className="width">
                                                    <th>Width</th>
                                                    <td>
                                                        <p>24″</p>
                                                    </td>
                                                </tr>
                                                <tr className="handle-height-ground-to-handle">
                                                    <th>Handle height (ground to handle)</th>
                                                    <td>
                                                        <p>37-45″</p>
                                                    </td>
                                                </tr>
                                                <tr className="wheels">
                                                    <th>Wheels</th>
                                                    <td>
                                                        <p>12″ air / wide track slick tread</p>
                                                    </td>
                                                </tr>
                                                <tr className="seat-back-height">
                                                    <th>Seat back height</th>
                                                    <td>
                                                        <p>21.5″</p>
                                                    </td>
                                                </tr>
                                                <tr className="head-room-inside-canopy">
                                                    <th>Head room (inside canopy)</th>
                                                    <td>
                                                        <p>25″</p>
                                                    </td>
                                                </tr>
                                                <tr className="pa_color">
                                                    <th>Color</th>
                                                    <td>
                                                        <p>Black, Blue, Red, White</p>
                                                    </td>
                                                </tr>
                                                <tr className="pa_size">
                                                    <th>Size</th>
                                                    <td>
                                                        <p>M, S</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            }



                            {
                                activeTabs === 2 &&

                                <div className='tabContent'>
                                    <div className='row'>
                                        <div className='col-md-8'>
                                            <h3>Customer questions & answers</h3>
                                            <br />

                                            {
                                                reviewsData?.length !== 0 && reviewsData?.slice(0)?.reverse()?.map((item, index) => {
                                                    const formattedDate = formatDate(item?.dateCreated); 
                                                    return (
                                                        <div className='reviewBox mb-4 border-bottom' key={index}>

                                                            <div className='info'>
                                                                <div className='d-flex align-items-center w-100'>
                                                                    <div className="d-flex align-items-center w-100">
                                                                    <img width="40" height="40" src="https://img.icons8.com/fluency/48/user-male-circle--v1.png" alt="user-male-circle--v1" className="mr-1"/>
                                                                    <h5>{item?.customerName}</h5>
                                                                    </div>

                                                                    <div className='ml-auto'>
                                                                        <Rating name="half-rating-read"
                                                                            value={item?.customerRating} readOnly size="small" />
                                                                    </div>
                                                                </div>

                                                                <h6 className='text-light'>{formattedDate}</h6>

                                                                <p>{item?.review} </p>
                                                            </div>

                                                        </div>

                                                    )
                                                })
                                            }



                                            <br className='res-hide' />


                                            {
                                                context.isLogin === true && (
                                                    <form className='reviewForm' onSubmit={addReview}>

                                                <h4>Add a review</h4>
                                                <div className='form-group'>
                                                    <textarea className='form-control shadow' placeholder='Write a Review'
                                                        name='review' value={reviews.review} onChange={onChangeInput} ></textarea>
                                                </div>

                                                <div className='row'>

                                                    <div className='col-md-6'>
                                                        <div className='form-group'>
                                                            <Rating name="rating" value={rating} precision={0.5}
                                                                onChange={changeRating}
                                                            />
                                                        </div>
                                                    </div>

                                                </div>


                                                <br />
                                                <div className='form-group'>
                                                    <Button type='submit' className='btn-blue btn-lg btn-big btn-round'>
                                                        {isLoading === true ? <CircularProgress color="inherit" className="loader" /> : 'Submit Review'}

                                                    </Button>
                                                </div>

                                            </form>
                                                )
                                            }

                                        </div>


                                    </div>
                                </div>
                            }




                        </div>
                    </div>


                    <br />

                    {
                        relatedProductData?.length !== 0 && <RelatedProducts title="RELATED PRODUCTS" data={relatedProductData} />
                    }

                    {
                        recentlyViewdProducts?.length !== 0 &&
                        <RelatedProducts title="RECENTLY VIEWED PRODUCTS" itemView={"recentlyView"} data={recentlyViewdProducts} />
                    }


                </div>
            </section>
        </>
    )
}

export default ProductDetails;