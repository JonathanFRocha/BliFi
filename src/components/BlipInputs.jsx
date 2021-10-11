import React, { useContext } from "react";
import JsonComparerContext from "../context/Context";
import "../style/inputs.css";

const BlipInputs = () => {
  const { botKey, setBotKey, document } = useContext(JsonComparerContext);
  return (
    <div className={`input__card ${document ? "" : "showNone"}`}>
      <h2 className="input__title">Blip</h2>
      <div className="input__container">
        <input
          className="page__input"
          value={botKey}
          onChange={(e) => setBotKey(e.target.value)}
          id="botKey"
          name="botkey"
          type="text"
          placeholder="."
        />
        <label className="input__label" htmlFor="botKey">
          Bot Key
        </label>
      </div>
    </div>
  );
};

export default BlipInputs;
