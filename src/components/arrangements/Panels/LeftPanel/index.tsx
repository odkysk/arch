/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useContext } from "react";
import { DataContext } from "../../../../contexts/dataContext";
import { ViewContext } from "../../../../contexts/viewContext";
import { colors } from "../../../../styles/colors";
import { body, box } from "../../../../styles/css";
import { IconButton } from "../../../atoms/IconButton";
import { PanelSection } from "../PanelSection";
import { Views } from "./Views";
export const LeftPanel = () => {
  const dataContext = useContext(DataContext);
  const { currentViewId } = useContext(ViewContext);
  const relations = dataContext.data.relations;
  return (
    <div css={[leftPanel, box]}>
      <Views />
      <PanelSection
        title="relation"
        rightIcon={
          <IconButton
            onClick={(e) => {
              console.log("iconButton");
              e.stopPropagation();
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
        <ul css={list}>
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
            return (
              <li key={relation.id}>
                <label css={memberListItemLabel}>
                  <input
                    type="checkBox"
                    onClick={handleClickRelationVisibility}
                    checked={checked.isVisible}
                  />
                  <p>{relation.name}</p>
                </label>
              </li>
            );
          })}
        </ul>
      </PanelSection>
      <PanelSection
        title="member"
        rightIcon={
          <IconButton
            onClick={(e) => {
              dataContext.addMember();
              e.stopPropagation();
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
        <ul css={list}>
          {dataContext.data.members.map((member) => {
            const isVisible = dataContext.getMemberArrangement(
              currentViewId,
              member.id
            ).isVisible;
            const handleCheckVisible = (
              event: ChangeEvent<HTMLInputElement>
            ) => {
              dataContext.setMemberVisibility(
                currentViewId,
                member.id,
                !isVisible
              );
              console.log(event.target.value);
              event.target.value = isVisible ? "off" : "on";
            };
            return (
              <li key={member.id}>
                <label css={[memberListItemLabel, body]}>
                  <input
                    type="checkBox"
                    checked={isVisible}
                    onChange={handleCheckVisible}
                  />
                  {member.name}
                </label>
              </li>
            );
          })}
        </ul>
      </PanelSection>
    </div>
  );
};
const leftPanel = css`
  padding: 12px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-right: solid 1px ${colors.system.greyBorder};
  background-color: ${colors.system.greyBackground};
`;
const list = css`
  list-style: none;
  display: flex;
  flex-direction: column;
  margin: 0;
`;
const memberListItemLabel = css`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px;
  &:hover {
    background-color: #eee;
  }
`;
