import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import emprtCart from "../../assets/images/myList.png";
import { FaHome } from "react-icons/fa";
import { MyContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import { deleteData, editData, fetchDataFromApi } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

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
        <title>Wishlist - EliphStore</title>
        <meta
          name="description"
          content="Experience the future of online shopping at Eliphstore, where innovation meets tradition. Support a global community of creators and entrepreneurs with every purchase. Shop smart, shop Eliphstore!."
        />
        <meta
          name="keywords"
          content="Wishlist, Eliphstore.com, online shopping website, online shop, online store website, clothing websites, online shopping sites, best online clothing stores, shopping websites, shopping sites, clothing online stores, best online shopping websites, good online clothing stores, store website, best online shopping sites, best online store, best online clothes shopping, clothes online, top online clothing stores, clothing store online shopping, website online shop, internet shopping sites, all online shopping websites, good online shopping sites, best online clothes shops, good online shops, online shops for clothes, good online shopping websites, top shopping sites, e-commerce store, online store, buy online, buy clothes online, online fashion store, discount shopping online, shop online for electronics, buy shoes online, women's clothes online, top-selling products online, online sale, e-store, online jewellery shopping, clothing sales online, cheap clothing brands, men's sale clothing, women's sale clothing, Eliphstore.com, multivendor online store, shopping needs, multivendor online store, clothing, footwear, fashion, kitchen accessories, latest fashion trends, home essentials, unique gifts, seamless shopping experience, customer service, variety of choices, multivendor marketplace, quality and variety, online shopping in Pakistan, newest fashion trends, renowned brands, seasonal collections, Pakistani brands, shawls, sweaters, t-shirts, caps, hoodies, sleeves, trousers, kurtas, kurtis, coats, shrugs, jackets, boots, sneakers, flats, high heels, khussa, stitched and unstitched clothes, chic accessories, jewelry, watches, scarves, hijabs, perfumes, hottest new arrivals, timeless style, modern trends, high-quality fashion wear, elegant dresses, stylish shoes, trendy handbags, top 10 online branded shopping sites, competitive prices, 24/7 service, fast delivery, effortless shopping,
       designer collections, seamless online shopping experience "
        />
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
                                    effect="blur" // You can use other effects like 'opacity' or 'black-and-white'
                                    placeholderSrc="path_to_placeholder_image" // Optional: Placeholder image while loading
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
                            <td class="stock-col">
                              <span class="in-stock">In stock</span>
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
                  <i className="icon-facebook-f"></i>
                </a>
                <a
                  href="#"
                  className="social-icon"
                  title="Twitter"
                  target="_blank"
                >
                  <i className="icon-twitter"></i>
                </a>
                <a
                  href="#"
                  className="social-icon"
                  title="Instagram"
                  target="_blank"
                >
                  <i className="icon-instagram"></i>
                </a>
                <a
                  href="#"
                  className="social-icon"
                  title="Youtube"
                  target="_blank"
                >
                  <i className="icon-youtube"></i>
                </a>
                <a
                  href="#"
                  className="social-icon"
                  title="Pinterest"
                  target="_blank"
                >
                  <i className="icon-pinterest"></i>
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
