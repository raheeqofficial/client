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
        console.log(response.data)
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
        <ul>
          {products.map((product, index) => (
            <table className="table table-wishlist table-mobile" key={index}>
              <tbody>
                <tr>
                  <td className="product-col">
                    <div className="product">
                      <figure className="product-media">
                        <Link to={`/product/${product?.staticId}`}>
                          <LazyLoadImage
                            src={product.images[0]}
                            alt={product.name}
                            effect="blur"
                            placeholderSrc="path_to_placeholder_image"
                          />
                        </Link>
                      </figure>

                      <h3 className="product-title">
                        <Link to={`/product/${product?.staticId}`}>
                          {product?.name?.substr(0, 30) + "..."}
                        </Link>
                      </h3>
                    </div>
                  </td>
                  <td className="price-col">Rs {product?.price}</td>
                  <td className="remove-col">
                    <button className="btn btn-blue" onClick={() => handleReviewClick(product)}>
                        Review
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EligibleProducts;
