import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { MyContext } from '../../App';
import { Helmet } from 'react-helmet-async';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const location = useLocation();
    const email = localStorage.getItem("verify-email")
    const navigate = useNavigate()
    const context = useContext(MyContext)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/resetPassword`, { email, newPassword });
            context.setAlertBox({
                open: true,
                error: false,
                msg: "Password Reset successfully"
            })
            navigate('/login')
        } catch (error) {
            context.setAlertBox({
                open: true,
                error: false,
                msg: error.response?.data?.msg || 'Failed to reset password.'
            })
        }
    };

    return (
        <>
        <Helmet>
        <title>Reset Password - Hibuyshopping</title>
        
          <meta
            name="description"
            content="Experience the future of online shopping at Hibuyshopping, where innovation meets tradition. Support a global community of creators and entrepreneurs with every purchase. Shop smart, shop Hibuyshopping!."
          />
          <meta
            name="keywords"
            content="Reset Password, Hibuyshopping.com, online shopping website, online shop, online store website, clothing websites, online shopping sites, best online clothing stores, shopping websites, shopping sites, clothing online stores, best online shopping websites, good online clothing stores, store website, best online shopping sites, best online store, best online clothes shopping, clothes online, top online clothing stores, clothing store online shopping, website online shop, internet shopping sites, all online shopping websites, good online shopping sites, best online clothes shops, good online shops, online shops for clothes, good online shopping websites, top shopping sites, e-commerce store, online store, buy online, buy clothes online, online fashion store, discount shopping online, shop online for electronics, buy shoes online, women's clothes online, top-selling products online, online sale, e-store, online jewellery shopping, clothing sales online, cheap clothing brands, men's sale clothing, women's sale clothing, Hibuyshopping.com, multivendor online store, shopping needs, multivendor online store, clothing, footwear, fashion, kitchen accessories, latest fashion trends, home essentials, unique gifts, seamless shopping experience, customer service, variety of choices, multivendor marketplace, quality and variety, online shopping in Pakistan, newest fashion trends, renowned brands, seasonal collections, Pakistani brands, shawls, sweaters, t-shirts, caps, hoodies, sleeves, trousers, kurtas, kurtis, coats, shrugs, jackets, boots, sneakers, flats, high heels, khussa, stitched and unstitched clothes, chic accessories, jewelry, watches, scarves, hijabs, perfumes, hottest new arrivals, timeless style, modern trends, high-quality fashion wear, elegant dresses, stylish shoes, trendy handbags, top 10 online branded shopping sites, competitive prices, 24/7 service, fast delivery, effortless shopping,
           designer collections, seamless online shopping experience "
          />
        </Helmet>
            <div className="verify-container">
                <div className="verify-box">
        
                <h1>Reset Password</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-1">
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        placeholder='Enter new password'
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="verify-input"
                    />
                </div>
                <button type="submit" className="btn btn-blue w-100">Reset Password</button>
            </form>
                </div>
        </div>
        </>
    );
};

export default ResetPassword;