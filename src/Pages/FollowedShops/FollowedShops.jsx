import React, { useEffect, useState } from "react";
import "./followedShop.css";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import { fetchDataFromApi } from "../../utils/api";
import moment from "moment";
import { Link } from "react-router-dom";

const formatDate = (isoDate) => {
  return moment(isoDate).format("DD MMMM YYYY");
};

const FollowedShops = () => {
  const [shops, setShops] = useState([]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    fetchDataFromApi(`/api/user/${user?.userId}`).then((res) => {
      setShops(res?.followedShops);
    });
  }, []);
  return (
    <div className="container followedShops">
      <h1 className="text-center font-weight-bold">My Favourite Shops</h1>
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
                  <ListItemText primary={shop.name} secondary={formattedDate} />
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
  );
};

export default FollowedShops;
