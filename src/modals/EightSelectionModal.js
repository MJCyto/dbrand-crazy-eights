import ModalWrapper, { ButtonWrap, ModalMessageWrap, ModalTitleWrap } from "./ModalWrapper";
import { CardSuits } from "../constants/cardValues";
import { Button } from "../shared/SharedComponents";

const EightSelectionModal = props => {
  const { open, card, onSelect } = props;

  return (
    <ModalWrapper open={open} style={{ maxWidth: 500 }}>
      <ModalTitleWrap>Choose a new suit</ModalTitleWrap>

      <ModalMessageWrap>
        When playing an 8 you get to choose the next suit. What will it be?
      </ModalMessageWrap>
      <ButtonWrap>
        {card &&
          Object.values(CardSuits).map(suit => (
            <Button
              key={suit}
              style={{ width: "100%" }}
              onClick={() => onSelect({ ...card, originalSuit: card.suit, suit })}
            >
              {suit}
            </Button>
          ))}
      </ButtonWrap>
    </ModalWrapper>
  );
};

export default EightSelectionModal;
