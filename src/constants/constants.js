const CONSTANTS = {
  BLIP_TOKEN: process.env.REACT_APP_BLIP_TOKEN || "",
  BLIP_URL: process.env.REACT_APP_BLIP_URL,
  FIGMA_TOKEN: process.env.REACT_APP_FIGMA_TOKEN || "",
  FIGMA_TEAM: process.env.REACT_APP_FIGMA_TEAM || "",
  FIGMA_URL: process.env.REACT_APP_FIGMA_URL,
  ID_COMPONENT: "component",
  ID_EXCLUDE_TEXT: "excludeText",
  FIGMA_INSERT_COMPONENT: "insert figma text component",
  FIGMA_EXCLUDE_TEXT: "exclude figma texts from comparisson",
};

export default CONSTANTS;
