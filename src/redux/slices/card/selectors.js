import { createSelector } from "@reduxjs/toolkit";

/*** Basic selectors ***/
export const selectPile = state => state.card.playedCards;

export const selectDeck = state => state.card.deckCards;

export const selectHumanHand = state => state.card.humanHand;

export const selectRobotHand = state => state.card.robotHand;

/*** Combined selectors ***/
export const selectCardInPlay = createSelector([selectPile], pile => {
  return pile[pile.length - 1];
});
