import React, { useContext } from "react";
import JsonComparerContext from "../context/Context";
import "../style/table.css";
const IdTable = ({ visualization }) => {
  const { comparison } = useContext(JsonComparerContext);

  const filterElements = (elements) => {
    if (visualization === "differs") {
      return elements.filter((element) => {
        return element.isEqual === false;
      });
    }
    if (visualization === "equals") {
      return elements.filter((element) => {
        return element.isEqual === true;
      });
    }
  };

  const renderFigmaId = () => {
    let elements = [...comparison.ids];
    const ELEMENTS_TABLE = 15;
    if (visualization !== "all") {
      elements = filterElements(elements);
    }

    const elementsAgreggation = [];
    for (let i = 0; i <= elements.length; i += ELEMENTS_TABLE) {
      elementsAgreggation.push(elements.slice(i, i + ELEMENTS_TABLE));
    }

    const tableElements = elementsAgreggation.map((agregg, index) => {
      return (
        <div className="table__container">
          <div className="table__elements__container" key={index}>
            <h3>Figma</h3>
            <h3>Blip</h3>
          </div>
          {agregg.map(({ blip, figma, isEqual }, indexI) => {
            const grayBg = indexI % 2 === 0 ? "table__grayBG" : "";
            const success = "table__elements__success__border";
            const fail = "table__elements__fail__border";
            return (
              <div
                className={`table__elements__container ${grayBg}`}
                key={indexI}
              >
                <p className={isEqual ? success : fail}>{figma}</p>
                <p className={isEqual ? success : fail}>{blip}</p>
              </div>
            );
          })}
        </div>
      );
    });
    return tableElements;
  };

  return (
    <div className="modal__table">
      <h2 className="modal__table__title">IDS</h2>
      <div className="modal__table__container">{renderFigmaId()}</div>
    </div>
  );
};

export default IdTable;
