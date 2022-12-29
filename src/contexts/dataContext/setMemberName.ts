import { Dispatch } from "react";
import { Data } from "../../models/Data";

export const setMemberName = (
  data: Data,
  setData: Dispatch<Data>,
  memberId: string,
  name: string
) => {
  setData({
    ...data,
    members: data.members.map((member) =>
      member.id === memberId
        ? {
            ...member,
            name: name,
          }
        : { ...member }
    ),
  });
};
