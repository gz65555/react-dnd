import React from "react";
import ReactDOM from "react-dom/client";
import { DragContextProvider } from "../src";
import "./index.css";
import { App } from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <DragContextProvider>
      <App />
    </DragContextProvider>
  </React.StrictMode>
);
