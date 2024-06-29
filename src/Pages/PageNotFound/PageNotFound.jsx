import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="pageNotFound">
      <h1>Uh-Oh...</h1>
      <p className="zoom-area">
        <b>Page</b> you were looking for does not exists.{" "}
      </p>
      <section className="error-container">
        <span>
          <span>4</span>
        </span>
        <span>0</span>
        <span>
          <span>4</span>
        </span>
      </section>
      <div className="link-container">
        <Link
          to={'/'}
          className="more-link"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
