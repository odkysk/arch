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
      {actionContext.newRelationExists && (
        <Relation
          start={{
            x:
              dataContext.findMember(actionContext.newRelation.start).position
                .x + 60,
            y:
              dataContext.findMember(actionContext.newRelation.start).position
                .y + 60,
          }}
          end={cursorPosition}
          preview
        />
      )}
    </>
  );
};
