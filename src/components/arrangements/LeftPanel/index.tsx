/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ChangeEvent, useContext } from "react";
import { DataContext } from "../../../contexts/dataContext";
import { ViewContext } from "../../../contexts/viewContext";
export const LeftPanel = () => {
  const dataContext = useContext(DataContext);
  const viewContext = useContext(ViewContext);
  const currentView = viewContext.view;

  const relations = dataContext.data.relations;
  return (
    <div css={leftPanel}>
      <hr />
      <p css={listName}>relations</p>
      <ul css={list}>
        {relations.map((relation) => {
          const currentVisibility = dataContext.getRelationVisibility(
            currentView,
            relation.id
          );
          const handleClickRelationVisibility = () => {
            dataContext.setRelationVisibility(
              currentView,
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
      <hr />
      <p css={listName}>members</p>
      <ul css={list}>
        {dataContext.data.members.map((member) => {
          const isVisible = dataContext.getMemberArrangement(
            currentView,
            member.id
          ).isVisible;
          const handleCheckVisible = (event: ChangeEvent<HTMLInputElement>) => {
            dataContext.setMemberVisibility(currentView, member.id, !isVisible);
            console.log(event.target.value);
            event.target.value = isVisible ? "off" : "on";
          };
          return (
            <li key={member.id}>
              <label css={memberListItemLabel}>
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
    </div>
  );
};
const leftPanel = css`
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  background-color: rgba(0, 0, 0, 0.1);
`;
const listName = css`
  font-size: 12px;
`;
const list = css`
  list-style: none;
  display: flex;
  flex-direction: column;
  margin: 0;
`;
const memberListItemLabel = css`
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px;
  &:hover {
    background-color: #eee;
  }
`;
