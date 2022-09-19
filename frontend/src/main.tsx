import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import './samples/node-api'
import { RecoilRoot } from "recoil";
import "styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
);

postMessage({ payload: "removeLoading" }, "*");
