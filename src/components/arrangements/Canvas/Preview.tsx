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
            start: "0",
            end: "0",
          }}
          start={{
            x:
              dataContext.getMemberPosition(
                view,
                actionContext.newRelation.start
              ).x + 60,
            y:
              dataContext.getMemberPosition(
                view,
                actionContext.newRelation.start
              ).y + 60,
          }}
          end={cursorPosition}
          preview
        />
      )}
    </>
  );
};
