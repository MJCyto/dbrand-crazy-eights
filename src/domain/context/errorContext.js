import { createContext } from "react";

const ErrorContext = createContext({
  onError: e => {
    console.error("Error happened but context wasn't provided!", e);
  },
});

export default ErrorContext;
