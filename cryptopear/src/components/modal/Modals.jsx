//React Components Import
import * as React from 'react';
import { useState } from 'react';

//MUI Icons Import
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ShareIcon from '@mui/icons-material/Share';

//MUI Components Materials Import
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Backdrop from '@mui/material/Backdrop';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';

//Js Files Import
import { style, Item, getStyles } from './Styler.js'
import ContractDeploy from '../../services/stacks/ContractDeploy';
import { supportedAssets } from '../../lib/constants.js';
import ContractCall from '../../services/stacks/ContractCalls.js';

const Modals = ({ select, setSelect, open, setOpen }) => {
    const theme = useTheme();
    const [contract, setContract] = useState({ name: '', contract: '' });
    const [tradingAsset, setTradingAsset] = useState([]);
    const [forAsset, setForAsset] = useState([]);
    const [tradingAmount, setTradingAmount] = useState('');
    const [forAmount, setForAmount] = useState('');

    //Handles element renders
    const [displayModal, setDisplayModal] = useState([]);

    //Tab Controls handlers
    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    //=============

    //Handles Contract and Contract Name Changes
    const handleContractEvents = (e) => {
        const { target: { name }, target: { value } } = e;
        switch (String(name)) {
            case 'contractname':
                setContract({ name: value, contract: contract.contract });
                break;
            case 'contract':
                setContract({ name: contract.name, contract: value });
                break;
            default:
                break;
        }
    }

    const selectEventHandler = (e) => {
        const { target: { id }, target: { nonce } } = e;
        switch (String(id)) {
            case 'tradingasset':
                setTradingAsset(JSON.parse(nonce));
                break;
            case 'forasset':
                setForAsset(JSON.parse(nonce));
                break;
            default:
                break;
        }
    }

    const handleInputEvents = (e) => {
        const { target: { name }, target: { value } } = e;
        switch (String(name)) {
            case 'tradeamount':
                setTradingAmount(value);
                break;
            case 'foramount':
                setForAmount(value);
                break;
            default:
                break;
        }
    }

    const handleClose = () => {
        setOpen(false);
        setSelect(5);
        setValue('1');
    };

    const tradeModal = () => {
        const tabContents = [null,
            <>            
                <Grid item xs={8}>
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
                                    onClick={selectEventHandler}>
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
                                    onClick={selectEventHandler}>
                                    {result.asset_label}
                                </MenuItem>
                            ))}
                        </TextField>
                        {/* Ends Here */}
                        {/* Inputs fields for amounts */}
                        <TextField name='tradeamount' onChange={handleInputEvents} sx={{ m: 1, width: 300 }} id="outlined-basic" label="Trade Amount" variant="outlined" />
                        <TextField name='foramount' onChange={handleInputEvents} sx={{ m: 1, width: 300 }} id="outlined-basic" label="For Amount" variant="outlined" />
                        {/* Ends Here */}
                        <Fab color="primary" onClick={handleClose} aria-label="add">
                            <CancelIcon />
                        </Fab>
                        <ContractCall contractFunctionName={tradingAsset['funtion_name']} trading_Asset={tradingAsset['asset_address']} asset_for={forAsset['asset_address']} amount={tradingAmount} amount_for={forAmount} />
                    </Item>
                </Grid>
            </>,
            <>
                <Grid item xs={8}>
                    <Item>
                        <TextField
                            sx={{ m: 1, width: 300 }}
                            id="outlined-select-currency"
                            name="topasset"
                            select
                            label="Top Asset"
                            onChange={selectEventHandler}
                        // helperText={'Balance: ' + tokenbal}
                        >
                            {supportedAssets.map(({ asset_label, asset_initials }) => (
                                <MenuItem key={asset_initials} value={asset_label}>
                                    {/* style={getStyles(name, tradingasset, theme)} */}
                                    {asset_label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField sx={{ m: 1, width: 300 }} id="outlined-basic" label="Top Amount" variant="outlined" />
                        <Fab color="primary" onClick={handleClose} aria-label="add">
                            <CancelIcon />
                        </Fab>
                        <ContractCall contractFunctionName={tradingAsset} args={[]} />
                    </Item>
                </Grid>
            </>

        ];
        return (
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Trade Box" value="1" />
                        <Tab label="Top Trade" value="2" />
                    </TabList>
                </Box>
                {tabContents[value]}
            </TabContext>
        );
    }

    const buyModal = () => {
        return (
            <>
                <h3><center>Buy Box</center></h3>
                <Grid container spacing={3} columns={1}>
                    <Grid item xs={8}>
                        <Item>
                            <TextField sx={{ m: 1, width: 300 }} id="outlined-basic" label="Buy Asset" variant="outlined" />
                            <TextField sx={{ m: 1, width: 300 }} id="outlined-basic" label="Buy Amount" variant="outlined" />
                            <Fab color="primary" onClick={handleClose} aria-label="add">
                                <CancelIcon />
                            </Fab>
                            <Fab color="primary" aria-label="add">
                                <ShoppingCartIcon />
                            </Fab>
                        </Item>
                    </Grid>
                </Grid>
            </>

        )
    }

    const tradeStatusModal = () => {
        return (
            <>
                <h3><center>Trade Status Box</center></h3>
                <Grid container spacing={3} columns={1}>
                    <Grid item xs={8}>
                        <Item>
                            <Fab color="primary" onClick={handleClose} aria-label="add">
                                <CheckCircleIcon />
                            </Fab>
                        </Item>
                    </Grid>
                </Grid>
            </>
        )
    }

    const shareModal = () => {
        return (
            <>
                <h3><center>Share Trade Box</center></h3>
                <Grid container spacing={3} columns={1}>
                    <Grid item xs={8}>
                        <Item>
                            <Fab color="primary" onClick={handleClose} aria-label="add">
                                <CancelIcon />
                            </Fab>
                            <Fab color="primary" aria-label="add">
                                <ShareIcon />
                            </Fab>
                        </Item>
                    </Grid>
                </Grid>
            </>
        )
    }

    const deployContractModal = () => {
        return (
            <>
                <h3><center>Deploy Contract</center></h3>
                <Grid container spacing={3} columns={1}>
                    <Grid item xs={8}>
                        <TextareaAutosize
                            name='contract'
                            maxRows={4}
                            aria-label="maximum height"
                            placeholder="Start here"
                            defaultValue="(define-public (say-message) (print (some 'Hello World from Clarity')))"
                            style={{ minWidth: 400, minHeight: 350, maxWidth: 400, maxHeight: 350 }}
                            onChange={handleContractEvents}
                        />
                        <Item>
                            <TextField fullWidth id="outlined-basic" name='contractname' onChange={handleContractEvents} label="Contract Name" variant="outlined" />
                            <Fab color="primary" onClick={handleClose} aria-label="add">
                                <CancelIcon />
                            </Fab>
                            <ContractDeploy contractName={contract.name} contract={contract.contract} />
                        </Item>
                    </Grid>
                </Grid>
            </>
        )
    }

    const comingSoonModal = () => {
        return (
            <>
                <Grid item xs={8}>
                    <center><h3>Coming Soon</h3></center>
                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Fab color="primary" onClick={handleClose} aria-label="add">
                        <CheckCircleIcon />
                    </Fab>
                </Grid>
            </>
        )
    }

    React.useEffect(() => {
        const selectingModal = [
            {
                trade_modal: () => tradeModal(),
                buy_modal: () => buyModal(),
                trade_status_modal: () => tradeStatusModal(),
                share_modal: () => shareModal(),
                deploy_contractmodal: () => deployContractModal(),
                coming_soon_modal: () => comingSoonModal()
            }][0][select];
        setDisplayModal(selectingModal);
    }, [select, value, contract.name, contract.contract, tradingAsset, forAsset]);

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            keepMounted
        >
            <Fade in={open}>
                <Box sx={style}>
                    {displayModal}
                </Box>
            </Fade>
        </Modal>
    )
}

export default Modals;
