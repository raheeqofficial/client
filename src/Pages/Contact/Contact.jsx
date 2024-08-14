import React, { useContext, useEffect, useState } from "react";
import "./contact.css";
import axios from "axios";
import Confetti from "react-confetti";
import { MyContext } from "../../App";
import { IoLogoFacebook } from "react-icons/io";
import { CiInstagram } from "react-icons/ci";
import { FaEnvelope, FaXTwitter } from "react-icons/fa6";
import { GrYoutube } from "react-icons/gr";
import { FaMapMarkedAlt, FaPhoneAlt } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const context = useContext(MyContext);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
      if (formData.firstName === "") {
        context.setAlertBox({
          open: true,
          error: true,
          msg: "First name is required",
        });
        return;
      }
      if (formData.lastName === "") {
        context.setAlertBox({
          open: true,
          error: true,
          msg: "Last name is required",
        });
        return;
      }
      if (formData.email === "") {
        context.setAlertBox({
          open: true,
          error: true,
          msg: "Email is required",
        });
        return;
      }
      if (formData.message === "") {
        context.setAlertBox({
          open: true,
          error: true,
          msg: "Message is required",
        });
        return;
      }
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/contact/create`,
        formData
      );

      // Handle success
      if (response.status === 200) {
        setShowConfetti(true);
        context.setAlertBox({
          open: true,
          error: false,
          msg: "Message sent successfully!",
        });
        setFirstName("");
        setLastName("");
        setEmail("");
        setMessage("");
      }
    } catch (error) {
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Failed to send message. Please try again later.",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>
          Contact Us - Hibuyshopping | Get in Touch with Pakistan's Leading
          E-Commerce Platform
        </title>
        <meta
          name="title"
          content="Contact Us - Hibuyshopping | Get in Touch with Pakistan's Leading E-Commerce Platform"
        />
        <meta
          name="description"
          content="Reach out to Hibuyshopping with any inquiries, feedback, or support requests. Our Contact Us page provides all the information you need to get in touch with our team for assistance. We're here to help with your online shopping experience in Pakistan."
        />
        <meta
          name="keywords"
          content="contact us, Hibuyshopping, customer support, e-commerce support, online shopping assistance, contact information, feedback, inquiries, Pakistan e-commerce, multi-vendor store"
        />
        <meta name="author" content="Hibuyshopping Team" />
        <meta
          property="og:title"
          content="Contact Us - Hibuyshopping | Get in Touch with Pakistan's Leading E-Commerce Platform"
        />
        <meta
          property="og:description"
          content="Get in touch with Hibuyshopping for any inquiries, feedback, or support. Our Contact Us page provides all necessary information to connect with our team and receive assistance. We're dedicated to ensuring a smooth online shopping experience in Pakistan."
        />
        <meta property="og:image" content="https://hibuyshopping.com/contact" />
        <meta property="og:url" content="https://hibuyshopping.com/contact" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Contact Us - Hibuyshopping | Get in Touch with Pakistan's Leading E-Commerce Platform"
        />
        <meta
          name="twitter:description"
          content="Reach out to Hibuyshopping for support, feedback, or inquiries. Visit our Contact Us page for the details you need to connect with us and get assistance with your online shopping experience in Pakistan."
        />
        <meta
          name="twitter:image"
          content="https://hibuyshopping.com/contact"
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
              <button type="submit" className="submitButton">
                submit
              </button>
            </form>
          </div>
          <div className="contact-right">
            <h2>Contact Information</h2>
            <div className="contact-info">
              <p>
                <FaPhoneAlt /> +92 3144363910
              </p>
              <p>
                <FaEnvelope /> support@hibuyshopping.com
              </p>
              <p>
                <FaMapMarkedAlt /> Lahore, Pakistan
              </p>
            </div>
            <div className="social-links">
              <a href="#">
                <IoLogoFacebook />
              </a>
              <a href="#">
                <CiInstagram />
              </a>
              <a href="#">
                <FaXTwitter />
              </a>
              <a href="#">
                <GrYoutube />
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
