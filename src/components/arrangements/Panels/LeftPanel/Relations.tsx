/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import { useContext } from "react";
import { DataContext } from "../../../../contexts/dataContext";
import { ViewContext } from "../../../../contexts/viewContext";
import { canvasColors as canvasColorTypes } from "../../../../models/Color";
import { canvasColors, systemColors } from "../../../../styles/colors";
import { rounded } from "../../../../styles/css";
import { EditableText } from "../../../atoms/EditableText";
import { IconButton } from "../../../atoms/IconButton";
import { PanelSection } from "../PanelSection";

export const Relations = () => {
  const dataContext = useContext(DataContext);
  const relations = dataContext.data.relations;
  const { currentViewId } = useContext(ViewContext);
  const randomCanvasColor = () => _.sample(canvasColorTypes) || "blue";
  return (
    <PanelSection
      title="relations"
      rightIcon={
        <IconButton
          onClick={() => {
            dataContext.addRelation(randomCanvasColor(), currentViewId);
          }}
          icon={
            <FontAwesomeIcon
              icon={faPlus}
              fontSize="1em"
              color={systemColors.grey}
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
              <div
                css={[
                  css`
                    background-color: ${canvasColors[relation.color].main};
                    height: 8px;
                    width: 8px;
                    margin-left: 6px;
                  `,
                  rounded,
                ]}
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
