import React, { useContext } from "react";
import JsonComparerContext from "../context/Context";

const DocsSelect = () => {
  const { documents, setDocument } = useContext(JsonComparerContext);
  const setContextDoc = (name) => {
    const document = documents.filter((document) => document.name === name)[0];
    setDocument(document);
  };

  const renderOptions = () => {
    return documents.map((doc) => {
      return (
        <option key={doc.id} value={doc.name}>
          {doc.name}
        </option>
      );
    });
  };

  return (
    <div className={documents.length ? "" : "showNone"}>
      <select onChange={({ target: { value } }) => setContextDoc(value)}>
        <option value="">Select One</option>
        {renderOptions()}
      </select>
    </div>
  );
};

export default DocsSelect;
