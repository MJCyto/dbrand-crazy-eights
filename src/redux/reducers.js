import { combineReducers } from "redux";
import cardSlice from "./slices/cardSlice";
import gameStateSlice from "./slices/gameStateSlice";

const reducers = combineReducers({
  card: cardSlice,
  gameState: gameStateSlice,
});

export default reducers;
