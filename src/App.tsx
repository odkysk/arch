/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import "reseter.css";
import { Canvas } from "./components/arrangements/Canvas";
import { ActionContextProvider } from "./contexts/actionContext";
import { DataContextProvider } from "./contexts/dataContext";
import { ToolContextProvider } from "./contexts/toolContext";

export default function App() {
  return (
    <DataContextProvider>
      <ActionContextProvider>
        <ToolContextProvider>
          <main css={main}>
            <Canvas />
          </main>
        </ToolContextProvider>
      </ActionContextProvider>
    </DataContextProvider>
  );
}
const main = css`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #ddd;
`;
