import React, { useState } from "react";
import CONSTATANTS from "../constants/constants";
import JsonComparerContext from "./Context";

const JsonComparerProvider = ({ children }) => {
  const [token, setToken] = useState(CONSTATANTS.FIGMA_TOKEN);
  const [team, setTeam] = useState(CONSTATANTS.FIGMA_TEAM);
  const [project, setProject] = useState();
  const [file, setFile] = useState("");
  const [projects, setProjects] = useState([]);
  const [files, setFiles] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [document, setDocument] = useState();
  const [botKey, setBotKey] = useState(CONSTATANTS.BLIP_TOKEN);
  const [blipElements, setBlipElements] = useState({ texts: [], ids: [] });
  const [figmaElements, setFigmaElements] = useState({ texts: [], ids: [] });
  const [comparison, setComparison] = useState();
  const [loading, setLoading] = useState(false);
  const [components, setComponents] = useState([]);
  const [excludingWords, setExcludingWords] = useState([]);

  const objContext = {
    token,
    setToken,
    file,
    setFile,
    botKey,
    setBotKey,
    blipElements,
    setBlipElements,
    figmaElements,
    setFigmaElements,
    setComparison,
    comparison,
    setLoading,
    loading,
    setTeam,
    team,
    setProjects,
    projects,
    setProject,
    project,
    setFiles,
    files,
    documents,
    setDocuments,
    document,
    setDocument,
    components,
    setComponents,
    excludingWords,
    setExcludingWords,
  };
  return (
    <JsonComparerContext.Provider value={objContext}>
      {children}
    </JsonComparerContext.Provider>
  );
};

export default JsonComparerProvider;
