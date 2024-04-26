// Modified Header.jsx
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const ProjectNameInput = styled(TextField)({
  maxWidth: "200px",
  "& .MuiInputBase-input": {
    textAlign: "center",
    fontWeight: "bold",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
});

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <AppBar position="static">
        <Toolbar>
          {/* LogicBlocks Title */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <h1>Cake Bake</h1>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
