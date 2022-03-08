import { useSelector } from "react-redux";
import { selectHumanHand } from "../../redux/slices/card/selectors";
import CardElement from "../../shared/CardElement";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 100vw;
  overflow-x: auto;
  column-gap: 10px;
  margin: 0 auto;
  padding: 0 15px;
`;

const HumanHand = props => {
  const { onPlayCard } = props;

  const cards = useSelector(selectHumanHand);

  return (
    <Wrapper aria-label="Your cards">
      {cards.map((card, i) => (
        <CardElement cardObj={card} key={i} playCard={onPlayCard} />
      ))}
    </Wrapper>
  );
};

export default HumanHand;
