import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
import { FaCopy } from "react-icons/fa"; // Import react-icon for the copy icon
import axios from "axios";
import "./OrderDetails.css";
import { MyContext } from "../../../App";

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [receiptUrl, setReceiptUrl] = useState('');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [shareLoading, setShareLoading] = useState(false);
  const context = useContext(MyContext);

  // const generateReceipt = async () => {
  //   try {
  //     setIsLoading(true)
  //     const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders/generate-receipt/${id}`);
  //     setReceiptUrl(response.data.receiptUrl);
  //     setIsLoading(false)
  //     console.log(response)
  //   } catch (error) {
  //     setError('Error generating receipt.');
  //   }
  // };
  const downloadReceipt = async () => {
    try {
      setIsLoading(true)
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/api/orders/generate-receipt/${id}`,
        method: 'GET',
        responseType: 'blob', // important
      });
      setIsLoading(false)
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `receipt_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      setError('Error generating receipt.');
    }
  };
  const shareImage = async () => {
    try {
      setShareLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/orders/generate-receipt/${id}`,
        { responseType: "blob" }
      );
      setShareLoading(false);
      const file = new File([response.data], "order-receipt.jpg", {
        type: "image/jpeg",
      });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Order Receipt",
          text: "Here is your order receipt",
        });
      } else {
        setShareLoading(false);
        alert("Sharing not supported on this browser");
      }
    } catch (error) {
      setShareLoading(false);
      setError("Failed to share image");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(orders?.id)
      .then(() => {
        context.setAlertBox({
          open: true,
          error: false,
          msg: "Order ID copied to clipboard",
        });
      })
      .catch(() => {
        context.setAlertBox({
          open: true,
          error: false,
          msg: "Failed to copy order ID",
        });
      });
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
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/orders/${id}`
        );
        setProducts(res?.data?.products);
        setOrders(res?.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response) {
            if (err.response.status === 404) {
              navigate("/page-not-found");
            } else if (err.response.status === 400) {
              navigate("/page-not-found");
            } else {
              setError("An unexpected error occurred");
            }
          } else {
            setError("An unexpected error occurred");
          }
        } else {
          setError("An unexpected error occurred");
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
              <h6>
                <b>Order Id </b>:
              </h6>
              <p>
                {orders?.id}{" "}
                <Button onClick={copyToClipboard} className="btn-blue">
                  <FaCopy style={{ fontSize: "16px" }} />
                </Button>
              </p>
            </div>
            <div className="details">
              <h5>User Info</h5>
              <p>
                <b>Name</b>: {orders?.name}
              </p>
              <p>
                <b>Contact</b>: {orders?.phoneNumber}
              </p>
              <p>
                <b>Address</b>: {orders?.address}
              </p>
              <p>
                <b>Zip</b>: {orders?.pincode}
              </p>
            </div>
            <div className="details">
              <h5>Amount Info</h5>
              <p>
                <b>Subtotal</b>: {orders?.amount}
              </p>
              <p>
                <b>Shipping Charges</b>: 150
              </p>
              <p>
                <b>Tax</b>: 0
              </p>
              <p>
                <b>Discount</b>: 0
              </p>
              <p>
                <b>Total</b>: {orders?.amount}
              </p>
            </div>
            <div className="details">
              <h5>Status Info</h5>
              <p>
                <b>Status</b>:{" "}
                <span
                  className={
                    orders?.status === "Pending" ||
                    orders?.status === "Cancelled"
                      ? "badge badge-danger"
                      : orders?.status === "Confirm"
                      ? "badge badge-secondary"
                      : orders?.status === "Shipped"
                      ? "badge badge-primary"
                      : orders?.status === "Delivered"
                      ? "badge badge-success"
                      : "badge badge-default"
                  }
                >
                  {orders?.status}
                </span>
              </p>
            </div>
            {/* {receiptUrl && ( */}
            {/* <div className="mt-4">
              <a
                href={receiptUrl}
                download={`receipt_${orders._id}.pdf`}
                className="hd"
              >
                Download Receipt
              </a>
            </div> */}
           {/* )}  */}
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
            <Button
              className="btn btn-blue btn-lg mr-2"
              onClick={downloadReceipt}
            >
              {isLoading ? "Downloading.." : "Save to Gallery"}
            </Button>
            
            {error && <p>{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
