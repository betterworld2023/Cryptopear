import React from 'react';
import { Item, style } from './Styler';
// Mui Material Elements
import { Box, Fab, Fade, Grid, MenuItem, Modal, TextField, Typography } from '@mui/material';
// Mui Icons
import CancelIcon from '@mui/icons-material/Cancel';
import ShareIcon from '@mui/icons-material/Share';

const ShareModal = ({ open, close }) => {
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
                            <ShareIcon />Status<ShareIcon />
                        </Typography>
                        <Item>
                            <Fab color="primary" onClick={close} aria-label="add">
                                <CancelIcon />
                            </Fab>
                            <Fab color="primary" aria-label="add">
                                <ShareIcon />
                            </Fab>
                        </Item>
                    </Grid>
                </Box>
            </Fade>
        </Modal>
    );
};

export default ShareModal;