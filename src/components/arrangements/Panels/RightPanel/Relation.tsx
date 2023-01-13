/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useContext } from "react";
import {
  DataContext,
  DataDispatchContext,
} from "../../../../contexts/dataContext/index";
import { SelectionContext } from "../../../../contexts/selectionContext";
import { caption, heading } from "../../../../styles/css";
import { PanelSection } from "../PanelSection";
export const Relation = () => {
  const selectionContext = useContext(SelectionContext);
  const dataContext = useContext(DataContext);
  const dataDispatchContext = useContext(DataDispatchContext);
  const relation = dataContext.getRelation(selectionContext.relations[0]);
  const showInChildren = relation?.options?.showInChildren || false;
  const handleChangeShowInChildren = () => {
    dataDispatchContext.setShowInChildren(relation?.id || "0", !showInChildren);
  };
  return (
    <>
      <div css={[heading, title]}>{relation?.name || "0"}</div>
      <PanelSection title="options" canFold={false}>
        <label css={viewInChildrenSection}>
          <input
            type="checkbox"
            checked={showInChildren}
            onChange={handleChangeShowInChildren}
          />
          <p css={caption}>show as tag</p>
        </label>
      </PanelSection>
      <PanelSection title="color" canFold={false}>
        <p>{relation?.color}</p>
      </PanelSection>
    </>
  );
};

const title = css`
  padding: 0 12px;
`;
const viewInChildrenSection = css`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 12px;
`;
