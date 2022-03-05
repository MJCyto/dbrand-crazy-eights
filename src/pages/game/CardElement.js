import { useSelector } from "react-redux";
import { selectCardInPlay } from "../../redux/slices/card/selectors";
import Card from "../../domain/Card";

const CardElement = ({ cardObj }) => {
  const { face, suit, owner } = cardObj;
  const cardInPlay = useSelector(selectCardInPlay);

  const hydratedCard = new Card(face, suit, owner);

  return (
    <div
      style={{ color: hydratedCard.checkIfPlayable(cardInPlay) ? "green" : "red" }}
    >{`${face} of ${suit}})`}</div>
  );
};

export default CardElement;
