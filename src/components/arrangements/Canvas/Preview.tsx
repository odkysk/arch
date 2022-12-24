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
              ? dataContext.findMember(actionContext.relationStart).position
              : { x: 0, y: 0 }
          }
          end={cursorPosition}
        />
      )}
    </>
  );
};
