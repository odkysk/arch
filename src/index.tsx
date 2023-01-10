import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ActionContextProvider } from "./contexts/actionContext";
import { DataContextProvider } from "./contexts/dataContext";
import { SelectionContextProvider } from "./contexts/selectionContext";
import { ToolContextProvider } from "./contexts/toolContext";
import { ViewContextProvider } from "./contexts/viewContext";
import reportWebVitals from "./reportWebVitals";
import "./styles/global.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <DataContextProvider>
      <ViewContextProvider>
        <ToolContextProvider>
          <SelectionContextProvider>
            <ActionContextProvider>
              <App />
            </ActionContextProvider>
          </SelectionContextProvider>
        </ToolContextProvider>
      </ViewContextProvider>
    </DataContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
