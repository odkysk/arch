import {
  createContext,
  MouseEvent,
  ReactNode,
  useContext,
  useRef,
  useState,
} from "react";
import { Connection } from "../models/Data";
import { DOMEvent } from "../models/DOMEvent";
import { DataContext } from "./dataContext";
import { ToolContext } from "./toolContext";

interface Context {
  newConnection: Connection;
  newConnectionExists: boolean;
  setNewConnectionStart: (memberId: string, relationId: string) => void;
  setNewConnectionEnd: (memberId: string) => void;
  dispatch: (id: string, eventType: DOMEvent, event?: MouseEvent) => void;
}
export const ActionContext = createContext<Context>({
  newConnection: {
    id: "0",
    relationId: "0",
    startMemberId: "0",
    endMemberId: "0",
  },
  newConnectionExists: true,
  setNewConnectionStart: () => {},
  setNewConnectionEnd: () => {},
  dispatch: () => {},
});
interface Props {
  children: ReactNode;
}
export const ActionContextProvider = ({ children }: Props) => {
  const dispatch = (id: string, eventType: DOMEvent, event?: MouseEvent) => {
    listen(id, eventType, event);
  };
  const listen = (id: string, eventType: DOMEvent, event?: MouseEvent) => {
    if (id === "canvas" && eventType === "onMouseUp") {
      endRelating();
    }
  };
  const toolContext = useContext(ToolContext);
  const dataContext = useContext(DataContext);
  const newConnection = useRef({
    id: "0",
    relationId: "0",
    name: "name",
    startMemberId: "0",
    endMemberId: "0",
  });
  const [newConnectionExists, setNewConnectionExists] = useState(false);

  const setNewConnectionStart = (memberId: string, relationId: string) => {
    newConnection.current.startMemberId = memberId;
    newConnection.current.relationId = relationId;
    setNewConnectionExists(true);
  };
  const setNewConnectionEnd = (memberId: string) => {
    if (newConnectionExists) {
      newConnection.current.endMemberId = memberId;
      dataContext.addConnection(
        newConnection.current.relationId,
        "name",
        newConnection.current.startMemberId,
        newConnection.current.endMemberId
      );
      setNewConnectionExists(false);
      //canvasのクリックでresetToolされてしまうため
      toolContext.setRelationTool(newConnection.current.relationId);
    }
  };
  const endRelating = (id?: string) => {
    setNewConnectionExists(false);
  };
  return (
    <ActionContext.Provider
      value={{
        newConnection: newConnection.current,
        newConnectionExists,
        setNewConnectionStart,
        setNewConnectionEnd,
        dispatch,
      }}
    >
      {children}
    </ActionContext.Provider>
  );
};
