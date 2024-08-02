import React, { useContext, useEffect, useState } from 'react';
import './contact.css';
import axios from 'axios'; 
import Confetti from 'react-confetti';
import { MyContext } from '../../App';
import { IoLogoFacebook } from 'react-icons/io';
import { CiInstagram } from 'react-icons/ci';
import { FaEnvelope, FaXTwitter } from 'react-icons/fa6';
import { GrYoutube } from 'react-icons/gr';
import { FaMapMarkedAlt, FaPhoneAlt } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const context = useContext(MyContext)
  useEffect(() => {
    window.scrollTo(0,0)
},[])
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form data
    const formData = {
      firstName,
      lastName,
      email,
      message,
    };

    try {
      if(formData.firstName === ""){
        context.setAlertBox({
          open: true,
          error: true,
          msg: "First name is required"
        })
        return
      }
      if(formData.lastName === ""){
        context.setAlertBox({
          open: true,
          error: true,
          msg: "Last name is required"
        })
        return
      }
      if(formData.email === ""){
        context.setAlertBox({
          open: true,
          error: true,
          msg: "Email is required"
        })
        return
      }
      if(formData.message === ""){
        context.setAlertBox({
          open: true,
          error: true,
          msg: "Message is required"
        })
        return
      }
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/contact/create`, formData);

      // Handle success
      if (response.status === 200) {
        setShowConfetti(true); 
        context.setAlertBox({
          open: true,
          error: false,
          msg: 'Message sent successfully!'
        })
        setFirstName('');
        setLastName('');
        setEmail('');
        setMessage('');
      }
    } catch (error) {
      context.setAlertBox({
        open: true,
        error: true,
        msg: 'Failed to send message. Please try again later.'
      })
    }
  };

  return (
    <>
    <Helmet>
      <title>Contact - EliphStore</title>
      <meta
        name="description"
        content="Experience the future of online shopping at Eliphstore, where innovation meets tradition. Support a global community of creators and entrepreneurs with every purchase. Shop smart, shop Eliphstore!."
      />
      <meta
        name="keywords"
        content="Contact, Eliphstore.com, online shopping website, online shop, online store website, clothing websites, online shopping sites, best online clothing stores, shopping websites, shopping sites, clothing online stores, best online shopping websites, good online clothing stores, store website, best online shopping sites, best online store, best online clothes shopping, clothes online, top online clothing stores, clothing store online shopping, website online shop, internet shopping sites, all online shopping websites, good online shopping sites, best online clothes shops, good online shops, online shops for clothes, good online shopping websites, top shopping sites, e-commerce store, online store, buy online, buy clothes online, online fashion store, discount shopping online, shop online for electronics, buy shoes online, women's clothes online, top-selling products online, online sale, e-store, online jewellery shopping, clothing sales online, cheap clothing brands, men's sale clothing, women's sale clothing, Eliphstore.com, multivendor online store, shopping needs, multivendor online store, clothing, footwear, fashion, kitchen accessories, latest fashion trends, home essentials, unique gifts, seamless shopping experience, customer service, variety of choices, multivendor marketplace, quality and variety, online shopping in Pakistan, newest fashion trends, renowned brands, seasonal collections, Pakistani brands, shawls, sweaters, t-shirts, caps, hoodies, sleeves, trousers, kurtas, kurtis, coats, shrugs, jackets, boots, sneakers, flats, high heels, khussa, stitched and unstitched clothes, chic accessories, jewelry, watches, scarves, hijabs, perfumes, hottest new arrivals, timeless style, modern trends, high-quality fashion wear, elegant dresses, stylish shoes, trendy handbags, top 10 online branded shopping sites, competitive prices, 24/7 service, fast delivery, effortless shopping,
       designer collections, seamless online shopping experience "
      />
    </Helmet>
      <div className="contactForm">
      <div className="contact-container">
        <div className="contact-left">
          <h2>Get In Touch</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="single-row">
              <input
                type="text"
                placeholder="First Name"
                className="form-in mr"
                value={FormData.firstName}
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="form-in ml"
                value={FormData.lastName}
                required
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="multiple-row">
              <input
                type="email"
                placeholder="Email"
                className="form-in"
                value={FormData.email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <textarea
                placeholder="Your Message"
                className="form-in"
                required
                value={FormData.message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              {/* <input type="submit" id="submit"/><label for="submit"><i class="fas fa-paper-plane"></i></label> */}
            </div>
            <button type='submit' className='submitButton'>submit</button>
          </form>
        </div>
        <div className="contact-right">
          <h2>Contact Information</h2>
          <div className="contact-info">
            <p>
              <FaPhoneAlt/> +92 3144363910
            </p>
            <p>
              <FaEnvelope/> support@eliphstore.com
            </p>
            <p>
              <FaMapMarkedAlt/> Lahore, Pakistan
            </p>
          </div>
          <div className="social-links">
            <a href="#">
              <IoLogoFacebook/>
            </a>
            <a href="#">
              <CiInstagram/>
            </a>
            <a href="#">
              <FaXTwitter/>
            </a>
            <a href="#">
              <GrYoutube/>
            </a>
          </div>
        </div>
      </div>
    </div>
    {showConfetti && <Confetti />}
    </>
  );
};

export default Contact;
