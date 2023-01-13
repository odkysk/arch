import { CanvasColor } from "./Color";

export interface Position {
  x: number;
  y: number;
}
type AddPosition = (a: Position, b: Position) => Position;
export const addPosition: AddPosition = (a, b) => {
  return { x: a.x + b.x, y: a.y + b.y };
};
export interface Member {
  id: string;
  name: string;
}
export interface Relation {
  id: string;
  name: string;
  color: CanvasColor;
  shape: "straight";
  showAsTag: boolean;
}
export interface Connection {
  id: string;
  relationId: string;
  startMemberId: string;
  endMemberId: string;
}
export interface View {
  id: string;
  name: string;
}
export interface Arrangement {
  viewId: string;
  memberId: string;
  position: Position;
  isVisible: boolean;
}
export interface View_Relation_Visibility {
  viewId: string;
  relationId: string;
  isVisible: boolean;
}
export interface Data {
  members: Member[];
  relations: Relation[];
  connections: Connection[];
  views: View[];
  view_member_arrangements: Arrangement[];
  view_relation_visibilities: View_Relation_Visibility[];
}
