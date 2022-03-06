import HumanHand from "./HumanHand";
import Pile from "./Pile";
import { useDispatch, useSelector } from "react-redux";
import { selectWhosTurn, selectWinner } from "../../redux/slices/gameState/selectors";
import PageWrapper from "../PageWrapper";
import RobotHand from "./RobotHand";
import { useRef, useState } from "react";
import { Alert } from "@mui/material";
import ErrorContext from "../../domain/context/errorContext";
import SomeoneWonModal from "../../modals/SomeoneWonModal";
import { clearGame, restartGame } from "../../redux/slices/gameState/gameStateSlice";
import { useRouter } from "next/router";

const GameScreen = () => {
  const router = useRouter();
  const whosTurn = useSelector(selectWhosTurn);
  const winner = useSelector(selectWinner);
  const errorTimeout = useRef();
  const [gameplayError, setGameplayError] = useState();

  const dispatch = useDispatch();

  // Have the error on screen for 5 seconds
  const onError = e => {
    clearTimeout(errorTimeout.current);
    setGameplayError(e);
    errorTimeout.current = setTimeout(() => {
      setGameplayError(undefined);
    }, 5000);
  };

  const onQuit = () => {
    dispatch(clearGame());
    router.replace("/");
  };

  const onRestart = () => {
    dispatch(restartGame());
  };

  return (
    <PageWrapper>
      {gameplayError && (
        <Alert variant="outlined" severity="error">
          {gameplayError.message}
        </Alert>
      )}
      <SomeoneWonModal open={!!winner} winner={winner} onRestart={onRestart} onQuit={onQuit} />
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
