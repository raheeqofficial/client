import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ReviewForm from '../../Components/ReviewForm/ReviewForm';
import './review.css'

const ReviewPage = () => {
    const location = useLocation();
    const { product } = location.state || {};
    useEffect(() => {
        window.scrollTo(0,0)
    },[])
    if (!product) return <p>Product not found.</p>;

    return (
        <div className='container'>
            <div className="reviewPage">
            <h2 className='review-hd'>Leave a Review for {product.name}</h2>
            <div className='reviewWrapper'>
            <ReviewForm
                productId={product.staticId}
                shop={product.shop}
                staticId={product.staticId}
            />
            </div>
            </div>
        </div>
    );
};

export default ReviewPage;
