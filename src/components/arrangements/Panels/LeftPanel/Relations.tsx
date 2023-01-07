/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useContext } from "react";
import { DataContext } from "../../../../contexts/dataContext";
import { ViewContext } from "../../../../contexts/viewContext";
import { PanelSection } from "../PanelSection";
export const Relations = () => {
  const dataContext = useContext(DataContext);
  const relations = dataContext.data.relations;
  const { currentViewId } = useContext(ViewContext);
  const connections = dataContext.data.connections;

  return (
    <PanelSection title="relations">
      <p>relations</p>
    </PanelSection>
  );
};
const list = css`
  display: flex;
  align-items: center;
`;
