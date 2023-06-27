import React from 'react';
import { Item, style } from './Styler';
// Mui Material Elements
import { Box, Fab, Fade, Grid, MenuItem, Modal, TextField, Typography } from '@mui/material';
// Mui Icons
import CancelIcon from '@mui/icons-material/Cancel';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { supportedAssets } from '../../lib/constants';

const BuyModal = ({ open, close }) => {
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={close}
            closeAfterTransition
            keepMounted
        >
            <Fade in={open}>
                <Box sx={style}>
                    <Grid item xs={8}>
                        <Typography textAlign={'center'} color='black' fontStyle='-moz-initial' letterSpacing={2} variant='h3'>
                            <ShoppingCartIcon />Buy Asset<ShoppingCartIcon />
                        </Typography>
                        <Item>
                            <TextField
                                sx={{ m: 1, width: 300 }}
                                id="outlined-select-currency"
                                name="buyasset"
                                label="Assets"
                                select
                            // onChange={selectEventHandler}
                            // helperText={'Balance: ' + tokenbal}
                            >
                                {supportedAssets.map((result) => (
                                    <MenuItem key={result.asset_initials}
                                        id="tradingasset"
                                        nonce={JSON.stringify(result)}
                                        value={result.asset_label}
                                    // onClick={selectEventHandler}
                                    >
                                        {result.asset_label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField sx={{ m: 1, width: 300 }} id="outlined-basic" label="Buy Amount" variant="outlined" />
                            <Fab color="primary" onClick={close} aria-label="add">
                                <CancelIcon />
                            </Fab>
                            <Fab color="primary" aria-label="buy">
                                <ShoppingCartIcon />
                            </Fab>
                        </Item>
                    </Grid>
                </Box>
            </Fade>
        </Modal>
    );
};

export default BuyModal;