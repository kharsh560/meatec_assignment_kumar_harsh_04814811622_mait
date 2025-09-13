// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import './index.css'

import { worker } from "./mocks/browser";
import store from "./reduxStateManagementFiles/store";
import Navbar from "./components/Navbar";

if (process.env.NODE_ENV === "development") {
  worker.start({
    serviceWorker: { url: "/mockServiceWorker.js" },
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Navbar/>
      <App />
    </Provider>
  </React.StrictMode>
);
