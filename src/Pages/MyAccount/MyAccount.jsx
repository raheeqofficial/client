import React, { act, useContext, useEffect, useState } from "react";
import "./myAccount.css";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { MyContext } from "../../App";
import {
  deleteData,
  editData,
  fetchDataFromApi,
  uploadImage,
} from "../../utils/api";
import { Button, TextField } from "@mui/material";
import EligibleProducts from "../EligibleProducts";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import emprtCart from "../../assets/images/myList.png";
import { FaHome } from "react-icons/fa";

import { useTheme } from "@mui/material/styles";
import moment from "moment";
import Dialog from "@mui/material/Dialog";
import { MdClose } from "react-icons/md";


import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

import axios from "axios";
const formatDate = (isoDate) => {
  return moment(isoDate).format("DD/MM/YYYY hh:mm A");
};

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yPropsAcc(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const ManageAccount = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [value, setValue] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  const history = useNavigate();
  const [accValue, setAccValue] = useState(0);
  const handleAccChange = (event, newValue) => {
    setAccValue(newValue);
  };
  const { userId } = JSON.parse(localStorage.getItem("user"));
  const context = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [userData, setUserData] = useState([]);
  const [myListData, setmyListData] = useState([]);
  const theme = useTheme();
  const [orderValue, setOrderValue] = useState(0);
  const [orders, setOrders] = useState([]);
  const [pendOrders, setPendOrders] = useState([]);
  const [confOrders, setConfOrders] = useState([]);
  const [shipOrders, setShipOrders] = useState([]);
  const [deliverOrders, setDeliverOrders] = useState([]);
  const [cancelOrders, setCancelOrders] = useState([]);
  const [returnOrders, setReturnOrders] = useState([]);
  const [products, setproducts] = useState([]);
  const [error, setError] = useState(null);
  const [shops, setShops] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const formdata = new FormData();
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    phone: "",
    images: [],
  });

  const [fields, setFields] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  const handleOrderChange = (event, newValue) => {
    setOrderValue(newValue);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const token = localStorage.getItem("token");
    if (token !== "" && token !== undefined && token !== null) {
      setIsLogin(true);
    } else {
      history("/signIn");
    }
    deleteData("/api/imageUpload/deleteAllImages");
    const user = JSON.parse(localStorage.getItem("user"));
    fetchDataFromApi(`/api/user/${user?.userId}`).then((res) => {
      setUserData(res);
      setPreviews(res.images);
      setFormFields({
        name: res.name,
        email: res.email,
        phone: res.phone,
      });
    });
    if (token !== "" && token !== undefined && token !== null) {
      setIsLogin(true);
    } else {
      history("/signIn");
    }
    fetchDataFromApi(`/api/user/${user?.userId}`).then((res) => {
      setShops(res?.followedShops);
    });
    fetchDataFromApi(`/api/my-list?userId=${user?.userId}`).then((res) => {
      setmyListData(res);
    });
    fetchDataFromApi(`/api/orders?status=Pending&userid=${user?.userId}`).then(
      (res) => {
        setPendOrders(res);
      }
    );
    fetchDataFromApi(`/api/orders?status=Confirm&userid=${user?.userId}`).then(
      (res) => {
        setConfOrders(res);
      }
    );
    fetchDataFromApi(`/api/orders?status=Shipped&userid=${user?.userId}`).then(
      (res) => {
        setShipOrders(res);
      }
    );
    fetchDataFromApi(
      `/api/orders?status=Delivered&userid=${user?.userId}`
    ).then((res) => {
      setDeliverOrders(res);
    });
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== "" && token !== undefined && token !== null) {
      setIsLogin(true);
    } else {
      history("/signIn");
    }
    const user = JSON.parse(localStorage.getItem("user"));
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/orders?userid=${user?.userId}`
        );
        setOrders(res?.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response && err.response.status === 404) {
            history("/product/error");
          } else {
            setError("An unexpected error occurred");
          }
        } else {
          setError("An unexpected error occurred");
        }
      }
    };

    fetchProduct();
  }, [history]);
  const showProducts = (id) => {
    fetchDataFromApi(`/api/orders/${id}`).then((res) => {
      setIsOpenModal(true);
      setproducts(res.products);
    });
  };
  const removeItem = (id) => {
    setIsLoading(true);
    deleteData(`/api/my-list/${id}`).then((res) => {
      context.setAlertBox({
        open: true,
        error: false,
        msg: "item removed from My List!",
      });

      const user = JSON.parse(localStorage.getItem("user"));
      fetchDataFromApi(`/api/my-list?userId=${user?.userId}`).then((res) => {
        setmyListData(res);
        setIsLoading(false);
      });
    });
  };

  const changeInput = (e) => {
    setFormFields(() => ({
      ...formFields,
      [e.target.name]: e.target.value,
    }));
  };

  const changeInput2 = (e) => {
    setFields(() => ({
      ...fields,
      [e.target.name]: e.target.value,
    }));
  };
  let img_arr = [];
  let uniqueArray = [];
  let selectedImages = [];
  const onChangeFile = async (e, apiEndPoint) => {
    try {
      setPreviews([]);

      const files = e.target.files;
      setUploading(true);

      //const fd = new FormData();
      for (var i = 0; i < files.length; i++) {
        // Validate file type
        if (
          files[i] &&
          (files[i].type === "image/jpeg" ||
            files[i].type === "image/jpg" ||
            files[i].type === "image/png" ||
            files[i].type === "image/webp")
        ) {
          const file = files[i];
          selectedImages.push(file);
          formdata.append(`images`, file);
        } else {
          context.setAlertBox({
            open: true,
            error: true,
            msg: "Please select a valid JPG or PNG image file.",
          });

          return false;
        }
      }

      formFields.images = selectedImages;
      selectedImages.push(selectedImages);
    } catch (error) {
      console.log(error);
    }

    uploadImage(apiEndPoint, formdata).then((res) => {
      fetchDataFromApi("/api/imageUpload").then((response) => {
        if (
          response !== undefined &&
          response !== null &&
          response !== "" &&
          response.length !== 0
        ) {
          response.length !== 0 &&
            response.map((item) => {
              item?.images.length !== 0 &&
                item?.images?.map((img) => {
                  img_arr.push(img);
                });
            });

          uniqueArray = img_arr.filter(
            (item, index) => img_arr.indexOf(item) === index
          );

          setPreviews([]);

          const appendedArray = [...previews, ...uniqueArray];

          setPreviews(uniqueArray);
          setTimeout(() => {
            setUploading(false);
            img_arr = [];
            context.setAlertBox({
              open: true,
              error: false,
              msg: "Images Uploaded!",
            });
          }, 200);
        }
      });
    });
  };
  const edituser = (e) => {
    e.preventDefault();

    const appendedArray = [...previews, ...uniqueArray];

    img_arr = [];
    formdata.append("name", formFields.name);
    formdata.append("email", formFields.email);
    formdata.append("phone", formFields.phone);

    formdata.append("images", appendedArray);

    formFields.images = appendedArray;

    if (
      formFields.name !== "" &&
      formFields.email !== "" &&
      formFields.phone !== ""
    ) {
      setIsLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));

      editData(`/api/user/${user?.userId}`, formFields).then((res) => {
        setIsLoading(false);

        deleteData("/api/imageUpload/deleteAllImages");

        context.setAlertBox({
          open: true,
          error: false,
          msg: "user updated",
        });
      });
    } else {
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Please fill all the details",
      });
      return false;
    }
  };
  const changePassword = (e) => {
    e.preventDefault();
    formdata.append("password", fields.password);

    if (
      fields.oldPassword !== "" &&
      fields.password !== "" &&
      fields.confirmPassword !== ""
    ) {
      if (fields.password !== fields.confirmPassword) {
        context.setAlertBox({
          open: true,
          error: true,
          msg: "Password and confirm password not match",
        });
      } else {
        const user = JSON.parse(localStorage.getItem("user"));

        const data = {
          name: user?.name,
          email: user?.email,
          password: fields.oldPassword,
          newPass: fields.password,
          phone: formFields.phone,
          images: formFields.images,
        };

        editData(`/api/user/changePassword/${user.userId}`, data).then(
          (res) => {
            context.setAlertBox({
              open: true,
              error: false,
              msg: "Password Change successfully",
            });
          }
        );
      }
    } else {
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Please fill all the details",
      });
      return false;
    }
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="page-wrapper myAccount">
      <main className="main">
        <div className="page-header text-center myAccountTopBg">
          <div className="container">
            <h1 className="page-title">
              My Account<span>Shop</span>
            </h1>
          </div>
        </div>
        <br />

        <div className="page-content">
          <div className="dashboard">
            <div className="container">
              <Box
                sx={{
                  flexGrow: 1,
                  bgcolor: "background.paper",
                  display: "flex",
                  height: 424,
                }}
              >
                <Tabs
                  orientation="vertical"
                  variant="scrollable"
                  value={value}
                  onChange={handleChange}
                  aria-label="Vertical tabs example"
                  sx={{ borderRight: 1, borderColor: "divider" }}
                >
                  <Tab label="Profile" {...a11yProps(0)} />
                  <Tab label="Wishlist" {...a11yProps(1)} />
                  <Tab label="Orders" {...a11yProps(2)} />
                  <Tab label="Returns" {...a11yProps(3)} />
                  <Tab label="Cancelled" {...a11yProps(4)} />
                  <Tab label="Followed Shops" {...a11yProps(5)} />
                  <Tab label="Become a seller" {...a11yProps(6)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                  <Box
                    sx={{ width: "100%" }}
                    className="myAccBox card border-0"
                  >
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <Tabs
                        value={accValue}
                        onChange={handleAccChange}
                        aria-label="basic tabs example"
                      >
                        <Tab label="Edit Profile" {...a11yPropsAcc(0)} />
                        <Tab label="Change Password" {...a11yPropsAcc(1)} />
                      </Tabs>
                    </Box>
                    <CustomTabPanel value={accValue} index={0}>
                      <form onSubmit={edituser}>
                        <div className="row">
                          {/* <div className='col-md-4'>
                                    <div className='userImage'>
                                        {
                                            previews?.length !== 0 ? previews?.map((img, index) => {
                                                return (
                                                    <img src={img} key={index} />
                                                )
                                            })

                                            :

                                            <img src={NoUserImg}/>
                                        }
                                        <div className='overlay d-flex align-items-center justify-content-center'>
                                            <IoMdCloudUpload />
                                            <input type="file" multiple onChange={(e) => onChangeFile(e, '/api/user/upload')} name="images" />
                                        </div>
                                    </div>
                                </div> */}

                          <div className="col-md-8">
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <TextField
                                    label="Name"
                                    variant="outlined"
                                    className="w-100"
                                    name="name"
                                    onChange={changeInput}
                                    value={formFields.name}
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <TextField
                                    label="Email"
                                    disabled
                                    variant="outlined"
                                    className="w-100"
                                    name="email"
                                    onChange={changeInput}
                                    value={formFields.email}
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <TextField
                                    label="Phone"
                                    variant="outlined"
                                    className="w-100"
                                    name="phone"
                                    onChange={changeInput}
                                    value={formFields.phone}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="form-group">
                              <Button
                                type="submit"
                                className="btn-blue bg-red btn-lg btn-big"
                              >
                                {" "}
                                Save
                              </Button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </CustomTabPanel>
                    <CustomTabPanel value={accValue} index={1}>
                      <form onSubmit={changePassword}>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="row">
                              <div className="col-md-4">
                                <div className="form-group">
                                  <TextField
                                    label="Old Password"
                                    variant="outlined"
                                    className="w-100"
                                    name="oldPassword"
                                    onChange={changeInput2}
                                  />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <TextField
                                    label="New password"
                                    variant="outlined"
                                    className="w-100"
                                    name="password"
                                    onChange={changeInput2}
                                  />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <TextField
                                    label="Confirm Password"
                                    variant="outlined"
                                    className="w-100"
                                    name="confirmPassword"
                                    onChange={changeInput2}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="form-group">
                              <Button
                                type="submit"
                                className="btn-blue bg-red btn-lg btn-big"
                              >
                                {" "}
                                Save
                              </Button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </CustomTabPanel>
                  </Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <div className="">
                    {myListData?.length !== 0 ? (
                      <table className="table table-wishlist table-mobile">
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Stock Status</th>
                            <th></th>
                            <th></th>
                          </tr>
                        </thead>

                        <tbody>
                          {myListData?.length !== 0 &&
                            myListData?.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td className="product-col">
                                    <div className="product">
                                      <figure className="product-media">
                                        <Link to={`/product/${item?.staticId}`}>
                                          <LazyLoadImage
                                            src={item.image}
                                            alt={item.productTitle}
                                            effect="blur" // You can use other effects like 'opacity' or 'black-and-white'
                                            placeholderSrc="path_to_placeholder_image" // Optional: Placeholder image while loading
                                          />
                                        </Link>
                                      </figure>

                                      <h3 className="product-title">
                                        <Link to={`/product/${item?.staticId}`}>
                                          {item?.productTitle}
                                        </Link>
                                      </h3>
                                    </div>
                                  </td>
                                  <td className="price-col">
                                    Rs {item?.price}
                                  </td>
                                  {item?.countInStock === 0 ? (
                                    <td className="stock-col">
                                      <span className="out-of-stock">
                                        Out of stock
                                      </span>
                                    </td>
                                  ) : (
                                    <td class="stock-col">
                                      <span class="in-stock">In stock</span>
                                    </td>
                                  )}
                                  <td className="remove-col">
                                    <button
                                      className="btn-remove"
                                      onClick={() => removeItem(item?._id)}
                                    >
                                      <i className="icon-close"></i>
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    ) : (
                      <div className="empty d-flex align-items-center justify-content-center flex-column">
                        <img src={emprtCart} width="150" />
                        <h3 className="emptyPageMsg">
                          Wishlist is currently empty
                        </h3>
                        <br />
                        <Link to="/">
                          {" "}
                          <Button className="btn-blue bg-red btn-lg btn-big btn-round">
                            <FaHome /> &nbsp; Continue Shopping
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <Box
                    sx={{ width: "100%" }}
                    className="myAccBox card border-0"
                  >
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <Tabs
                        value={orderValue}
                        onChange={handleOrderChange}
                        aria-label="basic tabs example"
                      >
                        <Tab label="All" {...a11yPropsAcc(0)} />
                        <Tab label="Pending" {...a11yPropsAcc(1)} />
                        <Tab label="Confirm" {...a11yPropsAcc(2)} />
                        <Tab label="Shipped" {...a11yPropsAcc(3)} />
                        <Tab label="Delivered" {...a11yPropsAcc(4)} />
                        <Tab label="To Review" {...a11yPropsAcc(5)} />
                      </Tabs>
                    </Box>
                    <CustomTabPanel value={orderValue} index={0}>
                      <div>
                        <div className="table-responsive orderTable">
                          <table className="table table-striped table-bordered">
                            <thead className="thead-light">
                              <tr>
                                <th>Order Id</th>
                                <th>Products</th>
                                <th>Order Details</th>
                                <th>Order Status</th>
                                <th>Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {orders?.length !== 0 &&
                                orders?.map((order, index) => {
                                  const formattedDate = formatDate(order?.date);
                                  return (
                                    <>
                                      <tr key={index}>
                                        <td>
                                          <span className="text-blue fonmt-weight-bold">
                                            {order?.id}
                                          </span>
                                        </td>
                                        <td>
                                          <span
                                            className="text-blue fonmt-weight-bold cursor"
                                            onClick={() =>
                                              showProducts(order?._id)
                                            }
                                          >
                                            Click here to view
                                          </span>
                                        </td>
                                        <td>
                                          <Link
                                            to={`/order/details/${order?._id}`}
                                          >
                                            See details
                                          </Link>
                                        </td>
                                        <td
                                          className={`${
                                            order.status === "Cancelled" ||
                                            order.status === "Pending"
                                              ? "text text-danger"
                                              : order.status === "Confirm"
                                              ? "text text-secondary"
                                              : order.status === "Shippied"
                                              ? "text text-primary"
                                              : order.status === "Delivered"
                                              ? "text text-success"
                                              : "text text-default"
                                          }`}
                                        >
                                          {order?.status}
                                        </td>
                                        <td>{formattedDate}</td>
                                      </tr>
                                    </>
                                  );
                                })}
                            </tbody>
                          </table>
                        </div>
                        <Dialog open={isOpenModal} className="productModal">
                          <Button
                            className="close_"
                            onClick={() => setIsOpenModal(false)}
                          >
                            <MdClose />
                          </Button>
                          <h4 class="mb-1 font-weight-bold pr-5 mb-4">
                            Products
                          </h4>

                          <div className="table-responsive orderTable">
                            <table className="table table-striped table-bordered">
                              <thead className="thead-light">
                                <tr>
                                  <th>Product Id</th>
                                  <th>Product Title</th>
                                  <th>Image</th>
                                  <th>Quantity</th>
                                  <th>Price</th>
                                  <th>SubTotal</th>
                                </tr>
                              </thead>

                              <tbody>
                                {products?.length !== 0 &&
                                  products?.map((item, index) => {
                                    return (
                                      <tr key={index}>
                                        <td>{item?.productId}</td>
                                        <td style={{ whiteSpace: "inherit" }}>
                                          <span>
                                            {item?.productTitle?.substr(0, 30) +
                                              "..."}
                                          </span>
                                        </td>
                                        <td>
                                          <div className="img">
                                            <img src={item?.image} />
                                          </div>
                                        </td>
                                        <td>{item?.quantity}</td>
                                        <td>{item?.price}</td>
                                        <td>{item?.subTotal}</td>
                                      </tr>
                                    );
                                  })}
                              </tbody>
                            </table>
                          </div>
                        </Dialog>
                      </div>
                    </CustomTabPanel>
                    <CustomTabPanel value={orderValue} index={1}>
                      <table className="table table-wishlist table-mobile">
                        {pendOrders?.length !== 0 ? (
                          pendOrders?.map((item, index) => {
                            return (
                              <tbody>
                                <tr key={index}>
                                  {item?.products.map((data) => (
                                    <>
                                      <td className="product-col">
                                        <div className="product">
                                          <figure className="product-media">
                                            <Link
                                              to={`/product/${data?.staticId}`}
                                            >
                                              <LazyLoadImage
                                                src={data.image}
                                                alt={data.productTitle}
                                                effect="blur"
                                                placeholderSrc="path_to_placeholder_image"
                                              />
                                            </Link>
                                          </figure>

                                          <h3 className="product-title">
                                            <Link
                                              to={`/product/${data?.staticId}`}
                                            >
                                              {data?.productTitle?.substr(
                                                0,
                                                30
                                              ) + "..."}
                                            </Link>
                                          </h3>
                                        </div>
                                      </td>
                                      <td className="price-col">
                                        Rs {data?.price}
                                      </td>
                                      <td className="stock-col">
                                        Qty <b>:</b> {data?.quantity}
                                      </td>
                                    </>
                                  ))}
                                  <td className="remove-col">
                                    <button className="badge badge-danger">
                                      {item.status}
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            );
                          })
                        ) : (
                          <div className="empty d-flex align-items-center justify-content-center flex-column">
                            <img src={emprtCart} width="150" />
                            <h3 className="emptyPageMsg">
                              No any Pending order yet
                            </h3>
                            <br />
                            <Link to="/">
                              {" "}
                              <Button className="btn-blue bg-red btn-lg btn-big btn-round">
                                <FaHome /> &nbsp; Continue Shopping
                              </Button>
                            </Link>
                          </div>
                        )}
                      </table>
                    </CustomTabPanel>
                    <CustomTabPanel value={orderValue} index={2}>
                      <table className="table table-wishlist table-mobile">
                        {confOrders?.length !== 0 ? (
                          confOrders?.map((item, index) => {
                            return (
                              <tbody>
                                <tr key={index}>
                                  {item?.products.map((data) => (
                                    <>
                                      <td className="product-col">
                                        <div className="product">
                                          <figure className="product-media">
                                            <Link
                                              to={`/product/${data?.staticId}`}
                                            >
                                              <LazyLoadImage
                                                src={data.image}
                                                alt={data.productTitle}
                                                effect="blur"
                                                placeholderSrc="path_to_placeholder_image"
                                              />
                                            </Link>
                                          </figure>

                                          <h3 className="product-title">
                                            <Link
                                              to={`/product/${data?.staticId}`}
                                            >
                                              {data?.productTitle?.substr(
                                                0,
                                                30
                                              ) + "..."}
                                            </Link>
                                          </h3>
                                        </div>
                                      </td>
                                      <td className="price-col">
                                        Rs {data?.price}
                                      </td>
                                      <td className="stock-col">
                                        Qty <b>:</b> {data?.quantity}
                                      </td>
                                    </>
                                  ))}
                                  <td className="remove-col">
                                    <button className="badge badge-secondary">
                                      {item.status}
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            );
                          })
                        ) : (
                          <div className="empty d-flex align-items-center justify-content-center flex-column">
                            <img src={emprtCart} width="150" />
                            <h3 className="emptyPageMsg">
                              No any Confirm order yet
                            </h3>
                            <br />
                            <Link to="/">
                              <Button className="btn-blue bg-red btn-lg btn-big btn-round">
                                <FaHome /> &nbsp; Continue Shopping
                              </Button>
                            </Link>
                          </div>
                        )}
                      </table>
                    </CustomTabPanel>
                    <CustomTabPanel value={orderValue} index={3}>
                      <table className="table table-wishlist table-mobile">
                        {shipOrders?.length !== 0 ? (
                          shipOrders?.map((item, index) => {
                            return (
                              <tbody>
                                <tr key={index}>
                                  {item?.products.map((data) => (
                                    <>
                                      <td className="product-col">
                                        <div className="product">
                                          <figure className="product-media">
                                            <Link
                                              to={`/product/${data?.staticId}`}
                                            >
                                              <LazyLoadImage
                                                src={data.image}
                                                alt={data.productTitle}
                                                effect="blur"
                                                placeholderSrc="path_to_placeholder_image"
                                              />
                                            </Link>
                                          </figure>

                                          <h3 className="product-title">
                                            <Link
                                              to={`/product/${data?.staticId}`}
                                            >
                                              {data?.productTitle?.substr(
                                                0,
                                                30
                                              ) + "..."}
                                            </Link>
                                          </h3>
                                        </div>
                                      </td>
                                      <td className="price-col">
                                        Rs {data?.price}
                                      </td>
                                      <td className="stock-col">
                                        Qty <b>:</b> {data?.quantity}
                                      </td>
                                    </>
                                  ))}
                                  <td className="remove-col">
                                    <button className="badge badge-primary">
                                      {item.status}
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            );
                          })
                        ) : (
                          <div className="empty d-flex align-items-center justify-content-center flex-column">
                            <img src={emprtCart} width="150" />
                            <h3 className="emptyPageMsg">
                              No any Shipped order yet
                            </h3>
                            <br />
                            <Link to="/">
                              <Button className="btn-blue bg-red btn-lg btn-big btn-round">
                                <FaHome /> &nbsp; Continue Shopping
                              </Button>
                            </Link>
                          </div>
                        )}
                      </table>
                    </CustomTabPanel>
                    <CustomTabPanel value={orderValue} index={4}>
                      <table className="table table-wishlist table-mobile">
                        {deliverOrders?.length !== 0 ? (
                          deliverOrders?.map((item, index) => {
                            return (
                              <tbody>
                                <tr key={index}>
                                  {item?.products.map((data) => (
                                    <>
                                      <td className="product-col">
                                        <div className="product">
                                          <figure className="product-media">
                                            <Link
                                              to={`/product/${data?.staticId}`}
                                            >
                                              <LazyLoadImage
                                                src={data.image}
                                                alt={data.productTitle}
                                                effect="blur"
                                                placeholderSrc="path_to_placeholder_image"
                                              />
                                            </Link>
                                          </figure>

                                          <h3 className="product-title">
                                            <Link
                                              to={`/product/${data?.staticId}`}
                                            >
                                              {data?.productTitle?.substr(
                                                0,
                                                30
                                              ) + "..."}
                                            </Link>
                                          </h3>
                                        </div>
                                      </td>
                                      <td className="price-col">
                                        Rs {data?.price}
                                      </td>
                                      <td className="stock-col">
                                        Qty <b>:</b> {data?.quantity}
                                      </td>
                                    </>
                                  ))}
                                  <td className="remove-col">
                                    <button className="badge badge-success">
                                      {item.status}
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            );
                          })
                        ) : (
                          <div className="empty d-flex align-items-center justify-content-center flex-column">
                            <img src={emprtCart} width="150" />
                            <h3 className="emptyPageMsg">
                              No any Delivered order yet
                            </h3>
                            <br />
                            <Link to="/">
                              <Button className="btn-blue bg-red btn-lg btn-big btn-round">
                                <FaHome /> &nbsp; Continue Shopping
                              </Button>
                            </Link>
                          </div>
                        )}
                      </table>
                    </CustomTabPanel>
                    <CustomTabPanel value={orderValue} index={5}>
                      <EligibleProducts customerId={userId} />
                    </CustomTabPanel>
                  </Box>
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <div className="empty d-flex align-items-center justify-content-center flex-column">
                    <img src={emprtCart} width="150" />
                    <h3 className="emptyPageMsg">No any return order yet</h3>
                    <br />
                    <Link to="/">
                      {" "}
                      <Button className="btn-blue bg-red btn-lg btn-big btn-round">
                        <FaHome /> &nbsp; Continue Shopping
                      </Button>
                    </Link>
                  </div>
                </TabPanel>
                <TabPanel value={value} index={4}>
                  <div className="empty d-flex align-items-center justify-content-center flex-column">
                    <img src={emprtCart} width="150" />
                    <h3 className="emptyPageMsg">
                      no any cancelled order yet.
                    </h3>
                    <br />
                    <Link to="/">
                      {" "}
                      <Button className="btn-blue bg-red btn-lg btn-big btn-round">
                        <FaHome /> &nbsp; Continue Shopping
                      </Button>
                    </Link>
                  </div>
                </TabPanel>
                <TabPanel value={value} index={5}>
                  <div className=" followedShops">
                    <h1 className="text-center font-weight-bold">
                      My Favourite Shops
                    </h1>
                    {shops?.length !== 0 ? (
                      shops?.map((shop, index) => {
                        const formattedDate = formatDate(shop?.createdAt);
                        return (
                          <div key={index}>
                            <List
                              sx={{
                                width: "100%",
                                maxWidth: 360,
                                bgcolor: "background.paper",
                              }}
                            >
                              <Link to={`/shops/${shop._id}`}>
                                <ListItem>
                                  <ListItemAvatar>
                                    <Avatar>{shop?.name?.charAt(0)}</Avatar>
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={shop.name}
                                    secondary={formattedDate}
                                  />
                                </ListItem>
                              </Link>
                            </List>
                          </div>
                        );
                      })
                    ) : (
                      <div>
                        <p>You haven't followed any shops yet.</p>
                      </div>
                    )}
                  </div>
                </TabPanel>
                <TabPanel value={orderValue} index={6}>
                  Item Seven
                </TabPanel>
              </Box>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManageAccount;
