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
        if (context.cartData?.length) {
            return context.cartData
                .map(item => parseInt(item.price) * item.quantity)
                .reduce((total, value) => total + value, 0);
        } else {
            return 0;
        }
    };

    const subtotal = calculateSubtotal();

    const calculateTotal = () => {
        const subtotal = context.cartData?.length
            ? context.cartData.map(item => parseInt(item.price) * item.quantity).reduce((total, value) => total + value, 0)
            : 0;
        return subtotal + SHIPPING_RATE;
    }


    
  
    // if (isLoading) {
    //     return (
    //       <div className="loaderContainer">
    //         <span class="loader"></span>
    //       </div>
    //     );
    //   }
    return (
        <>
            <section className="section cartPage">
                <div className="container">
                    <h2 className="hd mb-1">Your Cart</h2>
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

                                    <div className="d-flex align-items-center mb-3">
                                        <span>Subtotal</span>
                                        <span className="ml-auto text-red font-weight-bold">
                                            {subtotal}
                                        </span>
                                    </div>

                                    <div className="d-flex align-items-center mb-3">
                                        <span>Shipping</span>
                                        <span className="ml-auto"><b>Rs {SHIPPING_RATE}</b></span>
                                    </div>

                                    <div className="d-flex align-items-center mb-3">
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
                                        <Button className='btn-blue bg-red btn-lg btn-big w-100' onClick={navigateToCheckout}><IoBagCheckOutline /> &nbsp; Checkout</Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="empty d-flex align-items-center justify-content-center flex-column">
                            <img src={emprtCart} width="150" />
                            <h3>Your Cart is currently empty</h3>
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
