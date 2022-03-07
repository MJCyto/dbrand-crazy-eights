import ModalWrapper, { ButtonWrap, ModalMessageWrap, ModalTitleWrap } from "./ModalWrapper";
import { Button, ButtonVariants } from "../shared/SharedComponents";

const PlayablePickupModal = props => {
  const { open, onConfirm, onCancel, card } = props;
  return (
    <ModalWrapper open={open} style={{ maxWidth: 500 }}>
      <ModalTitleWrap>Play or Pass?</ModalTitleWrap>
      <ModalMessageWrap>
        You just picked up the {card?.face} of {card?.suit}. Would you like to play it or end your
        turn?
      </ModalMessageWrap>

      <ButtonWrap style={{ columnGap: 30, justifyContent: "center" }}>
        <Button onClick={onCancel} style={{ width: 80 }}>
          End turn
        </Button>
        <Button onClick={onConfirm} style={{ width: 80 }} variant={ButtonVariants.SECONDARY}>
          Play it
        </Button>
      </ButtonWrap>
    </ModalWrapper>
  );
};

export default PlayablePickupModal;
