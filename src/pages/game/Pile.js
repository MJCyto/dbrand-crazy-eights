import { useSelector } from "react-redux";
import { selectDeck, selectPile } from "../../redux/slices/card/selectors";
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
  const cards = useSelector(selectPile);
  const whosTurn = useSelector(setWhosTurn);

  return (
    <Wrapper>
      <CardElement cardObj={cards[cards.length - 1]} nonSelectable />

      <FaceDownCard onClick={onPickUp} disabled={whosTurn !== Players.HUMAN} />
    </Wrapper>
  );
};

export default Pile;
