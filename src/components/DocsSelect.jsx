import React, { useContext, useEffect } from "react";
import JsonComparerContext from "../context/Context";
import "../style/fileDoc.css";

const DocsSelect = () => {
  const { documents, setDocuments, setDocument, project } = useContext(
    JsonComparerContext
  );

  useEffect(() => {
    setDocument();
    setDocuments([]);
  }, [project, setDocuments, setDocument]);

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
    <div
      className={`input__select__container ${
        documents.length ? "" : "showNone"
      }`}
    >
      <div>
        <label className="input__select-label" htmlFor="selectProject">
          Select a document
        </label>
        <select
          className="input__select"
          onChange={({ target: { value } }) => setContextDoc(value)}
        >
          <option value="">Select One</option>
          {renderOptions()}
        </select>
      </div>
    </div>
  );
};

export default DocsSelect;
