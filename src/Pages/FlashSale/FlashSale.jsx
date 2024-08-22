import { useEffect, useState } from "react";
import ProductItem from "../../Components/ProductItem";
import { fetchDataFromApi } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";
import img from "../../assets/images/Banner-flash sale.jpg";
import "./flashSale.css";
import { Helmet } from "react-helmet-async";
import { BsEmojiExpressionless } from "react-icons/bs";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const FlashSale = () => {
  const [productView, setProductView] = useState("four");
  const [productData, setProductData] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setisLoading(true);
    fetchDataFromApi(`/api/products?discount=50`)
      .then((res) => {
        setProductData(res);
        setisLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setisLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="loaderContainer">
        <CircularProgress color="inherit" />
      </div>
    );
  }

  if (productData?.products?.length === 0) {
    return (
      <div className="not-ava-msg">
        <h6>
          Sorry, there are no products available in this category at the moment.
          Please check back later or explore other categories.
        </h6>
        <BsEmojiExpressionless />
        <Button className="btn btn-blue btn-lg mt-2">
          <Link to={"/"}>Back</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://hibuyshopping.com/products/flash-sale/4d9040da-a6ea-4ff0-8ceb-91e44dda3a25bf80965f-a231-4289-9805-c1f0ed86a73d " />
        <title>
          Exclusive 50% Discount - Hibuyshopping | Save Big on Top Brands in
          Pakistan
        </title>
        <meta
          name="title"
          content="Exclusive 50% Discount - Hibuyshopping | Save Big on Top Brands in Pakistan"
        />
        <meta
          name="description"
          content="Enjoy a massive 50% discount on selected products at Hibuyshopping! Shop now and save big on top brands across fashion, electronics, home goods, and more. Don't miss out on these limited-time offers available in Pakistan's leading multi-vendor e-commerce store."
        />
        <meta
          name="keywords"
          content="50% discount, Hibuyshopping, exclusive offers, online discounts, save big, fashion sale, electronics sale, home goods discount, top brands, limited-time offers, Pakistani e-commerce, multi-vendor store"
        />
        <meta name="author" content="Hibuyshopping Team" />
        <meta
          property="og:description"
          content="Unlock a 50% discount on selected products at Hibuyshopping! Shop now to take advantage of massive savings on top brands across various categories. Limited-time offer available at Pakistan's leading multi-vendor e-commerce platform."
        />
        <meta
          property="og:url"
          content="https://hibuyshopping.com/products/flash-sale/4d9040da-a6ea-4ff0-8ceb-91e44dda3a25bf80965f-a231-4289-9805-c1f0ed86a73d"
        />
      </Helmet>
      <div className="flashTopBanner">
        <div className="flashTopBannerWrapper">
          <div className="flashTopBannerImg">
            <img src={img} alt="flash sale banner" />
          </div>
        </div>
      </div>
      <section className="product_Listing_Page">
        <div className="container">
          <div className="productListing w-100">
            <div className="content_right">
              <div className="productListing-data">
                {productData?.products?.map((item, index) => {
                  return (
                    <ProductItem
                      key={index}
                      itemView={productView}
                      item={item}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FlashSale;
