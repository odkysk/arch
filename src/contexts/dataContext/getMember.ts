import { Data, Member } from "../../models/Data";

export const getMember = (data: Data, memberId: string) => {
  return (
    data.members.find((member: Member) => member.id === memberId) ??
    data.members[0]
  );
};
