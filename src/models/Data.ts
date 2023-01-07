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
export interface Connection {
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
export interface View_Connection_Visibility {
  viewId: string;
  connectionId: string;
  isVisible: boolean;
}
export interface Data {
  members: Member[];
  connections: Connection[];
  views: View[];
  view_member_arrangements: Arrangement[];
  view_connection_visibilities: View_Connection_Visibility[];
}
