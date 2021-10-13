import React, { useContext } from "react";
import { toast } from "react-toastify";
import { getFigmaData, getFigmaFiles } from "../services/figmaApi";
import JsonComparerContext from "../context/Context";
import "../style/projectsSelect.css";
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
    try {
      setLoading(true);
      const projects = await getFigmaData(team, token);
      setProjects(projects);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message, { autoClose: 4000 });
    }
  };

  const setContextProject = async (projectId) => {
    try {
      setProject(projectId);
      setLoading(true);
      const files = await getFigmaFiles(projectId, token);
      setFiles(files);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message, { autoClose: 4000 });
    }
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
      <div className="input__container__button-projects">
        <button
          className={`input__button-projects ${
            projects.length ? "showNone" : ""
          }`}
          onClick={getProjects}
        >
          Get My Team Projects
        </button>
      </div>
      <div
        className={`input__container__select-projects ${
          projects.length ? "" : "showNone"
        }`}
      >
        <label
          className="input__container__select-label"
          htmlFor="selectProject"
        >
          Select a project
        </label>
        <select
          id="selectProject"
          className="input__select-projects"
          onChange={({ target: { value } }) => setContextProject(value)}
        >
          <option value="">Select One</option>
          {renderOptions()}
        </select>
      </div>
    </>
  );
};

export default ProjectsSelect;
