/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import "reseter.css";
import { Canvas } from "./components/Canvas";
import { DataContextProvider } from "./contexts/dataContext";
import { ToolContextProvider } from "./contexts/toolContext";

export default function App() {
  return (
    <ToolContextProvider>
      <DataContextProvider>
        <main css={main}>
          <Canvas />
        </main>
      </DataContextProvider>
    </ToolContextProvider>
  );
}
const main = css`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #ddd;
`;
