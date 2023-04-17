import { AppConfig, showConnect, UserSession } from "@stacks/connect";

const appConfig = new AppConfig(["store_write", "publish_data"]);

export const userSession = new UserSession({ appConfig });

export function authenticate() {
  showConnect({
    appDetails: {
      name: 'Crypto Pear',
      icon: window.location.origin + '/logo.png',
    },
    redirectTo: '/',
    onFinish: () => {
      window.location.reload();
      let userData = userSession.loadUserData();
    },
    userSession: userSession,
  });
}

export function disconnect() {
  userSession.signUserOut("/");
}

export function getUserData() {
  userSession.loadUserData();
}