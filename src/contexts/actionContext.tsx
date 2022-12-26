import {
  MouseEvent,
  ReactNode,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";
import { DOMEvent } from "../models/DOMEvent";
import { Relation } from "../models/Data";
import { DataContext } from "./dataContext";

interface Context {
  newRelation: Relation;
  newRelationExists: boolean;
  setNewRelationStart: (id: string) => void;
  setNewRelationEnd: (id: string) => void;
  dispatch: (id: string, eventType: DOMEvent, event?: MouseEvent) => void;
}
export const ActionContext = createContext<Context>({
  newRelation: { id: "0", name: "name", start: "0", end: "0" },
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
    console.log("listen");
    if (id === "canvas" && eventType === "onMouseUp") {
      endRelating();
    }
  };

  const dataContext = useContext(DataContext);
  const newRelation = useRef({ id: "0", name: "name", start: "0", end: "0" });
  const [newRelationExists, setNewRelationExists] = useState(false);

  const setNewRelationStart = (id: string) => {
    newRelation.current.start = id;
    setNewRelationExists(true);
  };
  const setNewRelationEnd = (id: string) => {
    if (newRelationExists) {
      newRelation.current.end = id;
      dataContext.addRelation(
        "name",
        newRelation.current.start,
        newRelation.current.end
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
