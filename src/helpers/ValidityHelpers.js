import { CardFaces, CardSuits } from "../constants/cardValues";
import InvalidCardError from "../domain/error/InvalidCardError";

export const checkCardValidity = (card, shouldHaveOwner) => {
  // const face = card.getFace();
  // const suit = card.getSuit();
  const { face, suit, owner } = card;

  if (!Object.values(CardFaces).includes(face)) {
    throw new InvalidCardError(`Card has an invalid face value, got ${face}`);
  }
  if (!Object.values(CardSuits).includes(suit)) {
    throw new InvalidCardError(`Card has an invalid suit, got ${suit}`);
  }
  if (!!shouldHaveOwner !== !!owner) {
    throw new InvalidCardError(`Card should have an owner but got ${owner}`);
  }
};
