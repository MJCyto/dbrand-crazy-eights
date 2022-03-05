import { createSlice, createAction } from "@reduxjs/toolkit";
import { CardFaces, CardSuits } from "../../constants/cardValues";
import Card from "../../domain/Card";
import { shuffle } from "lodash";
import InvalidInputError from "../../domain/error/InvalidInputError";

const initialState = Object.freeze({
  playerCards: [],
  enemyCards: [],
  deckCards: [],
  playedCards: [],
});

const cardSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    initGame: (state, action) => {
      const numCards = action.payload;

      if (isNaN(numCards)) {
        throw new InvalidInputError("We asked for the NUMBER of cards.");
      }
      let allCards = [];
      // Make all cards given there is a card for every combination of suit X face.
      Object.keys(CardSuits).forEach(suit => {
        Object.values(CardFaces).forEach(face => {
          allCards.push(new Card(face, suit));
        });
      });

      // Randomize the cards before divvying up
      allCards = shuffle(allCards);

      state.playerCards = allCards.splice(0, numCards);
      state.enemyCards = allCards.splice(0, numCards);
      state.deckCards = allCards;
    },
    replenishPile: state => {
      if (state.playedCards <= 1) {
        return;
      }

      let cardsToMove = state.playedCards.splice(0, state.playedCards.length - 1);
      state.deckCards = [...shuffle(cardsToMove), ...state.deckCards];
    },
    // For the enemies moves, since we're using context for the enemy cards
    pushCard: () => {},
  },
  extraReducers: builder => {},
});

export const { initGame, replenishPile } = cardSlice.actions;

export default cardSlice.reducer;
