/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  ChangeEvent,
  memo,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Tool } from "../../contexts/toolContext";
import { useDrag } from "../../hooks/useDrag";
import {
  addPosition,
  Connection,
  Member as MemberType,
  Position,
  Relation,
} from "../../models/Data";
import { canvasColors } from "../../styles/colors";
import { body, box, caption, onHover, rounded } from "../../styles/css";
interface Props {
  member: MemberType;
  id: string;
  view: string;
  position: Position;
  getMember: (memberId: string) => MemberType | undefined;
  getRelation: (relationId: string) => Relation | undefined;
  getConnectionsConnectedToMember: (memberId: string) => Connection[];
  setPosition: (view: string, id: string, position: Position) => void;
  setName: (id: string, value: string) => void;
  setNewConnectionStart: (memberId: string, relationId: string) => void;
  setNewConnectionEnd: (memberId: string) => void;
  currentTool: Tool;
}
export interface Tag {
  parent: MemberType;
  relation: Relation;
}
export const Member = memo(
  ({
    member,
    id,
    view,
    position,
    getRelation,
    getMember,
    getConnectionsConnectedToMember,
    setPosition,
    setName,
    setNewConnectionStart,
    setNewConnectionEnd,
    currentTool,
  }: Props) => {
    // console.log(id);
    const name = member.name;
    const [isDragging, setIsDragging] = useState(false);
    const { translation } = useDrag(isDragging);
    const positionOnMouseDown = useRef<Position>({ x: 0, y: 0 });

    const connections = getConnectionsConnectedToMember(member.id);
    const parentConnections =
      connections.filter((e) => e.endMemberId === member.id) || [];
    const tags: Tag[] = parentConnections
      .map(
        (connection) =>
          getRelation(connection.relationId)?.showAsTag && {
            relation: getRelation(connection.relationId),
            parent: getMember(connection.startMemberId),
          }
      )
      .filter((e): e is Tag => e !== undefined);

    const handleMouseDown = (event: MouseEvent) => {
      positionOnMouseDown.current = { x: position.x, y: position.y };
      if (currentTool.name === "selection") {
        setIsDragging(true);
      }
      if (currentTool.name === "relation") {
        setNewConnectionStart(id, currentTool.options?.relationId || "0");
      }
    };

    const handleMouseMove = () => {
      if (isDragging) {
        setPosition(
          view,
          id,
          addPosition(positionOnMouseDown.current, translation)
        );
      }
    };
    useEffect(() => {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUpDocument);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUpDocument);
      };
    });
    const handleMouseUpDocument = () => {
      setIsDragging(false);
    };
    const handleMouseUp = (event: MouseEvent) => {
      setNewConnectionEnd(id);
    };
    const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
      if (event) {
        setName(id, event.target.value);
      }
    };
    return (
      <div
        id={id}
        css={[
          memberCss,
          box,
          rounded,
          isDragging &&
            css`
              z-index: 1;
            `,
          !isDragging &&
            css`
              transition: all 100ms ease-out;
            `,
        ]}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div>
          {tags.map((tag) => (
            <p key={`${tag.parent?.id}${tag.relation?.id}`} css={[caption]}>
              {tag.parent?.name}
            </p>
          ))}
        </div>
        <input
          type="text"
          css={[
            body,
            css`
              width: 160px;
              text-align: center;
              background-color: rgba(0, 0, 0, 0);
              border: none;
            `,
          ]}
          value={name}
          onChange={handleChangeValue}
        />
        <p css={caption}> </p>
      </div>
    );
  }
);

const memberCss = css`
  position: absolute;
  padding: 12px;
  border: solid 1.5px ${canvasColors.grey.border};
  background-color: ${canvasColors.grey.background};
  width: 120px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  transform-origin: 0.5 0.5;
  gap: 6px;
  ${onHover(
    css`
      background-color: rgba(0, 0, 0, 0.1);
    `
  )}
`;
const button = css`
  background-color: rgba(0, 0, 0, 0);
  border: none;
`;
