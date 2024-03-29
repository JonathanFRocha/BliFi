import React, { useContext } from "react";
import JsonComparerContext from "../context/Context";

import "../style/insertWords.css";
const InsertWords = ({ value, setValue, labelContent, id, info }) => {
  const { document } = useContext(JsonComparerContext);
  const insertNewComponentName = (event) => {
    if (event.key === "Enter") {
      const {
        target: { value: word },
      } = event;
      const lowerCaseWord = word.toLowerCase();
      setValue([...value, lowerCaseWord]);
      event.target.value = "";
    }
  };

  const removeComponentFromList = (index) => {
    const newComponentList = [...value];
    newComponentList.splice(index, 1);
    setValue(newComponentList);
  };

  const renderComponents = () => {
    return value.map((word, i) => {
      return (
        <div className="words__inserted__container">
          <span className="words__inserted" key={i + word}>
            {word}
          </span>
          <span
            className="words__remove"
            onClick={(e) => removeComponentFromList(i)}
          >
            {" "}
            x
          </span>
        </div>
      );
    });
  };
  return (
    <div className={`input__container ${document ? "" : "showNone"}`}>
      <input
        className="page__input-full"
        onKeyPress={insertNewComponentName}
        id={id}
        name={id}
        type="text"
        placeholder="."
      />
      <label data-tip={info} className="input__label" htmlFor={id}>
        {labelContent}
      </label>
      <div className={value.length ? "words__container" : ""}>
        {renderComponents()}
      </div>
    </div>
  );
};

export default InsertWords;
