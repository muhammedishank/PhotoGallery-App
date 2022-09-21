import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  styled,
  Modal,
} from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import axios from "axios";

const validate = async (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length > 15) {
    errors.name = "Must be 15 characters or less";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 5) {
    errors.password = "Password  must be 5 character long ";
  }
  if (!values.phone) {
    errors.phone = "Required";
  } else if (values.phone.length < 10 || values.phone.length > 10) {
    errors.phone = "Phone number must be 10 digit long ";
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "Required";
  } else if (values.confirmPassword.length < 5) {
    errors.confirmPassword = "Password  must be 5 character long ";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "your passsword doesn't match";
  }
  return errors;
};

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
function Signup() {
  const [userData, setUserData] = useState({});
  const [OTP, setOTP] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      console.log("go to home ");
      navigate("/userHome");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: async (values) => {
      setUserData(values);
      try {
        console.log("ssssssssssssssssssssssssss");
        const alredyExist = await axios.post("/api/auth/checkEmail", {
          email: values.email,
          name: values.name,
        });
        if (alredyExist.data == "noUser") {
            dispatch(register(userData));
        }
      } catch (error) {
        if (error.response.data == "emailExist") {
          console.log("Email exist");
          toast.error("This Email already Exist!, Try Another");
        } else if (error.response.data == "nameExist") {
          console.log("nmae exist");
          toast.error("This Name already Exist!, Try Another");
        } else {
          console.log(error)
        }
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

         

         

          <TextField
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            margin="normal"
            type={"text"}
            variant="outlined"
            placeholder="Name"
            sx={{
              width: { sm: 200, md: 300 },
              "& .MuiInputBase-root": {
                height: 43,
              },
            }}
          />
          {formik.errors.name ? (
            <Typography variant="body1" color={"red"}>
              {formik.errors.name}
            </Typography>
          ) : null}
          <TextField
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            margin="normal"
            type={"email"}
            variant="outlined"
            placeholder="Email"
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
            onChange={formik.handleChange}
            margin="normal"
            // type={"number"}
            variant="outlined"
            placeholder="Phone Number"
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
            onChange={formik.handleChange}
            margin="normal"
            type={"password"}
            variant="outlined"
            placeholder="Password"
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

          <Button
            endIcon={<HowToRegIcon />}
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
            Signup
          </Button>
          <Box sx={{ marginTop: 1 }}>
            {" "}
            <span
              style={{ color: "black", marginLeft: "5px", fontWeight: "150" }}
            >
              Have an account ?{" "}
            </span>{" "}
            <Button sx={{ borderRadius: 1 }}>
              {" "}
              <Link
                to={"/"}
                style={{ textDecoration: "none", color: "#1876d2" }}
              >
                Log in
              </Link>
            </Button>
          </Box>
        </Box>
      </form>
    </div>
  );
}

export default Signup;
