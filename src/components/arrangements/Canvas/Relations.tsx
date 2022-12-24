import { useContext } from "react";
import { DataContext } from "../../../contexts/dataContext";
import { PreviewContext } from "../../../contexts/previewContext";
import { useCursorPosition } from "../../../hooks/useCursorPosition";
import { Relation } from "../../Relation";

export const Relations = () => {
  const dataContext = useContext(DataContext);
  const previewContext = useContext(PreviewContext);
  const cursorPosition = useCursorPosition();
  const relations = dataContext.data.relations.map((relation) => {
    const startMember = dataContext.findMember(relation.start);
    const endMember = dataContext.findMember(relation.end);
    return (
      <Relation
        key={relation.id}
        start={startMember ? startMember.position : { x: 0, y: 0 }}
        end={endMember ? endMember.position : { x: 0, y: 0 }}
      />
    );
  });
  return <>{relations}</>;
};
