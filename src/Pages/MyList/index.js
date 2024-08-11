import { Link } from "react-router-dom";
import Rating from '@mui/material/Rating';
import QuantityBox from "../../Components/QuantityBox";
import { IoIosClose } from "react-icons/io";
import Button from '@mui/material/Button';

import emprtCart from '../../assets/images/myList.png';
import { MyContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import { deleteData, editData, fetchDataFromApi } from "../../utils/api";
import { IoBagCheckOutline } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet-async";

const MyList = () => {

    const [myListData, setmyListData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const context = useContext(MyContext);
    const [isLogin,setIsLogin]  = useState(false);

    const history = useNavigate();

    useEffect(() => {
        window.scrollTo(0,0)
        
        const token = localStorage.getItem("token");
        if(token!=="" && token!==undefined  && token!==null){
          setIsLogin(true);
        }
        else{
          history("/signIn");
        }

        
        const user = JSON.parse(localStorage.getItem("user"));
        fetchDataFromApi(`/api/my-list?userId=${user?.userId}`).then((res) => {
            setmyListData(res);
            console.log(res)
        })
    }, []);


    const removeItem = (id) => {
        setIsLoading(true);
        deleteData(`/api/my-list/${id}`).then((res) => {
            context.setAlertBox({
                open: true,
                error: false,
                msg: "item removed from My List!"
            })

            const user = JSON.parse(localStorage.getItem("user"));
            fetchDataFromApi(`/api/my-list?userId=${user?.userId}`).then((res) => {
                setmyListData(res);
                setIsLoading(false);
            })

        })
    }


    return (
        <>
        <Helmet>
          <title>Wishlist - Hibuyshopping</title>
          <meta
            name="description"
            content="Experience the future of online shopping at Hibuyshopping, where innovation meets tradition. Support a global community of creators and entrepreneurs with every purchase. Shop smart, shop Hibuyshopping!."
          />
          <meta
            name="keywords"
            content="Wishlist, Hibuyshopping.com, online shopping website, online shop, online store website, clothing websites, online shopping sites, best online clothing stores, shopping websites, shopping sites, clothing online stores, best online shopping websites, good online clothing stores, store website, best online shopping sites, best online store, best online clothes shopping, clothes online, top online clothing stores, clothing store online shopping, website online shop, internet shopping sites, all online shopping websites, good online shopping sites, best online clothes shops, good online shops, online shops for clothes, good online shopping websites, top shopping sites, e-commerce store, online store, buy online, buy clothes online, online fashion store, discount shopping online, shop online for electronics, buy shoes online, women's clothes online, top-selling products online, online sale, e-store, online jewellery shopping, clothing sales online, cheap clothing brands, men's sale clothing, women's sale clothing, Hibuyshopping.com, multivendor online store, shopping needs, multivendor online store, clothing, footwear, fashion, kitchen accessories, latest fashion trends, home essentials, unique gifts, seamless shopping experience, customer service, variety of choices, multivendor marketplace, quality and variety, online shopping in Pakistan, newest fashion trends, renowned brands, seasonal collections, Pakistani brands, shawls, sweaters, t-shirts, caps, hoodies, sleeves, trousers, kurtas, kurtis, coats, shrugs, jackets, boots, sneakers, flats, high heels, khussa, stitched and unstitched clothes, chic accessories, jewelry, watches, scarves, hijabs, perfumes, hottest new arrivals, timeless style, modern trends, high-quality fashion wear, elegant dresses, stylish shoes, trendy handbags, top 10 online branded shopping sites, competitive prices, 24/7 service, fast delivery, effortless shopping,
           designer collections, seamless online shopping experience "
          />
        </Helmet>

            <section className="section cartPage">
                <div className="container">

                    <div className="myListTableWrapper">
                        <h2 className="hd mb-1">My List</h2>
                        <p>There are <b className="text-red">{myListData?.length}</b> products in your My List</p>
                        {
                            myListData?.length !== 0 ?

                                <div className="row">
                                    <div className="col-md-12 pr-5">

                                        <div className="table-responsive myListTable">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th width="50%">Product</th>
                                                        <th width="15%">Unit Price</th>
                                                        <th width="10%">Remove</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        myListData?.length !== 0 && myListData?.map((item, index) => {
                                                            return (
                                                                <tr>
                                                                    <td width="50%">
                                                                        <Link to={`/product/${item?.staticId}`}>
                                                                            <div className="d-flex align-items-center cartItemimgWrapper">
                                                                                <div className="imgWrapper">
                                                                                    <img src={item?.image}
                                                                                        className="w-100" alt={item?.productTitle} />
                                                                                </div>

                                                                                <div className="info px-3">
                                                                                    <h6>
                                                                                        {item?.productTitle}

                                                                                    </h6>
                                                                                    <Rating name="read-only" value={item?.rating} readOnly size="small" />
                                                                                </div>

                                                                            </div>
                                                                        </Link>
                                                                    </td>
                                                                    <td width="15%">Rs {item?.price}</td>


                                                                    <td width="10%"><span className="remove" onClick={() => removeItem(item?._id)}><IoIosClose /></span></td>
                                                                </tr>
                                                            )
                                                        })
                                                    }


                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                </div>

                                :


                                <div className="empty d-flex align-items-center justify-content-center flex-column">
                                    <img src={emprtCart} width="150" />
                                    <h3>My List is currently empty</h3>
                                    <br />
                                    <Link to="/"> <Button className='btn-blue bg-red btn-lg btn-big btn-round'><FaHome /> &nbsp; Continue Shopping</Button></Link>
                                </div>


                        }


                    </div>

                </div>
            </section>

            {isLoading === true && <div className="loadingOverlay"></div>}


        </>
    )
}

export default MyList;