/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { colors } from "../../../../styles/colors";
import { box } from "../../../../styles/css";
import { Members } from "./Members";
import { Relations } from "./Relations";
import { Views } from "./Views";
export const LeftPanel = () => {
  return (
    <div css={[leftPanel, box]}>
      <Views />
      <Relations />
      <Members />
    </div>
  );
};
const leftPanel = css`
  padding: 8px 0px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-right: solid 1px ${colors.system.greyBorder};
  background-color: ${colors.system.greyBackground};
  overflow: scroll;
`;
