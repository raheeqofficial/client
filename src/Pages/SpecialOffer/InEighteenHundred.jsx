
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { MyContext } from '../../App';
import { fetchDataFromApi, postData } from '../../utils/api';

const InEighteenHundred = () => {
  //   const [products, setProducts] = useState([]);
  //   const [productsData, setProductsData] = useState([]);
  //   const [selectedProducts, setSelectedProducts] = useState([]);
  //   const [message, setMessage] = useState('');
  //   let [cartFields, setCartFields] = useState({});
  //   const context = useContext(MyContext)
  //   const [activeSize, setActiveSize] = useState(0);
  //   const [activeWeight, setActiveWeight] = useState(0);
  //   const [activeColor, setActiveColor] = useState(0);
  //   const [activeRam, setActiveRam] = useState(0);
  //   const [activeTabs, setActiveTabs] = useState(1);
  //   let [productQuantity, setProductQuantity] = useState();
  //   const [tabError, setTabError] = useState(false);
  //   const [weightTabError, setWeightTabError] = useState(false);
  //   const [colorTabError, setColorTabError] = useState(false);
  //   const [ramTabError, setRamTabError] = useState(false);
  //   const [offerData, setOfferData] = useState();
  //   const [addingOffer, setAddingOffer] = useState(false);

  //   useEffect(() => {
  //       axios.get(`${process.env.REACT_APP_API_URL}/api/products?price=600`).then(response => {
  //         response.data.products.map((product) => setProducts(product))
  //         setProductsData(response.data.products)
  //       });
  //       console.log(context.offerData)
  //   }, []);

  //   const getOfferData = () => {
  //     const user = JSON.parse(localStorage.getItem("user"));
  //     fetchDataFromApi(`/api/offers?userId=${user?.userId}`).then((res) => {
  //       setOfferData(res)
  //     });
  //   }

    
  // const addOffer = (data) => {
  //   if (context.isLogin === true) {
  //     setAddingOffer(true);
  //     postData(`/api/offers/add-offer`, data).then((res) => {

  //     })
  //   }
  //   else {
  //     context.setAlertBox({
  //       open: true,
  //       error: true,
  //       msg: "Please login first"
  //     })
  //   }

  // }

    
  //   const isActiveSize = (index) => {
  //     setActiveSize(index);
  //     setTabError(false);
  // }
  // const isActiveWeight = (index) => {
  //     setActiveWeight(index)
  //     setWeightTabError(false);
  // }
  // const isActiveColor = (index) => {
  //     setActiveColor(index)
  //     setColorTabError(false);
  // }
  // const isActiveRam = (index) => {
  //     setActiveRam(index)
  //     setRamTabError(false);
  // }
  // useEffect(() => {
  //     if (products?.color?.length > 0) {
  //         setActiveColor(0);
  //     }
  //     if (products?.size?.length > 0) {
  //         setActiveSize(0);
  //     }
  //     if (products?.productRam?.length > 0) {
  //         setActiveRam(0);
  //     }
  //     if (products?.productWeight?.length > 0) {
  //         setActiveWeight(0);
  //     }
  // }, [products]);

    // const handleAddToCart = async (productId) => {
    //   if (productId) {
    //     const user = JSON.parse(localStorage.getItem("user"));
    //     const selectedSize = products?.size?.length !== 0 ? products.size[activeSize] : null
    //     const selectedWeight = products?.productWeight?.length !== 0 ? products.productWeight[activeWeight] : null
    //     const selectedColor = products?.color?.length !== 0 ? products.color[activeColor] : null
    //     const selectedRam = products?.productRam?.length !== 0 ? products.productRam[activeRam] : null
    //     cartFields.productTitle = products?.name
    //     cartFields.shop = products?.shop
    //     cartFields.staticId = products?.staticId
    //     cartFields.productSize = selectedSize
    //     cartFields.productWeight = selectedWeight
    //     cartFields.productRam = selectedRam
    //     cartFields.productColor = selectedColor
    //     cartFields.image = products?.images[0]
    //     cartFields.rating = products?.rating
    //     cartFields.price = products?.price
    //     cartFields.quantity = 1
    //     cartFields.subTotal = parseInt(products?.price * 1)
    //     cartFields.productId = products?.id
    //     cartFields.countInStock = products?.countInStock
    //     cartFields.userId = user?.userId
    // }

    // if (products.length >= 3) {
    //     setMessage('You can only add up to three products.');
    //     return;
    // }
      


    //   context.addOffer(cartFields);
    // };

    // const handleSubmitOffer = async () => {
    //   const {userId} = JSON.parse(localStorage.getItem("user"))
    //     if (selectedProducts.length !== 3) {
    //         setMessage('Please add exactly three products.');
    //         return;
    //     }

    //     try {
    //         const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/offers/special-offer`, {
    //             userId,
    //             productIds: selectedProducts
    //         });
    //         setMessage(response.data.message);
    //     } catch (error) {
    //         setMessage('Error applying the special offer.');
    //     }
    // };

    return (
        <div>
            <h1>Special Offer: Buy any 3 products for 1800</h1>
            
        </div>
    );
};

export default InEighteenHundred;
