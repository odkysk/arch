/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { DataContext } from "../../../../contexts/dataContext";
import { ViewContext } from "../../../../contexts/viewContext";
import { colors } from "../../../../styles/colors";
import { EditableText } from "../../../atoms/EditableText";
import { IconButton } from "../../../atoms/IconButton";
import { PanelSection } from "../PanelSection";
export const Relations = () => {
  const dataContext = useContext(DataContext);
  const relations = dataContext.data.relations;
  const { currentViewId } = useContext(ViewContext);
  const connections = dataContext.data.connections;

  return (
    <PanelSection
      title="relations"
      rightIcon={
        <IconButton
          onClick={() => {
            dataContext.addRelation("purple", currentViewId);
          }}
          icon={
            <FontAwesomeIcon
              icon={faPlus}
              fontSize="1em"
              color={colors.system.grey}
            />
          }
        />
      }
    >
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
