/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { KeyboardEvent, useContext } from "react";
import "reseter.css";
import { Canvas } from "./components/arrangements/Canvas";
import { Cursor } from "./components/arrangements/Cursor";
import { Panels } from "./components/arrangements/Panels";
import { SelectionContext } from "./contexts/selectionContext";
import { systemColors } from "./styles/colors";
import "./styles/global.css";

export default function App() {
  const selectionContext = useContext(SelectionContext);
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.repeat) return;
    if (event.key === "Escape") {
      selectionContext.resetSelection();
    }
  };
  return (
    <main css={main} tabIndex={0} onKeyDown={handleKeyDown}>
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
