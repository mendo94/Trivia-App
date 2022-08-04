import styled from "styled-components";
import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";

// const styles = (theme) => ({
//   button: {
//     ":disabled": {
//       backgroundColor: "red",
//     },
//   },
// });

function DisableButton(props) {
  const [disable, setDisable] = React.useState(false);

  const { classes } = props;

  const changeDisableState = () => {
    setDisable(!disable);
  };
  const Button = styled.button`
    /* Adapt the colors based on primary prop */
    background: ${(props) => (props.primary ? "palevioletred" : "white")};
    color: ${(props) => (props.primary ? "white" : "palevioletred")};

    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
  `;

  return (
    <>
      {/* <button disabled={disable} onClick={() => setDisable(true)}>
        Click to Disable!
      </button> */}
      <Button
        primary
        variant="contained"
        color="secondary"
        onClick={changeDisableState}
      ></Button>
    </>
  );
}

DisableButton.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default DisableButton;
