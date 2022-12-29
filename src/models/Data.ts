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
  start: string;
  end: string;
}
export interface View {
  id: string;
  name: string;
}
export interface Arrangement {
  view: string;
  member: string;
  position: Position;
  isVisible: boolean;
}
export interface Data {
  members: Member[];
  relations: Relation[];
  views: View[];
  view_member_arrangements: Arrangement[];
}
