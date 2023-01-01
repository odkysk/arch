/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import "reseter.css";
import { Canvas } from "./components/arrangements/Canvas";
import { Panels } from "./components/arrangements/Panels";
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
              <Panels />
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
// const panels = css`
//   position: fixed;
//   left: 20px;
//   bottom: 20px;
//   z-index: 100;
//   max-height: 80vh;
//   overflow: scroll;
//   overscroll-behavior: none;
// `;
// const navigation = css`
//   position: fixed;
//   top: 0;
//   width: 100%;
//   height: 44px;
//   z-index: 100;
// `;
