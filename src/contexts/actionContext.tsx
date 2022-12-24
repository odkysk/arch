import {
  MouseEvent,
  ReactNode,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";
import { DOMEvent } from "../models/DOMEvent";
import { DataContext } from "./dataContext";

interface Context {
  relating: boolean;
  startRelating: (id: string) => void;
  relationStart: undefined | string;
  endRelating: (id?: string) => void;
  dispatch: (id: string, eventType: DOMEvent, event?: MouseEvent) => void;
}
export const ActionContext = createContext<Context>({
  relating: false,
  startRelating: () => {},
  relationStart: "0",
  endRelating: () => {},
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
  const [relating, setRelating] = useState(false);
  const relationStart = useRef<string>("0");
  const relationEnd = useRef<string>("0");

  const startRelating = (id: string) => {
    setRelating(true);
    relationStart.current = id;
  };
  const endRelating = (id?: string) => {
    setRelating(false);
    if (id !== undefined && relationStart !== undefined) {
      relationEnd.current = id;
      if (relationEnd !== undefined) {
        dataContext.addRelation(relationStart.current, relationEnd.current);
      }
    }
  };
  return (
    <ActionContext.Provider
      value={{
        relating,
        startRelating,
        relationStart: relationStart.current,
        endRelating,
        dispatch,
      }}
    >
      {children}
    </ActionContext.Provider>
  );
};
