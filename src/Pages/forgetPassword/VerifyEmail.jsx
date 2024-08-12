

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../App';
import { Helmet } from 'react-helmet-async';

const VerifyEmail = () => {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const history = useNavigate();
  const context = useContext(MyContext)

  const handleVerify = async () => {
    
    const email = localStorage.getItem('verify-email');
    if (!email) {
      setMessage('Email not found');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/verify-code/verify`, { email, code });
      if (response.data.success === true) {
        context.setAlertBox({
          open: true,
          error: false,
          msg: "User verified successfully!"
      });
        history(`/user/reset-password?email=${email}`);
      } else if (response.data.success === false)  {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage('Please enter valid verification code');
      console.error('Verification error:', error);
    }
  };

  return (
    <>
    <Helmet>
    <title>Verify account - Hibuyshopping</title>
    
      <meta
        name="description"
        content="Experience the future of online shopping at Hibuyshopping, where innovation meets tradition. Support a global community of creators and entrepreneurs with every purchase. Shop smart, shop Hibuyshopping!."
      />
      <meta
        name="keywords"
        content="Verify account, Hibuyshopping.com, online shopping website, online shop, online store website, clothing websites, online shopping sites, best online clothing stores, shopping websites, shopping sites, clothing online stores, best online shopping websites, good online clothing stores, store website, best online shopping sites, best online store, best online clothes shopping, clothes online, top online clothing stores, clothing store online shopping, website online shop, internet shopping sites, all online shopping websites, good online shopping sites, best online clothes shops, good online shops, online shops for clothes, good online shopping websites, top shopping sites, e-commerce store, online store, buy online, buy clothes online, online fashion store, discount shopping online, shop online for electronics, buy shoes online, women's clothes online, top-selling products online, online sale, e-store, online jewellery shopping, clothing sales online, cheap clothing brands, men's sale clothing, women's sale clothing, Hibuyshopping.com, multivendor online store, shopping needs, multivendor online store, clothing, footwear, fashion, kitchen accessories, latest fashion trends, home essentials, unique gifts, seamless shopping experience, customer service, variety of choices, multivendor marketplace, quality and variety, online shopping in Pakistan, newest fashion trends, renowned brands, seasonal collections, Pakistani brands, shawls, sweaters, t-shirts, caps, hoodies, sleeves, trousers, kurtas, kurtis, coats, shrugs, jackets, boots, sneakers, flats, high heels, khussa, stitched and unstitched clothes, chic accessories, jewelry, watches, scarves, hijabs, perfumes, hottest new arrivals, timeless style, modern trends, high-quality fashion wear, elegant dresses, stylish shoes, trendy handbags, top 10 online branded shopping sites, competitive prices, 24/7 service, fast delivery, effortless shopping,
       designer collections, seamless online shopping experience "
      />
    </Helmet>
      <div className="verify-container">
            <div className="verify-box">
                <h1>Verify it's You</h1>
                <p className="mb-1">Enter the verification code sent to your email</p>
                <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter verification code"
                    className="verify-input"
                />
                <button onClick={handleVerify} className="btn btn-blue w-100">Verify</button>
                {message && <p className="verify-message">{message}</p>}
            </div>
        </div>
    </>
  );
};

export default VerifyEmail;

