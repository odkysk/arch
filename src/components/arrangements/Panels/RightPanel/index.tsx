/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useContext } from "react";
import { DataContext } from "../../../../contexts/dataContext/index";
import { SelectionContext } from "../../../../contexts/selectionContext";
import { systemColors } from "../../../../styles/colors";
import { box } from "../../../../styles/css";
import { Relation } from "./Relation";
export const RightPanel = () => {
  const selectionContext = useContext(SelectionContext);
  const dataContext = useContext(DataContext);
  return (
    <div css={[rightPanel, box]}>
      {selectionContext.relations.length > 0 ? <Relation /> : <div></div>}
    </div>
  );
};
const rightPanel = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 12px 0px;
  gap: 6px;
  border-left: solid 1px ${systemColors.greyBorder};
  background-color: ${systemColors.greyBackground};
`;
const title = css`
  padding: 0 12px;
`;
const viewInChildrenSection = css`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 12px;
`;
