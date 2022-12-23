import React, { createContext, useState } from "react";
import { Position } from "../models/Position";

export const PreviewContext = createContext({
  relationPreviewStart: { x: 0, y: 0 },
  relationPreviewEnd: { x: 0, y: 0 },
  setRelationStart: (position: Position) => {},
  setRelationEnd: (position: Position) => {},
});

interface PreviewContextProviderProps {
  children: React.ReactNode;
}
export const PreviewContextProvider = ({
  children,
}: PreviewContextProviderProps) => {
  const [relationPreviewStart, setRelationStartState] = useState({
    x: 0,
    y: 0,
  });
  const [relationPreviewEnd, setRelationEndState] = useState({
    x: 30,
    y: 30,
  });
  const setRelationStart = (position: Position) => {
    setRelationStartState(position);
  };
  const setRelationEnd = (position: Position) => {
    setRelationEndState(position);
  };
  return (
    <PreviewContext.Provider
      value={{
        relationPreviewStart,
        relationPreviewEnd,
        setRelationStart,
        setRelationEnd,
      }}
    >
      {children}
    </PreviewContext.Provider>
  );
};
