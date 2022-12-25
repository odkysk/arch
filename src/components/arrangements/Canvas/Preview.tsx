import { useContext } from "react";
import { ActionContext } from "../../../contexts/actionContext";
import { DataContext } from "../../../contexts/dataContext";
import { useCursorPosition } from "../../../hooks/useCursorPosition";
import { Relation } from "../../Relation";
export const Preview = () => {
  const dataContext = useContext(DataContext);
  const cursorPosition = useCursorPosition();
  const actionContext = useContext(ActionContext);
  return (
    <>
      {actionContext.relating && (
        <Relation
          start={
            actionContext.relationStart !== undefined
              ? {
                  x:
                    dataContext.findMember(actionContext.relationStart).position
                      .x + 60,
                  y:
                    dataContext.findMember(actionContext.relationStart).position
                      .y + 60,
                }
              : { x: 0, y: 0 }
          }
          end={cursorPosition}
          preview
        />
      )}
    </>
  );
};
