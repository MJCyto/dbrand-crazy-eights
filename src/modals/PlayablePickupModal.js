import ModalWrapper from "./ModalWrapper";

const PlayablePickupModal = props => {
  const { open, onConfirm, onCancel, card } = props;
  return (
    <ModalWrapper open={open}>
      You just picked up the {card?.face} of {card?.suit}. Would you like to play it or end your
      turn?
      <br />
      <button onClick={onConfirm}>Play it</button>
      <button onClick={onCancel}>End turn</button>
    </ModalWrapper>
  );
};

export default PlayablePickupModal;
