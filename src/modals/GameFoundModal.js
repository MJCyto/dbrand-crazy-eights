import ModalWrapper from "./ModalWrapper";

const GameFoundModal = props => {
  const { open, resumeGame, cancelGame } = props;

  return (
    <ModalWrapper open={open}>
      <div>It seems like theres an unfinished game.</div>
      <div>Would you like to resume the game?</div>
      <button onClick={resumeGame}>Yes</button>
      <button onClick={cancelGame}>No</button>
    </ModalWrapper>
  );
};

export default GameFoundModal;
