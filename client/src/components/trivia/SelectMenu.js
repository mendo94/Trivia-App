import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#B6EDC8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

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
        <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
          <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
          <Select
            MenuProps={{
              sx: {
                "&& .MuiMenuItem-root": {
                  backgroundColor: "#374e49",
                  color: "#fff",
                },
              },
            }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={difficulty}
            label="Difficulty"
            onChange={handleChange}
          >
            <CssBaseline enableColorScheme />

            <MenuItem value={`easy`}>Easy</MenuItem>
            <MenuItem value={`medium`}>Medium</MenuItem>
            <MenuItem value={`hard`}>Hard</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
