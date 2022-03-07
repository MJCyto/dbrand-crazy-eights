import ModalWrapper, { ButtonWrap, ModalMessageWrap, ModalTitleWrap } from "./ModalWrapper";
import { Players } from "../constants/gameStates";
import { Button, ButtonVariants } from "../shared/SharedComponents";

const SomeoneWonModal = props => {
  const { open, winner, onRestart, onQuit } = props;

  const headerText = winner === Players.HUMAN ? "Victory!" : "FAILURE";

  return (
    <ModalWrapper open={open} style={{ maxWidth: 400 }}>
      <ModalTitleWrap>{headerText}</ModalTitleWrap>
      <ModalMessageWrap>Would you like to play again or quit?</ModalMessageWrap>
      <ButtonWrap style={{ columnGap: 30, justifyContent: "center" }}>
        <Button onClick={onQuit} style={{ width: 100 }}>
          Quit
        </Button>
        <Button onClick={onRestart} style={{ width: 120 }} variant={ButtonVariants.SECONDARY}>
          Play Again
        </Button>
      </ButtonWrap>
    </ModalWrapper>
  );
};

export default SomeoneWonModal;
