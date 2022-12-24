import { ReactNode, createContext, useContext, useRef, useState } from "react";
import { DataContext } from "./dataContext";

interface Context {
  relating: boolean;
  startRelating: (id: string) => void;
  relationStart: undefined | string;
  endRelating: (id: string) => void;
}
export const ActionContext = createContext<Context>({
  relating: false,
  startRelating: () => {},
  relationStart: "0",
  endRelating: () => {},
});
interface Props {
  children: ReactNode;
}
export const ActionContextProvider = ({ children }: Props) => {
  const dataContext = useContext(DataContext);
  const [relating, setRelating] = useState(false);
  // const [relationStart, setRelationStart] = useState<undefined | string>();
  const relationStart = useRef<string>("0");
  const relationEnd = useRef<string>("0");
  console.log(`render actionContext ${relationStart}, ${relationEnd}`);

  const startRelating = (id: string) => {
    setRelating(true);
    // setRelationStart(id);
    relationStart.current = id;
  };
  const endRelating = (id: string) => {
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
      }}
    >
      {children}
    </ActionContext.Provider>
  );
};
