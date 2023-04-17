import { useConnect } from '@stacks/connect-react';
import { StacksTestnet, StacksMainnet } from '@stacks/network';

import Fab from '@mui/material/Fab';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';

const network = new StacksTestnet();

const ContractDeploy = ({ contractName, contract }) => {
    const { doContractDeploy } = useConnect();
    const deployingContract = () => {

        doContractDeploy({
            contractName: String(contractName),
            codeBody: contract,
            network,
            appDetails: {
                name: 'CryptoPear',
                icon: window.location.origin + '/logo.svg',
            },
            onFinish: data => {
                window.open(`https://explorer.stacks.co/txid/${data.txId}?chain=testnet`, '_blank')
            },
        })

    }
    console.log(contractName, contract);
    return (
        <Fab color="primary" onClick={() => deployingContract()} aria-label="add">
            <PublishedWithChangesIcon />
        </Fab>
    )
}

export default ContractDeploy;