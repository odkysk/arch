/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import { ChangeEvent, PointerEvent, useContext } from "react";
import { DataContext } from "../../../../contexts/dataContext";
import { SelectionContext } from "../../../../contexts/selectionContext";
import { ViewContext } from "../../../../contexts/viewContext";
import { canvasColors as canvasColorNames } from "../../../../models/Color";
import { canvasColors, systemColors } from "../../../../styles/colors";
import { onHover, rounded } from "../../../../styles/css";
import { Checkbox } from "../../../atoms/Checkbox";
import { EditableText } from "../../../atoms/EditableText";
import { IconButton } from "../../../atoms/IconButton";
import { PanelSection } from "../PanelSection";

export const Relations = () => {
  const dataContext = useContext(DataContext);
  const relations = dataContext.data.relations;
  const selectionContext = useContext(SelectionContext);
  const { currentViewId } = useContext(ViewContext);
  const getUniqueRandomColor = () => {
    const colorCount = Object.assign(
      {},
      ...canvasColorNames.map((name) => ({ [name]: 0 }))
    );
    relations.forEach((relation) => (colorCount[relation.color] += 1));
    const minimumCount = Math.min(...(Object.values(colorCount) as number[]));
    const possibleColors = Object.keys(colorCount)
      .map((key) => colorCount[key] === minimumCount && key)
      .filter((e) => e !== false);
    return _.sample(possibleColors) || "blue";
  };
  return (
    <PanelSection
      title="relations"
      rightIcon={
        <IconButton
          onClick={() => {
            dataContext.addRelation(getUniqueRandomColor(), currentViewId);
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
          const isSelected = selectionContext.relations.some(
            (id) => id === relation.id
          );
          const handleClickList = (event: PointerEvent<HTMLLIElement>) => {
            selectionContext.selectRelation(relation.id);
          };
          const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
            dataContext.setRelationName(relation.id, event.target.value);
          };
          return (
            <li
              key={relation.id}
              css={[
                list,
                rounded,

                css`
                  padding: 0 0 0 6px;
                  border: solid 1.5px rgba(0, 0, 0, 0);
                `,
                onHover(
                  css`
                    border-color: ${canvasColors[relation.color].border};
                  `
                ),
                isSelected &&
                  css`
                    border-color: ${canvasColors[relation.color]
                      .main} !important;
                    background-color: ${canvasColors[relation.color]
                      .background};
                  `,
              ]}
              onClick={handleClickList}
            >
              <Checkbox
                checked={currentVisibility}
                onClick={handleCheck}
                canvasColor={relation.color}
              />
              <EditableText
                value={relation.name}
                onChange={handleChangeName}
                css={[
                  !isSelected &&
                    css`
                      pointer-events: none;
                    `,
                  !currentVisibility &&
                    css`
                      opacity: 0.33;
                    `,
                ]}
              />
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
