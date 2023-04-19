import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

//Stacks Connect Configs
import { Connect } from "@stacks/connect-react";

//@mui Libraries
import { StyledEngineProvider } from '@mui/material/styles';

import { userSession } from "./store/wallet";

import Home from "./pages/home/Home";
import { appInfo } from "./store/wallet";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Connect
      authOptions={{
        appDetails: {
          name: appInfo.name,
          // todo:
          icon: appInfo.icon,
        },
        redirectTo: "/",
        onFinish: () => {
          window.location.reload();
        },
        userSession,
      }}
    >
      <StyledEngineProvider injectFirst>
        <Home />
      </StyledEngineProvider>
    </Connect>
  </React.StrictMode>
);
