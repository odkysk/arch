import { useContext } from "react";
import { DataContext } from "../../../contexts/dataContext";
import { PreviewContext } from "../../../contexts/previewContext";
import { Member } from "../../Member";

export const Members = () => {
  const dataContext = useContext(DataContext);
  const previewContext = useContext(PreviewContext);
  const members = dataContext.data.members.map((member) => {
    return (
      <Member
        key={member.id}
        id={member.id}
        setRelationPreviewStart={(position) => {
          previewContext.setRelationStart(position);
        }}
        setRelationPreviewEnd={(position) => {
          previewContext.setRelationEnd(position);
        }}
      />
    );
  });
  return <>{members}</>;
};
