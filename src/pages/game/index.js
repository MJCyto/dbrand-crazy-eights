import HumanHand from "./HumanHand";
import Pile from "./Pile";
import { useSelector } from "react-redux";
import { selectWhosTurn } from "../../redux/slices/gameState/selectors";
import PageWrapper from "../PageWrapper";
import RobotHand from "./RobotHand";
import { useRef, useState } from "react";
import { Alert } from "@mui/material";
import ErrorContext from "../../domain/context/errorContext";

const GameScreen = () => {
  const whosTurn = useSelector(selectWhosTurn);
  const errorTimeout = useRef();
  const [gameplayError, setGameplayError] = useState();

  // Have the error on screen for 5 seconds
  const onError = e => {
    clearTimeout(errorTimeout.current);
    setGameplayError(e);
    errorTimeout.current = setTimeout(() => {
      setGameplayError(undefined);
    }, 5000);
  };

  return (
    <PageWrapper>
      {gameplayError && (
        <Alert variant="outlined" severity="error">
          {gameplayError.message}
        </Alert>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "-webkit-fill-available",
        }}
      >
        <ErrorContext.Provider value={{ onError, error: gameplayError }}>
          <RobotHand />
          {`It's the ${whosTurn}'s turn.`}
          <Pile />
          <br />
          <br />
          <HumanHand />
        </ErrorContext.Provider>
      </div>
    </PageWrapper>
  );
};

export default GameScreen;
