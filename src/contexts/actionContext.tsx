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

interface Context {
  newConnection: Connection;
  newConnectionExists: boolean;
  setNewConnectionStart: (id: string) => void;
  setNewConnectionEnd: (id: string) => void;
  dispatch: (id: string, eventType: DOMEvent, event?: MouseEvent) => void;
}
export const ActionContext = createContext<Context>({
  newConnection: {
    id: "0",
    relationId: "0",
    name: "name",
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

  const dataContext = useContext(DataContext);
  const newConnection = useRef({
    id: "0",
    relationId: "0",
    name: "name",
    startMemberId: "0",
    endMemberId: "0",
  });
  const [newConnectionExists, setNewConnectionExists] = useState(false);

  const setNewConnectionStart = (id: string) => {
    newConnection.current.startMemberId = id;
    setNewConnectionExists(true);
  };
  const setNewConnectionEnd = (id: string) => {
    if (newConnectionExists) {
      newConnection.current.endMemberId = id;
      dataContext.addConnection(
        "0",
        "name",
        newConnection.current.startMemberId,
        newConnection.current.endMemberId
      );
      setNewConnectionExists(false);
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
