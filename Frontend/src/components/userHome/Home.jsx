import Navbar from "./Navbar";
import Gallery from "./Galley";
import Add from "./Add";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    console.log("home use effect");
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div>
      <Navbar />
        <Gallery />
       <Add />
    </div>
  );
};

export default Home;
