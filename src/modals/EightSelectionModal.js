import ModalWrapper from "./ModalWrapper";
import { CardSuits } from "../constants/cardValues";

const EightSelectionModal = props => {
  const { open, card, onSelect } = props;

  return (
    <ModalWrapper open={open}>
      When playing an 8 you get to choose the next suit. What will it be?
      {card &&
        Object.values(CardSuits).map(suit => (
          <button key={suit} onClick={() => onSelect({ ...card, originalSuit: card.suit, suit })}>
            {suit}
          </button>
        ))}
    </ModalWrapper>
  );
};

export default EightSelectionModal;
