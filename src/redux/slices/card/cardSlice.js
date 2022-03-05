import { createSlice } from "@reduxjs/toolkit";
import { CardFaces, CardSuits } from "../../../constants/cardValues";
import Card from "../../../domain/Card";
import { cloneDeep, shuffle } from "lodash";
import InvalidInputError from "../../../domain/error/InvalidInputError";
import InvalidStateError from "../../../domain/error/InvalidStateError";
import { Players } from "../../../constants/gameStates";
import { checkCardValidity } from "../../../helpers/ValidityHelpers";

const initialState = Object.freeze({
  humanHand: [],
  robotHand: [],
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

      state.humanHand = allCards.splice(0, numCards).map(card => {
        card.owner = Players.HUMAN;
        return card;
      });
      state.robotHand = allCards.splice(0, numCards).map(card => {
        card.owner = Players.ROBOT;
        return card;
      });
      state.playedCards = [allCards.pop()];
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
    pushCard: (state, action) => {
      checkCardValidity(action.payload, false);
      state.playedCards.push(action.payload);
    },
    makeEnemyPickUp: (state, action) => {
      if (isNaN(action.payload)) {
        throw new InvalidStateError(
          `Value for cards to pick needs to be a number, got ${action.payload}`
        );
      }
      if (state.deckCards.length === 0) {
        throw new InvalidStateError("There aren't any cards to pick up.");
      }

      const playerPickingUp = state.whosTurn === Players.HUMAN ? Players.ROBOT : Players.HUMAN;

      const getCardsToGive = () => {
        let cardsToGive = [];
        if (state.deckCards.length <= action.payload) {
          cardsToGive = cloneDeep(state.deckCards);
          state.deckCards = [];
        } else {
          cardsToGive = state.deckCards.splice(
            state.playedCards.length - (action.payload + 1),
            action.payload
          );
        }
        cardsToGive.forEach(card => (card.owner = playerPickingUp));
        return cardsToGive;
      };
      switch (state.whosTurn) {
        case Players.HUMAN: {
          state.humanHand = [...state.humanHand, ...getCardsToGive()];
          break;
        }
        case Players.ROBOT: {
          state.robotHand = [...state.robotHand, ...getCardsToGive()];
        }
      }
    },
  },
  extraReducers: builder => {},
});

export const { initGame, pushCard, replenishPile, makeEnemyPickUp } = cardSlice.actions;

export default cardSlice.reducer;
