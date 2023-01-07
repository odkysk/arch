import { useContext } from "react";
import { DataContext } from "../../../contexts/dataContext";
import { Connection } from "../../canvas/Connection";

interface Props {
  view: string;
}

export const Connections = ({ view }: Props) => {
  const dataContext = useContext(DataContext);
  const connections = dataContext.data.connections.map((connection) => {
    const startMemberArrangement = dataContext.getMemberArrangement(
      view,
      connection.startMemberId
    );
    const endMemberArrangement = dataContext.getMemberArrangement(
      view,
      connection.endMemberId
    );
    const visibility = dataContext.getRelationVisibility(view, connection.id);
    const startMemberPosition = startMemberArrangement.position;
    const endMemberPosition = endMemberArrangement.position;
    return visibility.isVisible &&
      startMemberArrangement.isVisible &&
      endMemberArrangement.isVisible ? (
      <Connection
        key={connection.id}
        id={connection.id}
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
