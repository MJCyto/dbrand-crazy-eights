import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CardFaces, CardSuits } from "../../../constants/cardValues";
import { GameStates, Players } from "../../../constants/gameStates";
import { checkIfCardBePlayed } from "../../../helpers/ValidityHelpers";
import { selectWhosTurn } from "./selectors";
import InvalidStateError from "../../../domain/error/InvalidStateError";
import {
  selectCardInPlay,
  selectDeck,
  selectHumanHand,
  selectPile,
  selectRobotHand,
} from "../card/selectors";
import { getSubsequentCardsOnTop, isCardASkip } from "../../../helpers/gamePlayHelpers";
import { makeEnemyPickUp, pushCard, replenishPile } from "../card/cardSlice";

// TODO: mocked store test
export const playCard = card => (dispatch, getState) => {
  const state = getState();
  const whosTurn = selectWhosTurn(state);
  const pile = selectPile(state);
  const deck = selectDeck(state);
  const cardInPlay = selectCardInPlay(state);
  const humanHand = selectHumanHand(state);
  const robotHand = selectRobotHand(state);

  // Will throw an error if conditions to play card are not met
  checkIfCardBePlayed(card, humanHand, robotHand, cardInPlay, whosTurn);

  dispatch(pushCard(card));

  let cardsToPickUp;
  // Queen of Spades makes enemy pick up 5.
  if (card.face === CardFaces.Q && card.suit === CardSuits.SPADES) {
    cardsToPickUp = 5;
  }

  // 2s make enemy pick up 2, or 2 more than the previous 2s effect.
  if (card.face === CardFaces[2]) {
    const subsequent2s = getSubsequentCardsOnTop(pile, CardFaces[2]);
    cardsToPickUp = subsequent2s * 2 + 2;
  }

  if (cardsToPickUp) {
    if (deck.length < cardsToPickUp) {
      dispatch(replenishPile()).then(() => dispatch(makeEnemyPickUp(cardsToPickUp)));
    } else {
      dispatch(makeEnemyPickUp(cardsToPickUp));
    }
  }

  // If the card is a skip, whosTurn should stay the same
  if (!isCardASkip(card)) {
    dispatch(setWhosTurn(whosTurn === Players.HUMAN ? Players.ROBOT : Players.HUMAN));
  }
};

export const doEnemyTurn = createAsyncThunk(
  `gameState/enemyTurn`,
  async (data, { getState, dispatch }) => {}
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
    // Should only be called after playCard
    playHumanCard: (state, action) => {},
    // Should only be called after playCard
    playRobotCard: (state, action) => {},
    initGameState: (state, action) => {
      state.whosTurn = Players.HUMAN;
      state.gameState = GameStates.IN_GAME;
      state.winner = initialState.winner;
    },
  },
  extraReducers: builder => {},
});

export const { setWhosTurn, playHumanCard, playRobotCard, initGameState } = gameStateSlice.actions;

export default gameStateSlice.reducer;
