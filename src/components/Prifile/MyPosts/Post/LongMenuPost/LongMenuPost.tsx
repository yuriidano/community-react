import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useAppDispatch } from '../../../../../redux/redux-store';
import { deletePost } from '../../../../../redux/profile-reducer';


const options = [
  'Delete',
  'Edit',
  'Close'
];

const ITEM_HEIGHT = 28;

export  function LongMenuPost({id, setEditMode}: {id: string, setEditMode: (value: boolean) => void}) {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClose = () => {
     dispatch(deletePost(Number(id)))
  }

  const editHandler = () => {
    setEditMode(true)
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'}  onClick={() => 
                    option === 'Delete' ? (onClose(), handleClose()) : option === 'Edit' ? (editHandler(), handleClose())  : handleClose()}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}