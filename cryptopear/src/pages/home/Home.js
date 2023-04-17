import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Trades from '../../components/trades/Trade';
import { useState } from 'react';

import "./Home.css";
import Header from '../../components/header/Header';

export default function Home() {
    const [spacing, setSpacing] = useState(2);
    const [openTradeModal, setOpenTradeModal] = useState(false);
    const [openShareModal, setOpenShareModal] = useState(false);
    const [openStatusModal, setOpenStatusModal] = useState(false);
    const [select, setSelect] = useState('');
    const [open, setOpen] = useState(false);

    const handleChange = (event) => {
        setSpacing(event.target.value);
    };
    return (
        <>
            <Header select={select} setSelect={setSelect} open={open} setOpen={setOpen}/>
            <div className='container'>
                <Grid sx={{ flexGrow: 1 }} container spacing={spacing}>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" spacing={spacing}>
                            {[0, 1, 2, 3].map((value) => (
                                <Grid key={value} item>
                                    <Trades select={select} setSelect={setSelect} open={open} setOpen={setOpen} sx={{ height: 140, width: 400, backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1A2027' : '#fff', }} />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}
