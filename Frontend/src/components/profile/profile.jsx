import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MediaCard() {
  const [user, setUser] = useState({});
  const [open,setOpen] = useState(false)
  const navigate = useNavigate();
  const fetchDeatails = async () => {
    const userId = JSON.parse(localStorage.getItem("user"));
    await axios
      .get(`/api/users/${userId._id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchDeatails();
  }, []);
  return (
    <>
      <Box
        sx={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          mt: 5,
        }}
      >
        <Card sx={{ minWidth: 300 }}>
          <Avatar
            sx={{ width: 100, height: 100, ml: 12 }}
            alt="Remy Sharp"
            src="https://mui.com/static/images/avatar/2.jpg"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {user ? user.username : null}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user ? user.email : null}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user ? user.phone : null}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="large" onClick={(e) => {
           navigate("/editProfile")
          }}>Edit</Button>
          </CardActions>
        </Card>
      </Box>
      
      
    </>
  );
}
