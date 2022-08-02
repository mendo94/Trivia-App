import * as React from "react";
import useState from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function GridUI({ options, correctAnswer }) {
  const [result, setResult] = useState(0);
  const handleOptions = () => {
    console.log(options);
    console.log(correctAnswer);
    if (correctAnswer === options) {
      toast.success("Correct!", {
        autoClose: 2000,
      });
    } else if (correctAnswer !== options) {
      toast.error("Wrong", {
        autoClose: 2000,
      });
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      {result}
      <ToastContainer />
      <Grid container spacing={2}>
        <Grid item xs={12} style={{ margin: 10 }}>
          <Item onClick={handleOptions}>{options}</Item>
        </Grid>
      </Grid>
    </Box>
  );
}
