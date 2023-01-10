/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { KeyboardEvent } from "react";
import "reseter.css";
import { Canvas } from "./components/arrangements/Canvas";
import { Cursor } from "./components/arrangements/Cursor";
import { Panels } from "./components/arrangements/Panels";
import { systemColors } from "./styles/colors";
import "./styles/global.css";

export default function App() {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.repeat) return;
    console.log(event.key);
    if (event.key === "Escape") {
    }
  };
  return (
    <main css={main} onKeyDown={handleKeyDown}>
      <Canvas />
      <Panels />
      <Cursor />
    </main>
  );
}
const main = css`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  position: relative;
  background-color: ${systemColors.greyBackground};
  overflow: hidden;
`;
