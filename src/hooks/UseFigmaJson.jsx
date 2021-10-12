import { useContext } from "react";
import JsonComparerContext from "../context/Context";

const UseFigmaJson = () => {
  const { setFigmaElements, document, components, excludingWords } = useContext(
    JsonComparerContext
  );
  const ignoreBold = true;
  const transformBoldChar = ignoreBold ? "" : "*";
  const boldRegex = ignoreBold ? /(<b>|<\/b>|\*)/gm : /(<b>|<\/b>)/gm;
  const removeUnusedCharsRegex = /(\n|\r|• ?)/gm;

  const componentName = components.length
    ? components
    : ["texto enviado", "message", "enviar minha localiz", "opção 2"];
  const excludeStringList = [
    ...excludingWords,
    "mensagem",
    "input",
    "input inesperado",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "input inicial",
    "input do usuario",
    "input inesperado do usuario",
  ];
  const checkFillsForOpacity = (component) => {
    const fills = component.fills;
    if (!fills || fills.length === 0) return true;
    let isUsed = true;
    fills.forEach((style) => {
      if (style.opacity && style.opacity < 50) isUsed = false;
    });
    return isUsed;
  };

  const formatString = (string) => {
    const formattedStr = string
      .trim()
      .split(" ")
      .filter((str) => str !== "")
      .join(" ");
    return formattedStr;
  };

  const getAllIdsAndTextsFromFigma = (component, ids = [], texts = []) => {
    // REGEX para buscar ids
    const idRe = /^[a-z]{1,2}(.\d){2,}/i;
    const isId = idRe.test(component.characters);
    // ***
    const fillHasOpacity = checkFillsForOpacity(component);
    // Verifica se é componente usado
    const isUsed =
      (!component.opacity || component.opacity > 0.5) && fillHasOpacity;
    // **
    if (component.characters !== undefined && isId && isUsed) {
      const foundId = component.characters.match(idRe)[0].toUpperCase();
      if (!ids.includes(foundId)) {
        ids.push(foundId);
      }
    }

    if (
      componentName.includes(formatString(component.name).toLowerCase()) &&
      !excludeStringList.includes(
        formatString(component.characters).toLowerCase()
      ) &&
      isUsed
    ) {
      // Recupera os textos dos componentes que tem como nom o "texto enviado" no JSON
      const treatedComponentCharacters = formatString(component.characters);

      const boldFormatedTex = treatedComponentCharacters.replace(
        boldRegex,
        transformBoldChar
      );
      const treatedText = boldFormatedTex.replace(removeUnusedCharsRegex, "");
      texts.push(treatedText);
    }
    // se não existir mais childrens, retorna
    if (!component.children) return;

    if (isUsed) {
      component.children.forEach((comp) => {
        return getAllIdsAndTextsFromFigma(comp, ids, texts);
      });
    }
    return { ids, texts };
  };
  const getFigmaJson = async () => {
    const figmaFoundElements = getAllIdsAndTextsFromFigma(document);
    setFigmaElements(figmaFoundElements);
  };

  return {
    getFigmaJson,
  };
};

export default UseFigmaJson;
