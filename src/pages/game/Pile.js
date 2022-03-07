import { useSelector } from "react-redux";
import { selectDeck, selectPile } from "../../redux/slices/card/selectors";
import CardElement from "../../shared/CardElement";
import FaceDownCard from "../../shared/FaceDownCard";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
  column-gap: 75px;
`;

const Pile = props => {
  const cards = useSelector(selectPile);
  return (
    <Wrapper>
      <CardElement cardObj={cards[cards.length - 1]} nonSelectable />

      <FaceDownCard />
    </Wrapper>
  );
};

export default Pile;
