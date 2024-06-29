import React from 'react'
import shampooImg from '../../assets/images/shampoo.jpg'
import { Button } from '@mui/material'

const DealOfDay = () => {
  return (
    <>
        <div className="product-featured">
                    <h2 className="title">Deal of the day</h2>
                    <div className="showcase-wrapper has-scrollbar">
                        <div className="showcase-container">
                            <div className="showcase d-flex">
                                <div className="showcase-banner">
                                    <img src={shampooImg} alt="shampoo conditionar" className="showcase-img"/>
                                </div>
                                <div className="showcase-content">
                                    <div className="showcase-rating">
                                        <ion-icon name="star"></ion-icon>
                                        <ion-icon name="star"></ion-icon>
                                        <ion-icon name="star"></ion-icon>
                                        <ion-icon name="star-outline"></ion-icon>
                                        <ion-icon name="star-outline"></ion-icon>
                                    </div>
                                    <a href="#">
                                        <h3 className="showcase-title">Shampoo, Conditioner & facewash packs</h3>
                                    </a>
                                    <p className="showcase-desc">
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere, enim?
                                    </p>
                                    <div className="price-box">
                                        <p className="price">150.00</p>
                                        <del>120.00</del>
                                    </div>
                                    <Button className="btn btn-blue btn-lg">add to cart</Button>
                                    <div className="showcase-status">
                                        <div className="wrapper">
                                            <p>
                                                already sold: <b>20</b>
                                            </p>
                                            <p>
                                                Avaliable: <b>40</b>
                                            </p>
                                        </div>
                                        <div className="showcase-status-bar"></div>
                                    </div>
                                    <div className="countdown-box">
                                        <p className="countdown-desc">
                                            Hurry Up! Offer ends in:
                                        </p>
                                        <div className="countdown">
                                            <div className="countdown-content">
                                                <p className="display-number">360</p>
                                                <p className="display-text">Days</p>
                                            </div>
                                            <div className="countdown-content">
                                                <p className="display-number">24</p>
                                                <p className="display-text">hours</p>
                                            </div>
                                            <div className="countdown-content">
                                                <p className="display-number">59</p>
                                                <p className="display-text">Min</p>
                                            </div>
                                            <div className="countdown-content">
                                                <p className="display-number">03</p>
                                                <p className="display-text">Sec</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="showcase-container">
                            <div className="showcase">
                                <div className="showcase-banner">
                                    <img src="./assets/images/products/jewellery-1.jpg" alt="shampoo conditionar" className="showcase-img">
                                </div>
                                <div className="showcase-content">
                                    <div className="showcase-rating">
                                        <ion-icon name="star"></ion-icon>
                                        <ion-icon name="star"></ion-icon>
                                        <ion-icon name="star"></ion-icon>
                                        <ion-icon name="star-outline"></ion-icon>
                                        <ion-icon name="star-outline"></ion-icon>
                                    </div>
                                    <a href="#">
                                        <h3 className="showcase-title">Rose Gold Diamonds Earring</h3>
                                    </a>
                                    <p className="showcase-desc">
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere, enim?
                                    </p>
                                    <div className="price-box">
                                        <p className="price">$150.00</p>
                                        <del>$120.00</del>
                                    </div>
                                    <button className="add-cart-btn">add to cart</button>
                                    <div className="showcase-status">
                                        <div className="wrapper">
                                            <p>
                                                already sold: <b>20</b>
                                            </p>
                                            <p>
                                                Avaliable: <b>40</b>
                                            </p>
                                        </div>
                                        <div className="showcase-status-bar"></div>
                                    </div>
                                    <div className="countdown-box">
                                        <p className="countdown-desc">
                                            Hurry Up! Offer ends in:
                                        </p>
                                        <div className="countdown">
                                            <div className="countdown-content">
                                                <p className="display-number">360</p>
                                                <p className="display-text">Days</p>
                                            </div>
                                            <div className="countdown-content">
                                                <p className="display-number">24</p>
                                                <p className="display-text">hours</p>
                                            </div>
                                            <div className="countdown-content">
                                                <p className="display-number">59</p>
                                                <p className="display-text">Min</p>
                                            </div>
                                            <div className="countdown-content">
                                                <p className="display-number">03</p>
                                                <p className="display-text">Sec</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
    </>
  )
}

export default DealOfDay