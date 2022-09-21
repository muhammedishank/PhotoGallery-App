import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import axios from "axios";
import Profile from "../profile/profile";

const Gallery = () => {
  const [open, setOpen] = useState(true);
  const [data, setData] = useState({ img: "", i: 0 });
  const [images, setImages] = useState([]);
  const fetchImages = async () => {
    const userId = JSON.parse(localStorage.getItem("user"));
    await axios
      .get(`/api/post/${userId._id}`)
      .then((res) => {
        setImages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchImages();
  }, []);

  const viewImage = (img, i) => {
    setOpen(false);
    setData({ img, i });
  };
  const imgAction = (action) => {
    let i = data.i;
    if (action === "next-img") {
      setData({ img: images[i + 1].img, i: i + 1 });
    }
    if (action === "prev-img") {
      setData({ img: images[i - 1].img, i: i - 1 });
    }
    if (!action) {
      setData({ img: "", i: 0 });
    }
  };
  return (
    <>
      {open && <Profile />}
      <Box>
        {data.img && (
          <Box
            sx={{
              width: "100%",
              height: "100vh",
              background: "black",
              position: "fixed",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <button
              onClick={() => imgAction()}
              style={{ position: "absolute", top: "10px", right: "10px" }}
            >
              X
            </button>
            <button onClick={() => imgAction("prev-img")}>Previous</button>
            <img
              src={data.img}
              style={{ width: "auto", maxWidth: "90%", maxHeight: "90%" }}
            />
            <button onClick={() => imgAction("next-img")}>Next</button>
          </Box>
        )}
        <Box
          sx={{
            padding: 5,
            margin: "auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <h1>Your Pictures</h1>
        </Box>
        <Box sx={{ padding: "10px" }}>
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
          >
            <Masonry gutter="20px">
              {images.map((data, i) => (
                <img
                  key={i}
                  src={data.img}
                  style={{ width: "100%", display: "block", cursor: "pointer" }}
                  alt=""
                  onClick={() => viewImage(data.img, i)}
                />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </Box>
      </Box>
    </>
  );
};

export default Gallery;
