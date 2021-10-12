import React, { useContext } from "react";
import JsonComparerContext from "../context/Context";
import { getFigmaDocs } from "../services/figmaApi";
import "../style/fileDoc.css";

const FilesSelect = () => {
  const { files, setFile, token, setDocuments, setLoading } = useContext(
    JsonComparerContext
  );

  const setContextFile = async (fileKey) => {
    setFile(fileKey);
    setLoading(true);
    const docs = await getFigmaDocs(fileKey, token);
    await setDocuments(docs);
    setLoading(false);
  };

  const renderOptions = () => {
    return files.map(({ key, name }) => {
      return (
        <option className="input__select__options" key={key} value={key}>
          {name}
        </option>
      );
    });
  };

  return (
    <div
      className={`input__select__container ${files.length ? "" : "showNone"}`}
    >
      <div>
        <label className="input__select-label" htmlFor="selectProject">
          Select a figma file
        </label>
        <select
          className="input__select"
          onChange={({ target: { value } }) => setContextFile(value)}
        >
          <option className="input__select__options" value="">
            Select One
          </option>
          {renderOptions()}
        </select>
      </div>
    </div>
  );
};

export default FilesSelect;
