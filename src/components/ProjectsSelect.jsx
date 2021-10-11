import React, { useContext } from "react";
import { getFigmaData, getFigmaFiles } from "../services/figmaApi";
import JsonComparerContext from "../context/Context";

const ProjectsSelect = () => {
  const {
    setProjects,
    projects,
    setProject,
    team,
    token,
    setFiles,
    setLoading,
  } = useContext(JsonComparerContext);

  const getProjects = async () => {
    setLoading(true);
    const projects = await getFigmaData(team, token);
    setProjects(projects);
    setLoading(false);
  };

  const setContextProject = async (projectId) => {
    setProject(projectId);
    setLoading(true);
    const files = await getFigmaFiles(projectId, token);
    setFiles(files);
    setLoading(false);
  };

  const renderOptions = () => {
    return projects.map(({ id, name }) => {
      return (
        <option key={id} value={id}>
          {name}
        </option>
      );
    });
  };

  return (
    <>
      <div>
        <button
          className={projects.length ? "showNone" : ""}
          onClick={getProjects}
        >
          Get Data
        </button>
      </div>
      <div className={projects.length ? "" : "showNone"}>
        <select onChange={({ target: { value } }) => setContextProject(value)}>
          <option value="">Select One</option>
          {renderOptions()}
        </select>
      </div>
    </>
  );
};

export default ProjectsSelect;
