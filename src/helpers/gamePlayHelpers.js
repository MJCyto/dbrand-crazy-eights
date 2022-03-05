import { reverse } from "lodash";

export const getSubsequentCardsOnTop = (pile, faceToLookFor) => {
  let subsequentCards = 0;
  // Using a find since it'll stop
  reverse(pile).find(pileCard => {
    const matches = pileCard.face === faceToLookFor;
    if (matches) {
      subsequentCards++;
    }
    return !matches;
  });

  return subsequentCards;
};

const checkIfCardPlayable = (cardToPick, cardInPlay) => {};
