import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import routes from "../constants/routes";
import { clearGame, initGame } from "../redux/slices/gameState/gameStateSlice";
import PageWrapper from "../shared/PageWrapper";
import { selectGameState } from "../redux/slices/gameState/selectors";
import GameFoundModal from "../modals/GameFoundModal";
import { GameStates } from "../constants/gameStates";
import FontSizes from "../constants/fontSizes";
import styled from "styled-components";
import { NumCardsButton, CardAnimation } from "../shared/SharedComponents";

const NUM_CARDS_OPTIONS = Object.freeze([5, 8, 10]);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  height: -webkit-fill-available;
  align-items: center;
  justify-content: center;
  row-gap: 20px;
  width: fit-content;
  margin: 0 auto;
  max-width: calc(100vw - 50px);
  text-align: center;
`;

const TextWrapper = styled.div`
  font-size: ${FontSizes.H2};
`;

const OptionsWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-auto-flow: column;
  column-gap: 15px;
  height: 65px;
`;

const Home = () => {
  const [inputValidationError, setInputValidationError] = useState();
  const [gameStarting, setGameStarting] = useState(false);

  const gameState = useSelector(selectGameState);

  const dispatch = useDispatch();
  const router = useRouter();

  const beginGame = numCards => {
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
      <Wrapper>
        <CardAnimation />
        <TextWrapper>How many cards should we begin with?</TextWrapper>
        <OptionsWrapper>
          {NUM_CARDS_OPTIONS.map(option => (
            <NumCardsButton
              key={option}
              onClick={() => beginGame(option)}
              aria-label={`Start with ${option} cards`}
            >
              {option}
            </NumCardsButton>
          ))}
        </OptionsWrapper>
      </Wrapper>
    </PageWrapper>
  );
};

export default Home;
