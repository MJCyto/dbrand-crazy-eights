import { configureStore } from "@reduxjs/toolkit";
import { loadState } from "./browserStorage";
import rootReducer from "./reducers";

export const initializeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export const store = configureStore({
  devTools: true,
  reducer: rootReducer,
  preloadedState: loadState(),
});
