import React, { useState } from 'react';
import AnchorIcon from '@mui/icons-material/Anchor';
import { Button, Menu, Box } from '@mui/material';
import CameraToggle from './AnchorMenu/CameraToggle';
import MicToggle from './AnchorMenu/MicToggle';
import ModeToggle from './AnchorMenu/ModeToggle';
import { Mic } from '@mui/icons-material';

const AnchorMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mode, setMode] = useState(null);
  const [camera, setCamera] = useState(false);
  const [mic, setMic] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
      <Button variant="contained" color="primary" onClick={handleClick}>
        <AnchorIcon />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: '35ch',
          },
        }}
      >
        <CameraToggle camera={camera} setCamera={setCamera} />
        <MicToggle mic={mic} setMic={setMic} />
        <ModeToggle mode={mode} setMode={setMode} />
      </Menu>
    </Box>
  );
};

export default AnchorMenu;