import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import NativeSelect from "@mui/material/NativeSelect";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: "2rem",
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

export default function SelectMenu({ difficulty, handleChange }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>
        Select your Difficulty... The harder it is, the more points you shall
        receive.
      </h1>
      <Box sx={{ minWidth: 120 }}>
        {/* <InputLabel htmlFor="demo-customized-select-native">
          Difficulty
        </InputLabel> */}
        <FormControl variant="standard" sx={{ m: 1, width: 300, mt: 3 }}>
          <label
            style={{ fontFamily: "Almendra", fontSize: "2rem" }}
            htmlFor="demo-customized-select-native"
          >
            Select Difficulty
          </label>
          <Select
            MenuProps={{
              sx: {
                "&& .MuiMenuItem-root": {
                  backgroundColor: "#374e49",
                  color: "#fff",
                },
              },
            }}
            id="demo-customized-select-native"
            value={difficulty}
            label="Difficulty"
            onChange={handleChange}
            input={<BootstrapInput />}
          >
            <MenuItem value={`easy`}>Easy</MenuItem>
            <MenuItem value={`medium`}>Medium</MenuItem>
            <MenuItem value={`hard`}>Hard</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
