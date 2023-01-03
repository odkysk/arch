/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { DataContext } from "../../../contexts/dataContext";
import { colors } from "../../../styles/colors";
import { box, rounded } from "../../../styles/css";
import { EditableText } from "../../atoms/EditableText";
export const TopPanel = () => {
  const dataContext = useContext(DataContext);
  const [fileName, setFileName] = useState("file name");
  const handleChangeFileNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
  };
  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const file = event.target.files?.[0];
    reader.readAsText(file as File);
    reader.onload = () => {
      const json = JSON.parse(reader.result as string);
      dataContext.loadData(json);
    };
    //同じファイルだとonChangeが発火しないので空にする
    event.target.value = "";
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  const saveData = new Blob([JSON.stringify(dataContext.data)], {
    type: "text/json",
  });
  return (
    <div css={[navigation, box]}>
      <div
        css={css`
          width: 120px;
        `}
      >
        <EditableText
          value={fileName}
          color="red"
          onChange={handleChangeFileNameInput}
        />
      </div>
      <a
        download={`${fileName}.json`}
        href={window.URL.createObjectURL(saveData)}
        css={css`
          text-decoration: none !important;
        `}
      >
        <button css={button}>save</button>
      </a>
      <form onSubmit={handleSubmit}>
        <label>
          <p css={[button]}>load</p>
          <input
            type="file"
            id="file"
            accept=".json"
            onChange={handleUpload}
            css={css`
              display: none;
            `}
          />
        </label>
      </form>
    </div>
  );
};
const navigation = css`
  display: flex;
  gap: 12px;
  padding: 0 8px;
  align-items: center;
  background-color: ${colors.system.greyBackground};
  border-bottom: solid 1.5px ${colors.system.greyBorder};
  height: 100%;
  ${box}
`;
const button = css`
  font-size: 12px;
  background-color: ${colors.system.greyBackground};
  border: solid 1px ${colors.system.greyBorder};
  text-decoration: none;
  padding: 6px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${rounded}
`;
