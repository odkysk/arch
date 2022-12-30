/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import "reseter.css";
import { Canvas } from "./components/arrangements/Canvas";
import { LeftPanel } from "./components/arrangements/LeftPanel";
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
              <div css={leftPanel}>
                <LeftPanel />
              </div>
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
  position: relative;
`;
const leftPanel = css`
  position: fixed;
  left: 20px;
  bottom: 20px;
  z-index: 100;
  max-height: 80vh;
  overflow: scroll;
  overscroll-behavior: none;
`;
