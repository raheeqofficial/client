import React, { useState, useEffect } from "react";
import axios from "axios";
import ReviewForm from "../Components/ReviewForm/ReviewForm";
import { Link, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const EligibleProducts = ({ customerId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchEligibleProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/productReviews/eligible-for-review/${customerId}`
        );
        setProducts(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load products.");
        setLoading(false);
      }
    };

    fetchEligibleProducts();
  }, [customerId]);

  const handleReviewClick = (product) => {
    navigate(`/review/${product._id}`, { state: { product } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h6 className="hd mt-1">Products Eligible for Review</h6>
      {products.length === 0 ? (
        <p>No products available for review.</p>
      ) : (
        <div>
          {products.map((product, index) => (
            <div class="order-card" key={index}>
              <div class="order-header">
                <div class="store-name">Trend Corner</div>
                <div
                  class="order-status bg-blue"
                  onClick={() => handleReviewClick(product)}
                >
                  Write Review
                </div>
              </div>
              <div class="order-content">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  class="product-image"
                />
                <div class="product-details">
                  <h3 className="mb-0">
                    <Link to={`/product/${product?.staticId}`}>
                      {product?.name?.substr(0, 100) + "..."}
                    </Link>
                  </h3>
                  {/* <p className="mb-0">Lens Color: Black, Frame Color: Black</p> */}
                </div>
                <div class="product-price mb-0">Rs {product?.price}</div>
                <div class="product-quantity mb-0">
                  Qty <b>:</b> {product?.quantity}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EligibleProducts;
