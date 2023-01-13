/* eslint-disable react-hooks/exhaustive-deps */
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

  const getMember = useCallback(
    (memberId: string) => dataContext.getMember(memberId),
    [dataContext.data.members]
  );
  const getRelation = useCallback(
    (relationId: string) => dataContext.getRelation(relationId),
    [dataContext.data.relations]
  );
  const getConnectionsConnectedToMember = useCallback(
    (memberId: string) => dataContext.getConnectionsConnectedToMember(memberId),
    [dataContext.data.connections]
  );
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
    const position = arrangement.position;

    const connections = dataContext.getConnectionsConnectedToMember(memberId);
    const parentConnections =
      connections.filter((e) => e.endMemberId === member.id) || [];

    const childConnections =
      connections.filter((e) => e.startMemberId === member.id) || [];

    const childConnectionsIsVisible = childConnections.some((connection) => {
      const relation = dataContext.getRelation(connection.relationId);
      const relationIsVisible = dataContext.getRelationVisibility(
        view,
        connection.relationId
      ).isVisible;
      return relationIsVisible && !relation?.showAsTag;
    });
    const parentConnectionsIsVisible = parentConnections.some(
      (connection) =>
        dataContext.getRelationVisibility(view, connection.relationId).isVisible
    );
    if (
      connections.length === 0 ||
      parentConnectionsIsVisible ||
      childConnectionsIsVisible
    ) {
      return (
        <Member
          key={memberId}
          id={memberId}
          view={view}
          position={position}
          member={member}
          getMember={getMember}
          getRelation={getRelation}
          getConnectionsConnectedToMember={getConnectionsConnectedToMember}
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
