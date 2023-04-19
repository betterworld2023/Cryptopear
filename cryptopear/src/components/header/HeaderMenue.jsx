import * as React from 'react';
// MUI Materials
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { Stack, Switch } from '@mui/material';
// MUI Icons
import PublicIcon from '@mui/icons-material/Public';
import PublicOffIcon from '@mui/icons-material/PublicOff';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import SellIcon from '@mui/icons-material/Sell';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
// Defined Components
import { wallet } from '../../store/wallet';

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': { width: 15, },
    '& .MuiSwitch-switchBase.Mui-checked': { transform: 'translateX(9px)', },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2, '&.Mui-checked': {
      transform: 'translateX(12px)', color: '#fff', '& + .MuiSwitch-track': { opacity: 1, backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff', },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)', width: 12, height: 12, borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2, opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));

const HeaderMenue = ({ network, networkToggle, handleNetworkToggle }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Menue">
          <IconButton
            onClick={handleClick} size="small" sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined} aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl} id="account-menu" open={open} onClose={handleClose} onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible', filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))', mt: 1.5,
            '& .MuiAvatar-root': { width: 32, height: 32, ml: -0.5, mr: 1, },
            '&:before': {
              content: '""', display: 'block', position: 'absolute', top: 0,
              right: 14, width: 10, height: 10, bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)', zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}><AccountCircleRoundedIcon sx={{ marginRight: 1.5 }} /> Profile</MenuItem>
        <MenuItem onClick={handleClose}><SellIcon sx={{ marginRight: 1.5 }} /> Sell</MenuItem>
        <MenuItem onClick={handleClose}><TrendingUpIcon sx={{ marginRight: 1.5 }} /> Invest</MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}><AttachMoneyOutlinedIcon sx={{ marginRight: 1.5 }} /> Fauset</MenuItem>
        <MenuItem onClick={handleClose}><CloudUploadIcon sx={{ marginRight: 1.5 }} /> Deploy</MenuItem>
        <Divider />
        <MenuItem>
          <Stack direction="row" spacing={1} alignItems="center">
            <PublicOffIcon color={networkToggle === 0 ? 'primary' : ''} onClick={() => handleNetworkToggle(0)} />
            <AntSwitch defaultChecked={network[networkToggle].toggled} inputProps={{ 'aria-label': 'ant design' }} />
            <PublicIcon color={networkToggle === 1 ? 'primary' : ''} onClick={() => handleNetworkToggle(1)} />
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon><Settings fontSize="small" /></ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={() => wallet.logout()}>
          <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
export default HeaderMenue;