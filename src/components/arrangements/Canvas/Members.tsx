import { useCallback, useContext } from "react";
import { ActionContext } from "../../../contexts/actionContext";
import {
  DataContext,
  DataDispatchContext,
} from "../../../contexts/dataContext";
import { ToolContext } from "../../../contexts/toolContext";
import { Position } from "../../../models/Data";
import { Member } from "../../canvas/Member";
interface Props {
  view: string;
}

export const Members = ({ view }: Props) => {
  const dataContext = useContext(DataContext);
  const dataDispatchContext = useContext(DataDispatchContext);
  const actionContext = useContext(ActionContext);
  const toolContext = useContext(ToolContext);
  const setPosition = useCallback(
    (view: string, id: string, position: Position) => {
      dataDispatchContext.setMemberPosition(view, id, position);
    },
    []
  );
  const setName = useCallback((id: string, value: string) => {
    dataDispatchContext.setMemberName(id, value);
  }, []);
  const setNewConnectionStart = useCallback(
    (memberId: string, relationId: string) => {
      actionContext.setNewConnectionStart(memberId, relationId);
    },
    []
  );
  const setNewConnectionEnd = useCallback(
    (memberId: string) => {
      actionContext.setNewConnectionEnd(memberId);
    },
    [
      actionContext.newConnection.startMemberId,
      actionContext.newConnectionExists,
    ]
  );
  const members = dataContext.getMemberArrangements(view).map((arrangement) => {
    const memberId = arrangement.memberId;
    const member = dataContext.getMember(memberId);
    const position = dataContext.getMemberArrangement(view, memberId).position;
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
      return (
        <Member
          key={memberId}
          id={memberId}
          view={view}
          position={position}
          member={member}
          setPosition={setPosition}
          setName={setName}
          setNewConnectionStart={setNewConnectionStart}
          setNewConnectionEnd={setNewConnectionEnd}
          currentTool={toolContext.currentTool}
        />
      );
    }
  });
  return <>{members}</>;
};
