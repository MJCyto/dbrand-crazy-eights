import ModalWrapper from "./ModalWrapper";
import { Players } from "../constants/gameStates";

const SomeoneWonModal = props => {
  const { open, winner, onRestart, onQuit } = props;

  const headerText = winner === Players.HUMAN ? "You Won!" : "You Lost...";

  return (
    <ModalWrapper open={open}>
      <div>{headerText}</div>
      <div>Would you like to play again or quit?</div>
      <button onClick={onRestart}>Play Again</button>
      <button onClick={onQuit}>Quit</button>
    </ModalWrapper>
  );
};

export default SomeoneWonModal;
