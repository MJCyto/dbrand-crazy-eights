import { useSelector } from "react-redux";
import { selectCardInPlay } from "../../redux/slices/card/selectors";

const Card = ({ cardObj }) => {
  const { face, suit, checkIfPlayable } = cardObj;
  const cardInPlay = useSelector(selectCardInPlay);

  return (
    <div
      style={{ color: cardObj.checkIfPlayable(cardInPlay) ? "green" : "red" }}
    >{`${face} of ${suit}})`}</div>
  );
};

export default Card;
