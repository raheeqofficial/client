import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewForm from '../Components/ReviewForm/ReviewForm';

const EligibleProducts = ({customerId}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEligibleProducts = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/productReviews/eligible-for-review/${customerId}`);
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load products.');
                setLoading(false);
            }
        };

        fetchEligibleProducts();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Products Eligible for Review</h2>
            {products.length === 0 ? (
                <p>No products available for review.</p>
            ) : (
                <ul>
                    {products.map(product => (
                        <li key={product._id}>
                            {product.name}
                            <ReviewForm productId={product.staticId} shop={product.shop} staticId={product.staticId} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default EligibleProducts;
