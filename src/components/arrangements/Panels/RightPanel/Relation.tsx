/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useContext } from "react";
import {
  DataContext,
  DataDispatchContext,
} from "../../../../contexts/dataContext/index";
import { SelectionContext } from "../../../../contexts/selectionContext";
import { caption, heading } from "../../../../styles/css";
import { EditableText } from "../../../atoms/EditableText";
import { PanelSection } from "../PanelSection";
export const Relation = () => {
  const selectionContext = useContext(SelectionContext);
  const dataContext = useContext(DataContext);
  const dataDispatchContext = useContext(DataDispatchContext);
  const relation = dataContext.getRelation(selectionContext.relations[0]);
  const showAsTag = relation?.showAsTag || false;
  const handleChangeShowAsTag = () => {
    dataDispatchContext.setShowAsTag(relation?.id || "0", !showAsTag);
    console.log(dataContext.data.relations);
  };
  return (
    <>
      <div css={[heading, title]}>{relation?.name || "0"}</div>
      <PanelSection title="options" canFold={false}>
        <label css={viewInChildrenSection}>
          <input
            type="checkbox"
            checked={showAsTag}
            onChange={handleChangeShowAsTag}
          />
          <p css={caption}>show parents as tag</p>
        </label>
      </PanelSection>
      <PanelSection title="color" canFold={false}>
        <EditableText value={relation?.color}></EditableText>
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
