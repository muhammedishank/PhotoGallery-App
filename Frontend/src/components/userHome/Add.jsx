import {
  Box,
  Fab,
  IconButton,
  Modal,
  Tooltip,
  styled,
  Typography,
  Avatar,
  TextField,
  Stack,
  ButtonGroup,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ImageIcon from "@mui/icons-material/Image";
import ImageUploader from "react-image-upload";
import "react-image-upload/dist/index.css";
import DateRangeIcon from "@mui/icons-material/DateRange";
import axios from "axios";
import React from "react";
import { useState } from "react";
import FileBase from "react-file-base64";
import { useNavigate } from "react-router-dom";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
});

const Add = () => {
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = JSON.parse(localStorage.getItem("user"))
    const {data} = await axios.post('/api/post/addImage',{image,desc,userId:userId._id})
    navigate("/")
  };

  return (
    <>
      <Tooltip
        onClick={(e) => setOpen(true)}
        title="Delete"
        sx={{
          position: "fixed",
          bottom: 20,
          left: { xs: "calc(50% - 25px)", md: 30 },
        }}
      >
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Tooltip>

      <StyledModal
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          height={350}
          width={400}
          p={3}
          bgcolor={"background.default"}
          color={"text.primary"}
          borderRadius={4}
        >
          <Typography variant="h6" color="gray" textAlign="center">
            {" "}
            Add Photo
          </Typography>
          <UserBox>
            <Avatar
              alt="Travis Howard"
              src="https://mui.com/static/images/avatar/2.jpg"
              sx={{ width: 40, height: 40 }}
            />
            <Typography fontWeight={500} variant="span">
              John Doe
            </Typography>
          </UserBox>
          <TextField
            sx={{ width: "100%" }}
            id="standard-multiline-static"
            multiline
            name="description"
            onChange={(e)=> setDesc(e.target.value)}
            rows={3}
            placeholder="What is on your mind?"
            variant="standard"
          />
          <Stack direction="row" gap={1} mt={1} mb={3}>
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
          <ButtonGroup
            fullWidth
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button onClick={handleSubmit} type="submit">Post</Button>

            <Button sx={{ width: "100px" }}>
              {" "}
              <DateRangeIcon />{" "}
            </Button>
          </ButtonGroup>
        </Box>
      </StyledModal>
    </>
  );
};

export default Add;
