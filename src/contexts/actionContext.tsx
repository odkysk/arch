import {
  createContext,
  MouseEvent,
  ReactNode,
  useContext,
  useRef,
  useState,
} from "react";
import { Relation } from "../models/Data";
import { DOMEvent } from "../models/DOMEvent";
import { DataContext } from "./dataContext";

interface Context {
  newRelation: Relation;
  newRelationExists: boolean;
  setNewRelationStart: (id: string) => void;
  setNewRelationEnd: (id: string) => void;
  dispatch: (id: string, eventType: DOMEvent, event?: MouseEvent) => void;
}
export const ActionContext = createContext<Context>({
  newRelation: { id: "0", name: "name", startMemberId: "0", endMemberId: "0" },
  newRelationExists: true,
  setNewRelationStart: () => {},
  setNewRelationEnd: () => {},
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
  const newRelation = useRef({
    id: "0",
    name: "name",
    startMemberId: "0",
    endMemberId: "0",
  });
  const [newRelationExists, setNewRelationExists] = useState(false);

  const setNewRelationStart = (id: string) => {
    newRelation.current.startMemberId = id;
    setNewRelationExists(true);
  };
  const setNewRelationEnd = (id: string) => {
    if (newRelationExists) {
      newRelation.current.endMemberId = id;
      dataContext.addRelation(
        "name",
        newRelation.current.startMemberId,
        newRelation.current.endMemberId
      );
      setNewRelationExists(false);
    }
  };
  const endRelating = (id?: string) => {
    setNewRelationExists(false);
  };
  return (
    <ActionContext.Provider
      value={{
        newRelation: newRelation.current,
        newRelationExists,
        setNewRelationStart,
        setNewRelationEnd,
        dispatch,
      }}
    >
      {children}
    </ActionContext.Provider>
  );
};
