import React, { useContext, useState } from "react";
import JsonComparerContext from "../context/Context";
import "../style/jsonTable.css";
import Modal from "./Modal";

const JsonTable = () => {
  const { comparison } = useContext(JsonComparerContext);
  const [selectedTable, setSelectedTable] = useState();

  if (!comparison) return <div></div>;

  return (
    <>
      <div className="types__container">
        <button
          name="all"
          onClick={({ target: { name } }) => setSelectedTable(name)}
          className="types__button"
        >
          All
        </button>
        <button
          name="ids"
          onClick={({ target: { name } }) => setSelectedTable(name)}
          className="types__button"
        >
          Ids
        </button>
        <button
          name="texts"
          onClick={({ target: { name } }) => setSelectedTable(name)}
          className="types__button"
        >
          Texts
        </button>
      </div>
      {selectedTable ? (
        <Modal setTable={setSelectedTable} selectedTable={selectedTable} />
      ) : (
        ""
      )}
    </>
  );
};

export default JsonTable;
