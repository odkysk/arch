import { Data } from "../../models/Data";

export const getRelationsRelatedToMember = (data: Data, memberId: string) =>
  data.relations.filter(
    (relation) =>
      relation.startMemberId === memberId || relation.endMemberId === memberId
  ) || [];
