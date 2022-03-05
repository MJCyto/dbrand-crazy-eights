import { reverse } from "lodash";
import { CardFaces, SkipCards } from "../constants/cardValues";

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

export const isCardASkip = card => {
  return SkipCards.includes(card.face);
};

export const checkIfCardIsPlayable = (card, cardInPlay) => {
  const thisFace = card.face;
  const thisSuit = card.suit;
  return thisFace === CardFaces[8] || thisSuit === cardInPlay.suit || thisFace === cardInPlay.face;
};
