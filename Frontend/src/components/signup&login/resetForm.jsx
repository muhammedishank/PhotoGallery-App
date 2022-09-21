import {
  Box,
  TextField,
  Typography,
  Button,
  styled,
  Modal,
  Divider,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import React, { Component, useEffect, useState } from "react";
import OTPInput, { ResendOTP } from "otp-input-react";
import { useFormik } from "formik";
import { forgottPassword, reset } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { typographyVariant } from "@mui/system";

const validate = async (values) => {
  const errors = {};
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
  if (!values.confirmPassword) {
    errors.confirmPassword = "Required";
  } else if (values.confirmPassword.length < 5) {
    errors.confirmPassword = "Password  must be 5 character long ";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Your Passsword doesn't Match";
  }
  return errors;
};

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Resetform = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const forgottPhoneNum = localStorage.getItem("forgottPhone");
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      console.log("go to home ");
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: (values) => {
      const resetData = {
        email: values.email,
        password: values.password,
      };
      console.log(resetData);
      dispatch(forgottPassword(resetData));
    },
  });
  return (
    <>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <Box
            display="flex"
            flexDirection={"column"}
            margin="auto"
            maxWidth={400}
            alignItems="center"
            justifyContent={"center"}
            marginTop={"200px"}
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
              padding={1}
              sx={{
                color: "#1876d2",
                fontSize: { xs: "22px", sm: "25px", md: "30px" },
              }}
              textAlign="center"
            >
              Reset Your Password
            </Typography>

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
                  height: 45,
                },
              }}
            />
            {formik.errors.email ? (
              <Typography variant="body1" color={"red"}>
                {formik.errors.email}
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
                  height: 45,
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
          </Box>
        </form>
      </div>
    </>
  );
};

export default Resetform;
