import { showConnect, UserSession, AppConfig } from "@stacks/connect-react";
import { Storage } from '@stacks/storage'
import axios from 'axios'
import { storage } from "./storage";
// App Constant
export const appInfo = {
    name: 'Crypto Pear',
    icon: `${window.location.origin}/logo.png`
}

const reader = new FileReader();

const appConfig = new AppConfig(['store_write', 'publish_data']);
export const userSession = new UserSession({ appConfig });
export const gaiaStorage = new Storage({ userSession });

export const wallet = {
    login: () => {
        showConnect({
            appDetails: {
                name: appInfo.name,
                icon: appInfo.icon
            },
            redirectTo: '/',
            onFinish: data => {
                console.log('Login Success', data);
                window.location.reload();
            },
            onCancel: data => {
                console.log('Login Cancel', data);
            }
        })
    },
    logout: () => {
        console.log('User logged out');
        userSession.signUserOut();
        window.location.reload();
    },
    userData: async (network) => {
        const data = userSession.loadUserData().profile;
        const nameApiEndPoint = `https://api.mainnet.hiro.so/v1/addresses/${network.chain}/${data.stxAddress[network.label === 'mainnet' ? 'mainnet' : 'testnet']}`;
        const { names } = (await axios.get(nameApiEndPoint)).data;
        const sessionData = userSession.loadUserData();
        return {
            bnsNames: names[0], profile: sessionData.profile,
            stx: sessionData.profile.stxAddress[network.label === 'testnet' ? 'testnet' : 'mainnet'],
            btc: sessionData.decentralizedID.split(':')[2], appOrigin: sessionData,
            userConfig: await storage.getUserConfig()
        }
    }
}