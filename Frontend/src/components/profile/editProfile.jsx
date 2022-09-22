import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  styled,
  Modal,
  Stack,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import FileBase from "react-file-base64";
import axios from "axios";

const validate = async (values) => {
  const errors = {};
  return errors;
};

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
function Signup() {
  const [User, setUser] = useState({});
  const [userData, setUserData] = useState({});
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
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
    console.log("Editprofile useeffect");
    fetchDeatails();
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      console.log("go to home ");
      
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);
  console.log(User);
   const formik = useFormik({
    initialValues: {
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      
    },
    validate,
    onSubmit: async (values) => {
      if(values.email=== "") values.email = User.email
      if(values.phone=== "") values.phone = User.phone
      if(values.password=== "") values.password = User.password
      if(values.confirmPassword=== "") values.confirmPassword = User.password
       values.image = image
       values.userId= User._id
      try {
        await axios.post("/api/users/",{ values });

        navigate("/userProfile")
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Box
          display="flex"
          flexDirection={"column"}
          margin="auto"
          maxWidth={400}
          alignItems="center"
          justifyContent={"center"}
          marginTop={5}
          padding={3}
          borderRadius={5}
          boxShadow={"5px 5px 10px #ccc"}
          sx={{
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
          }}
        >
          <Typography
            sx={{
              color: "#1876d2",
              fontSize: { xs: "22px", sm: "25px", md: "30px" },
            }}
            padding={1}
           
            textAlign="center"
          >
            Create an Account
          </Typography>
          <Typography
            variant="h6"
            padding={1}
            maxWidth={300}
            textAlign="center"
            fontWeight={400}
            sx={{
              display: { xs: "none", sm: "block" },
              mb:2,
              color: "gray",
              fontWeight: "350",
            }}
          >
            Sign up to see photos and videos from your friends.
          </Typography>

          <Typography variant="body1" color={"red"}>
            You Can't Change Your User Name
            </Typography>
          <TextField
            name="email"
            value={formik.values.email}
            defaultValue={User.email}
            onChange={formik.handleChange}
            margin="normal"
            type={"email"}
            variant="outlined"
            placeholder={User.email}
            sx={{
              width: { sm: 200, md: 300 },
              "& .MuiInputBase-root": {
                height: 43,
              },
            }}
          />
          {formik.errors.email ? (
            <Typography variant="body1" color={"red"}>
              {formik.errors.email}
            </Typography>
          ) : null}

          <TextField
            name="phone"
            value={formik.values.phone}
            defaultValue={User.phone}
            onChange={formik.handleChange}
            margin="normal"
            variant="outlined"
            placeholder={User.phone}
            sx={{
              width: { sm: 200, md: 300 },
              "& .MuiInputBase-root": {
                height: 43,
              },
            }}
          />
          {formik.errors.phone ? (
            <Typography variant="body1" color={"red"}>
              {formik.errors.phone}
            </Typography>
          ) : null}

          <TextField
            name="password"
            value={formik.values.password}
            defaultValue={User.password}
            onChange={formik.handleChange}
            margin="normal"
            type={"password"}
            variant="outlined"
            placeholder="Enter New Password"
            sx={{
              width: { sm: 200, md: 300 },
              "& .MuiInputBase-root": {
                height: 43,
              },
            }}
          />
          {formik.errors.password ? (
            <Typography variant="body1" color={"red"}>
              {formik.errors.password}
            </Typography>
          ) : null}
          <TextField
            name="confirmPassword"
            value={formik.values.confirmPassword}
            defaultValue={User.password}
            onChange={formik.handleChange}
            margin="normal"
            type={"password"}
            variant="outlined"
            placeholder=" Confirm Password"
            sx={{
              width: { sm: 200, md: 300 },
              "& .MuiInputBase-root": {
                height: 43,
              },
            }}
          />
          {formik.errors.confirmPassword ? (
            <Typography variant="body1" color={"red"}>
              {formik.errors.confirmPassword}
            </Typography>
          ) : null}
          <Typography variant="body1" color={"grey"}>
            Change Your Profile Photo
            </Typography>
 <Stack direction="row"  variant="outlined" gap={1} mt={1} mb={3}>
            <div>
              {image ? (
                <img
                  style={{
                    width: "300px",
                    height: "100px",
                    marginLeft: "10px",
                  }}
                  src={image}
                ></img>
              ) : (
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) => setImage(base64)}
                />
              )}
            </div>
          </Stack>
          <Button
            endIcon={<LockResetIcon />}
            type="submit"
            sx={{
              marginTop: 1,
              borderRadius: 1,
              "&:hover": {
                backgroundColor: "#fff",
                color: "#3c52b2",
              },
              color: "#fff",
              bgcolor: "#1876d2",
            }}
            variant="outlined"
          >
            Reset
          </Button>
          <Box sx={{ marginTop: 1 }}>
            {" "}
            <span
              style={{ color: "black", marginLeft: "5px", fontWeight: "150" }}
            >
              Go Back ?{" "}
            </span>{" "}
            <Button sx={{ borderRadius: 1 }}>
              {" "}
              <Link
                to={"/userProfile"}
                style={{ textDecoration: "none", color: "#1876d2" }}
              >
                Back
              </Link>
            </Button>
          </Box>
        </Box>
      </form>
    </div>
  );
}

export default Signup;
