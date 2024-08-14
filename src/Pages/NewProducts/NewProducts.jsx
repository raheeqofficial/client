import { useEffect, useState } from "react";
import ProductItem from "../../Components/ProductItem";
import { fetchDataFromApi } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";
import img from "../../assets/images/sale-banner-top.jpg";
import "./NewProducts.css";
import { Helmet } from "react-helmet-async";
import { BsEmojiExpressionless } from "react-icons/bs";

const NewProducts = () => {
  const [productView, setProductView] = useState("four");
  const [productData, setProductData] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setisLoading(true);
    fetchDataFromApi(`/api/products`)
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
      </div>
    );
  }
  return (
    <>
      <Helmet>
        <title>New Products - Hibuyshopping | Discover the Latest Arrivals and Trends</title>
        <meta
          name="title"
          content="New Products - Hibuyshopping | Discover the Latest Arrivals and Trends"
        />
        <meta
          name="description"
          content="Explore the newest arrivals on Hibuyshopping. Discover the latest products, trends, and innovations across various categories. Stay updated with fresh offerings and find new favorites on Pakistan's leading e-commerce platform."
        />
        <meta
          name="keywords"
          content="new products, Hibuyshopping, latest arrivals, new arrivals, trending products, e-commerce trends, latest products, Pakistani e-commerce, multi-vendor store"
        />
        <meta name="author" content="Hibuyshopping Team" />
        <meta
          property="og:title"
          content="New Products - Hibuyshopping | Discover the Latest Arrivals and Trends"
        />
        <meta
          property="og:description"
          content="Browse the latest products on Hibuyshopping. Find new arrivals, trending items, and fresh offerings across categories. Stay updated with the newest trends and discover your next favorite product on Pakistan's top e-commerce platform."
        />
        <meta
          property="og:image"
          content="URL_TO_YOUR_NEW_PRODUCTS_PAGE_IMAGE"
        />
        <meta property="og:url" content="URL_TO_YOUR_NEW_PRODUCTS_PAGE" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="New Products - Hibuyshopping | Discover the Latest Arrivals and Trends"
        />
        <meta
          name="twitter:description"
          content="Check out the newest products on Hibuyshopping. Discover the latest trends, new arrivals, and fresh offerings across categories. Find new favorites and stay updated with the latest in e-commerce on Pakistan's leading online store."
        />
        <meta
          name="twitter:image"
          content="URL_TO_YOUR_NEW_PRODUCTS_PAGE_IMAGE"
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
                {isLoading === true ? (
                  <div className="loading d-flex align-items-center justify-content-center">
                    <CircularProgress color="inherit" />
                  </div>
                ) : (
                  <>
                    {productData?.products?.length !== 0 &&
                      productData?.products
                        ?.slice(0)
                        .reverse()
                        .map((item, index) => {
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

export default NewProducts;
