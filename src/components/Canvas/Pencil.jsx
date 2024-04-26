import React from 'react';
import { IconButton } from '@mui/material';
import DrawIcon from '@mui/icons-material/Draw';

const Pencil = ({ onClick, isActive }) => {
  return (
    <IconButton aria-label="pencil" onClick={onClick} color={isActive ? 'primary' : 'default'}>
      <DrawIcon />
    </IconButton>
  );
};
  
export default Pencil;
