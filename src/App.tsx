/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import "reseter.css";
import { Canvas } from "./components/Canvas";
import { DataContextProvider } from "./contexts/dataContext";
export default function App() {
  return (
    <DataContextProvider>
      <main css={main}>
        <Canvas />
      </main>
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
