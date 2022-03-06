import { CardFaces, CardSuits } from "../constants/cardValues";
import InvalidCardError from "../domain/error/InvalidCardError";
import InvalidStateError from "../domain/error/InvalidStateError";
import { Players } from "../constants/gameStates";
import { checkIfCardIsPlayable } from "./gamePlayHelpers";
import { cloneDeep } from "lodash";

export const checkCardValidity = (card, shouldHaveOwner) => {
  // const face = card.getFace();
  // const suit = card.getSuit();
  const { face, suit, owner } = card;

  if (!Object.values(CardFaces).includes(face)) {
    throw new InvalidCardError(`Card has an invalid face value, got ${face}`);
  }
  if (!Object.values(CardSuits).includes(suit)) {
    console.log(Object.values(CardSuits));
    throw new InvalidCardError(`Card has an invalid suit, got ${suit}`);
  }
  if (!!shouldHaveOwner !== !!owner) {
    throw new InvalidCardError(`Card should have an owner but got ${owner}`);
  }
};

export const validateCardPlayability = (card, humanHand, robotHand, cardInPlay, whosTurn) => {
  checkCardValidity(card, true); // Avoids bad behavior. Played cards should have a face value, suit and an owner

  const referenceCard = cloneDeep(card);
  referenceCard.suit = referenceCard.originalSuit || referenceCard.suit;
  if (whosTurn !== referenceCard.owner) {
    throw new InvalidStateError("It isn't your turn!");
  }

  if (!checkIfCardIsPlayable(referenceCard, cardInPlay)) {
    throw new InvalidStateError(
      `${referenceCard.face} of ${referenceCard.suit} cannot be played on a ${referenceCard.face} of ${referenceCard.suit}`
    );
  }

  const handInQuestion = card.owner === Players.HUMAN ? humanHand : robotHand;

  const foundCard = handInQuestion.find(
    handCard => handCard.face === referenceCard.face && handCard.suit === referenceCard.suit
  );

  if (!foundCard) {
    throw new InvalidStateError(
      `Tried playing the ${referenceCard.face} of ${referenceCard.suit} but that isn't in your hand.`
    );
  }
};
