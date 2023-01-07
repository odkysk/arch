import { Data } from "../../models/Data";
export const getRelation = (data: Data, relationId: string) => {
  return data.relations.find((relation) => relation.id === relationId);
};
