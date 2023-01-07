import { useContext } from "react";
import { DataContext } from "../../../contexts/dataContext";
import { Member } from "../../canvas/Member";

interface Props {
  view: string;
}

export const Members = ({ view }: Props) => {
  const dataContext = useContext(DataContext);
  const members = dataContext.getMemberArrangements(view).map((arrangement) => {
    const memberId = arrangement.memberId;

    const visibilityByArrangement = arrangement.isVisible;

    const connectedConnections = dataContext.getRelationsConnectedToMember(
      arrangement.memberId
    );
    const connectedConnectionVisibilities = connectedConnections.map(
      (connection) =>
        dataContext.getRelationVisibility(view, connection.id).isVisible
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
