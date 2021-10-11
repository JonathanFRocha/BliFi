import CONSTANTS from "../constants/constants";

const opts = (token) => {
  const Header = new Headers({
    "Content-Type": "application/json",
    "x-figma-token": token,
  });

  // Config do fetch
  const myInit = {
    method: "GET",
    headers: Header,
  };
  return myInit;
};

export const getFigmaData = async (team, token) => {
  const myInit = opts(token);
  const data = await fetch(
    `${CONSTANTS.FIGMA_URL}/teams/${team}/projects`,
    myInit
  );
  const { projects } = await data.json();
  return projects;
};

export const getFigmaFiles = async (project, token) => {
  const myInit = opts(token);
  const test = await fetch(
    `${CONSTANTS.FIGMA_URL}/projects/${project}/files`,
    myInit
  );
  const { files } = await test.json();
  return files;
};

export const getFigmaDocs = async (file, token) => {
  const myInit = opts(token);
  const fetchedFigmaJson = await fetch(
    `${CONSTANTS.FIGMA_URL}/files/${file}`,
    myInit
  );
  const doc = await fetchedFigmaJson.json();
  return doc.document.children;
};
