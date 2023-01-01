/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, FocusEvent, useContext, useRef } from "react";
import { DataContext } from "../../../../contexts/dataContext/index";
import { ViewContext } from "../../../../contexts/viewContext";
import { colors } from "../../../../styles/colors";
import { EditableText } from "../../../atoms/EditableText";
import { IconButton } from "../../../atoms/IconButton";
import { PanelSection } from "../PanelSection";

export const Views = () => {
  const viewContext = useContext(ViewContext);
  const initialInputText = useRef("");
  const dataContext = useContext(DataContext);
  const views = dataContext.data.views;
  return (
    <PanelSection
      title="view"
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
      <div css={viewsCss}>
        {views.map((view) => {
          const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
            initialInputText.current = event.target.value;
          };
          const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            dataContext.setViewName(view.id, event.target.value);
          };
          const handleDiscard = (event: ChangeEvent<HTMLInputElement>) => {
            dataContext.setViewName(view.id, initialInputText.current);
          };
          return (
            <EditableText
              key={view.id}
              value={view.name}
              onFocus={handleFocus}
              onChange={handleChange}
              onDiscard={handleDiscard}
            />
          );
        })}
      </div>
    </PanelSection>
  );
};
const viewsCss = css`
  display: flex;
  flex-direction: column;
`;
