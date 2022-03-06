import { useDispatch, useSelector } from "react-redux";
import { selectCardInPlay, selectDeck, selectHumanHand } from "../../redux/slices/card/selectors";
import CardElement from "./CardElement";
import { Alert, Modal } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { CardFaces, CardSuits } from "../../constants/cardValues";
import { Players } from "../../constants/gameStates";
import { pickUpCard, replenishPile } from "../../redux/slices/card/cardSlice";
import { checkIfCardIsPlayable } from "../../helpers/gamePlayHelpers";
import { playCard, setWhosTurn } from "../../redux/slices/gameState/gameStateSlice";
import { selectWhosTurn } from "../../redux/slices/gameState/selectors";

const HumanHand = props => {
  const cards = useSelector(selectHumanHand);
  const [gameplayError, setGameplayError] = useState();
  const [cardForModal, setCardForModal] = useState();
  const [waitingForNewCard, setWaitingForNewCard] = useState(false);
  const deck = useSelector(selectDeck);
  const errorTimeout = useRef();
  const dispatch = useDispatch();

  const whosTurn = useSelector(selectWhosTurn);
  const cardInPlay = useSelector(selectCardInPlay);

  // Prevents a race condition with redux, since a stale value might be used shortly after dispatching for a pickup
  useEffect(() => {
    if (waitingForNewCard) {
      setWaitingForNewCard(false);
      const newCard = cards[cards.length - 1];
      if (checkIfCardIsPlayable(newCard, cardInPlay)) {
        setCardForModal(newCard);
      } else {
        dispatch(setWhosTurn(Players.ROBOT));
      }
    }
  }, [cards]);

  // Have the error on screen for 5 seconds
  const onError = e => {
    clearTimeout(errorTimeout.current);
    setGameplayError(e);
    errorTimeout.current = setTimeout(() => {
      setGameplayError();
    }, 5000);
  };

  const onPickUp = () => {
    if (deck.length < 1) {
      dispatch(replenishPile());
    }
    dispatch(pickUpCard(Players.HUMAN));
    setWaitingForNewCard(true);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      <Modal open={!!cardForModal}>
        <div style={{ border: "1px solid black", backgroundColor: "white" }}>
          You just picked up the {cardForModal?.face} of {cardForModal?.suit}. Would you like to
          play it or end your turn?
          <br />
          <button
            onClick={() => {
              dispatch(playCard(cardForModal));
              setCardForModal(undefined);
            }}
          >
            Play it
          </button>
          <button
            onClick={() => {
              dispatch(setWhosTurn(Players.ROBOT));
              setCardForModal(undefined);
            }}
          >
            End turn
          </button>
        </div>
      </Modal>
      <button onClick={onPickUp} disabled={whosTurn !== Players.HUMAN}>
        Pick Up
      </button>
      {gameplayError && (
        <Alert variant="outlined" severity="error">
          {gameplayError.message}
        </Alert>
      )}
      {cards.map((card, i) => (
        <CardElement cardObj={card} onError={onError} key={i} />
      ))}
    </div>
  );
};

export default HumanHand;
