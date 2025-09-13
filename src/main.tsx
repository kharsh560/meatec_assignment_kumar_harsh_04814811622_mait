// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";

import { worker } from "./mocks/browser";
import store from "./reduxStateManagementFiles/store";

if (process.env.NODE_ENV === "development") {
  worker.start({
    serviceWorker: { url: "/mockServiceWorker.js" },
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
