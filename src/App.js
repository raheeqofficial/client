import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import './responsive.css';
import { BrowserRouter, Route, Router, Routes, json, useParams } from "react-router-dom";
import Home from "./Pages/Home";
import Listing from "./Pages/Listing";
import ProductDetails from "./Pages/ProductDetails";
import Header from "./Components/Header";
import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import Footer from "./Components/Footer";
import ProductModal from "./Components/ProductModal";
import Cart from "./Pages/Cart";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import MyList from "./Pages/MyList";
import Checkout from './Pages/Checkout';
import Orders from './Pages/Orders';
import MyAccount from './Pages/MyAccount';
import SearchPage from './Pages/Search';

import { fetchDataFromApi, postData } from "./utils/api";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Success from "./Pages/success/Success";
import HelpCenterApp from "./Pages/Help center";
import ShippingAndDelivery from "./Pages/Help center/ShippingAndDelivery";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import BecomeSeller from "./Pages/BecomeAseller/BecomeSeller";
import BottomHeader from "./Components/BottomHeader/BottomMenu";
import MobileAccount from "./Pages/MobileAccount/MobileAccount";
import Categories from "./Pages/Categories/Categories";
import OrderDetails from "./Pages/Orders/OrderDetails/OrderDetails";
import TrackOrder from "./Pages/TrackOrder/TrackOrder";
import Error from "./Pages/productError/Error";
import Shops from "./Pages/Shops/Shops";
import ShopDetails from "./Pages/Shops/ShopsDetails/ShopDetails";
import DiscountPage from "./Pages/DiscountPage/DiscountPage";

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


        {
          isHeaderFooterShow === true && <Header />
        }



        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/products/category/:id" exact={true} element={<Listing />} />
          <Route path="/products/subCat/:id" exact={true} element={<Listing />} />
          <Route exact={true} path="/product/:id" element={<ProductDetails />} />
          <Route exact={true} path="/products/all" element={<DiscountPage />} />
          <Route exact={true} path="/product/error" element={<Error />} />
          <Route exact={true} path="/cart" element={<Cart />} />
          <Route exact={true} path="/signIn" element={<SignIn />} />
          <Route exact={true} path="/signUp" element={<SignUp />} />
          <Route exact={true} path="/my-list" element={<MyList />} />
          <Route exact={true} path="/checkout" element={<Checkout />} />
          <Route exact={true} path="/orders" element={<Orders />} />
          <Route exact={true} path="/order/details/:id" element={<OrderDetails />} />
          <Route exact={true} path="/*" element={<PageNotFound />} />
          <Route exact={true} path="/account-setting" element={<MyAccount />} />
          <Route exact={true} path="/account" element={<MobileAccount />} />
          <Route exact={true} path="/search" element={<SearchPage />} />
          <Route exact={true} path="/success" element={<Success />} />
          <Route exact={true} path="/become-seller" element={<BecomeSeller />} />
          <Route exact={true} path="/help-center" element={<HelpCenterApp />} />
          <Route exact={true} path="/help-center/track-order" element={<TrackOrder />} />
          <Route exact={true} path="/categories" element={<Categories />} />
          <Route exact={true} path="/help-center/shipping-delivery" element={<ShippingAndDelivery />} />
          <Route exact={true} path="/shops" element={<Shops />} />
          <Route exact={true} path="/shops/:id" element={<ShopDetails />} />
        </Routes>
        {
          isHeaderFooterShow === true && <Footer />
        }
        <BottomHeader/>



        {
          isOpenProductModal === true && <ProductModal data={productData} />
        }


      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;

export { MyContext }
