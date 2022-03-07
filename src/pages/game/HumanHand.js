import { useDispatch, useSelector } from "react-redux";
import { selectCardInPlay, selectDeck, selectHumanHand } from "../../redux/slices/card/selectors";
import CardElement from "../../shared/CardElement";
import { useContext, useEffect, useState } from "react";
import { CardFaces } from "../../constants/cardValues";
import { Players } from "../../constants/gameStates";
import { pickUpCard, replenishPile } from "../../redux/slices/card/cardSlice";
import { checkIfCardIsPlayable } from "../../helpers/gamePlayHelpers";
import { playCard, setWhosTurn } from "../../redux/slices/gameState/gameStateSlice";
import { selectWhosTurn } from "../../redux/slices/gameState/selectors";
import PlayablePickupModal from "../../modals/PlayablePickupModal";
import EightSelectionModal from "../../modals/EightSelectionModal";
import errorContext from "../../domain/context/errorContext";

const HumanHand = () => {
  const [playablePickupModalVisible, setPlayablePickupModalVisible] = useState(false);
  const [eightSelectModalVisible, setEightSelectModalVisible] = useState(false);
  const [cardForModal, setCardForModal] = useState();
  const [waitingForNewCard, setWaitingForNewCard] = useState(false);

  const deck = useSelector(selectDeck);
  const cards = useSelector(selectHumanHand);
  const whosTurn = useSelector(selectWhosTurn);
  const cardInPlay = useSelector(selectCardInPlay);
  const dispatch = useDispatch();

  const { onError } = useContext(errorContext);

  const closeModals = () => {
    setCardForModal(undefined);
    setPlayablePickupModalVisible(false);
    setEightSelectModalVisible(false);
  };

  const doPlayCard = card => {
    try {
      dispatch(playCard(card));
    } catch (e) {
      onError(e);
    }
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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
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
      <button onClick={onPickUp} disabled={whosTurn !== Players.HUMAN}>
        Pick Up
      </button>

      {cards.map((card, i) => (
        <CardElement cardObj={card} key={i} playCard={onPlayCard} />
      ))}
    </div>
  );
};

export default HumanHand;
