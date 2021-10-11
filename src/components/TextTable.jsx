import React, { useContext } from "react";
import JsonComparerContext from "../context/Context";
import "../style/table.css";
const TextTable = ({ visualization }) => {
  const { comparison } = useContext(JsonComparerContext);
  //differs equals
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

  const colorizeDifferentChars = (blip, figma) => {
    if (blip === "-") return "-";

    if (figma === "-") return blip;
    return blip.split("").map((char, index) => {
      if (char !== figma[index]) {
        return (
          <span key={index} className="table__texts__wrong__char">
            {char}
          </span>
        );
      }
      return <span key={index}>{char}</span>;
    });
  };

  const renderFigmaTexts = () => {
    let elements = [...comparison.texts];
    if (visualization !== "all") {
      elements = filterElements(elements);
    }
    const tableElements = elements.map(({ blip, figma, isEqual }, index) => {
      const success = "table__elements__success__border";
      const fail = "table__elements__fail__border";
      return (
        <div className="table__texts__element__container" key={index}>
          <p className={isEqual ? success : fail}>{figma}</p>
          <p className={isEqual ? success : fail}>
            {colorizeDifferentChars(blip, figma)}
          </p>
        </div>
      );
    });
    return tableElements;
  };

  return (
    <div className="modal__table">
      <h2 className="table__texts__title">Texts</h2>
      <div className="table__texts__container">
        <div className="table__texts__subtitle__container">
          <h3>Figma</h3>
          <h3>Blip</h3>
        </div>
        <div>{renderFigmaTexts()}</div>
      </div>
    </div>
  );
};

export default TextTable;
