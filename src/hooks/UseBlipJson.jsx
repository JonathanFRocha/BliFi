import { useContext } from "react";
import CONSTATANTS from "../constants/constants";
import JsonComparerContext from "../context/Context";

const UseBlipJson = () => {
  const { setBlipElements, botKey } = useContext(JsonComparerContext);
  const findTextContent = (block) => {
    const contents = block["$contentActions"];
    const blipMessages = contents
      .map((content) => {
        const action = content.action;
        const isText =
          action &&
          content.action["$cardContent"].document.type === "text/plain";
        if (action && isText) {
          const untreatedText = action["$cardContent"].document.content;
          const formattedText = untreatedText.replace(/(• ?)/gm, "");
          const treatedText = formattedText.replace(/(\n|\r)/gm, "");
          return treatedText;
        }
        return undefined;
      })
      .filter((text) => text !== undefined);
    return blipMessages;
  };

  const getAllIdsFromBots = (jsonBot) => {
    const idRe = /^\[[a-zA-Z](.\d){3}\]/;
    const keys = Object.keys(jsonBot);

    const textContents = [];
    keys.forEach((key) => {
      const block = jsonBot[key];
      const foundTextContent = findTextContent(block);
      if (foundTextContent) textContents.push(...foundTextContent);
    });

    const ids = keys
      .map((key) => {
        if (idRe.test(jsonBot[key]["$title"])) {
          return jsonBot[key]["$title"].substr(1, 7);
        }
        return undefined;
      })
      .filter((el) => el !== undefined);
    return { ids, texts: textContents };
  };

  const getBotJson = async () => {
    const Header = new Headers({
      "Content-Type": "application/json",
      Authorization: `Key ${botKey}`,
    });
    const myBody = {
      id: "{{$guid}}",
      method: "get",
      uri: "/buckets/blip_portal:builder_published_flow",
    };
    const myInit = {
      method: "POST",
      headers: Header,
      body: JSON.stringify(myBody),
    };
    const blipFetched = await fetch(CONSTATANTS.BLIP_URL, myInit);
    const fetchedBlipJson = await blipFetched.json();
    if (blipFetched.status !== 200)
      throw new Error(fetchedBlipJson.description);
    const elements = getAllIdsFromBots(fetchedBlipJson.resource);
    setBlipElements(elements);
  };

  return {
    getBotJson,
  };
};

export default UseBlipJson;
