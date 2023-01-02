/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ChangeEvent, useContext } from "react";
import { DataContext } from "../../../../contexts/dataContext";
import { ViewContext } from "../../../../contexts/viewContext";
import { EditableText } from "../../../atoms/EditableText";
import { PanelSection } from "../PanelSection";
export const Relations = () => {
  const dataContext = useContext(DataContext);
  const { currentViewId } = useContext(ViewContext);
  const relations = dataContext.data.relations;
  return (
    <PanelSection title="relation">
      <ul
        css={css`
          margin: 0;
        `}
      >
        {relations.map((relation) => {
          const currentVisibility = dataContext.getRelationVisibility(
            currentViewId,
            relation.id
          );
          const handleClickRelationVisibility = () => {
            dataContext.setRelationVisibility(
              currentViewId,
              relation.id,
              !currentVisibility.isVisible
            );
          };
          const checked = currentVisibility;
          const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            dataContext.setRelationName(relation.id, event.target.value);
          };
          return (
            <li key={relation.id} css={list}>
              <input
                type="checkBox"
                onClick={handleClickRelationVisibility}
                checked={checked.isVisible}
              />
              <EditableText value={relation.name} onChange={handleChange} />
            </li>
          );
        })}
      </ul>
    </PanelSection>
  );
};
const list = css`
  display: flex;
  align-items: center;
`;
