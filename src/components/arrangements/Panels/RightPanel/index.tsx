/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { colors } from "../../../../styles/colors";
import { box, caption } from "../../../../styles/css";
export const RightPanel = () => {
  return <div css={[rightPanel, box, caption]}>rightPanel</div>;
};
const rightPanel = css`
  width: 100%;
  height: 100%;
  border-left: solid 1px ${colors.system.greyBorder};
  background-color: ${colors.system.greyBackground};
`;