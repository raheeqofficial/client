import { useEffect, useState } from "react";
import ProductItem from "../../Components/ProductItem";
import { fetchDataFromApi } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";
import img from "../../assets/images/Popular_products-toBanner-3-1726x381-eliphstore.jpg";
import "./PopularProducts.css";
import { Helmet } from "react-helmet-async";
import { BsEmojiExpressionless } from "react-icons/bs";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const PopularProducts = () => {
  const [productView, setProductView] = useState("four");
  const [productData, setProductData] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setisLoading(true);
    fetchDataFromApi(`/api/products?isFeatured=${true}`)
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
      <link rel="canonical" href="https://hibuyshopping.com/78c44c48-c5a2-4e15-b362-40402e3c36511dbb78b4-f4c0-4b64-8819-873c7e9c4fba" />
        <title>
          Popular Products - Hibuyshopping
        </title>
        <meta
          name="description"
          content="Discover the most popular products on Hibuyshopping. Explore top-selling items, trending products, and customer favorites. Find the best deals and must-have products on Pakistan's leading e-commerce platform."
        />
        <meta
          name="keywords"
          content="popular products, Hibuyshopping, top-selling items, trending products, best deals, customer favorites, e-commerce products, Pakistani e-commerce, multi-vendor store"
        />
        <meta name="author" content="Hibuyshopping Team" />
        <meta
          property="og:description"
          content="Explore Hibuyshopping's popular products. Browse top-selling items, trending products, and customer favorites to find the best deals and must-have items on Pakistan's top e-commerce platform."
        />
        <meta property="og:url" content="https://hibuyshopping.com/products/popular-products/78c44c48-c5a2-4e15-b362-40402e3c36511dbb78b4-f4c0-4b64-8819-873c7e9c4fba" />
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

export default PopularProducts;
