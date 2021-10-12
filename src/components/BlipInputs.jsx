import React, { useContext } from "react";
import JsonComparerContext from "../context/Context";
import "../style/blipInputs.css";
import blipLogo from "../assets/bliplogo.png";
const BlipInputs = () => {
  const { botKey, setBotKey, document } = useContext(JsonComparerContext);
  return (
    <div className={`input__card-blip ${document ? "" : "showNone"}`}>
      <div className="input__card__title__container">
        <h2 className="input__title">Blip</h2>
        <img className="input__image__blip" src={blipLogo} alt="figma logo" />
      </div>
      <div className="input__container">
        <input
          className="page__input-full"
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
