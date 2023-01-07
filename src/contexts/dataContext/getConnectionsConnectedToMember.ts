import { Data } from "../../models/Data";

export const getConnectionsConnectedToMember = (data: Data, memberId: string) =>
  data.connections.filter(
    (connection) =>
      connection.startMemberId === memberId ||
      connection.endMemberId === memberId
  ) || [];
