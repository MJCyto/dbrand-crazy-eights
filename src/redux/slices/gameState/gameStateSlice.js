import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CardFaces, CardSuits } from "../../../constants/cardValues";
import { GameStates, Players } from "../../../constants/gameStates";
import { validateCardPlayability } from "../../../helpers/ValidityHelpers";
import { selectWhosTurn } from "./selectors";
import InvalidStateError from "../../../domain/error/InvalidStateError";
import {
  selectCardInPlay,
  selectDeck,
  selectHumanHand,
  selectPile,
  selectRobotHand,
} from "../card/selectors";
import {
  checkIfCardIsPlayable,
  getSubsequentCardsOnTop,
  isCardASkip,
} from "../../../helpers/gamePlayHelpers";
import { makeEnemyPickUp, pickUpCard, pushCard, replenishPile } from "../card/cardSlice";
import { cloneDeep } from "lodash";

export const playCard = card => (dispatch, getState) => {
  // debugger;
  const state = getState();
  const whosTurn = selectWhosTurn(state);
  const pile = selectPile(state);
  const deck = selectDeck(state);
  const cardInPlay = selectCardInPlay(state);
  const humanHand = selectHumanHand(state);
  const robotHand = selectRobotHand(state);

  // Will throw an error if conditions to play card are not met
  validateCardPlayability(card, humanHand, robotHand, cardInPlay, whosTurn);

  let cardsToPickUp;
  // Queen of Spades makes enemy pick up 5.
  if (card.face === CardFaces.Q && card.suit === CardSuits.SPADES) {
    cardsToPickUp = 5;
  }

  // 2s make enemy pick up 2, or 2 more than the previous 2s effect.
  if (card.face === CardFaces[2]) {
    const subsequent2s = getSubsequentCardsOnTop(cloneDeep(pile), CardFaces[2]);
    cardsToPickUp = subsequent2s * 2 + 2;
  }

  if (cardsToPickUp) {
    if (deck.length < cardsToPickUp) {
      dispatch(replenishPile()).then(() =>
        dispatch(
          makeEnemyPickUp(
            cardsToPickUp,
            card.owner === Players.HUMAN ? Players.ROBOT : Players.HUMAN
          )
        )
      );
    } else {
      dispatch(
        makeEnemyPickUp(cardsToPickUp, card.owner === Players.HUMAN ? Players.ROBOT : Players.HUMAN)
      );
    }
  }

  dispatch(pushCard(card));

  // If the card is a skip, whosTurn should stay the same
  if (!isCardASkip(card)) {
    // Checks if 1 since we're still using the state from the beginning of the dispatch
    if (
      (whosTurn === Players.HUMAN && humanHand.length <= 1) ||
      (whosTurn === Players.ROBOT && robotHand.length <= 1)
    ) {
      dispatch(setWinner(whosTurn));
    } else {
      dispatch(setWhosTurn(whosTurn === Players.HUMAN ? Players.ROBOT : Players.HUMAN));
    }
  }
};

export const doRobotTurn = createAsyncThunk(
  `gameState/robotTurn`,
  async (data, { getState, dispatch }) => {
    // Wait one second before doing something to make actions less jarring to the human
    await new Promise(resolve => setTimeout(() => resolve(), 1000));

    const state = getState();
    const cards = selectRobotHand(state);
    const cardInPlay = selectCardInPlay(state);

    // Just find the first card that is playable
    let cardToPlay = cards.find(card => checkIfCardIsPlayable(card, cardInPlay));

    if (!cardToPlay) {
      if (selectDeck(state).length <= 1) {
        await dispatch(replenishPile());
      }
      try {
        dispatch(pickUpCard(Players.ROBOT));
      } catch (e) {
        console.error("Something went wrong when trying to give the robot a card...", e);
      }
      // Same as before, will make it less confusing.
      await new Promise(resolve => setTimeout(() => resolve(), 500));
      const newCard = cards[cards.length - 1];
      if (checkIfCardIsPlayable(newCard, cardInPlay)) {
        cardToPlay = newCard;
      } else {
        dispatch(setWhosTurn(Players.HUMAN));
        return;
      }
    }

    dispatch(playCard(cardToPlay));

    // Robot should go again if they play a skip, even if it was their last card.
    if (isCardASkip(cardToPlay)) {
      dispatch(doRobotTurn());
    }
  }
);

const initialState = Object.freeze({
  gameState: GameStates.LOBBY,
  whosTurn: Players.HUMAN,
  winner: null,
});

const gameStateSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setWhosTurn: (state, action) => {
      const whosTurn = action.payload;

      if (!Object.values(Players).includes(whosTurn)) {
        throw new InvalidStateError(
          `whosTurn can only be one of ${Object.values(Players)} - got ${whosTurn}`
        );
      }
      state.whosTurn = whosTurn;
    },
    initGameState: (state, action) => {
      state.whosTurn = Players.HUMAN;
      state.gameState = GameStates.IN_GAME;
      state.winner = initialState.winner;
    },
    setWinner: (state, action) => {
      state.winner = action.payload;
    },
  },
  extraReducers: builder => {},
});

export const { setWhosTurn, initGameState, setWinner } = gameStateSlice.actions;

export default gameStateSlice.reducer;
