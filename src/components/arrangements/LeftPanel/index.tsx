/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ChangeEvent, useContext } from "react";
import { DataContext } from "../../../contexts/dataContext";
import { ViewContext } from "../../../contexts/viewContext";
export const LeftPanel = () => {
  const dataContext = useContext(DataContext);
  const viewContext = useContext(ViewContext);
  const currentView = viewContext.view;

  return (
    <div css={leftPanel}>
      <ul css={memberList}>
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
`;
const memberList = css`
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