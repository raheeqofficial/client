import { Link } from "react-router-dom";
import Rating from '@mui/material/Rating';
import QuantityBox from "../../Components/QuantityBox";
import { IoIosClose } from "react-icons/io";
import Button from '@mui/material/Button';

import emprtCart from '../../assets/images/emptyCart.png';
import { MyContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import { deleteData, editData, fetchDataFromApi } from "../../utils/api";
import { IoBagCheckOutline } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Cart = () => {
    const [cartData, setCartData] = useState([]);
    const [productQuantity, setProductQuantity] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedQuantity, setselectedQuantity] = useState();
    const [chengeQuantity, setchengeQuantity] = useState(0);
    const [isLogin, setIsLogin] = useState(false);

    const context = useContext(MyContext);
    const goto = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.userId;

    const SHIPPING_RATE = 150; // Fixed shipping rate

    const navigateToCheckout = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000)

        goto('/checkout', { state: { userId: userId } });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        const token = localStorage.getItem("token");
        if (token) {
            setIsLogin(true);
        } else {
            goto("/signIn");
        }
        fetchDataFromApi(`/api/cart?userId=${userId}`).then((res) => {
            setCartData(res);
            setselectedQuantity(res?.quantity);
            console.log(res)
        });
    }, []);

    const quantity = (val) => {
        setProductQuantity(val);
        setchengeQuantity(val);
    }

    const selectedItem = (item, quantityVal) => {
        if (chengeQuantity !== 0) {
            const cartFields = {
                ...item,
                quantity: quantityVal,
                subTotal: parseInt(item?.price * quantityVal),
                userId: userId
            };
            setIsLoading(true)
            editData(`/api/cart/${item?._id}`, cartFields).then((res) => {
                setIsLoading(false)
                setTimeout(() => {
                    fetchDataFromApi(`/api/cart?userId=${userId}`).then((res) => {
                        setCartData(res);
                    });
                }, 1000);
            });
            context.getCartData();
        }
    }

    const removeItem = (id) => {
        deleteData(`/api/cart/${id}`).then((res) => {
            context.setAlertBox({
                open: true,
                error: false,
                msg: "Item removed from cart!"
            });

            fetchDataFromApi(`/api/cart?userId=${userId}`).then((res) => {
                setCartData(res);
            });

            context.getCartData();
        });
    }

    const calculateSubtotal = () => {
        if (cartData?.length) {
            const subTotal = cartData
                .map(item => parseInt(item.price) * item.quantity)
                .reduce((total, value) => total + value, 0);
            return subTotal
        } else {
            return 0;
        }
    };

    const calculateTotal = () => {
        const subtotal = cartData?.length
            ? cartData.map(item => parseInt(item.price) * item.quantity).reduce((total, value) => total + value, 0)
            : 0;
        return subtotal + SHIPPING_RATE;
    }

    return (
        <>
            <Helmet>
                <link rel="canonical" href="https://hibuyshopping.com/cart" />
                <title>Your Cart - Hibuyshopping | Multi-Vendor E-Commerce Store in Pakistan</title>
                <meta name="title" content="Your Cart - Hibuyshopping | Multi-Vendor E-Commerce Store in Pakistan" />
                <meta name="description" content="View and manage the items in your cart at Hibuyshopping. Review your selected products, apply discount codes, and proceed to checkout. Enjoy a seamless online shopping experience with Pakistan's leading e-commerce platform." />
                <meta name="keywords" content="cart page, Hibuyshopping, online shopping cart, manage cart, e-commerce Pakistan, multi-vendor store, checkout process, discount codes, shopping experience, review items, online marketplace" />
                <meta name="author" content="Hibuyshopping Team" />
                <meta property="og:description" content="Manage your cart at Hibuyshopping, review your items, apply discount codes, and proceed to checkout with ease. Experience top-notch online shopping with Pakistan's premier multi-vendor store." />
                <meta property="og:url" content="https://hibuyshopping.com/cart" />
                <meta itemprop="priceCurrency" content="PKR" />
            </Helmet>
            <section className="section cartPage">
                <div className="container">
                    <h1 className="hd mb-1">Your Cart</h1>
                    <p>There are <b className="text-red">{cartData?.length}</b> products in your cart</p>

                    {cartData?.length !== 0 ? (
                        <div className="row">
                            <div className="col-md-9 pr-5">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th width="35%">Product</th>
                                                <th width="15%">Unit Price</th>
                                                <th width="25%">Quantity</th>
                                                <th width="15%">Subtotal</th>
                                                <th width="10%">Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartData?.map((item, index) => (
                                                <tr key={index}>
                                                    <td width="35%">
                                                        <Link to={`/product/${item?.staticId}`}>
                                                            <div className="d-flex align-items-center cartItemimgWrapper">
                                                                <div className="imgWrapper">
                                                                    <img src={item?.image} className="w-100" alt={item?.productTitle} />
                                                                </div>
                                                                <div className="info px-3">
                                                                    <h6>{item?.productTitle?.substr(0, 30) + '...'}</h6>
                                                                    <Rating name="read-only" value={item?.rating} readOnly size="small" />
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </td>
                                                    <td width="15%">Rs {item?.price}</td>
                                                    <td width="25%">
                                                        <QuantityBox quantity={quantity} item={item} selectedItem={selectedItem} value={item?.quantity} />
                                                    </td>
                                                    <td width="15%">Rs. {item?.subTotal}</td>
                                                    <td width="10%"><span className="remove" onClick={() => removeItem(item?._id)}><IoIosClose /></span></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="card border p-3 cartDetails">
                                    <h4>CART TOTALS</h4>

                                    <div className="d-flex align-items-center mb-1">
                                        <span>Subtotal</span>
                                        <span className="ml-auto text-red font-weight-bold">
                                            {calculateSubtotal()}
                                        </span>
                                    </div>

                                    <div className="d-flex align-items-center mb-1">
                                        <span>Shipping</span>
                                        <span className="ml-auto"><b>Rs {SHIPPING_RATE}</b></span>
                                    </div>

                                    <div className="d-flex align-items-center mb-1">
                                        <span>Estimate for</span>
                                        <span className="ml-auto"><b>Pakistan</b></span>
                                    </div>

                                    <div className="d-flex align-items-center">
                                        <span>Total</span>
                                        <span className="ml-auto text-red font-weight-bold">
                                            Rs {calculateTotal()}
                                        </span>
                                    </div>

                                    <br />
                                    {isLoading ? <div className="loadingOverlay"></div> : (
                                        <Button className='btn-blue btn-lg btn-big w-100' onClick={navigateToCheckout}><IoBagCheckOutline /> &nbsp; Checkout</Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="empty d-flex align-items-center justify-content-center flex-column">
                            <img src={emprtCart} width="150" alt="cart image" />
                            <h3 className="emptyPageMsg">Your Cart is currently empty</h3>
                            <br />
                            <Link to="/"> <Button className='btn-blue bg-red btn-lg btn-big btn-round'><FaHome /> &nbsp; Continue Shopping</Button></Link>
                        </div>
                    )}
                </div>
            </section>

            {isLoading && <div className="loadingOverlay"></div>}
        </>
    );
}

export default Cart;
