/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useContext } from "react";
import { DataContext } from "../../../../contexts/dataContext";
import { ViewContext } from "../../../../contexts/viewContext";
import { EditableText } from "../../../atoms/EditableText";
import { PanelSection } from "../PanelSection";
export const Relations = () => {
  const dataContext = useContext(DataContext);
  const { currentViewId } = useContext(ViewContext);
  const relations = dataContext.data.relations;
  const uniqueRelationNames = [
    ...new Set(relations.map((relation) => relation.name)),
  ];
  return (
    <PanelSection title="relations">
      <ul
        css={css`
          margin: 0;
        `}
      >
        {uniqueRelationNames.map((name) => {
          /* 将来的にはdataContextのrelation classテーブルで管理する必要がありそう */
          const filteredRelations = relations.filter(
            (relation) => relation.name === name
          );
          const filteredRelationIds = filteredRelations.map(
            (relation) => relation.id
          );
          const firstRelationIsVisible = dataContext.getRelationVisibility(
            currentViewId,
            filteredRelationIds[0]
          ).isVisible;
          const handleChange = () => {
            dataContext.setRelationVisibility(
              currentViewId,
              filteredRelationIds,
              !firstRelationIsVisible
            );
          };
          return (
            <li key={name} css={list}>
              <input
                type="checkBox"
                onChange={handleChange}
                checked={firstRelationIsVisible}
              />
              <EditableText value={name} />
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
