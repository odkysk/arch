/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useContext } from "react";
import { DataContext } from "../../../../contexts/dataContext/index";
import { body } from "../../../../styles/css";
import { PanelSection } from "../PanelSection";
export const Views = () => {
  const dataContext = useContext(DataContext);
  const views = dataContext.data.views;
  return (
    <PanelSection title="view">
      {views.map((view) => (
        <p css={body}>{view.name}</p>
      ))}
    </PanelSection>
  );
};
const viewsCss = css`
  display: flex;
  flex-direction: column;
`;
