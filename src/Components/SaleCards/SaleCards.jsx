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
          <Link to={`/products/popular-products/78c44c48-c5a2-4e15-b362-40402e3c36511dbb78b4-f4c0-4b64-8819-873c7e9c4fba`}>
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
          <Link to={`/products/new/c410c9d3-5ada-45b4-8b98-95c0fed5df8212d85d8b-e9e3-4daf-b89d-554a6f429d9c`}>
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
