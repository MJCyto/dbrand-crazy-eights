import { createSlice, createAction } from "@reduxjs/toolkit";
import { CardFaces, CardSuits } from "../../constants/cardValues";
import Card from "../../domain/Card";
import { shuffle } from "lodash";
import InvalidInputError from "../../domain/error/InvalidInputError";
import { GameStates, Players } from "../../constants/gameStates";

export const playCard = card => (dispatch, getState) => {};

const initialState = Object.freeze({
  gameState: GameStates.LOBBY,
  whosTurn: Players.HUMAN,
  winner: null,
});

const gameStateSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    placeholer: state => {},
  },
  extraReducers: builder => {},
});

export const { placeholer } = gameStateSlice.actions;

export default gameStateSlice.reducer;
