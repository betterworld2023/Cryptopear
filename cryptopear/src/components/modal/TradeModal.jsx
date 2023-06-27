import React from 'react';
import { Item, style } from './Styler';
import { supportedAssets } from '../../lib/constants';
// Mui Material Elements
import { Box, Fab, Fade, Grid, MenuItem, Modal, TextField, Typography } from '@mui/material';
// Mui Icons
import CancelIcon from '@mui/icons-material/Cancel';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';

const TradeModal = ({ open, close }) => {
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
                            <AddBusinessIcon />Trade<AddBusinessIcon />
                        </Typography>
                        <Item>
                            {/* Sellect functionality */}
                            <TextField
                                sx={{ m: 1, width: 300 }}
                                id="outlined-select-currency"
                                name="tradingasset"
                                select
                                label="Trading Asset"
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
                            <TextField
                                sx={{ m: 1, width: 300 }}
                                id="outlined-select-currency"
                                name="forasset"
                                select
                                label="Trade For"
                            // helperText={'Balance: ' + tokenbal}
                            >
                                {supportedAssets.map((result) => (
                                    <MenuItem key={result.asset_initials}
                                        id="forasset"
                                        nonce={JSON.stringify(result)}
                                        value={result.asset_label}
                                    // onClick={selectEventHandler}
                                    >
                                        {result.asset_label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            {/* Ends Here */}
                            {/* Inputs fields for amounts */}
                            <TextField name='tradeamount' sx={{ m: 1, width: 300 }} id="outlined-basic" label="Trade Amount" variant="outlined" />
                            <TextField name='foramount' sx={{ m: 1, width: 300 }} id="outlined-basic" label="For Amount" variant="outlined" />
                            {/* Ends Here */}
                            <Fab color="primary" aria-label="add" sx={{ marginRight: 10 }}>
                                <CancelIcon />
                            </Fab>
                            <Fab color="primary" aria-label="add" sx={{ marginLeft: 10 }}>
                                <AddBusinessIcon />
                            </Fab>
                        </Item>
                    </Grid>
                </Box>
            </Fade>
        </Modal>
    );
};

export default TradeModal;