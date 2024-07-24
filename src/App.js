import "bootstrap/dist/css/bootstrap.min.css";
import React, { createContext, lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import './App.css';
import './responsive.css';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Header from './Components/Header/index';
import Footer from './Components/Footer/index';
import BottomHeader from './Components/BottomHeader/BottomMenu';
import ProductModal from './Components/ProductModal/index';
import axios from 'axios';
import { fetchDataFromApi, postData } from "./utils/api";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import About from "./Pages/About/About";

// Lazy imports
const Home = lazy(() => import('./Pages/Home/index'));
const Recepient = lazy(() => import('./Pages/ReceiptGenerator/ReceiptGenerator'));
const Contact = lazy(() => import('./Pages/Contact/Contact'));
const Listing = lazy(() => import('./Pages/Listing/index'));
const FlashSale = lazy(() => import('./Pages/FlashSale/FlashSale'));
const PopularProducts = lazy(() => import('./Pages/PopularProducts/PopularProducts'));
const Fashion = lazy(() => import('./Pages/Fashion/Fashion'));
const NewProducts = lazy(() => import('./Pages/NewProducts/NewProducts'));
const ProductDetails = lazy(() => import('./Pages/ProductDetails/index'));
const DiscountPage = lazy(() => import('./Pages/DiscountPage/DiscountPage'));
const Error = lazy(() => import('./Pages/productError/Error'));
const Cart = lazy(() => import('./Pages/Cart/index'));
const SignIn = lazy(() => import('./Pages/SignIn/index'));
const SignUp = lazy(() => import('./Pages/SignUp'));
const MyList = lazy(() => import('./Pages/MyList/index'));
const Checkout = lazy(() => import('./Pages/Checkout/index'));
const Orders = lazy(() => import('./Pages/Orders/index'));
const OrderDetails = lazy(() => import('./Pages/Orders/OrderDetails/OrderDetails'));
const PageNotFound = lazy(() => import('./Pages/PageNotFound/PageNotFound'));
const MyAccount = lazy(() => import('./Pages/MyAccount/index'));
const MobileAccount = lazy(() => import('./Pages/MobileAccount/MobileAccount'));
const SearchPage = lazy(() => import('./Pages/Search/index'));
const Success = lazy(() => import('./Pages/success/Success'));
const BecomeSeller = lazy(() => import('./Pages/BecomeAseller/BecomeSeller'));
const HelpCenterApp = lazy(() => import('./Pages/Help center/HelpCenter'));
const CancelOrder = lazy(() => import('./Pages/Help center/CancelOrder'));
const TrackOrder = lazy(() => import('./Pages/Help center/ShippingAndDelivery'));
const Categories = lazy(() => import('./Pages/Categories/Categories'));
const ShippingAndDelivery = lazy(() => import('./Pages/Help center/ShippingAndDelivery'));
const Shops = lazy(() => import('./Pages/Shops/Shops'));
const ShopDetails = lazy(() => import('./Pages/Shops/ShopsDetails/ShopDetails'));
const OtpVerification = lazy(() => import('./Pages/VerifyCode/VerifyCode'));
const MyContext = createContext();

function App() {
  
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setselectedCountry] = useState('');
  const [isOpenProductModal, setisOpenProductModal] = useState(false);
  const [isHeaderFooterShow, setisHeaderFooterShow] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [productData, setProductData] = useState([]);

  const [categoryData, setCategoryData] = useState([]);
  const [subCat, setSubCat] = useState([]);
  const [subCategoryData, setsubCategoryData] = useState([]);
  const [addingInCart, setAddingInCart] = useState(false);

  const [cartData, setCartData] = useState();
  const [searchData, setSearchData] = useState([]);
  const [isOpenNav, setIsOpenNav] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [alertBox, setAlertBox] = useState({
    msg: '',
    error: false,
    open: false
  })

  const [user, setUser] = useState({
    name: "",
    email: "",
    userId: ""
  })


  const {id} = useParams()
  useEffect(() => {
    getCountry("https://countriesnow.space/api/v0.1/countries/");


    fetchDataFromApi("/api/category").then((res) => {
      setCategoryData(res.categoryList);
    })

    fetchDataFromApi("/api/subCat?page=1&perPage=7").then((res) => {
      setsubCategoryData(res.subCategoryList);
    })

    const user = JSON.parse(localStorage.getItem("user"));
    fetchDataFromApi(`/api/cart?userId=${user?.userId}`).then((res) => {
      setCartData(res)
    });


    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, []);

  // useEffect(() => {
    
  //   fetchDataFromApi(`/api/subCat?shop=${id}`).then((res) => {
  //     setSubCat(res.subCatList);
  //     console.log(res)
  // });
  // }, [id])


  const getCartData = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    fetchDataFromApi(`/api/cart?userId=${user?.userId}`).then((res) => {
      setCartData(res)
    });
  }


  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token !== "" && token !== undefined && token !== null) {
      setIsLogin(true);

      const userData = JSON.parse(localStorage.getItem("user"));

      setUser(userData);

    } else {
      setIsLogin(false);
    }
  }, [isLogin]);


  const openProductDetailsModal = (id, status) => {
    fetchDataFromApi(`/api/products/staticId/${id}`).then((res) => {
      setProductData(res);
      setisOpenProductModal(status);
    })
  }

  const getCountry = async (url) => {
    const responsive = await axios.get(url).then((res) => {
      setCountryList(res.data.data)
    })
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertBox({
      open: false
    });
  };

  const addToCart = (data) => {

    if(isLogin===true){
      setAddingInCart(true);
      postData(`/api/cart/add`, data).then((res) => {
        if (res.status !== false) {
          setAlertBox({
            open: true,
            error: false,
            msg: "Item is added in the cart"
          })
  
          setTimeout(() => {
            setAddingInCart(false);
          }, 1000);
  
          getCartData();
  
        }
        else {
          setAlertBox({
            open: true,
            error: true,
            msg: res.msg
          })
          setAddingInCart(false);
        }
  
      })
    }
    else{
      setAlertBox({
        open:true,
        error:true,
        msg:"Please login first"
      })
    }
   
  }

  const values = {
    countryList,
    setselectedCountry,
    selectedCountry,
    isOpenProductModal,
    setisOpenProductModal,
    isHeaderFooterShow,
    setisHeaderFooterShow,
    isLogin,
    setIsLogin,
    categoryData,
    setCategoryData,
    subCategoryData,
    setsubCategoryData,
    user,
    openProductDetailsModal,
    alertBox,
    subCat,
    setSubCat,
    setAlertBox,
    addToCart,
    addingInCart,
    setAddingInCart,
    cartData,
    setCartData,
    getCartData,
    searchData,
    setSearchData,
    windowWidth,
    isOpenNav,
    setIsOpenNav,
    productData
  }
  return (
    <HelmetProvider>
      <Helmet>
    <title>EliphStore - Your Online Shopping Destination</title>
    <meta
      name="description"
      content="Experience the future of online shopping at Eliphstore, where innovation meets tradition. Support a global community of creators and entrepreneurs with every purchase. Shop smart, shop Eliphstore!"
    />
    <meta
      name="keywords"
      content="Eliphstore, Eliphstore.com, online shopping website, online shop, online store website, clothing websites, online shopping sites, best online clothing stores, shopping websites, shopping sites, clothing online stores, best online shopping websites, good online clothing stores, store website, best online shopping sites, best online store, best online clothes shopping, clothes online, top online clothing stores, clothing store online shopping, website online shop, internet shopping sites, all online shopping websites, good online shopping sites, best online clothes shops, good online shops, online shops for clothes, good online shopping websites, top shopping sites, e-commerce store, online store, buy online, buy clothes online, online fashion store, discount shopping online, shop online for electronics, buy shoes online, women's clothes online, top-selling products online, online sale, e-store, online jewellery shopping, clothing sales online, cheap clothing brands, men's sale clothing, women's sale clothing, Eliphstore.com, multivendor online store, shopping needs, multivendor online store, clothing, footwear, fashion, kitchen accessories, latest fashion trends, home essentials, unique gifts, seamless shopping experience, customer service, variety of choices, multivendor marketplace, quality and variety, online shopping in Pakistan, newest fashion trends, renowned brands, seasonal collections, Pakistani brands, shawls, sweaters, t-shirts, caps, hoodies, sleeves, trousers, kurtas, kurtis, coats, shrugs, jackets, boots, sneakers, flats, high heels, khussa, stitched and unstitched clothes, chic accessories, jewelry, watches, scarves, hijabs, perfumes, hottest new arrivals, timeless style, modern trends, high-quality fashion wear, elegant dresses, stylish shoes, trendy handbags, top 10 online branded shopping sites, competitive prices, 24/7 service, fast delivery, effortless shopping,
       designer collections, seamless online shopping experience "
    />
  </Helmet>
    <BrowserRouter>
      <MyContext.Provider value={values}>
        <Snackbar open={alertBox.open} autoHideDuration={6000} onClose={handleClose} className="snackbar">
          <Alert
            onClose={handleClose}
            autoHideDuration={6000}
            severity={alertBox.error === false ? "success" : 'error'}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {alertBox.msg}
          </Alert>
        </Snackbar>

        {isHeaderFooterShow && <Header />}

        <Routes>
          <Route path="/" element={<Suspense fallback={<div className="loaderContainer">
          <span class="loader"></span>
        </div>}><Home /></Suspense>} />
          <Route path="/about" element={<Suspense fallback={<div className="loaderContainer">
          <span class="loader"></span>
        </div>}><About /></Suspense>} />
          <Route path="/recipient" element={<Suspense fallback={<div className="loaderContainer">
          <span class="loader"></span>
        </div>}><Recepient /></Suspense>} />
          <Route path="/contact" element={<Suspense fallback={<div className="loaderContainer">
          <span class="loader"></span>
        </div>}><Contact /></Suspense>} />
          <Route path="/products/category/:id" element={<Suspense fallback={<div className="loaderContainer">
          <span class="loader"></span>
        </div>}><Listing /></Suspense>} />
          <Route path="/products/subCat/:id" element={<Suspense fallback={<div className="loaderContainer">
          <span class="loader"></span>
        </div>}><Listing /></Suspense>} />
          <Route path="/products/flash-sale/:id" element={<Suspense fallback={<div className="loaderContainer">
          <span class="loader"></span>
        </div>}><FlashSale /></Suspense>} />
          <Route path="/products/popular-products/:id" element={<Suspense fallback={<div className="loaderContainer">
          <span class="loader"></span>
        </div>}><PopularProducts /></Suspense>} />
          <Route path="/products/fashion/:id" element={<Suspense fallback={<div className="loaderContainer">
          <span class="loader"></span>
        </div>}><Fashion /></Suspense>} />
          <Route path="/products/new/:id" element={<Suspense fallback={<div className="loaderContainer">
          <span class="loader"></span>
        </div>}><NewProducts /></Suspense>} />
          <Route path="/product/:id" element={<Suspense fallback={<div className="loaderContainer">
          <span class="loader"></span>
        </div>}><ProductDetails /></Suspense>} />
          <Route path="/products/all" element={<Suspense fallback={<div className="loaderContainer">
          <span class="loader"></span>
        </div>}><DiscountPage /></Suspense>} />
          <Route path="/product/error" element={<Suspense fallback={<div className="loaderContainer">
          <span class="loader"></span>
        </div>}><Error /></Suspense>} />
          <Route path="/cart" element={<Suspense fallback={<div className="loaderContainer">
          <span class="loader"></span>
        </div>}><Cart /></Suspense>} />
          <Route path="/signIn" element={<Suspense fallback={<div className="loaderContainer">
          <span class="loader"></span>
        </div>}><SignIn /></Suspense>} />
          
          <Route path="/signUp" element={<Suspense fallback={<div className="loaderContainer">
          <span class="loader"></span>
        </div>}><SignUp /></Suspense>} />
          <Route path="/my-list" element={<Suspense fallback={<div className="loaderContainer">
          <span class="loader"></span>
        </div>}><MyList /></Suspense>} />
          <Route path="/checkout" element={<Suspense fallback={<div className="loaderContainer">
          <span class="loader"></span>
        </div>}><Checkout /></Suspense>} />
          <Route path="/orders" element={<Suspense fallback={<div className="loaderContainer">
          <span class="loader"></span>
        </div>}><Orders /></Suspense>} />
          <Route path="/order/details/:id" element={<Suspense fallback={<div className="loaderContainer">
          <span class="loader"></span>
        </div>}><OrderDetails /></Suspense>} />
          <Route path="/*" element={<Suspense fallback={<div className="loaderContainer">
          <span class="loader"></span>
        </div>}><PageNotFound /></Suspense>} />
          <Route path="/page-not-found" element={<Suspense fallback={<div className="loaderContainer">
          <span class="loader"></span>
        </div>}><PageNotFound /></Suspense>} />
          <Route path="/account-setting" element={<Suspense fallback={<div className="loaderContainer">
          <span class="loader"></span>
        </div>}><MyAccount /></Suspense>} />
          <Route path="/account" element={<Suspense fallback={<div className="loaderContainer">
          <span class="loader"></span>
        </div>}><MobileAccount /></Suspense>} />
          <Route path="/search" element={<Suspense fallback={<div className="loaderContainer">
          <span class="loader"></span>
        </div>}><SearchPage /></Suspense>} />
          <Route path="/success" element={<Suspense fallback={<div className="loaderContainer">
          <span class="loader"></span>
        </div>}><Success /></Suspense>} />
          <Route path="/become-seller" element={<Suspense fallback={<div className="loaderContainer">
          <span class="loader"></span>
        </div>}><BecomeSeller /></Suspense>} />
          <Route path="/help-center" element={<Suspense fallback={<div className="loaderContainer">
          <span class="loader"></span>
        </div>}><HelpCenterApp /></Suspense>} />
          <Route path="/help-center/cancel-order" element={<Suspense fallback={<div className="loaderContainer">
          <span class="loader"></span>
        </div>}><CancelOrder /></Suspense>} />
          <Route path="/help-center/track-order" element={<Suspense fallback={<div className="loaderContainer">
          <span class="loader"></span>
        </div>}><TrackOrder /></Suspense>} />
          <Route path="/categories" element={<Suspense fallback={<div className="loaderContainer">
          <span class="loader"></span>
        </div>}><Categories /></Suspense>} />
          <Route path="/help-center/shipping-delivery" element={<Suspense fallback={<div className="loaderContainer">
          <span class="loader"></span>
        </div>}><ShippingAndDelivery /></Suspense>} />
          <Route path="/shops" element={<Suspense fallback={<div className="loaderContainer">
          <span class="loader"></span>
        </div>}><Shops /></Suspense>} />
          <Route path="/shops/:id" element={<Suspense fallback={<div className="loaderContainer">
          <span class="loader"></span>
        </div>}><ShopDetails /></Suspense>} />
          <Route path="/verify/:id" element={<Suspense fallback={<div className="loaderContainer">
          <span class="loader"></span>
        </div>}><OtpVerification /></Suspense>} />
        </Routes>

        {isHeaderFooterShow && <Footer />}
        <BottomHeader />

        {isOpenProductModal && <ProductModal data={productData} />}
      </MyContext.Provider>
    </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
export { MyContext }