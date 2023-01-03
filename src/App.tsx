/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import "reseter.css";
import { Canvas } from "./components/arrangements/Canvas";
import { Panels } from "./components/arrangements/Panels";
import { ActionContextProvider } from "./contexts/actionContext";
import { DataContextProvider } from "./contexts/dataContext";
import { ToolContextProvider } from "./contexts/toolContext";
import { ViewContextProvider } from "./contexts/viewContext";
import { colors } from "./styles/colors";
import "./styles/global.css";

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
  background-color: ${colors.system.greyBackground};
  overflow: hidden;
`;
