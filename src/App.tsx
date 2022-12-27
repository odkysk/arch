/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import "reseter.css";
import { Canvas } from "./components/arrangements/Canvas";
import { Toolbar } from "./components/arrangements/Toolbar";
import { ActionContextProvider } from "./contexts/actionContext";
import { DataContextProvider } from "./contexts/dataContext";
import { ToolContextProvider } from "./contexts/toolContext";
import { ViewContextProvider } from "./contexts/viewContext";

export default function App() {
  return (
    <DataContextProvider>
      <ViewContextProvider>
        <ActionContextProvider>
          <ToolContextProvider>
            <main css={main}>
              <Canvas />
              <Toolbar />
            </main>
          </ToolContextProvider>
        </ActionContextProvider>
      </ViewContextProvider>
    </DataContextProvider>
  );
}
const main = css`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;
