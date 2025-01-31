import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider, useSelector } from "react-redux";
import store from "./store/store";
import { BrowserRouter } from "react-router-dom";

import { Toaster } from "./components/ui/toaster";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
  </BrowserRouter>,
);
