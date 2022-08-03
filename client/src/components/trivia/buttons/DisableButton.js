import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

function DisableButton() {
  const [disable, setDisable] = React.useState(false);

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

  return (
    <button disabled={disable} onClick={() => setDisable(true)}>
      Click to Disable!
    </button>
  );
}
export default DisableButton;
