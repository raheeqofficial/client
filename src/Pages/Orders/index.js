import React, { useEffect, useState } from 'react';
import { fetchDataFromApi } from '../../utils/api';
import Dialog from '@mui/material/Dialog';
import { MdClose } from "react-icons/md";
import axios from 'axios';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Box, Tab, Tabs } from '@mui/material';
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import emprtCart from "../../assets/images/myList.png";
import { FaHome } from "react-icons/fa";
import EligibleProducts from '../EligibleProducts';
const formatDate = (isoDate) => {
    return moment(isoDate).format('DD/MM/YYYY hh:mm A');
};

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const Orders = () => {

    const [page, setPage] = useState(1);
    const [isLogin, setIsLogin] = useState(false);
    const [orders, setOrders] = useState([]);
    const [products, setproducts] = useState([]);
    const [error, setError] = useState(null);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const history = useNavigate();
    const { userId } = JSON.parse(localStorage.getItem("user"));
    const [pendOrders, setPendOrders] = useState([]);
    const [confOrders, setConfOrders] = useState([]);
    const [shipOrders, setShipOrders] = useState([]);
    const [deliverOrders, setDeliverOrders] = useState([]);
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        const token = localStorage.getItem("token");
        if (token !== "" && token !== undefined && token !== null) {
            setIsLogin(true);
        }
        else {
            history("/signIn");
        }
        const user = JSON.parse(localStorage.getItem("user"));
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders?userid=${user?.userId}`);
                setOrders(res?.data);
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
            }
        };
        fetchProduct();

        fetchDataFromApi(`/api/orders?status=Pending&userid=${user?.userId}`).then(
            (res) => {
                setPendOrders(res);
            }
        );
        fetchDataFromApi(`/api/orders?status=Confirm&userid=${user?.userId}`).then(
            (res) => {
                setConfOrders(res);
            }
        );
        fetchDataFromApi(`/api/orders?status=Shipped&userid=${user?.userId}`).then(
            (res) => {
                setShipOrders(res);
            }
        );
        fetchDataFromApi(
            `/api/orders?status=Delivered&userid=${user?.userId}`
        ).then((res) => {
            setDeliverOrders(res);
        });
    }, [history]);
    const showProducts = (id) => {
        fetchDataFromApi(`/api/orders/${id}`).then((res) => {
            setIsOpenModal(true);
            setproducts(res.products);
        })
    }
    return (
        <>
            <Helmet>
                <title>Orders - Hibuyshopping | View Your Order History and Status</title>
                <meta name="title" content="Orders - Hibuyshopping | View Your Order History and Status" />
                <meta name="description" content="Manage and view your order history and current order status on Hibuyshopping. Access details of past and recent orders, track your shipments, and stay updated on your purchases on Pakistan's leading e-commerce platform." />
                <meta name="keywords" content="orders, Hibuyshopping, order history, order status, track orders, view orders, e-commerce orders, order management, Pakistani e-commerce, multi-vendor store" />
                <meta name="author" content="Hibuyshopping Team" />
                <meta property="og:title" content="Orders - Hibuyshopping | View Your Order History and Status" />
                <meta property="og:description" content="Access your order history and track the status of your current orders on Hibuyshopping. View details of past and recent purchases and manage your orders efficiently on Pakistan's top e-commerce platform." />
                <meta property="og:image" content="URL_TO_YOUR_ORDERS_PAGE_IMAGE" />
                <meta property="og:url" content="URL_TO_YOUR_ORDERS_PAGE" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Orders - Hibuyshopping | View Your Order History and Status" />
                <meta name="twitter:description" content="Check your order history and current order status on Hibuyshopping. Manage past and recent orders, track shipments, and stay updated on your purchases on Pakistan's leading e-commerce site." />
                <meta name="twitter:image" content="URL_TO_YOUR_ORDERS_PAGE_IMAGE" />
            </Helmet>
            <section className="section">
                <div className='container'>
                    <h2 className='hd'>Orders</h2>

                    <Box sx={{ width: '100%' }} className="myAccBox card border-0">
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs
                                variant="scrollable"
                                scrollButtons
                                allowScrollButtonsMobile
                                value={value} onChange={handleChange}
                                aria-label="basic tabs example">
                                <Tab label="All" {...a11yProps(0)} />
                                <Tab label="Pending" {...a11yProps(1)} />
                                <Tab label="Confirm" {...a11yProps(2)} />
                                <Tab label="Shipped" {...a11yProps(3)} />
                                <Tab label="Delivered" {...a11yProps(4)} />
                                <Tab label="To Review" {...a11yProps(5)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                            <div className='table-responsive orderTable'>
                                <table className='table table-striped table-bordered'>
                                    <thead className='thead-light'>
                                        <tr>
                                            <th>Order Id</th>
                                            <th>Products</th>
                                            <th>Order Details</th>
                                            <th>Order Status</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            orders?.length !== 0 && orders?.map((order, index) => {
                                                const formattedDate = formatDate(order?.date);
                                                return (
                                                    <>
                                                        <tr key={index}>
                                                            <td><span className='text-blue fonmt-weight-bold'>{order?.id}</span></td>
                                                            <td><span className='text-blue fonmt-weight-bold cursor' onClick={() => showProducts(order?._id)}>Click here to view</span>
                                                            </td>
                                                            <td><Link to={`/order/details/${order?._id}`}>
                                                                See details
                                                            </Link></td>
                                                            <td
                                                                className={`${order.status === "Cancelled" || order.status === "Pending" ? "text text-danger" :
                                                                    order.status === "Confirm" ? "text text-secondary" : order.status === "Shippied" ? "text text-primary" : order.status === "Delivered" ? "text text-success" : "text text-default"}`}

                                                            >{order?.status}</td>
                                                            <td>{formattedDate}</td>
                                                        </tr>

                                                    </>

                                                )
                                            })
                                        }

                                    </tbody>


                                </table>
                            </div>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>

                            <table className="table table-wishlist table-mobile">
                                {pendOrders?.length !== 0 ? (
                                    pendOrders?.map((item, index) => {
                                        return (
                                            <tbody>
                                                <tr key={index}>
                                                    {item?.products.map((data) => (
                                                        <>
                                                            <td className="product-col">
                                                                <div className="product">
                                                                    <figure className="product-media">
                                                                        <Link
                                                                            to={`/product/${data?.staticId}`}
                                                                        >
                                                                            <LazyLoadImage
                                                                                src={data.image}
                                                                                alt={data.productTitle}
                                                                                effect="blur"
                                                                                placeholderSrc="path_to_placeholder_image"
                                                                            />
                                                                        </Link>
                                                                    </figure>

                                                                    <h3 className="product-title">
                                                                        <Link
                                                                            to={`/product/${data?.staticId}`}
                                                                        >
                                                                            {data?.productTitle?.substr(
                                                                                0,
                                                                                30
                                                                            ) + "..."}
                                                                        </Link>
                                                                    </h3>
                                                                </div>
                                                            </td>
                                                            <td className="price-col">
                                                                Rs {data?.price}
                                                            </td>
                                                            <td className="stock-col">
                                                                Qty <b>:</b> {data?.quantity}
                                                            </td>
                                                        </>
                                                    ))}
                                                    <td className="remove-col">
                                                        <button className="badge badge-danger">
                                                            {item.status}
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        );
                                    })
                                ) : (
                                    <div className="empty d-flex align-items-center justify-content-center flex-column">
                                        <img src={emprtCart} width="150" />
                                        <h3 className="emptyPageMsg">
                                            No any Pending order yet
                                        </h3>
                                        <br />
                                        <Link to="/">
                                            {" "}
                                            <Button className="btn-blue bg-red btn-lg btn-big btn-round">
                                                <FaHome /> &nbsp; Continue Shopping
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </table>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>

                            <table className="table table-wishlist table-mobile">
                                {confOrders?.length !== 0 ? (
                                    confOrders?.map((item, index) => {
                                        return (
                                            <tbody>
                                                <tr key={index}>
                                                    {item?.products.map((data) => (
                                                        <>
                                                            <td className="product-col">
                                                                <div className="product">
                                                                    <figure className="product-media">
                                                                        <Link
                                                                            to={`/product/${data?.staticId}`}
                                                                        >
                                                                            <LazyLoadImage
                                                                                src={data.image}
                                                                                alt={data.productTitle}
                                                                                effect="blur"
                                                                                placeholderSrc="path_to_placeholder_image"
                                                                            />
                                                                        </Link>
                                                                    </figure>

                                                                    <h3 className="product-title">
                                                                        <Link
                                                                            to={`/product/${data?.staticId}`}
                                                                        >
                                                                            {data?.productTitle?.substr(
                                                                                0,
                                                                                30
                                                                            ) + "..."}
                                                                        </Link>
                                                                    </h3>
                                                                </div>
                                                            </td>
                                                            <td className="price-col">
                                                                Rs {data?.price}
                                                            </td>
                                                            <td className="stock-col">
                                                                Qty <b>:</b> {data?.quantity}
                                                            </td>
                                                        </>
                                                    ))}
                                                    <td className="remove-col">
                                                        <button className="badge badge-secondary">
                                                            {item.status}
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        );
                                    })
                                ) : (
                                    <div className="empty d-flex align-items-center justify-content-center flex-column">
                                        <img src={emprtCart} width="150" />
                                        <h3 className="emptyPageMsg">
                                            No any Confirm order yet
                                        </h3>
                                        <br />
                                        <Link to="/">
                                            <Button className="btn-blue bg-red btn-lg btn-big btn-round">
                                                <FaHome /> &nbsp; Continue Shopping
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </table>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={3}>

                            <table className="table table-wishlist table-mobile">
                                {shipOrders?.length !== 0 ? (
                                    shipOrders?.map((item, index) => {
                                        return (
                                            <tbody>
                                                <tr key={index}>
                                                    {item?.products.map((data) => (
                                                        <>
                                                            <td className="product-col">
                                                                <div className="product">
                                                                    <figure className="product-media">
                                                                        <Link
                                                                            to={`/product/${data?.staticId}`}
                                                                        >
                                                                            <LazyLoadImage
                                                                                src={data.image}
                                                                                alt={data.productTitle}
                                                                                effect="blur"
                                                                                placeholderSrc="path_to_placeholder_image"
                                                                            />
                                                                        </Link>
                                                                    </figure>

                                                                    <h3 className="product-title">
                                                                        <Link
                                                                            to={`/product/${data?.staticId}`}
                                                                        >
                                                                            {data?.productTitle?.substr(
                                                                                0,
                                                                                30
                                                                            ) + "..."}
                                                                        </Link>
                                                                    </h3>
                                                                </div>
                                                            </td>
                                                            <td className="price-col">
                                                                Rs {data?.price}
                                                            </td>
                                                            <td className="stock-col">
                                                                Qty <b>:</b> {data?.quantity}
                                                            </td>
                                                        </>
                                                    ))}
                                                    <td className="remove-col">
                                                        <button className="badge badge-primary">
                                                            {item.status}
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        );
                                    })
                                ) : (
                                    <div className="empty d-flex align-items-center justify-content-center flex-column">
                                        <img src={emprtCart} width="150" />
                                        <h3 className="emptyPageMsg">
                                            No any Shipped order yet
                                        </h3>
                                        <br />
                                        <Link to="/">
                                            <Button className="btn-blue bg-red btn-lg btn-big btn-round">
                                                <FaHome /> &nbsp; Continue Shopping
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </table>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={4}>

                            <table className="table table-wishlist table-mobile">
                                {deliverOrders?.length !== 0 ? (
                                    deliverOrders?.map((item, index) => {
                                        return (
                                            <tbody>
                                                <tr key={index}>
                                                    {item?.products.map((data) => (
                                                        <>
                                                            <td className="product-col">
                                                                <div className="product">
                                                                    <figure className="product-media">
                                                                        <Link
                                                                            to={`/product/${data?.staticId}`}
                                                                        >
                                                                            <LazyLoadImage
                                                                                src={data.image}
                                                                                alt={data.productTitle}
                                                                                effect="blur"
                                                                                placeholderSrc="path_to_placeholder_image"
                                                                            />
                                                                        </Link>
                                                                    </figure>

                                                                    <h3 className="product-title">
                                                                        <Link
                                                                            to={`/product/${data?.staticId}`}
                                                                        >
                                                                            {data?.productTitle?.substr(
                                                                                0,
                                                                                30
                                                                            ) + "..."}
                                                                        </Link>
                                                                    </h3>
                                                                </div>
                                                            </td>
                                                            <td className="price-col">
                                                                Rs {data?.price}
                                                            </td>
                                                            <td className="stock-col">
                                                                Qty <b>:</b> {data?.quantity}
                                                            </td>
                                                        </>
                                                    ))}
                                                    <td className="remove-col">
                                                        <button className="badge badge-success">
                                                            {item.status}
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        );
                                    })
                                ) : (
                                    <div className="empty d-flex align-items-center justify-content-center flex-column">
                                        <img src={emprtCart} width="150" />
                                        <h3 className="emptyPageMsg">
                                            No any Delivered order yet
                                        </h3>
                                        <br />
                                        <Link to="/">
                                            <Button className="btn-blue bg-red btn-lg btn-big btn-round">
                                                <FaHome /> &nbsp; Continue Shopping
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </table>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={5}>

                            <EligibleProducts customerId={userId} />
                        </CustomTabPanel>

                    </Box>

                </div>
            </section>


            <Dialog open={isOpenModal} className="productModal" >
                <Button className='close_' onClick={() => setIsOpenModal(false)}><MdClose /></Button>
                <h4 className="font-weight-bold pr-5">Products</h4>

                <div className='table-responsive orderTable'>
                    <table className='table table-striped table-bordered'>
                        <thead className='thead-light'>
                            <tr>
                                <th>Product Id</th>
                                <th>Product Title</th>
                                <th>Image</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>SubTotal</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                products?.length !== 0 && products?.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>{item?.productId}</td>
                                            <td style={{ whiteSpace: "inherit" }}>
                                                {/* <Link to={`/product/${item?.productId}`}> */}
                                                <span>
                                                    {item?.productTitle?.substr(0, 30) + '...'}
                                                </span>
                                                {/* </Link> */}

                                            </td>
                                            <td>
                                                <div className='img'>
                                                    <img src={item?.image} />
                                                </div>
                                            </td>
                                            <td>{item?.quantity}</td>
                                            <td>{item?.price}</td>
                                            <td>{item?.subTotal}</td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </Dialog>

        </>
    )
}

export default Orders;