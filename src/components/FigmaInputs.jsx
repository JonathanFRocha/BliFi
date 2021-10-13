import React, { useContext } from "react";
import CONSTANTS from "../constants/constants";
import JsonComparerContext from "../context/Context";
import "../style/inputs.css";
import figmaLogo from "../assets/figmalogo.png";
import DocsSelect from "./DocsSelect";
import FilesSelect from "./FilesSelect";
import InsertWords from "./InsertWords";
import ProjectsSelect from "./ProjectsSelect";
import ReactTooltip from "react-tooltip";

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
      <div className="input__card__title__container">
        <h2 className="input__title">Figma</h2>
        <img className="input__image" src={figmaLogo} alt="figma logo" />
      </div>
      <div className="input__first__container">
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
          <label
            data-tip={CONSTANTS.TOKEN_FIGMA_INFO}
            className="input__label"
            htmlFor="key"
          >
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
          <label
            data-tip={CONSTANTS.TEAM_FIGMA_INFO}
            className="input__label"
            htmlFor="file"
          >
            Team
          </label>
        </div>
      </div>
      <ProjectsSelect />
      <div className="input__container__files_docs">
        <FilesSelect />
        <DocsSelect />
      </div>
      <InsertWords
        value={components}
        setValue={setComponents}
        labelContent={CONSTANTS.FIGMA_INSERT_COMPONENT}
        id={CONSTANTS.ID_COMPONENT}
        info={CONSTANTS.COMPONENTS_FIGMA_INFO}
      />
      <InsertWords
        value={excludingWords}
        setValue={setExcludingWords}
        labelContent={CONSTANTS.FIGMA_EXCLUDE_TEXT}
        id={CONSTANTS.ID_EXCLUDE_TEXT}
        info={CONSTANTS.EXCLUDE_TEXT_FIGMA_INFO}
      />
      <ReactTooltip multiline={true} backgroundColor={"#3f7de8"} />
    </div>
  );
};

export default FigmaInputs;
