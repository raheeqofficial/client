import { useEffect, useState } from "react";
import ProductItem from "../../Components/ProductItem";
import { fetchDataFromApi } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";
import img from "../../assets/images/fashion-top-banner.jpg";
import "./Fashion.css";
import { Helmet } from "react-helmet-async";
import { BsEmojiExpressionless } from "react-icons/bs";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Fashion = () => {
  const [productView, setProductView] = useState("four");
  const [productData, setProductData] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setisLoading(true);
    fetchDataFromApi(`/api/products?catName=Fashion`)
      .then((res) => {
        setProductData(res);
        setisLoading(false);
        console.log(res);
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
      {/* <Helmet>
      <link rel="canonical" href="https://hibuyshopping.com/products/category/" />
        <title>Fashion - Hibuyshopping | Latest Trends and Styles in Pakistan</title>
        <meta
          name="description"
          content="Explore the latest trends and styles in fashion at Hibuyshopping. Shop a wide range of clothing, accessories, and footwear from top brands in Pakistan. Discover exclusive deals and updates on fashion products."
        />
        <meta
          name="keywords"
          content="fashion, Hibuyshopping, clothing, accessories, footwear, latest trends, fashion styles, online shopping, top brands, fashion deals, Pakistani fashion, e-commerce fashion"
        />
        <meta name="author" content="Hibuyshopping Team" />
        <meta
          property="og:description"
          content="Discover the latest fashion trends and styles at Hibuyshopping. Browse through a diverse collection of clothing, accessories, and footwear from top brands in Pakistan. Enjoy exclusive deals and stay updated on the newest fashion arrivals."
        />
        <meta property="og:url" content="https://hibuyshopping.com/" />
      </Helmet> */}
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
                {isLoading === true ? (
                  <div className="loading d-flex align-items-center justify-content-center">
                    <CircularProgress color="inherit" />
                  </div>
                ) : (
                  <>
                    {productData?.products?.map((item, index) => {
                      return (
                        <ProductItem
                          key={index}
                          itemView={productView}
                          item={item}
                        />
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Fashion;
