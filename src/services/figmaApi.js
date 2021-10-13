import CONSTANTS from "../constants/constants";

const checkIfDataIsValid = (data) => {
  if (data.status === 403) throw new Error("Invalid Figma Access Token!");
  if (data.status === 400) throw new Error("Invalid Team!");
  if (data.status !== 200) throw new Error("Something went wrong!");
};

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

  checkIfDataIsValid(data);

  const { projects } = await data.json();
  return projects;
};

export const getFigmaFiles = async (project, token) => {
  const myInit = opts(token);
  const data = await fetch(
    `${CONSTANTS.FIGMA_URL}/projects/${project}/files`,
    myInit
  );

  checkIfDataIsValid(data);

  const { files } = await data.json();
  return files;
};

export const getFigmaDocs = async (file, token) => {
  const myInit = opts(token);
  const data = await fetch(`${CONSTANTS.FIGMA_URL}/files/${file}`, myInit);

  checkIfDataIsValid(data);

  const doc = await data.json();
  return doc.document.children;
};
