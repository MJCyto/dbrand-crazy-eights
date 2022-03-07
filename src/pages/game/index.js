import HumanHand from "./HumanHand";
import Pile from "./Pile";
import { useDispatch, useSelector } from "react-redux";
import {
  selectGameState,
  selectWhosTurn,
  selectWinner,
} from "../../redux/slices/gameState/selectors";
import PageWrapper from "../../shared/PageWrapper";
import RobotHand from "./RobotHand";
import { useEffect, useRef, useState } from "react";
import { Alert } from "@mui/material";
import SomeoneWonModal from "../../modals/SomeoneWonModal";
import {
  clearGame,
  playCard,
  restartGame,
  setWhosTurn,
} from "../../redux/slices/gameState/gameStateSlice";
import { useRouter } from "next/router";
import { GameStates, Players } from "../../constants/gameStates";
import styled from "styled-components";
import Colors from "../../constants/colors";
import GameNotFound from "./GameNotFound";
import PlayablePickupModal from "../../modals/PlayablePickupModal";
import EightSelectionModal from "../../modals/EightSelectionModal";
import { selectCardInPlay, selectDeck, selectHumanHand } from "../../redux/slices/card/selectors";
import { CardFaces } from "../../constants/cardValues";
import { checkIfCardIsPlayable } from "../../helpers/gamePlayHelpers";
import { pickUpCard, replenishPile } from "../../redux/slices/card/cardSlice";
import FontSizes from "../../constants/fontSizes";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: -webkit-fill-available;
  background-color: ${Colors.Jet};
`;

const TableCenterWrapper = styled.div`
  margin-top: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 25px;
  font-size: ${FontSizes.H2};
`;

const GameScreen = () => {
  const errorTimeout = useRef();

  const router = useRouter();
  const whosTurn = useSelector(selectWhosTurn);
  const winner = useSelector(selectWinner);
  const gameState = useSelector(selectGameState);
  const deck = useSelector(selectDeck);
  const cards = useSelector(selectHumanHand);
  const cardInPlay = useSelector(selectCardInPlay);

  const [gameplayError, setGameplayError] = useState();
  const [playablePickupModalVisible, setPlayablePickupModalVisible] = useState(false);
  const [eightSelectModalVisible, setEightSelectModalVisible] = useState(false);
  const [cardForModal, setCardForModal] = useState();
  const [waitingForNewCard, setWaitingForNewCard] = useState(false);

  const dispatch = useDispatch();

  // Have the error on screen for 5 seconds
  const onError = e => {
    clearTimeout(errorTimeout.current);
    setGameplayError(e);
    errorTimeout.current = setTimeout(() => {
      setGameplayError(undefined);
    }, 5000);
  };

  const setTurnToRobot = () => {
    try {
      dispatch(setWhosTurn(Players.ROBOT));
    } catch (e) {
      onError(e);
    }
  };

  // Prevents a race condition with redux, since a stale value might be used shortly after dispatching for a pickup
  useEffect(() => {
    if (waitingForNewCard) {
      setWaitingForNewCard(false);
      const newCard = cards[cards.length - 1];
      if (checkIfCardIsPlayable(newCard, cardInPlay)) {
        setCardForModal(newCard);
        setPlayablePickupModalVisible(true);
      } else {
        setTurnToRobot();
      }
    }
  }, [cards]);

  const doPlayCard = card => {
    try {
      dispatch(playCard(card));
    } catch (e) {
      onError(e);
    }
  };

  // Check that pickup is possible, replenish if not. Wait for card to see if playable.
  const onPickUp = () => {
    if (deck.length < 1) {
      try {
        dispatch(replenishPile());
      } catch (e) {
        onError(e);
      }
    }
    try {
      dispatch(pickUpCard(Players.HUMAN));
    } catch (e) {
      onError(e);
    }
    setWaitingForNewCard(true);
  };

  // Check if extra info needed from human, or just play the card.
  const onPlayCard = card => {
    if (card.face === CardFaces[8]) {
      setCardForModal(card);
      setEightSelectModalVisible(true);
    } else {
      doPlayCard(card);
    }
  };

  // Human has selected what sit they want and the new card is provided.
  const on8Chosen = newCard => {
    closeModals();
    doPlayCard(newCard);
  };

  const onQuit = () => {
    dispatch(clearGame());
    router.replace("/");
  };

  const onRestart = () => {
    dispatch(restartGame());
  };

  const closeModals = () => {
    setCardForModal(undefined);
    setPlayablePickupModalVisible(false);
    setEightSelectModalVisible(false);
  };

  return (
    <PageWrapper>
      {gameplayError && (
        <Alert variant="outlined" severity="error">
          {gameplayError.message}
        </Alert>
      )}
      <SomeoneWonModal open={!!winner} winner={winner} onRestart={onRestart} onQuit={onQuit} />
      <PlayablePickupModal
        open={playablePickupModalVisible}
        onConfirm={() => {
          closeModals();
          onPlayCard(cardForModal);
        }}
        onCancel={() => {
          closeModals();
          setTurnToRobot();
        }}
        card={cardForModal}
      />
      <EightSelectionModal
        open={eightSelectModalVisible}
        onSelect={on8Chosen}
        card={cardForModal}
      />
      <Wrapper>
        {gameState === GameStates.LOBBY ? (
          <GameNotFound />
        ) : (
          <>
            <RobotHand />
            <TableCenterWrapper>
              {`It's the ${whosTurn}'s turn.`}
              <Pile onPickUp={onPickUp} />
            </TableCenterWrapper>
            <br />
            <br />
            <HumanHand onPlayCard={onPlayCard} />
          </>
        )}
      </Wrapper>
    </PageWrapper>
  );
};

export default GameScreen;
