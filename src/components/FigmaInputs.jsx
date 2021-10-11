import React, { useContext } from "react";
import CONSTANTS from "../constants/constants";
import JsonComparerContext from "../context/Context";
import "../style/inputs.css";
import DocsSelect from "./DocsSelect";
import FilesSelect from "./FilesSelect";
import InsertWords from "./InsertWords";
import ProjectsSelect from "./ProjectsSelect";

const FigmaInputs = () => {
  const {
    token,
    setToken,
    team,
    setTeam,
    components,
    setComponents,
    excludingWords,
    setExcludingWords,
  } = useContext(JsonComparerContext);

  return (
    <div className="input__card">
      <h2 className="input__title">Figma</h2>
      <div className="input__container">
        <input
          className="page__input"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          id="key"
          name="figmaaccesskey"
          type="text"
          placeholder="."
        />
        <label className="input__label" htmlFor="key">
          Access key
        </label>
      </div>
      <div className="input__container">
        <input
          className="page__input"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          id="file"
          name="figmafile"
          type="text"
          placeholder="."
        />
        <label className="input__label" htmlFor="file">
          Team
        </label>
      </div>
      <ProjectsSelect />
      <FilesSelect />
      <DocsSelect />
      <InsertWords
        value={components}
        setValue={setComponents}
        labelContent={CONSTANTS.FIGMA_INSERT_COMPONENT}
        id={CONSTANTS.ID_COMPONENT}
      />
      <InsertWords
        value={excludingWords}
        setValue={setExcludingWords}
        labelContent={CONSTANTS.FIGMA_EXCLUDE_TEXT}
        id={CONSTANTS.ID_EXCLUDE_TEXT}
      />
    </div>
  );
};

export default FigmaInputs;
