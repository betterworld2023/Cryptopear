//Stacks imports
import { useConnect } from "@stacks/connect-react";
import { StacksTestnet } from "@stacks/network";
import { principalCV } from "@stacks/transactions/dist/clarity/types/principalCV";
import { AnchorMode, PostConditionMode, stringUtf8CV, uintCV, } from "@stacks/transactions";

import { getUserData, userSession } from "./ConnectWallet";

//Mui Icoons
import StorefrontIcon from '@mui/icons-material/Storefront';
//MUI Components Materials Import
import Fab from '@mui/material/Fab';
import { useState } from "react";

const ContractCall = ({ contractFunctionName, trading_Asset, asset_for, amount, amount_for }) => {
  // console.log(contractFunctionName);
  const { doContractCall } = useConnect();
  function tradeAssets() {
    let args = [];
    switch (contractFunctionName) {
      case 'trade-stx-asset':
        args = [
          principalCV(asset_for),
          uintCV(amount),
          uintCV(amount_for),
          principalCV(getUserData().profile.stxAddress.testnet)
        ]
        break;
      case 'trade-ft-asset':
        args = [
          principalCV(trading_Asset),
          principalCV(asset_for),
          uintCV(amount),
          uintCV(amount_for),
          principalCV(getUserData().profile.stxAddress.testnet)
        ]
        break;
      default:
        break;
    }

    doContractCall({
      network: new StacksTestnet(),
      anchorMode: AnchorMode.Any,
      contractAddress: "STT4SQP5RC1BFAJEQKBHZMXQ8NQ7G118F0XRWTMV",
      contractName: 'cryptopear-test-v1',
      functionName: String(contractFunctionName),
      functionArgs: args,
      postConditionMode: PostConditionMode.Deny,
      postConditions: [],
      onFinish: (data) => {
        console.log("onFinish:", data);
        window
          .open(
            `https://explorer.stacks.co/txid/${data.txId}?chain=testnet`,
            "_blank"
          )
          .focus();
      },
      onCancel: () => {
        console.log("onCancel:", "Transaction was canceled");
      },
    });
  }


  if (!userSession.isUserSignedIn()) {
    return null;
  }

  return (
    <Fab color="primary" aria-label="add"
      onClick={() => tradeAssets()}
    >
      <StorefrontIcon />
    </Fab >
  );
};

export default ContractCall;
