import React, { useContext, useState } from "react";
import axios from "axios";
import { Rating } from "@mui/material";
import { MyContext } from "../../App";
// import toast from 'react-hot-toast';

const ReviewForm = ({ productId, staticId, shop }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(3);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const context = useContext(MyContext)
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
      context.setAlertBox({
        open: true,
        error: false,
        msg: "Review submitted successfully!"
      })
      setReview("");
      setRating(1);
      setName("");
    } catch (err) {
      setError("Failed to submit review.");
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Failed to submit review."
      })
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="col-md-6">
        <div className="">
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
