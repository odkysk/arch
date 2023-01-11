import { Dispatch, SetStateAction } from "react";
import { Data } from "../../models/Data";

export const setMemberName = (
  setData: Dispatch<SetStateAction<Data>>,
  memberId: string,
  name: string
) => {
  setData((data) => {
    return {
      ...data,
      members: data.members.map((member) =>
        member.id === memberId
          ? {
              ...member,
              name: name,
            }
          : { ...member }
      ),
    };
  });
};
