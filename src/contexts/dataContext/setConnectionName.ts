import { Dispatch } from "react";
import { Data } from "../../models/Data";

export const setConnectionName = (
  data: Data,
  setData: Dispatch<Data>,
  connectionId: string,
  name: string
) => {
  setData({
    ...data,
    connections: data.connections.map((connection) =>
      connection.id === connectionId
        ? {
            ...connection,
            name: name,
          }
        : { ...connection }
    ),
  });
};
