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
  TOKEN_FIGMA_INFO:
    "Head to your figma account settings, look for personal access tokens and generate a new one.",
  TEAM_FIGMA_INFO:
    "Head to figma website, access a team in the left corner, after that your url will be like /team/'TeamId', use TeamId Here",
  COMPONENTS_FIGMA_INFO:
    "Sometimes your figma wont be using the default components that shows what is a text sent by blip or its menu options, so here you can insert what component we should look for.<br> To find its name, you must click on a text component in your figma file, then you'll find it at the right top corner, at the right side of 'text'",
  EXCLUDE_TEXT_FIGMA_INFO:
    "Sometimes your figma will be using the same component that should show what is a text sent by blip to show a user input or somekind of trackings,<br> so here you can insert words or phrases that we'll ignore",
  TOKEN_BLIP_INFO:
    "Access the blip you want us to compare, go to its configurations, then connection info and copy here its authentication headers using 'key'",
};

export default CONSTANTS;
