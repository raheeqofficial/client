import React, { useEffect, useState } from "react";
import "./saleCards.css";
import menImg from "../../assets/images/popular_products-banner-eliphstore.jpg";
import fashion from "../../assets/images/fashion-banner-eliphstore.jpg";
import newImg from "../../assets/images/New_product-front_banner-eliphstore.jpg";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

const SaleCards = () => {
  const [id, setId] = useState('')
  useEffect(() => {
    const fetchId = () => {
      const newId = `${uuid()}${uuid()}`;
        setId(newId);
    }
    fetchId()
  }, [])
  return (
    <section className="saleCards">
      <div className="container">
        {/* <div className="row"> */}
        <div className="saleCardsWrapper">
        <div className="cardBoxContainer">
          <Link to={`/products/popular-products/${id}`}>
            <div className="cardBox">
              <div className="cardImgWrapper">
                <img src={menImg} alt="Man image" />
              </div>
              <h6 className="cardBoxhd">Popular Products</h6>
            </div>
          </Link>
          <Link to={`/products/fashion/${id}`}>
            <div className="cardBox">
              <div className="cardImgWrapper">
                <img src={fashion} alt="Fashion image" />
              </div>
              <h6>Fashion</h6>
            </div>
          </Link>
          <Link to={`/products/new/${id}`}>
            <div className="cardBox">
              <div className="cardImgWrapper">
                <img src={newImg} alt="New arrival image" />
              </div>
              <h6 className="cardBoxhd">New Arrival</h6>
            </div>
          </Link>
        </div>
      </div>
        </div>
      {/* </div> */}
    </section>
  );
};

export default SaleCards;
