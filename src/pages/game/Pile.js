import { useSelector } from "react-redux";
import { selectCardInPlay } from "../../redux/slices/card/selectors";
import CardElement from "../../shared/CardElement";
import FaceDownCard from "../../shared/FaceDownCard";
import styled from "styled-components";
import { setWhosTurn } from "../../redux/slices/gameState/gameStateSlice";
import { Players } from "../../constants/gameStates";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
  column-gap: 75px;
`;

const Pile = ({ onPickUp }) => {
  const cardInPlay = useSelector(selectCardInPlay);
  const whosTurn = useSelector(setWhosTurn);

  return (
    <Wrapper>
      <CardElement
        cardObj={cardInPlay}
        nonSelectable
        tabIndex={-1}
        role="img"
        alt={`The card in play. It is the ${cardInPlay.face} of ${cardInPlay.suit}`}
      />
      <FaceDownCard
        onClick={onPickUp}
        aria-disabled={whosTurn !== Players.HUMAN}
        aria-label={`Pickup pile`}
      />
    </Wrapper>
  );
};

export default Pile;
