import { Dispatch } from "react";
import { Data } from "../../models/Data";

export const deleteConnection = (
  data: Data,
  setData: Dispatch<Data>,
  connectionId: string
) => {
  setData({
    ...data,
    connections: data.connections.filter((connection) => {
      return connection.id !== connectionId;
    }),
  });
};
