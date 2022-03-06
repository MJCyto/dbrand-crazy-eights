import { createSlice } from "@reduxjs/toolkit";
import { CardFaces, CardSuits } from "../../../constants/cardValues";
import { cloneDeep, shuffle } from "lodash";
import InvalidInputError from "../../../domain/error/InvalidInputError";
import InvalidStateError from "../../../domain/error/InvalidStateError";
import { Players } from "../../../constants/gameStates";
import { checkCardValidity } from "../../../helpers/ValidityHelpers";
import { initGameState } from "../gameState/gameStateSlice";

export const initGame = numCards => dispatch => {
  if (isNaN(numCards)) {
    throw new InvalidInputError("We asked for the NUMBER of cards.");
  }
  let allCards = [];
  // Make all cards given there is a card for every combination of suit X face.
  Object.values(CardSuits).forEach(suit => {
    Object.values(CardFaces).forEach(face => {
      allCards.push({ face, suit });
    });
  });

  // Randomize the cards before divvying up
  allCards = shuffle(allCards);

  const cardState = {
    humanHand: allCards.splice(0, numCards).map(card => {
      card.owner = Players.HUMAN;
      return card;
    }),
    robotHand: allCards.splice(0, numCards).map(card => {
      card.owner = Players.ROBOT;
      return card;
    }),
    playedCards: [allCards.pop()],
    deckCards: allCards,
  };

  dispatch(initCards(cardState));
  dispatch(initGameState());
};

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
    initCards: (state, action) => {
      const { humanHand, robotHand, deckCards, playedCards } = action.payload;

      state.humanHand = humanHand;
      state.robotHand = robotHand;
      state.deckCards = deckCards;
      state.playedCards = playedCards;
    },
    replenishPile: state => {
      if (state.playedCards <= 1) {
        return;
      }

      let cardsToMove = state.playedCards.splice(0, state.playedCards.length - 1);
      cardsToMove = shuffle(cardsToMove).map(card => {
        // An 8 is in the pile, change it back to its original suit.
        return { suit: card.originalSuit || card.suit, face: card.face };
      });
      state.deckCards = [...cardsToMove, ...state.deckCards];
    },
    // For the enemies moves, since we're using context for the enemy cards
    pushCard: (state, action) => {
      const card = action.payload;
      checkCardValidity(card, true);

      const filterCards = hand => {
        return hand.filter(
          // Also checks for "originalSuit" since 8 cards have their suit replaced once played.
          handCard =>
            !(handCard.suit === (card.originalSuit || card.suit) && handCard.face === card.face)
        );
      };

      card.owner === Players.HUMAN
        ? (state.humanHand = filterCards(state.humanHand))
        : (state.robotHand = filterCards(state.robotHand));
      state.playedCards.push(card);
    },
    makeEnemyPickUp: {
      reducer: (state, action) => {
        const { cardsToPickUp, playerToPickUp } = action.payload;

        // Obviously, should only be a number.
        if (isNaN(cardsToPickUp)) {
          throw new InvalidStateError(
            `Value for cards to pick needs to be a number, got ${cardsToPickUp}`
          );
        }
        // Deck should be replenished if needed before calling this action.
        if (state.deckCards.length === 0) {
          throw new InvalidStateError("There aren't any cards to pick up.");
        }

        let cardsToGive;
        if (state.deckCards.length <= action.payload) {
          cardsToGive = cloneDeep(state.deckCards);
          state.deckCards = [];
        } else {
          cardsToGive = state.deckCards.splice(
            state.deckCards.length - 1 - cardsToPickUp,
            cardsToPickUp
          );
        }
        cardsToGive.forEach(card => (card.owner = playerToPickUp));

        // Spread into the appropriate hand
        switch (playerToPickUp) {
          case Players.HUMAN: {
            state.humanHand = [...state.humanHand, ...cardsToGive];
            break;
          }
          case Players.ROBOT: {
            state.robotHand = [...state.robotHand, ...cardsToGive];
          }
        }
      },
      prepare: (cardsToPickUp, playerToPickUp) => {
        return { payload: { cardsToPickUp, playerToPickUp } };
      },
    },
    pickUpCard: (state, action) => {
      const cardReceiver = action.payload;
      if (state.deckCards < 1) {
        throw new InvalidStateError("There aren't any cards to pick up!");
      }

      const receivingHand = cardReceiver === Players.HUMAN ? state.humanHand : state.robotHand;

      const newCard = state.deckCards.pop();
      newCard.owner = cardReceiver;
      receivingHand.push(newCard);
    },
  },
});

export const { initCards, pushCard, replenishPile, makeEnemyPickUp, pickUpCard } =
  cardSlice.actions;

export default cardSlice.reducer;
