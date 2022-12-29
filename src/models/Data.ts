export interface Position {
  x: number;
  y: number;
}
export interface Member {
  id: string;
  name: string;
}
export interface Relation {
  id: string;
  name: string;
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
  views: View[];
  view_member_arrangements: Arrangement[];
  view_relation_visibilities: View_Relation_Visibility[];
}
