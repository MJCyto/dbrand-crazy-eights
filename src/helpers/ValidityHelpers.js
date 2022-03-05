import { CardFaces, CardSuits } from "../constants/cardValues";
import InvalidCardError from "../domain/error/InvalidCardError";
import InvalidStateError from "../domain/error/InvalidStateError";
import { Players } from "../constants/gameStates";

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

export const checkIfCardBePlayed = (card, humanHand, robotHand, cardInPlay, whosTurn) => {
  checkCardValidity(card, true); // Avoids bad behavior. Played cards should have a face value, suit and an owner

  if (whosTurn !== card.owner) {
    throw new InvalidStateError("It isn't your turn!");
  }

  if (!card.checkIfPlayable(cardInPlay)) {
    throw new InvalidStateError(
      `${card.face} of ${card.suit} cannot be played on a ${cardInPlay.face} of ${cardInPlay.suit}`
    );
  }

  const handInQuestion = card.owner === Players.HUMAN ? humanHand : robotHand;

  const foundCard = handInQuestion.find(
    handCard => JSON.stringify(handCard) === JSON.stringify(card)
  );

  if (!foundCard) {
    throw new InvalidStateError(
      `Tried playing the ${card.face} of ${card.suit} but that isn't in your hand.`
    );
  }
};
