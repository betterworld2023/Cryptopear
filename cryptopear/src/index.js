import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

//Stacks Connect Configs
import { Connect } from "@stacks/connect-react";
import { userSession } from "./services/stacks/ConnectWallet";

//@mui Libraries
import { StyledEngineProvider } from '@mui/material/styles';

import Home from "./pages/home/Home";
import Header from "./components/header/Header";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Connect
      authOptions={{
        appDetails: {
          name: "Stacks Swap",
          // todo:
          icon: window.location.origin + "/logo.png",
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
