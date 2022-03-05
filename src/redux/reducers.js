import { combineReducers } from "redux";
import cardSlice from "./slices/card/cardSlice";
import gameStateSlice from "./slices/gameState/gameStateSlice";

const reducers = combineReducers({
  card: cardSlice,
  gameState: gameStateSlice,
});

export default reducers;
