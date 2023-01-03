/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { LeftPanel } from "./LeftPanel";
import { RightPanel } from "./RightPanel";
import { TopPanel } from "./TopPanel";
export const Panels = () => {
  return (
    <div css={panel}>
      <div css={topPanel}>
        <TopPanel />
      </div>
      <div css={lowerPanels}>
        <div css={leftPanel}>
          <LeftPanel />
        </div>
        <div css={rightPanel}>
          <RightPanel />
        </div>
      </div>
    </div>
  );
};
const panel = css`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  display: flex;

  flex-direction: column;
  pointer-events: none;
`;
const topPanel = css`
  height: 44px;
  top: 0;
  pointer-events: all;
`;
const lowerPanels = css`
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const leftPanel = css`
  width: 220px;
  pointer-events: all;
`;
const rightPanel = css`
  width: 220px;
  pointer-events: all;
`;
