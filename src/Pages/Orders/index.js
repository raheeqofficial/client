import React, { useEffect, useState } from 'react';
import { fetchDataFromApi } from '../../utils/api';
import Dialog from '@mui/material/Dialog';
import { MdClose } from "react-icons/md";
import axios from 'axios';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import moment from 'moment';
const formatDate = (isoDate) => {
  return moment(isoDate).format('DD/MM/YYYY hh:mm A');
};

const Orders = () => {

    const [page, setPage] = useState(1);
    const [isLogin,setIsLogin]  = useState(false);
    const [orders, setOrders] = useState([]);
    const [products, setproducts] = useState([]);
    const [error, setError] = useState(null);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const history = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0);
        const token = localStorage.getItem("token");
        if(token!=="" && token!==undefined  && token!==null){
          setIsLogin(true);
        }
        else{
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
          <title>Orders - EliphStore</title>
          <meta
            name="description"
            content="Experience the future of online shopping at Eliphstore, where innovation meets tradition. Support a global community of creators and entrepreneurs with every purchase. Shop smart, shop Eliphstore!."
          />
          <meta
            name="keywords"
            content="Orders, Eliphstore.com, online shopping website, online shop, online store website, clothing websites, online shopping sites, best online clothing stores, shopping websites, shopping sites, clothing online stores, best online shopping websites, good online clothing stores, store website, best online shopping sites, best online store, best online clothes shopping, clothes online, top online clothing stores, clothing store online shopping, website online shop, internet shopping sites, all online shopping websites, good online shopping sites, best online clothes shops, good online shops, online shops for clothes, good online shopping websites, top shopping sites, e-commerce store, online store, buy online, buy clothes online, online fashion store, discount shopping online, shop online for electronics, buy shoes online, women's clothes online, top-selling products online, online sale, e-store, online jewellery shopping, clothing sales online, cheap clothing brands, men's sale clothing, women's sale clothing, Eliphstore.com, multivendor online store, shopping needs, multivendor online store, clothing, footwear, fashion, kitchen accessories, latest fashion trends, home essentials, unique gifts, seamless shopping experience, customer service, variety of choices, multivendor marketplace, quality and variety, online shopping in Pakistan, newest fashion trends, renowned brands, seasonal collections, Pakistani brands, shawls, sweaters, t-shirts, caps, hoodies, sleeves, trousers, kurtas, kurtis, coats, shrugs, jackets, boots, sneakers, flats, high heels, khussa, stitched and unstitched clothes, chic accessories, jewelry, watches, scarves, hijabs, perfumes, hottest new arrivals, timeless style, modern trends, high-quality fashion wear, elegant dresses, stylish shoes, trendy handbags, top 10 online branded shopping sites, competitive prices, 24/7 service, fast delivery, effortless shopping,
           designer collections, seamless online shopping experience "
          />
        </Helmet>
            <section className="section">
                <div className='container'>
                    <h2 className='hd'>Orders</h2>

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
                                                     className={`${order.status === "Cancelled" ||  order.status === "Pending" ? "text text-danger":
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


                   

                </div>
            </section>


            <Dialog open={isOpenModal} className="productModal" >
                <Button className='close_' onClick={() => setIsOpenModal(false)}><MdClose /></Button>
                <h4 class="mb-1 font-weight-bold pr-5 mb-4">Products</h4>

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
                                            <td  style={{whiteSpace:"inherit"}}>
                                                {/* <Link to={`/product/${item?.productId}`}> */}
                                                <span>
                                                {item?.productTitle?.substr(0,30)+'...'}
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