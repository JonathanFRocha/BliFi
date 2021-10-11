import React, { useContext } from "react";
import JsonComparerContext from "../context/Context";
import { getFigmaDocs } from "../services/figmaApi";

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
        <option key={key} value={key}>
          {name}
        </option>
      );
    });
  };

  return (
    <div className={files.length ? "" : "showNone"}>
      <select onChange={({ target: { value } }) => setContextFile(value)}>
        <option value="">Select One</option>
        {renderOptions()}
      </select>
    </div>
  );
};

export default FilesSelect;
