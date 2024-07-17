import React, { useContext, useEffect, useState } from "react";
import { fetchDataFromApi } from "../../../utils/api";
import { useParams } from "react-router-dom";
import ProductItem from "../../../Components/ProductItem";
import { Box, Tab, Tabs } from "@mui/material";
import { MyContext } from "../../../App";

const ShopDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [selectedCat, setSelectedCat] = useState();
  const [filterData, setFilterData] = useState([]);
  const [subCat, setSubCat] = useState([]);
  const context = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const selectCat = (cat) => {
    const decodedCat = decodeURIComponent(cat);
    setSelectedCat(decodedCat);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    fetchDataFromApi(`/api/products?shop=${id}`).then((res) => {
      setData(res.products);
      setFilterData(res.products); // Initially show all products
      setIsLoading(false);
    });

    fetchDataFromApi(`/api/subCat?shop=${id}`).then((res) => {
      setSubCat(res.subCatList);
      setIsLoading(false);
    });
  }, [id]);

  useEffect(() => {
    if (selectedCat !== undefined) {
      const encodedCategory = encodeURIComponent(selectedCat);
      setIsLoading(true);
      fetchDataFromApi(
        `/api/products?shop=${id}&subCatName=${encodedCategory}`
      ).then((res) => {
        setFilterData(res.products);
        setIsLoading(false);
      });
    }
  }, [selectedCat, id]);

  if (isLoading) {
    return (
      <div className="loaderContainer">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="shopDetailPage">
      <div className="topImage">
        <div className="vendorContainer">
          <div className="vendorWrapper">
            <div className="vendorImgBox">
              <img
                width="40"
                height="40"
                src="https://img.icons8.com/skeuomorphism/40/shop.png"
                alt="shop"
              />
            </div>
            <div className="vendorTextBox">
              <p className="pb-0">Vendor Store</p>
              <p className="pb-0">80% Positive Seller Ratings</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="popularProducts">
          <div className="catTabs mt-4">
            <div className="shopDetailCatTab">
              <Box
                sx={{
                  maxWidth: { xs: 350, sm: 680 },
                  bgcolor: "background.paper",
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  className="filterTabs"
                >
                  {subCat?.map((item, index) => {
                    const decodedCat = decodeURIComponent(item?.subCat);
                    return (
                      <Tab
                        key={index}
                        className="item"
                        label={decodedCat}
                        onClick={() => selectCat(decodedCat)}
                      />
                    );
                  })}
                </Tabs>
              </Box>
            </div>
          </div>

          <div className="product_row productRow2 w-100 mt-4 mb-3">
            {filterData?.length !== 0
              ? filterData
                  ?.slice(0)
                  ?.reverse()
                  ?.map((item, index) => {
                    return <ProductItem key={index} item={item} />;
                  })
              : data
                  ?.slice(0)
                  ?.reverse()
                  ?.map((item, index) => {
                    return <ProductItem key={index} item={item} />;
                  })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDetails;
