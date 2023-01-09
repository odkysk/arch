/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import "reseter.css";
import { Canvas } from "./components/arrangements/Canvas";
import { Cursor } from "./components/arrangements/Cursor";
import { Panels } from "./components/arrangements/Panels";
import { ActionContextProvider } from "./contexts/actionContext";
import { DataContextProvider } from "./contexts/dataContext";
import { SelectionContextProvider } from "./contexts/selectionContext";
import { ToolContextProvider } from "./contexts/toolContext";
import { ViewContextProvider } from "./contexts/viewContext";
import { systemColors } from "./styles/colors";
import "./styles/global.css";

export default function App() {
  return (
    <DataContextProvider>
      <ViewContextProvider>
        <SelectionContextProvider>
          <ActionContextProvider>
            <ToolContextProvider>
              <main css={main}>
                <Canvas />
                <Panels />
                <Cursor />
              </main>
            </ToolContextProvider>
          </ActionContextProvider>
        </SelectionContextProvider>
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
  background-color: ${systemColors.greyBackground};
  overflow: hidden;
`;
