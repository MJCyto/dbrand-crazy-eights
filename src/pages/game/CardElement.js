import { useDispatch, useSelector } from "react-redux";
import { selectCardInPlay } from "../../redux/slices/card/selectors";
import Card from "../../domain/Card";
import { playCard } from "../../redux/slices/gameState/gameStateSlice";
import { checkIfCardBePlayed } from "../../helpers/ValidityHelpers";
import { useState } from "react";
import { checkIfCardIsPlayable } from "../../helpers/gamePlayHelpers";

const CardElement = ({ cardObj }) => {
  const { face, suit, owner } = cardObj;
  const dispatch = useDispatch();
  const cardInPlay = useSelector(selectCardInPlay);
  const [dispatchError, setDispatchError] = useState();

  // Since card from redux has fns stripped out.
  const hydratedCard = new Card(face, suit, owner);

  const onCardClick = () => dispatch(playCard(hydratedCard));

  return (
    <button
      disabled={!checkIfCardIsPlayable(hydratedCard, cardInPlay)}
      onClick={onCardClick}
    >{`${face} of ${suit}`}</button>
  );
};

export default CardElement;
