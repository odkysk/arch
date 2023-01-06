/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useContext } from "react";
import { DataContext } from "../../../../contexts/dataContext";
import { ViewContext } from "../../../../contexts/viewContext";
import { colors } from "../../../../styles/colors";
import { EditableText } from "../../../atoms/EditableText";
import { IconButton } from "../../../atoms/IconButton";
import { PanelSection } from "../PanelSection";
export const Members = () => {
  const dataContext = useContext(DataContext);
  const { currentViewId } = useContext(ViewContext);
  return (
    <PanelSection
      title="members"
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
      <ul
        css={css`
          margin: 0;
        `}
      >
        {dataContext.data.members.map((member) => {
          const isVisible = dataContext.getMemberArrangement(
            currentViewId,
            member.id
          ).isVisible;
          const handleCheckVisible = (event: ChangeEvent<HTMLInputElement>) => {
            dataContext.setMemberVisibility(
              currentViewId,
              member.id,
              !isVisible
            );
            event.target.value = isVisible ? "off" : "on";
          };
          const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
            dataContext.setMemberName(member.id, event.target.value);
          };
          return (
            <li key={member.id} css={list}>
              <EditableText onChange={handleChangeName} value={member.name} />
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
