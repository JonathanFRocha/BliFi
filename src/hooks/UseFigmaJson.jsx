import { useContext } from "react";
import JsonComparerContext from "../context/Context";

const UseFigmaJson = () => {
  const { setFigmaElements, document, components, excludingWords } = useContext(
    JsonComparerContext
  );

  const componentName = components.length
    ? components
    : ["texto enviado", "message", "Texto enviado", "Message"];
  const excludeStringList = excludingWords.length
    ? excludingWords
    : ["mensagem"];
  const checkFillsForOpacity = (component) => {
    const fills = component.fills;
    if (!fills || fills.length === 0) return true;
    let isUsed = true;
    fills.forEach((style) => {
      if (style.opacity && style.opacity < 50) isUsed = false;
    });
    return isUsed;
  };

  const getAllIdsAndTextsFromFigma = (component, ids = [], texts = []) => {
    // REGEX para buscar ids
    const idRe = /^[a-zA-Z](.\d){3}/;
    const isId = idRe.test(component.characters);
    // ***
    const fillHasOpacity = checkFillsForOpacity(component);
    // Verifica se é componente usado
    const isUsed =
      (!component.opacity || component.opacity > 0.5) && fillHasOpacity;
    // **
    if (component.characters !== undefined && isId && isUsed) {
      ids.push(component.characters.substr(0, 7));
    }
    if (
      componentName.includes(component.name.toLowerCase()) &&
      !excludeStringList.includes(component.characters.toLowerCase()) &&
      isUsed
    ) {
      // Recupera os textos dos componentes que tem como nom o "texto enviado" no JSON
      const untreatedText = component.characters;
      const formattedText = untreatedText.replace(/(•)/gm, "");
      const treatedText = formattedText.replace(/(\n|\r)/gm, "");
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
