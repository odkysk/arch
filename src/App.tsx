/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import "reseter.css";
import { Canvas } from "./components/arrangements/Canvas";
import { DataContextProvider } from "./contexts/dataContext";
import { PreviewContextProvider } from "./contexts/previewContext";
import { ToolContextProvider } from "./contexts/toolContext";

export default function App() {
  return (
    <DataContextProvider>
      <PreviewContextProvider>
        <ToolContextProvider>
          <main css={main}>
            <Canvas />
          </main>
        </ToolContextProvider>
      </PreviewContextProvider>
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
