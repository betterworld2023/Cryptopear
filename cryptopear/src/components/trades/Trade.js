import * as React from 'react';
import Card from '@mui/joy/Card';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import ShareIcon from '@mui/icons-material/Share';
import AlarmIcon from '@mui/icons-material/Alarm';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import './Trade.css';
import Modals from '../modal/Modals';

export default function Trades({select, setSelect, open, setOpen}) {
  const handleOpenModalBySelect = (selecter) => {
    console.log(selecter);
    setSelect(selecter)
    setOpen(true);
  };
  return (
    <>
      <Card
        sx={{
          width: 300,
          bgcolor: 'initial',
          boxShadow: 'none',
          '--Card-padding': '0px',
        }}
      >
        <div className='trades'>
          <p>Trade ID: { }</p>
          <center>
            <img alt='trading-asset' src="Nycc.png" height={200} width={200} />
            <img alt='trading-asset-for' src="Stx.png" height={100} width={100} />
          </center>
          <p>Trade By user: { }</p>
          <p>Quantity: { }{ }</p>
          <p>Amount Each: { }{ }</p>
          <Stack direction="row" spacing={11}>
            <IconButton color="secondary" aria-label="alarm" onClick={()=>handleOpenModalBySelect('trade_status_modal')}>
              <AlarmIcon />
            </IconButton>
            <IconButton color="warning" aria-label="share" onClick={()=>handleOpenModalBySelect('share_modal')}>
              <ShareIcon />
            </IconButton>
            <IconButton color="success" aria-label="cart" onClick={()=>handleOpenModalBySelect('buy_modal')}>
              <AddShoppingCartIcon />
            </IconButton>
          </Stack>
        </div>
      </Card>
      <Modals select = {select} open = {open} setOpen = {setOpen} setSelect={setSelect}/>
    </>
  );
}
