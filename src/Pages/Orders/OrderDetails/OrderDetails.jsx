import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../../utils/api";
import { Button } from "@mui/material";

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [products, setproducts] = useState([]);
  const history = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const { id } = useParams()
  useEffect(() => {
    window.scrollTo(0, 0);

    const token = localStorage.getItem("token");
    if (token !== "" && token !== undefined && token !== null) {
      setIsLogin(true);
    } else {
      history("/signIn");
    }

    const user = JSON.parse(localStorage.getItem("user"));
    // fetchDataFromApi(`/api/orders?userid=${user?.userId}`).then((res) => {
    //   setOrders(res);
    // });
    fetchDataFromApi(`/api/orders/${id}`).then((res) => {
        setproducts(res.products);
        setOrders(res)
    })
  }, []);
  return (
    <div className="right-content w-100">
      <div className="w-100 flex-row p-4 align-items-center">
        <h5 className="mb-0">Orders Details</h5>
      </div>
      <div className="od-Container">
        <div className="od-card p-3 mt-1">
          {/* {orders?.length !== 0 &&
            orders?.map((order, index) => ( */}
              <div className="od-card-container">
                <h1>ORDER INFO</h1>
                <div>
                  <h6>Order Id :</h6>
                  <p>{orders?.id}</p>
                </div>
                <div className="details">
                  <h5>User Info</h5>
                  <p>Name: {orders?.name}</p>
                  <p>Contact: {orders?.phoneNumber}</p>
                  <p>Address: {orders?.address}</p>
                  <p>Zip: {orders?.pincode}</p>
                </div>
                <div className="details">
                  <h5>Amount Info</h5>
                  <p>Subtotal: {orders?.amount}</p>
                  <p>Shipping Charges: 0</p>
                  <p>Tax: 0</p>
                  <p>Discount: 0</p>
                  <p>Total: {orders?.amount}</p>
                </div>
                <div className="details">
                  <h5>Status Info</h5>
                  <p>
                    Status:{" "}
                    <span
                      className={
                        orders?.status === "pending"
                          ? "badge badge-danger"
                          : "badge badge-success"
                      }
                    >
                      {orders?.status}
                    </span>
                  </p>
                </div>
                
              </div>
            {/* ))} */}
        </div>
        <div className="od-card p-3 mt-2">
          <div className="od-card-container">
            <h1>PORUCT INFO</h1>
            {products?.length !== 0 &&
              products?.map((item, i) => (
                <div key={i}>
                  <div className="details mb-3">
                    <h5>Product Details</h5>
                    <p>Product Id: {item?.id}</p>
                    {/* <Link to={`/product/${item?._id}`}> */}
                    <div className="pd-container cursor">
                        <div className="img-con">
                            <img src={item?.image} alt="" />
                        </div>
                        <div className="txt-con">
                            <p className="p-name">{item?.productTitle}</p>
                            <p>{item?.price}</p>
                            <p>x {item?.quantity}</p>
                        </div>
                    </div>
                    {/* </Link> */}
                    <p>SubTotal: {item?.subTotal}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
