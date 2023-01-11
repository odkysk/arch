import { Dispatch, SetStateAction } from "react";
import { Data } from "../../models/Data";

export const setConnectionName = (
  setData: Dispatch<SetStateAction<Data>>,
  connectionId: string,
  name: string
) => {
  setData((data) => {
    return {
      ...data,
      connections: data.connections.map((connection) =>
        connection.id === connectionId
          ? {
              ...connection,
              name: name,
            }
          : { ...connection }
      ),
    };
  });
};
