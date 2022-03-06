import { useDispatch, useSelector } from "react-redux";
import { selectCardInPlay } from "../../redux/slices/card/selectors";
import { playCard } from "../../redux/slices/gameState/gameStateSlice";
import { checkIfCardIsPlayable } from "../../helpers/gamePlayHelpers";

const CardElement = ({ cardObj, nonSelectable, onError }) => {
  const dispatch = useDispatch();
  const cardInPlay = useSelector(selectCardInPlay);

  //After refresh this component will render for the pile but redux isn't filled in yet.
  if (!cardObj) {
    return <></>;
  }

  const { face, suit, owner } = cardObj;

  const onCardClick = () => {
    try {
      dispatch(playCard(cardObj));
    } catch (e) {
      onError(e);
    }
  };

  return (
    <>
      <button
        disabled={nonSelectable || !checkIfCardIsPlayable(cardObj, cardInPlay)}
        onClick={onCardClick}
      >{`${face} of ${suit}`}</button>
    </>
  );
};

export default CardElement;
