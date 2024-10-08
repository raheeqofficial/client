import React, { useContext, useEffect } from "react";
import { MyContext } from "../../App";
import HomeCat from "../../Components/HomeCat";
import { Helmet } from "react-helmet-async";

const Categories = () => {
  const context = useContext(MyContext);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Helmet>
        <title>
          Categories - Hibuyshopping | Explore Diverse Product Categories in
          Pakistan
        </title>
        <meta
          name="title"
          content="Categories - Hibuyshopping | Explore Diverse Product Categories in Pakistan"
        />
        <meta
          name="description"
          content="Browse through a wide range of product categories at Hibuyshopping. Discover top brands, exclusive deals, and the latest trends across various categories including fashion, electronics, home goods, and more. Shop now and find exactly what you're looking for!"
        />
        <meta
          name="keywords"
          content="categories, Hibuyshopping, product categories, online shopping Pakistan, fashion categories, electronics categories, home goods categories, multi-vendor store, explore products, shopping trends, exclusive deals"
        />
        <meta name="author" content="Hibuyshopping Team" />
        <meta
          property="og:description"
          content="Explore a diverse range of product categories at Hibuyshopping. Find top brands, exclusive deals, and the latest trends across various categories including fashion, electronics, and more. Shop now and enjoy a premium online shopping experience in Pakistan."
        />
        <meta itemprop="priceCurrency" content="PKR" />
      </Helmet>
      <div>
        {context.windowWidth < 768 && (
          <div>
            <HomeCat catData={context.categoryData} />
          </div>
        )}
      </div>
    </>
  );
};

export default Categories;
