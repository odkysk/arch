/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useContext } from "react";
import { DataContext } from "../../../../contexts/dataContext";
import { ViewContext } from "../../../../contexts/viewContext";
import { EditableText } from "../../../atoms/EditableText";
import { PanelSection } from "../PanelSection";
export const Relations = () => {
  const dataContext = useContext(DataContext);
  const relations = dataContext.data.relations;
  const { currentViewId } = useContext(ViewContext);
  const connections = dataContext.data.connections;

  return (
    <PanelSection title="relations">
      <ul>
        {relations.map((relation) => {
          const currentVisibility = dataContext.getRelationVisibility(
            currentViewId,
            relation.id
          ).isVisible;
          const handleCheck = () => {
            dataContext.setRelationVisibility(
              currentViewId,
              relation.id,
              !currentVisibility
            );
          };
          return (
            <li css={list}>
              <input
                type="checkbox"
                checked={currentVisibility}
                onClick={handleCheck}
              />
              <EditableText value={relation.name} />
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
