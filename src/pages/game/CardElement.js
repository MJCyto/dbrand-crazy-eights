import { useDispatch, useSelector } from "react-redux";
import { selectCardInPlay } from "../../redux/slices/card/selectors";
import Card from "../../domain/Card";
import { playCard } from "../../redux/slices/gameState/gameStateSlice";
import { useState } from "react";
import { checkIfCardIsPlayable } from "../../helpers/gamePlayHelpers";
import { Alert } from "@mui/material";

const CardElement = ({ cardObj, nonSelectable, onError }) => {
  console.log(cardObj);
  const dispatch = useDispatch();
  const cardInPlay = useSelector(selectCardInPlay);
  if (!cardObj) {
    return <></>;
  }

  const { face, suit, owner } = cardObj;

  // Since card from redux has fns stripped out.
  const hydratedCard = new Card(face, suit, owner);

  const onCardClick = () => {
    try {
      dispatch(playCard(hydratedCard));
    } catch (e) {
      onError(e);
    }
  };

  return (
    <>
      <button
        disabled={nonSelectable || !checkIfCardIsPlayable(hydratedCard, cardInPlay)}
        onClick={onCardClick}
      >{`${face} of ${suit}`}</button>
    </>
  );
};

export default CardElement;
