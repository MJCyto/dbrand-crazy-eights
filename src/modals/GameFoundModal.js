import ModalWrapper, { ButtonWrap, ModalMessageWrap, ModalTitleWrap } from "./ModalWrapper";
import { Button, ButtonVariants } from "../shared/SharedComponents";

const GameFoundModal = props => {
  const { open, resumeGame, cancelGame } = props;

  return (
    <ModalWrapper open={open} style={{ maxWidth: 500 }}>
      <ModalTitleWrap>It seems like theres an unfinished game.</ModalTitleWrap>
      <ModalMessageWrap>Would you like to resume the game?</ModalMessageWrap>
      <ButtonWrap style={{ columnGap: 30, justifyContent: "center" }}>
        <Button onClick={cancelGame} style={{ width: 80 }}>
          No
        </Button>
        <Button onClick={resumeGame} style={{ width: 80 }} variant={ButtonVariants.SECONDARY}>
          Yes
        </Button>
      </ButtonWrap>
    </ModalWrapper>
  );
};

export default GameFoundModal;
