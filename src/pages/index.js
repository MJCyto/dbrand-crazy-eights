import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import routes from "../constants/routes";
import { clearGame, initGame } from "../redux/slices/gameState/gameStateSlice";
import PageWrapper from "./PageWrapper";
import { selectGameState } from "../redux/slices/gameState/selectors";
import GameFoundModal from "../modals/GameFoundModal";
import { GameStates } from "../constants/gameStates";

const Home = () => {
  const [numCards, setNumCards] = useState();
  const [inputValidationError, setInputValidationError] = useState();
  const [gameStarting, setGameStarting] = useState(false);

  const gameState = useSelector(selectGameState);

  const dispatch = useDispatch();
  const router = useRouter();

  const beginGame = () => {
    setGameStarting(true);
    try {
      dispatch(initGame(numCards));
      router.push(routes.gameRoute);
    } catch (e) {
      setInputValidationError(e);
    }
  };

  const resumeGame = () => {
    router.push(routes.gameRoute);
  };

  const cancelGame = () => {
    dispatch(clearGame());
  };

  return (
    <PageWrapper>
      {inputValidationError?.message}
      <GameFoundModal
        open={!gameStarting && gameState === GameStates.IN_GAME}
        resumeGame={resumeGame}
        cancelGame={cancelGame}
      />
      <br />
      How many cards should we begin with? <input onChange={e => setNumCards(e.target.value)} />
      <button onClick={beginGame}>Begin</button>
    </PageWrapper>
  );
};

export default Home;
