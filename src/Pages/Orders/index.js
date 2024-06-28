import React, { useEffect, useState } from 'react';
import { fetchDataFromApi } from '../../utils/api';
import Pagination from '@mui/material/Pagination';
import Dialog from '@mui/material/Dialog';
import { MdClose } from "react-icons/md";
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';

const formatDate = (isoDate) => {
  return moment(isoDate).format('DD/MM/YYYY hh:mm A');
};

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [products, setproducts] = useState([]);
    const [page, setPage] = useState(1);

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isLogin,setIsLogin]  = useState(false);

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
        fetchDataFromApi(`/api/orders?userid=${user?.userId}`).then((res) => {
            setOrders(res);
            console.log(res)
        })

    }, []);




    const showProducts = (id) => {
        fetchDataFromApi(`/api/orders/${id}`).then((res) => {
            setIsOpenModal(true);
            setproducts(res.products);
        })
    }


    return (
        <>
            <section className="section">
                <div className='container'>
                    <h2 className='hd'>Orders</h2>

                    <div className='table-responsive orderTable'>
                        <table className='table table-striped table-bordered'>
                            <thead className='thead-light'>
                                <tr>
                                    <th>Product Id</th>
                                    <th>Products</th>
                                    <th>Order Details</th>
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
                                                    <Link to={`/order/details/${order?._id}`}><td>
                                                        See details
                                                    </td></Link>
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