import { combineReducers } from 'redux'
import gameSlice from "./slices/gameSlice";

const reducers = combineReducers({
    gameSlice,
})

export default reducers;