/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useContext } from "react";
import { DataContext } from "../../../../contexts/dataContext";
import { ViewContext } from "../../../../contexts/viewContext";
import { EditableText } from "../../../atoms/EditableText";
import { PanelSection } from "../PanelSection";
export const Connections = () => {
  const dataContext = useContext(DataContext);
  const { currentViewId } = useContext(ViewContext);
  const connections = dataContext.data.connections;
  const uniqueConnectionNames = [
    ...new Set(connections.map((connection) => connection.name)),
  ];
  return (
    <PanelSection title="relations">
      <ul
        css={css`
          margin: 0;
        `}
      >
        {uniqueConnectionNames.map((name) => {
          /* 将来的にはdataContextのconnection classテーブルで管理する必要がありそう */
          const filteredConnections = connections.filter(
            (connection) => connection.name === name
          );
          const filteredConnectionIds = filteredConnections.map(
            (connection) => connection.id
          );
          const firstConnectionIsVisible = dataContext.getConnectionVisibility(
            currentViewId,
            filteredConnectionIds[0]
          ).isVisible;
          const handleChange = () => {
            dataContext.setConnectionVisibility(
              currentViewId,
              filteredConnectionIds,
              !firstConnectionIsVisible
            );
          };
          return (
            <li key={name} css={list}>
              <input
                type="checkBox"
                onChange={handleChange}
                checked={firstConnectionIsVisible}
              />
              <EditableText value={name} />
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
