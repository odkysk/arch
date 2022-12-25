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
  relationStart: undefined | string;
  relationEnd: undefined | string;
  startRelating: (id: string) => void;
  endRelating: (id?: string) => void;
  dispatch: (id: string, eventType: DOMEvent, event?: MouseEvent) => void;
}
export const ActionContext = createContext<Context>({
  relating: false,
  relationStart: "0",
  relationEnd: "0",
  startRelating: () => {},
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
  const relationStart = useRef<string | undefined>("999");
  const relationEnd = useRef<string | undefined>("999");

  const startRelating = (id: string) => {
    setRelating(true);
    relationStart.current = id;
  };
  const endRelating = (id?: string) => {
    setRelating(false);
    if (
      id !== undefined &&
      relationStart.current !== undefined &&
      relationEnd.current !== undefined
    ) {
      relationEnd.current = id;
      dataContext.addRelation(relationStart.current, relationEnd.current);
    }
  };
  return (
    <ActionContext.Provider
      value={{
        relating,
        relationStart: relationStart.current,
        relationEnd: relationEnd.current,
        startRelating,
        endRelating,
        dispatch,
      }}
    >
      {children}
    </ActionContext.Provider>
  );
};
