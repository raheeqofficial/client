import React, { useEffect, useState } from "react";
import { fetchDataFromApi } from "../../utils/api";
import { IoIosImages } from "react-icons/io";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { TfiFullscreen } from "react-icons/tfi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Under600 = () => {
  const [products, setProducts] = useState([]);
  const [isAddedToMyList, setSsAddedToMyList] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchDataFromApi("/api/products/600-or-less").then((res) => {
      setProducts(res);
    });
  }, []);
  return (
    <div className="container">
      {products.map((item, index) => (
        <div key={index}>
          <div className="img_rapper">
            <Link to={`/product/`}>
              <img src={item?.images[0]} className="w-100" alt={item.productTitle} />
            </Link>

            <span className="badge badge-primary">{item?.discount}%</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Under600;
