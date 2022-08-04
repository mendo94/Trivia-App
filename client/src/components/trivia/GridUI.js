import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JSConfetti from "js-confetti";
import "./GridUI.css";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  hover: {
    "&:hover": {
      background: "rgb(7, 177, 77, 0.42)",
    },
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function GridUI({ options, correctAnswer, result, setResult }) {
  const jsConfetti = new JSConfetti();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOptions = () => {
    if (correctAnswer === options) {
      setOpen(true);
      jsConfetti.addConfetti({
        confettiNumber: 100,
        confettiColors: [
          "#e91e63",
          "#00bcd4",
          "#9c27b0",
          "#ffeb3b",
          "#ff5722",
          "#212121",
          "#ffc107",
          "#76ff03",
          "#00e676",
          "#cddc39",
        ],
      });
      setResult(result + 10);
      toast.success("Correct!", {
        autoClose: 2000,
      });
    } else if (correctAnswer !== options) {
      setOpen(true);
      setResult(result - 10);
      toast.error(`Wrong, my Lord. The correct answer was ${correctAnswer}`, {
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ margin: 10 }}>
            <ToastContainer />

            <Item
              variant="solid"
              className="buttonColor"
              onClick={handleOptions}
              // onClick={() => {
              //   handleOptions();
              //   handleOpen();
              // }}
            >
              {options}
            </Item>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Duis mollis, est non commodo luctus, nisi erat porttitor
                  ligula.
                </Typography>
              </Box>
            </Modal>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
