import { useSelector } from "react-redux";
import { selectCardInPlay } from "../redux/slices/card/selectors";
import { checkIfCardIsPlayable } from "../helpers/gamePlayHelpers";
import styled from "styled-components";

const Wrapper = styled.div``;

const CardElement = ({ cardObj = {}, nonSelectable, playCard }) => {
  const cardInPlay = useSelector(selectCardInPlay);
  const { face, suit } = cardObj;

  return (
    //After refresh this component will render for the pile but redux isn't filled in yet.
    <>
      {cardObj && (
        <button
          disabled={nonSelectable || !checkIfCardIsPlayable(cardObj, cardInPlay)}
          onClick={() => playCard(cardObj)}
        >{`${face} of ${suit}`}</button>
      )}
    </>
  );
};

export default CardElement;
