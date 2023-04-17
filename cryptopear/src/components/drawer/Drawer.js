import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InfoIcon from '@mui/icons-material/Info';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import PublishIcon from '@mui/icons-material/Publish';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import Avatar from '@mui/material/Avatar';
import { disconnect } from '../../services/stacks/ConnectWallet';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Fingerprint from '@mui/icons-material/Fingerprint';

export default function SideBarMenue({ select, setSelect, open, setOpen }) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleOpenModals = async (sender) => {
    const modals = ['Trade', 'Invest', 'About', 'Contact', 'Deploy Contract', 'Request Fauset'].indexOf(sender);
    const selectedModal = ['trade_modal', 'invest_modal', 'about_modal', 'contact_modal', 'deploy_contractmodal', 'request_fauset_modal'][modals];
    setSelect(selectedModal);
    setOpen(true);
  }

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 180 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Trade', 'Invest', 'Manage', 'About', 'Contact', 'Deploy Contract', 'Request Fauset'].map((text, index) => (
          <ListItem key={text} disablePadding>

            <ListItemButton onClick={() => handleOpenModals(text)}>
              <ListItemIcon>
                {[<ViewInArIcon />, <AttachMoneyIcon />, <InfoIcon />, <ContactSupportIcon />, <PublishIcon />, <CurrencyExchangeIcon />][index]}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>

          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <>
      <div>
        {['bottom'].map((anchor) => (
          <React.Fragment key={anchor}>
            <IconButton
              spacing={2}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 5, margin: (0, 0, 0, 0) }}
              onClick={toggleDrawer(anchor, true)}
            >
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
            <SwipeableDrawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              onOpen={toggleDrawer(anchor, true)}
            >
              {list(anchor)}
              <IconButton aria-label="fingerprint" color="error" onClick={() => disconnect()}><Fingerprint /></IconButton>
            </SwipeableDrawer>
          </React.Fragment>
        ))}
      </div>
    </>
  );

}
