/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ChangeEvent, ChangeEventHandler, FormEvent, useContext } from "react";
import { DataContext } from "../../contexts/dataContext";
import { ViewContext } from "../../contexts/viewContext";
export const Toolbar = () => {
  const dataContext = useContext(DataContext);
  const { view, setView } = useContext(ViewContext);

  const handleChangeView: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setView(event.target.value);
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
    <div css={toolbar}>
      <button onClick={dataContext.addMember} css={button}>
        add member
      </button>
      <a download="arch.json" href={window.URL.createObjectURL(saveData)}>
        <button css={button}>save</button>
      </a>
      <form onSubmit={handleSubmit}>
        <label>
          <p css={button}>load</p>
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
      <select name="view" id="view" onChange={handleChangeView}>
        {dataContext.data.views.map((view) => (
          <option key={view.id} value={view.id}>
            {view.name}
          </option>
        ))}
      </select>
    </div>
  );
};
const toolbar = css`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  gap: 12px;
  align-items: center; ;
`;
const button = css`
  font-size: 12px;
  background-color: lightgrey;
  border: solid 1px black;
  padding: 6px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-contents: center; ;
`;
