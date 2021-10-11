const removeEmptyCharAndSort = (string) => {
  const treatedphrase = string.replace(/ /g, "");
  const sortedPhrase = treatedphrase.split("").sort().join("");
  return sortedPhrase;
};

const compareStringToArrayOfStrings = (string, arrOfString) => {
  return arrOfString.map((phr, i) => {
    const biggestPhrase = phr.length > string.length ? phr : string;
    const lesserPhrase = phr.length > string.length ? string : phr;
    const splittedLesserPhrase = lesserPhrase.split("");
    const diffs = biggestPhrase.split("").filter((letter) => {
      const foundIndex = splittedLesserPhrase.findIndex(
        (searchedLetter) => searchedLetter === letter
      );
      if (foundIndex === -1) {
        return letter;
      } else {
        splittedLesserPhrase.splice(foundIndex, 1);
        return false;
      }
    });
    return {
      phrase: phr,
      diffs: diffs.length,
      index: i,
    };
  });
};

const findPhraseInArr = (string, arrPhrase) => {
  return arrPhrase.filter((phrase) => {
    const treatedPhrase = removeEmptyCharAndSort(phrase);
    if (treatedPhrase === string) return true;
    return false;
  });
};

const findMostEqualWord = (phrase, arrPhrase) => {
  const sortedPhrase = removeEmptyCharAndSort(phrase);

  const sortedPhraseTreatedphraseArr = arrPhrase.map((phr) => {
    return removeEmptyCharAndSort(phr);
  });

  const arrWithDiffs = compareStringToArrayOfStrings(
    sortedPhrase,
    sortedPhraseTreatedphraseArr
  );

  const sortedDifferentLetters = arrWithDiffs.sort((a, b) => a.diffs - b.diffs);
  const mostEqualPhrase = sortedDifferentLetters[0];
  const mostEqualStringPercentual =
    100 - 100 * (mostEqualPhrase.diffs / phrase.length);

  if (mostEqualStringPercentual > 95) {
    return {
      element: findPhraseInArr(mostEqualPhrase.phrase, arrPhrase),
      index: mostEqualPhrase.index,
    };
  } else {
    return false;
  }
};

export default findMostEqualWord;
