/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ChangeEvent, useContext } from "react";
import { DataContext } from "../../../contexts/dataContext";
import { ViewContext } from "../../../contexts/viewContext";
export const LeftPanel = () => {
  const dataContext = useContext(DataContext);
  const viewContext = useContext(ViewContext);
  const currentView = viewContext.view;
  const uniqueRelationNames = Array.from(
    new Set(
      dataContext.data.view_relation_visibilities.map((e) => e.relationId)
    )
  );

  const relations = dataContext.data.relations;
  return (
    <div css={leftPanel}>
      <p css={listName}>relations</p>
      <ul css={list}>
        {relations.map((relation) => {
          const handleClickRelationVisibility = () => {
            const currentVisibility = dataContext.getRelationVisibility(
              currentView,
              relation.id
            );
            dataContext.setRelationVisibility(
              currentView,
              relation.id,
              !currentVisibility.isVisible
            );
          };
          return (
            <li key={relation.id}>
              <label css={memberListItemLabel}>
                <input
                  type="checkBox"
                  onClick={handleClickRelationVisibility}
                  checked={
                    dataContext.getRelationVisibility(currentView, relation.id)
                      .isVisible
                  }
                />
                <p>{relation.name}</p>
              </label>
            </li>
          );
        })}
      </ul>
      <ul css={list}>
        <p css={listName}>members</p>
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
  height: 80vh;
  background-color: #fff;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  overflow: scroll;
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
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px;
  &:hover {
    background-color: #eee;
  }
`;
