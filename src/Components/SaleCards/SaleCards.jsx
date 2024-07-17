import React, { useEffect, useState } from "react";
import "./saleCards.css";
import menImg from "../../assets/images/Men_2.webp";
import girlImg from "../../assets/images/Girls-Summer.webp";
import salelImg from "../../assets/images/sale.webp";
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
      <div className="saleCardsWrapper">
        <div className="cardBoxContainer">
          <Link to={`/products/popular-products/${id}`}>
            <div className="cardBox">
              <div className="cardImgWrapper">
                <img src={menImg} alt="Man image" />
              </div>
              <h6>Popular Products</h6>
            </div>
          </Link>
          <Link to={`/products/fashion/${id}`}>
            <div className="cardBox">
              <div className="cardImgWrapper">
                <img src={girlImg} alt="Girl image" />
              </div>
              <h6>Fashion</h6>
            </div>
          </Link>
          <Link to={`/products/new/${id}`}>
            <div className="cardBox">
              <div className="cardImgWrapper">
                <img src={salelImg} alt="Summer sale image" />
              </div>
              <h6>Sale</h6>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SaleCards;
