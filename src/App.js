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
import Wishlist from "./Pages/MyList/Wishlist";
import TermsOfUse from "./Pages/TermsOfUse/TermsOfUse";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
import FollowedShops from "./Pages/FollowedShops/FollowedShops";
import { CircularProgress } from "@mui/material";
import ReturnOrder from "./Pages/Help center/ReturnOrder";
import ManageAccount from "./Pages/MyAccount/MyAccount";
import ReviewPage from "./Pages/Review/ReviewPage";
import Faq from "./Pages/Faq/Faq";
import ForgotPassword from "./Pages/forgetPassword/ForgetPassword";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import VerifyEmail from "./Pages/forgetPassword/VerifyEmail";
import Listing2 from "./Pages/Listing2/Listing2";
import InEighteenHundred from "./Pages/SpecialOffer/InEighteenHundred";
import useNetworkStatus from "./useNetworkstatus";

// Lazy imports
const Home = lazy(() => import('./Pages/Home/index'));
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

function AppLayout({ children }) {
  const isOnline = useNetworkStatus();

  return (
    <div>
      {!isOnline && (
        <div className="alert alert-warning">
          You are offline. Please check your internet connection.
        </div>
      )}
      {children}
    </div>
  );
}


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
  const [addingOffer, setAddingOffer] = useState(false);

  const [cartData, setCartData] = useState();
  const [offerData, setOfferData] = useState();
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


  const { id } = useParams()
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
    fetchDataFromApi(`/api/offers?userId=${user?.userId}`).then((res) => {
      setOfferData(res)
      console.log(res)
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
  const getOfferData = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    fetchDataFromApi(`/api/offers?userId=${user?.userId}`).then((res) => {
      setOfferData(res)
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
    if (isLogin === true) {
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
    else {
      setAlertBox({
        open: true,
        error: true,
        msg: "Please login first"
      })
    }

  }
  const addOffer = (data) => {
    if (isLogin === true) {
      setAddingOffer(true);
      postData(`/api/offers/add-offer`, data).then((res) => {
        if (res.status !== false) {
          setAlertBox({
            open: true,
            error: false,
            msg: "Item is added in the cart"
          })
          setTimeout(() => {
            setAddingOffer(false);
          }, 1000);
          getOfferData();
        }
        else {
          setAlertBox({
            open: true,
            error: true,
            msg: res.msg
          })
          setAddingOffer(false);
        }

      })
    }
    else {
      setAlertBox({
        open: true,
        error: true,
        msg: "Please login first"
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
    addOffer,
    setAddingInCart,
    setAddingOffer,
    cartData,
    offerData,
    setCartData,
    setOfferData,
    getCartData,
    getOfferData,
    searchData,
    setSearchData,
    windowWidth,
    isOpenNav,
    setIsOpenNav,
    productData
  }
  return (
    <HelmetProvider>
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



          <AppLayout>
            <Routes>

              <Route path="/" element={<Suspense fallback={<div className="loaderContainer">
                <CircularProgress color="inherit" />
              </div>}><Home /></Suspense>} />
              <Route path="/about" element={<Suspense fallback={<div className="loaderContainer">
                <CircularProgress color="inherit" />
              </div>}><About /></Suspense>} />
              <Route path="/contact" element={<Suspense fallback={<div className="loaderContainer">
                <CircularProgress color="inherit" />
              </div>}><Contact /></Suspense>} />
              <Route path="/products/category/:id" element={<Suspense fallback={<div className="loaderContainer">
                <CircularProgress color="inherit" />
              </div>}><Listing /></Suspense>} />
              <Route path="/products/subCat/:id" element={<Suspense fallback={<div className="loaderContainer">
                <CircularProgress color="inherit" />
              </div>}><Listing /></Suspense>} />
              <Route path="/products/flash-sale/:id" element={<Suspense fallback={<div className="loaderContainer">
                <CircularProgress color="inherit" />
              </div>}><FlashSale /></Suspense>} />
              <Route path="/products/popular-products/:id" element={<Suspense fallback={<div className="loaderContainer">
                <CircularProgress color="inherit" />
              </div>}><PopularProducts /></Suspense>} />
              <Route path="/products/fashion/:id" element={<Suspense fallback={<div className="loaderContainer">
                <CircularProgress color="inherit" />
              </div>}><Fashion /></Suspense>} />
              <Route path="/products/new/:id" element={<Suspense fallback={<div className="loaderContainer">
                <CircularProgress color="inherit" />
              </div>}><NewProducts /></Suspense>} />
              <Route path="/product/:id" element={<Suspense fallback={<div className="loaderContainer">
                <CircularProgress color="inherit" />
              </div>}><ProductDetails /></Suspense>} />
              <Route path="/products/all" element={<Suspense fallback={<div className="loaderContainer">
                <CircularProgress color="inherit" />
              </div>}><DiscountPage /></Suspense>} />
              <Route path="/product/error" element={<Suspense fallback={<div className="loaderContainer">
                <CircularProgress color="inherit" />
              </div>}><Error /></Suspense>} />
              <Route path="/cart" element={<Suspense fallback={<div className="loaderContainer">
                <CircularProgress color="inherit" />
              </div>}><Cart /></Suspense>} />
              <Route path="/signIn" element={<Suspense fallback={<div className="loaderContainer">
                <CircularProgress color="inherit" />
              </div>}><SignIn /></Suspense>} />

              <Route path="/signUp" element={<Suspense fallback={<div className="loaderContainer">
                <CircularProgress color="inherit" />
              </div>}><SignUp /></Suspense>} />
              <Route path="/my-list" element={<Suspense fallback={<div className="loaderContainer">
                <CircularProgress color="inherit" />
              </div>}><Wishlist /></Suspense>} />
              <Route path="/checkout" element={<Suspense fallback={<div className="loaderContainer">
                <CircularProgress color="inherit" />
              </div>}><Checkout /></Suspense>} />
              <Route path="/orders" element={<Suspense fallback={<div className="loaderContainer">
                <CircularProgress color="inherit" />
              </div>}><Orders /></Suspense>} />
              <Route path="/order/details/:id" element={<Suspense fallback={<div className="loaderContainer">
                <CircularProgress color="inherit" />
              </div>}><OrderDetails /></Suspense>} />
              <Route path="/*" element={<Suspense fallback={<div className="loaderContainer">
                <CircularProgress color="inherit" />
              </div>}><PageNotFound /></Suspense>} />
              <Route path="/page-not-found" element={<Suspense fallback={<div className="loaderContainer">
                <CircularProgress color="inherit" />
              </div>}><PageNotFound /></Suspense>} />
              <Route path="/account-setting" element={<Suspense fallback={<div className="loaderContainer">
                <CircularProgress color="inherit" />
              </div>}><MyAccount /></Suspense>} />
              <Route path="/account" element={<Suspense fallback={<div className="loaderContainer">
                <CircularProgress color="inherit" />
              </div>}><MobileAccount /></Suspense>} />
              <Route path="/search" element={<Suspense fallback={<div className="loaderContainer">
                <CircularProgress color="inherit" />
              </div>}><SearchPage /></Suspense>} />
              <Route path="/success" element={<Suspense fallback={<div className="loaderContainer">
                <CircularProgress color="inherit" />
              </div>}><Success /></Suspense>} />
              <Route path="/become-seller" element={<Suspense fallback={<div className="loaderContainer">
                <CircularProgress color="inherit" />
              </div>}><BecomeSeller /></Suspense>} />
              <Route path="/help-center" element={<Suspense fallback={<div className="loaderContainer">
                <CircularProgress color="inherit" />
              </div>}><HelpCenterApp /></Suspense>} />
              <Route path="/help-center/cancel-order" element={<Suspense fallback={<div className="loaderContainer">
                <CircularProgress color="inherit" />
              </div>}><CancelOrder /></Suspense>} />
              <Route path="/help-center/track-order" element={<Suspense fallback={<div className="loaderContainer">
                <CircularProgress color="inherit" />
              </div>}><TrackOrder /></Suspense>} />
              <Route path="/help-center/return-order" element={<Suspense fallback={<div className="loaderContainer">
                <CircularProgress color="inherit" />
              </div>}><ReturnOrder /></Suspense>} />
              <Route path="/categories" element={<Suspense fallback={<div className="loaderContainer">
                <CircularProgress color="inherit" />
              </div>}><Categories /></Suspense>} />
              <Route path="/help-center/shipping-delivery" element={<Suspense fallback={<div className="loaderContainer">
                <CircularProgress color="inherit" />
              </div>}><ShippingAndDelivery /></Suspense>} />
              <Route path="/shops" element={<Suspense fallback={<div className="loaderContainer">
                <CircularProgress color="inherit" />
              </div>}><Shops /></Suspense>} />
              <Route path="/shops/:id" element={<Suspense fallback={<div className="loaderContainer">
                <CircularProgress color="inherit" />
              </div>}><ShopDetails /></Suspense>} />
              <Route path="/verify/:id" element={<Suspense fallback={<div className="loaderContainer">
                <CircularProgress color="inherit" />
              </div>}><OtpVerification /></Suspense>} />
              <Route path="/terms-of-use/:id" element={<Suspense fallback={<div className="loaderContainer">
                <CircularProgress color="inherit" />
              </div>}><TermsOfUse /></Suspense>} />
              <Route path="/privacy-policy/:id" element={<Suspense fallback={<div className="loaderContainer">
                <CircularProgress color="inherit" />
              </div>}><PrivacyPolicy /></Suspense>} />
              <Route path="/my-account/followed-shops" element={<Suspense fallback={<div className="loaderContainer">
                <CircularProgress color="inherit" />
              </div>}><FollowedShops /></Suspense>} />
              <Route path="/faq" element={<Suspense fallback={<div className="loaderContainer">
                <CircularProgress color="inherit" />
              </div>}><Faq /></Suspense>} />
              <Route path="/user/forget-password" element={<Suspense fallback={<div className="loaderContainer">
                <CircularProgress color="inherit" />
              </div>}><ForgotPassword /></Suspense>} />
              <Route path="/user/verify-email" element={<Suspense fallback={<div className="loaderContainer">
                <CircularProgress color="inherit" />
              </div>}><VerifyEmail /></Suspense>} />
              <Route path="/user/reset-password" element={<Suspense fallback={<div className="loaderContainer">
                <CircularProgress color="inherit" />
              </div>}><ResetPassword /></Suspense>} />
              <Route path="/products/listing" element={<Suspense fallback={<div className="loaderContainer">
                <CircularProgress color="inherit" />
              </div>}><Listing2 /></Suspense>} />
              <Route path="/products/special-offer" element={<Suspense fallback={<div className="loaderContainer">
                <CircularProgress color="inherit" />
              </div>}><InEighteenHundred /></Suspense>} />
              {windowWidth >= 768 && (
                <Route
                  path="/user/manage-account"
                  element={
                    <Suspense
                      fallback={
                        <div className="loaderContainer">
                          <CircularProgress color="inherit" />
                        </div>
                      }
                    >
                      <ManageAccount />
                    </Suspense>
                  }
                />
              )}
              <Route path="/review/:productId" element={<Suspense fallback={<div className="loaderContainer">
                <CircularProgress color="inherit" />
              </div>}><ReviewPage /></Suspense>} />
            </Routes>
          </AppLayout>
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