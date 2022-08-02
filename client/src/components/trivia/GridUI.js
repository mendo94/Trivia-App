import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./GridUI.css";

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

export default function GridUI({ options, correctAnswer, result, setResult }) {
  const [buttonColor, setButtonColor] = React.useState(null);

  const handleOptions = () => {
    if (correctAnswer === options) {
      setResult(result + 10);
      setButtonColor("pink");
      toast.success("Correct!", {
        autoClose: 2000,
      });
    } else if (correctAnswer !== options) {
      setResult(result - 10);
      toast.error(`Wrong, my Lord. The correct answer was ${correctAnswer}`, {
        autoClose: 2000,
      });
    }
  };

  // const nextQuestion = () => {
  //   if (questionCounter < questionsArray.length + 1) {
  //     setQuesCounter(questionCounter + 1);
  //   }
  // };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ margin: 10 }}>
            <ToastContainer />
            <Item
              variant="solid"
              className="buttonColor"
              onClick={() => {
                handleOptions();
                // handleToastMessage();
              }}
            >
              {options}
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
