import React, { useState } from "react";
import axios from "axios";
import { Rating } from "@mui/material";
// import toast from 'react-hot-toast';

const ReviewForm = ({ productId, staticId, shop }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(1);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const changeRating = (e) => {
    setRating(e.target.value)
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/productReviews/create`,
        {
          customerId: user.userId,
          customerName: user.name,
          review,
          customerRating: rating,
          productId,
          staticId,
          shop: shop,
        }
      );
      // toast.success('Review submitted successfully!');
      setReview("");
      setRating(1);
      setName("");
    } catch (err) {
      setError("Failed to submit review.");
      // toast.error('Failed to submit review.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Submit a Review</h4>
      {/* <div>
                <label>Rating:</label>
                <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <option key={star} value={star}>
                            {star}
                        </option>
                    ))}
                </select>
            </div> */}
      <div className="col-md-6">
        <div className="form-group">
          <Rating
            name="rating"
            value={rating}
            precision={0.5}
            onChange={changeRating}
          />
        </div>
      </div>
      <div className="form-group col-md-6">
        <label>Review:</label>
        <textarea
          className="form-control shadow"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn-blue btn-lg btn-big btn-round">
        Submit Review
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default ReviewForm;
