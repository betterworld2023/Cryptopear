// React Imports
import * as React from 'react';
import { useState } from 'react';
// Defined Components
import Header from '../../components/header/Header';
import Trades from '../../components/trades/Trade';
import { getDeviceInfo } from '../../services/device';
// MUI Materials
import Grid from '@mui/material/Unstable_Grid2';
import { Box, List, ListItem, ListItemButton, ListItemText, Divider, ListItemIcon } from '@mui/material';
// MUI Material Icons
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InfoIcon from '@mui/icons-material/Info';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import PublishIcon from '@mui/icons-material/Publish';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
// Styler
import "./Home.css";
import { StacksMainnet, StacksTestnet } from '@stacks/network';
import { userSession, wallet } from '../../store/wallet';
import { storage } from '../../store/storage';

export const network = [
    {
        label: 'testnet',
        network: new StacksTestnet,
        chain: 'stacks',
        toggled: false
    },
    {
        label: 'mainnet',
        network: new StacksMainnet,
        chain: 'stacks',
        toggled: true
    }
]

const Home = () => {
    const [networkToggle, setNetworkToggle] = useState(1);
    const [data, setData] = useState({ data: {}, init: true });
    const [tradeData, setTradeData] = useState();

    const [state, setState] = useState({ top: true, left: false, bottom: false, right: false, });
    const [spacing, setSpacing] = useState(2);
    const [select, setSelect] = useState('');
    const [open, setOpen] = useState(false);
    // Declared constants
    const deviceInfo = getDeviceInfo();
    const anchor = deviceInfo.osName === 'Android' || deviceInfo.osName === 'iOS' ? 'bottom' : 'left';

    const handleNetworkToggle = async (toggle) => {
        storage.delete('config.json')
            .then(async ({ success }) => {
                if (success) {
                    const result = await storage.putUserConfig(toggle);
                    window.location.reload();
                }
            })
    }

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };
    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 180 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {
                    ['Trade', 'Invest', 'Manage', 'About', 'Contact', 'Deploy Contract', 'Request Fauset']
                        .map((label) => (
                            <ListItem key={label} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {
                                            [
                                                <ViewInArIcon />,
                                                <AttachMoneyIcon />,
                                                <InfoIcon />,
                                                <ContactSupportIcon />,
                                                <PublishIcon />,
                                                <CurrencyExchangeIcon />
                                            ][label]
                                        }
                                    </ListItemIcon>
                                    <ListItemText primary={label} />
                                </ListItemButton>
                            </ListItem>
                        ))
                }
            </List>
            <Divider />
        </Box>
    );

    React.useEffect(() => {
        if (userSession.isUserSignedIn() && data.init) {
            wallet.userData(network[networkToggle]).then(data => {
                const { userConfig: { networkState } } = data;
                setData({ data, init: false })
                setTradeData([
                    {
                        tx_id: 'dkjfbgkmdfbjkvhrkngdfdgfg',
                        tradeId: '0',
                        bns: 'cryptosmith.btc',
                        publisher: '',
                        quantity: '10',
                        cost: '50',
                        salesAsset: 'stx',
                        returnAsset: 'mia'
                    }
                ])
                setNetworkToggle(networkState)
            })
        }
    }, [data])

    console.log(data)

    return (
        <>
            <Header
                select={select} setSelect={setSelect} open={open} setOpen={setOpen} anchor={anchor}
                deviceInfo={deviceInfo} toggleDrawer={toggleDrawer} state={state} list={list}
                network={network} networkToggle={networkToggle} handleNetworkToggle={handleNetworkToggle}
            />
            <div className='container'>
                <Grid sx={{ flexGrow: 1 }} container spacing={spacing}>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" spacing={spacing}>
                            {tradeData
                                ? tradeData.map(({ tx_id, tradeId, bns, publisher, quantity, cost, salesAsset, returnAsset }) => (
                                    <Grid key={tx_id} item>
                                        <Trades
                                            tradeId={tradeId} bns={bns} publisher={publisher} quantity={quantity}
                                            cost={cost} salesAsset={salesAsset} returnAsset={returnAsset}
                                            sx={{ height: 140, width: 400, backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1A2027' : '#fff', }} />
                                    </Grid>
                                )) : <p>Loading</p>
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}

export default Home;