import { useEffect, useState } from "react";
import ProductItem from "../../Components/ProductItem";
import { fetchDataFromApi } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";
import img from "../../assets/images/Banner-flash sale.jpg";
import './PopularProducts.css'

const PopularProducts = () => {
  const [productView, setProductView] = useState("four");
  const [productData, setProductData] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
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

  
  return (
    <>
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
