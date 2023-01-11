import { useContext } from "react";
import {
  DataContext,
  DataDispatchContext,
} from "../../../contexts/dataContext";
import { Member } from "../../canvas/Member";

interface Props {
  view: string;
}

export const Members = ({ view }: Props) => {
  const dataContext = useContext(DataContext);
  const dataDispatchContext = useContext(DataDispatchContext);
  const members = dataDispatchContext
    .getMemberArrangements(view)
    .map((arrangement) => {
      const memberId = arrangement.memberId;

      const visibilityByArrangement = arrangement.isVisible;

      const connectedConnections =
        dataDispatchContext.getRelationsConnectedToMember(arrangement.memberId);
      const connectedConnectionVisibilities = connectedConnections.map(
        (connection) =>
          dataDispatchContext.getRelationVisibility(view, connection.id)
            .isVisible
      );
      const visibilityByConnectedConnection =
        connectedConnectionVisibilities.some((e) => e === true) ||
        connectedConnectionVisibilities.length === 0;

      if (visibilityByArrangement && visibilityByConnectedConnection) {
        return <Member key={memberId} id={memberId} view={view} />;
      }
    });
  return <>{members}</>;
};
