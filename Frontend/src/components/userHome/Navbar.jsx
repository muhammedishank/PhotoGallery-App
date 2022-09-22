// import styled from "@emotion/styled";
import {
  AppBar,
  Avatar,
  Box,
  InputBase,
  Toolbar,
  Typography,
  styled,
  Menu,
  MenuItem,
} from "@mui/material";
import Pets from "@mui/icons-material/Pets";
import MailIcon from "@mui/icons-material/Mail";
import Notifications from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";

import "react-toastify/dist/ReactToastify.css";
import { logout, reset } from "../../components/features/auth/authSlice";

import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});
const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: 5,
  width: "35%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));
const Userbox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "10px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const goHome = () => {
    navigate("/");
  };
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Pets onClick={goHome} sx={{ cursor: "pointer" }} />
        <Icons>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="data:image/png;base64,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"
            onClick={(e) => {
              setOpen(true);
            }}
          />
        </Icons>
        <Userbox
          onClick={(e) => {
            setOpen(true);
          }}
        >
          <Avatar
            sx={{ width: 30, height: 30, cursor: "pointer" }}
            src="https://avatars.githubusercontent.com/u/102403834?v=4"
          />
          <Typography variant="span">Ishan</Typography>
        </Userbox>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => {
          setOpen(false);
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem
          onClick={(e) => {
            navigate("/userProfile");
          }}
        >
          Profile
        </MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem onClick={onLogout}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
