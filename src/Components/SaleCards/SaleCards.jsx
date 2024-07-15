import React from "react";
import "./saleCards.css";
import menImg from "../../assets/images/Men_2.webp";
import girlImg from "../../assets/images/Girls-Summer.webp";
import salelImg from "../../assets/images/sale.webp";
import { Link } from "react-router-dom";

const SaleCards = () => {
  return (
    <section className="saleCards">
      <div className="saleCardsWrapper">
        <div className="cardBoxContainer">
          <Link>
            <div className="cardBox">
              <div className="cardImgWrapper">
                <img src={menImg} alt="Man image" />
              </div>
              <h6>Men</h6>
            </div>
          </Link>
          <Link>
            <div className="cardBox">
              <div className="cardImgWrapper">
                <img src={girlImg} alt="Girl image" />
              </div>
              <h6>Girl</h6>
            </div>
          </Link>
          <Link>
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
