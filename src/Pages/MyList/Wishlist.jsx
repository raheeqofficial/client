import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import emprtCart from "../../assets/images/myList.png";
import { FaHome } from "react-icons/fa";
import { MyContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import { deleteData, editData, fetchDataFromApi } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import './list.css'
import { IoLogoTiktok } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CiInstagram } from "react-icons/ci";

const Wishlist = () => {
  const [myListData, setmyListData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(MyContext);
  const [isLogin, setIsLogin] = useState(false);

  const history = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const token = localStorage.getItem("token");
    if (token !== "" && token !== undefined && token !== null) {
      setIsLogin(true);
    } else {
      history("/signIn");
    }
    const user = JSON.parse(localStorage.getItem("user"));
    fetchDataFromApi(`/api/my-list?userId=${user?.userId}`).then((res) => {
      setmyListData(res);
      console.log(res);
    });
  }, []);

  const removeItem = (id) => {
    setIsLoading(true);
    deleteData(`/api/my-list/${id}`).then((res) => {
      context.setAlertBox({
        open: true,
        error: false,
        msg: "item removed from My List!",
      });

      const user = JSON.parse(localStorage.getItem("user"));
      fetchDataFromApi(`/api/my-list?userId=${user?.userId}`).then((res) => {
        setmyListData(res);
        console.log(res);
        setIsLoading(false);
      });
    });
  };

  return (
    <div>
      <Helmet>
      <link rel="canonical" href="https://hibuyshopping.com/my-list" />
        <title>
          Wishlist - Hibuyshopping | Save and Manage Your Favorite Products
        </title>
        <meta
          name="description"
          content="Manage and view your wishlist on Hibuyshopping. Save your favorite products, track desired items, and access your saved selections easily. Keep track of products you love and plan your purchases on Pakistan's leading e-commerce platform."
        />
        <meta
          name="keywords"
          content="wishlist, Hibuyshopping, favorite products, save products, manage wishlist, e-commerce wishlist, track desired items, Pakistani e-commerce, multi-vendor store"
        />
        <meta name="author" content="Hibuyshopping Team" />
        <meta property="og:url" content="https://hibuyshopping.com/my-list" />
      </Helmet>
      <main className="main">
        <div className="page-header text-center">
          <div className="container">
            <h1 className="page-title">
              Wishlist<span>Shop</span>
            </h1>
          </div>
        </div>
        <nav aria-label="breadcrumb" className="breadcrumb-nav">
          <div className="container">
            <ol className="breadcrumb">
              <p>
                There are <b className="text-red">{myListData?.length}</b>{" "}
                products in your My List
              </p>
            </ol>
          </div>
        </nav>

        <div className="page-content">
          <div className="container">
            {myListData?.length !== 0 ? (
              <table className="table table-wishlist table-mobile">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Stock Status</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {myListData?.length !== 0 &&
                    myListData?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="product-col">
                            <div className="product">
                              <figure className="product-media">
                                <Link to={`/product/${item?.staticId}`}>
                                  <LazyLoadImage
                                    src={item.image}
                                    alt={item.productTitle}
                                    effect="blur"
                                    placeholderSrc="path_to_placeholder_image"
                                  />
                                </Link>
                              </figure>

                              <h3 className="product-title">
                                <Link to={`/product/${item?.staticId}`}>
                                  {item?.productTitle}
                                </Link>
                              </h3>
                            </div>
                          </td>
                          <td className="price-col">Rs {item?.price}</td>
                          {item?.countInStock === 0 ? (
                            <td className="stock-col">
                              <span className="out-of-stock">Out of stock</span>
                            </td>
                          ) : (
                            <td className="stock-col">
                              <span className="in-stock">In stock</span>
                            </td>
                          )}
                          <td className="remove-col">
                            <button
                              className="btn-remove"
                              onClick={() => removeItem(item?._id)}
                            >
                              <i className="icon-close"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            ) : (
              <div className="empty d-flex align-items-center justify-content-center flex-column">
                <img src={emprtCart} width="150" />
                <h3 className="emptyPageMsg">Wishlist is currently empty</h3>
                <br />
                <Link to="/">
                  {" "}
                  <Button className="btn-blue bg-red btn-lg btn-big btn-round">
                    <FaHome /> &nbsp; Continue Shopping
                  </Button>
                </Link>
              </div>
            )}
            <div className="wishlist-share mt-2">
              <div className="social-icons social-icons-sm mb-2">
                <label className="social-label">Follow on:</label>
                <a
                  href="#"
                  className="social-icon"
                  title="Facebook"
                  target="_blank"
                >
                  <FaFacebookF/>
                </a>
                <a
                  href="#"
                  className="social-icon"
                  title="Twitter"
                  target="_blank"
                >
                  <FaXTwitter/>
                </a>
                <a
                  href="#"
                  className="social-icon"
                  title="Instagram"
                  target="_blank"
                >
                  <CiInstagram/>
                </a>
                <a
                  href="#"
                  className="social-icon"
                  title="Tiktok"
                  target="_blank"
                >
                  <IoLogoTiktok/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Wishlist;
