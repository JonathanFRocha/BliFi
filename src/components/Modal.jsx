import React, { useState } from "react";
import closeIcon from "../assets/close_icon.svg";
import "../style/modal.css";
import TextTable from "./TextTable";
import IdTable from "./IdTable";
const Modal = ({ setTable, selectedTable }) => {
  const [visualization, setVisualization] = useState("all");

  const closeModal = (e) => {
    if (e.target.className === "comparer__modal") setTable(undefined);
  };

  const showTables = () => {
    const tableIds = <IdTable visualization={visualization} />;
    const tableTexts = <TextTable visualization={visualization} />;
    if (selectedTable === "all") {
      return (
        <>
          {tableIds}
          {tableTexts}
        </>
      );
    }
    if (selectedTable === "ids") {
      return tableIds;
    }
    if (selectedTable === "texts") {
      return tableTexts;
    }
    console.error("table not found");
  };

  return (
    <div onClick={closeModal} className="comparer__modal">
      <div className="comparer__modal__card">
        <div className="modal__types__container">
          <button
            name="all"
            onClick={({ target: { name } }) => setTable(name)}
            className="modal__types__button"
          >
            All
          </button>
          <button
            name="ids"
            onClick={({ target: { name } }) => setTable(name)}
            className="modal__types__button"
          >
            Ids
          </button>
          <button
            name="texts"
            onClick={({ target: { name } }) => setTable(name)}
            className="modal__types__button"
          >
            Texts
          </button>
        </div>
        <button
          className="comparer__modal__close"
          onClick={(e) => setTable(undefined)}
        >
          <img src={closeIcon} alt="close modal" />
        </button>
        <div className="modal__searchType__container">
          <label> choose a visualization option</label>
          <div className="modal__searchType__inputs">
            <div>
              All
              <input
                type="radio"
                className="modal__searchType__radio"
                value="all"
                defaultChecked
                onChange={({ target: { value } }) => setVisualization(value)}
                name="searchType"
              />
            </div>
            <div>
              Differs
              <input
                type="radio"
                className="modal__searchType__radio"
                value="differs"
                onChange={({ target: { value } }) => setVisualization(value)}
                name="searchType"
              />
            </div>
            <div>
              Equals
              <input
                type="radio"
                className="modal__searchType__radio"
                value="equals"
                onChange={({ target: { value } }) => setVisualization(value)}
                name="searchType"
              />
            </div>
          </div>
        </div>
        {showTables()}
      </div>
    </div>
  );
};

export default Modal;
