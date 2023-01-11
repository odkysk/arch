/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, PointerEvent, useContext } from "react";
import {
  DataContext,
  DataDispatchContext,
} from "../../../../contexts/dataContext/index";
import { ViewContext } from "../../../../contexts/viewContext";
import { systemColors } from "../../../../styles/colors";
import { box, rounded } from "../../../../styles/css";
import { EditableText } from "../../../atoms/EditableText";
import { IconButton } from "../../../atoms/IconButton";
import { PanelSection } from "../PanelSection";

export const Views = () => {
  const { currentViewId, setCurrentViewId } = useContext(ViewContext);
  const dataContext = useContext(DataContext);
  const dataDispatchContext = useContext(DataDispatchContext);
  const views = dataContext.data.views;
  return (
    <PanelSection
      title="view"
      rightIcon={
        <IconButton
          onClick={() => {
            dataDispatchContext.addView();
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
      <div css={viewsCss}>
        {views.map((view) => {
          const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            dataDispatchContext.setViewName(view.id, event.target.value);
          };
          const handleClickView = (e: PointerEvent<HTMLDivElement>) => {
            setCurrentViewId(view.id);
          };
          return (
            <div
              key={view.id}
              onClick={handleClickView}
              css={[
                view.id === currentViewId &&
                  css`
                    background-color: rgba(255, 255, 255, 0.86);
                    ${box}
                  `,
                rounded,
                css`
                  position: relative;
                `,
              ]}
            >
              <EditableText
                key={view.id}
                value={view.name}
                onChange={handleChange}
              />
              {view.id !== currentViewId && (
                //InputへのFocusを阻むためのdiv
                <div
                  css={css`
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                  `}
                ></div>
              )}
            </div>
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
