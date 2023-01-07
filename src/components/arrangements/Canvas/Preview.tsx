import { useContext } from "react";
import { ActionContext } from "../../../contexts/actionContext";
import { DataContext } from "../../../contexts/dataContext";
import { useCursorPosition } from "../../../hooks/useCursorPosition";
import { Connection } from "../../canvas/Connection";

interface Props {
  view: string;
}

export const Preview = ({ view }: Props) => {
  const dataContext = useContext(DataContext);
  const cursorPosition = useCursorPosition();
  const actionContext = useContext(ActionContext);
  return (
    <>
      {actionContext.newConnectionExists && (
        <Connection
          id={"preview"}
          connection={{
            id: "previewConnection",
            relationId: "0",
            name: "preview",
            startMemberId: "0",
            endMemberId: "0",
          }}
          start={{
            x:
              dataContext.getMemberArrangement(
                view,
                actionContext.newConnection.startMemberId
              ).position.x + 60,
            y:
              dataContext.getMemberArrangement(
                view,
                actionContext.newConnection.startMemberId
              ).position.y + 60,
          }}
          end={cursorPosition}
          preview
        />
      )}
    </>
  );
};
