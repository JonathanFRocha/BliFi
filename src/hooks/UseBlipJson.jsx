import { useContext } from "react";
import CONSTATANTS from "../constants/constants";
import JsonComparerContext from "../context/Context";

const UseBlipJson = () => {
  const { setBlipElements, botKey } = useContext(JsonComparerContext);
  const ignoreBold = true;
  const transformBoldChar = ignoreBold ? "" : "*";
  const boldRegex = ignoreBold ? /(<b>|<\/b>|\*)/gm : /(<b>|<\/b>)/gm;
  const removeUnusedCharsRegex = /(\n|\r|• ?)/gm;
  const blipTypes = [
    "text/plain",
    "application/vnd.lime.select+json",
    "application/vnd.lime.media-link+json",
    "application/vnd.lime.document-select+json",
  ];

  const formatString = (strings) => {
    return strings.map((string) =>
      string
        .replace(boldRegex, transformBoldChar)
        .replace(removeUnusedCharsRegex, "")
        .trim()
        .split(" ")
        .filter((str) => str !== "")
        .join(" ")
    );
  };

  const getTextFromCarroussel = (listOfItems) => {
    const texts = [];
    listOfItems.forEach((item) => {
      const contents = item.header.value;
      if (contents.title) texts.push(contents.title);
      if (contents.text) texts.push(contents.text);
    });
    return texts;
  };

  const getTextFromDoc = (doc, type) => {
    const listText = [];
    switch (type) {
      case blipTypes[0]:
        listText.push(doc.content);
        break;
      case blipTypes[1]:
        listText.push(doc.content.text);
        doc.content.options.forEach((opt) => listText.push(opt.text));
        break;
      case blipTypes[2]:
        if (doc.content.title) {
          listText.push(doc.content.title);
        }
        if (doc.content.text) {
          listText.push(doc.content.text);
        }
        break;
      case blipTypes[3]:
        const texts = getTextFromCarroussel(doc.content.items);
        listText.push(...texts);
        break;
      default:
        break;
    }
    return listText;
  };

  const findTextContent = (block) => {
    const blipMessages = [];
    const contents = block["$contentActions"];
    contents.forEach((content) => {
      const action = content.action;
      const hasRightType = action
        ? blipTypes.includes(
            content.action["$cardContent"].document.content.itemType
          ) || blipTypes.includes(content.action["$cardContent"].document.type)
        : false;
      const isText = action && hasRightType;
      if (isText) {
        const type =
          content.action["$cardContent"].document.content.itemType ||
          content.action["$cardContent"].document.type;
        const foundTexts = getTextFromDoc(
          action["$cardContent"].document,
          type
        );

        blipMessages.push(...formatString(foundTexts));
      }
    });
    return blipMessages;
  };

  const getAllIdsFromBots = (jsonBot) => {
    const idRe = /[a-z]{1,2}(.\d){2,}/i;
    const keys = Object.keys(jsonBot);

    const textContents = [];
    keys.forEach((key) => {
      const block = jsonBot[key];
      const foundTextContent = findTextContent(block);
      if (foundTextContent) textContents.push(...foundTextContent);
    });
    const ids = [];
    keys.forEach((key) => {
      if (idRe.test(jsonBot[key]["$title"])) {
        const foundId = jsonBot[key]["$title"].match(idRe)[0].toUpperCase();
        if (!ids.includes(foundId)) {
          ids.push(foundId);
        }
      }
    });
    return { ids, texts: textContents };
  };

  const getBotJson = async () => {
    const Header = new Headers({
      "Content-Type": "application/json",
      Authorization: `${botKey}`,
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
