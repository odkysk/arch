import { Dispatch, SetStateAction } from "react";
import { Data } from "../../models/Data";

export const deleteConnection = (
  setData: Dispatch<SetStateAction<Data>>,
  connectionId: string
) => {
  setData((data) => {
    return {
      ...data,
      connections: data.connections.filter((connection) => {
        return connection.id !== connectionId;
      }),
    };
  });
};
