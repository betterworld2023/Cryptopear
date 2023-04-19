import * as React from 'react';
import Card from '@mui/joy/Card';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import ShareIcon from '@mui/icons-material/Share';
import AlarmIcon from '@mui/icons-material/Alarm';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import './Trade.css';

export default function Trades({ tradeId, bns, publisher, quantity, cost, salesAsset, returnAsset }) {
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
          <p>Trade ID: {tradeId}</p>
          <center>
            <img alt='trading-asset' src="Nycc.png" height={200} width={200} />
            <img alt='trading-asset-for' src="Stx.png" height={100} width={100} />
          </center>
          <p>Trade By: {bns || `${String(publisher).substring(0, 4)}.. ${String(publisher).substring(String(publisher).length - 4, String(publisher).length)}`}</p>
          <p>Quantity: {quantity} <span>{salesAsset}</span></p>
          <p>Amount Each: {cost} <span>{returnAsset}</span></p>
          <Stack direction="row" spacing={11}>
            <IconButton color="secondary" aria-label="alarm" >
              <AlarmIcon />
            </IconButton>
            <IconButton color="warning" aria-label="share" >
              <ShareIcon />
            </IconButton>
            <IconButton color="success" aria-label="cart" >
              <AddShoppingCartIcon />
            </IconButton>
          </Stack>
        </div>
      </Card>
    </>
  );
}
