import { useContext } from "react";
import { ActionContext } from "../../../contexts/actionContext";
import { DataContext } from "../../../contexts/dataContext";
import { useCursorPosition } from "../../../hooks/useCursorPosition";
import { Relation } from "../../Relation";

interface Props {
  view: string;
}

export const Preview = ({ view }: Props) => {
  const dataContext = useContext(DataContext);
  const cursorPosition = useCursorPosition();
  const actionContext = useContext(ActionContext);
  return (
    <>
      {actionContext.newRelationExists && (
        <Relation
          id={"preview"}
          relation={{
            id: "previewRelation",
            name: "preview",
            startMemberId: "99999999",
            endMemberId: "99999999",
          }}
          start={{
            x:
              dataContext.getMemberArrangement(
                view,
                actionContext.newRelation.startMemberId
              ).position.x + 60,
            y:
              dataContext.getMemberArrangement(
                view,
                actionContext.newRelation.startMemberId
              ).position.y + 60,
          }}
          end={cursorPosition}
          preview
        />
      )}
    </>
  );
};
