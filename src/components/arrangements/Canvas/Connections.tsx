import { useContext } from "react";
import { DataContext } from "../../../contexts/dataContext";
import { DataDispatchContext } from "../../../contexts/dataContext/index";
import { Connection } from "../../canvas/Connection";

interface Props {
  view: string;
}

export const Connections = ({ view }: Props) => {
  const dataContext = useContext(DataContext);
  const dataDispatchContext = useContext(DataDispatchContext);
  const connections = dataContext.data.connections.map((connection) => {
    const relation = dataContext.getRelation(connection.relationId) || {
      id: "0",
      name: "0",
      color: "blue",
      shape: "straight",
    };
    const startMemberArrangement = dataContext.getMemberArrangement(
      view,
      connection.startMemberId
    );
    const endMemberArrangement = dataContext.getMemberArrangement(
      view,
      connection.endMemberId
    );
    const visibility = dataContext.getRelationVisibility(
      view,
      connection.relationId
    );
    const startMemberPosition = startMemberArrangement.position;
    const endMemberPosition = endMemberArrangement.position;
    return visibility.isVisible &&
      startMemberArrangement.isVisible &&
      endMemberArrangement.isVisible ? (
      <Connection
        key={connection.id}
        id={connection.id}
        relation={relation}
        connection={connection}
        start={{
          x: startMemberPosition.x + 60,
          y: startMemberPosition.y + 55,
        }}
        end={{
          x: endMemberPosition.x + 60,
          y: endMemberPosition.y + 5,
        }}
      />
    ) : (
      <></>
    );
  });
  return <>{connections}</>;
};
