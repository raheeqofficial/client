import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import "./OrderDetails.css";

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState('');
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false)
 
  // const downloadImage = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_API_URL}/api/orders/generate-receipt/${id}`,
  //       { responseType: "blob" }
  //     );
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", "order-receipt.jpg");
  //     document.body.appendChild(link);
  //     link.click();
  //   } catch (error) {
  //     setError('Failed to download image');
  //   }
  // };

  const downloadImage = async () => {
    try {
      setIsLoading(true)
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/orders/generate-receipt/${id}`,
            { responseType: "blob" }
        );
        setIsLoading(false)
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "order-receipt.jpg");
        document.body.appendChild(link);
        link.click();
        link.remove(); // Remove the link after clicking
        window.URL.revokeObjectURL(url); // Release the object URL
    } catch (error) {
        setError('Failed to download image');
    }
};


  // const shareImage = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_API_URL}/api/orders/generate-receipt/${id}`,
  //       { responseType: "blob" }
  //     );
  //     const file = new File([response.data], "order-receipt.jpg", {
  //       type: "image/jpeg",
  //     });

  //     if (navigator.canShare && navigator.canShare({ files: [file] })) {
  //       navigator.share({
  //         files: [file],
  //         title: "Order Receipt",
  //         text: "Here is your order receipt",
  //       });
  //     } else {
  //       alert("Sharing not supported on this browser");
  //     }
  //   } catch (error) {
  //     setError('Failed to share image');
  //   }
  // };

  const shareImage = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/orders/generate-receipt/${id}`,
        { responseType: 'blob' }
      );
      const file = new File([response.data], 'order-receipt.jpg', {
        type: 'image/jpeg',
      });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Order Receipt',
          text: 'Here is your order receipt',
        });
      } else {
        alert('Sharing not supported on this browser');
      }
    } catch (error) {
      setError('Failed to share image');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    } else {
      navigate("/signIn");
    }

    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders/${id}`);
        setProducts(res?.data?.products);
        setOrders(res?.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response) {
            if (err.response.status === 404) {
              navigate('/page-not-found');
            } else if (err.response.status === 400) {
              navigate('/page-not-found');
            } else {
              setError('An unexpected error occurred');
            }
          } else {
            setError('An unexpected error occurred');
          }
        } else {
          setError('An unexpected error occurred');
        }
      }
    };
    fetchProducts();
  }, [id, navigate]);

  return (
    <div className="od-page">
      <div className="od-Container">
        <div className="od-card p-3 mt-1">
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
        </div>
        <div className="od-card p-3 mt-2">
          <div className="od-card-container">
            <h1>PRODUCT INFO</h1>
            {products?.length !== 0 &&
              products?.map((item, i) => (
                <div key={i}>
                  <div className="details mb-3">
                    <h5>Product Details</h5>
                    <Link to={`/product/${item?.staticId}`}>
                      <div className="pd-container cursor">
                        <div className="img-con shadow">
                          <img src={item?.image} alt="" />
                        </div>
                        <div className="txt-con">
                          <p className="p-name">{item?.productTitle}</p>
                          <p>{item?.price}</p>
                          <p>x {item?.quantity}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            <Button className="btn btn-blue btn-lg mr-2" onClick={downloadImage}>{isLoading ? <CircularProgress/> : "Save to Gallery"}</Button>
            <Button className="btn btn-blue btn-lg" onClick={shareImage}>Share</Button>
            {error && <p>{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
