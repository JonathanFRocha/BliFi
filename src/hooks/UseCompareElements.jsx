import { useContext, useEffect } from "react";
import JsonComparerContext from "../context/Context";
import findMostEqualWord from "../helper/findApproximatedString";

const UseCompareElements = () => {
  const { blipElements, figmaElements, setComparison } = useContext(
    JsonComparerContext
  );

  useEffect(() => {
    const findBlipEl = (wantedElement, comparedElement) => {
      if (blipElements[comparedElement].length) {
        const { element, index } = findMostEqualWord(
          wantedElement,
          blipElements[comparedElement]
        );

        const savedElement = element;

        if (!element) return "-";

        blipElements[comparedElement].splice(index, 1);
        return savedElement;
      }
      return "";
    };

    const compareElementsFrom = (comparedElement) => {
      const tableElements = figmaElements[comparedElement].map((id) => {
        const [blipEl] = findBlipEl(id, comparedElement);
        const mappedItem = {
          figma: id,
          blip: blipEl,
          isEqual: blipEl === "-" ? false : true,
        };
        return mappedItem;
      });
      blipElements[comparedElement].forEach((restOfElement) => {
        const objectToPush = {
          figma: "-",
          blip: restOfElement,
          isEqual: false,
        };
        tableElements.push(objectToPush);
      });
      return tableElements;
    };
    const mappedIdsElements = compareElementsFrom("ids");
    const mappedTextsElements = compareElementsFrom("texts");
    if (blipElements.ids.length !== 0)
      setComparison({ ids: mappedIdsElements, texts: mappedTextsElements });
  }, [blipElements, figmaElements, setComparison]);
};

export default UseCompareElements;
