import { useSelector } from "react-redux";
import { selectCardInPlay } from "../redux/slices/card/selectors";
import { checkIfCardIsPlayable } from "../helpers/gamePlayHelpers";
import styled from "styled-components";
import { ClubsIcon, DiamondIcon, HeartIcon, SpadeIcon } from "../Icons/CardSuits";
import { CardSuits } from "../constants/cardValues";
import Colors from "../constants/colors";
import Fonts from "../constants/Fonts";
import FontSizes from "../constants/fontSizes";

const Wrapper = styled.button`
  background-color: ${Colors.Black};
  color: ${Colors.White};
  position: relative;
  border: 1px solid ${Colors.White};
  font-family: ${Fonts.Default};
  font-size: ${FontSizes.H3};
  height: 143px;
  width: 90px;
  min-width: 90px;
  border-radius: 10px;
  :focus-visible {
    outline: none;
  }
  :disabled {
    border-color: ${Colors.Black};
    opacity: 50%;
  }
`;

const TopLeftSuit = styled.div`
  position: absolute;
  top: 5px;
  left: 7px;
`;
const BottomRightSuit = styled.div`
  position: absolute;
  bottom: 5px;
  right: 7px;
`;

const CardElement = ({ cardObj = {}, nonSelectable, playCard }) => {
  const cardInPlay = useSelector(selectCardInPlay);
  const { face, suit } = cardObj;

  const Icon = () => {
    switch (suit) {
      case CardSuits.SPADES: {
        return <SpadeIcon />;
      }
      case CardSuits.HEARTS: {
        return <HeartIcon />;
      }
      case CardSuits.CLUBS: {
        return <ClubsIcon />;
      }
      case CardSuits.DIAMONDS: {
        return <DiamondIcon />;
      }
    }
  };

  return (
    //After refresh this component will render for the pile but redux isn't filled in yet.
    <>
      {cardObj && (
        <Wrapper
          disabled={!checkIfCardIsPlayable(cardObj, cardInPlay)}
          onClick={() => !nonSelectable && playCard(cardObj)}
        >
          {`${face}`}
          <TopLeftSuit>
            <Icon />
          </TopLeftSuit>
          <BottomRightSuit>
            <Icon />
          </BottomRightSuit>
        </Wrapper>
      )}
    </>
  );
};

export default CardElement;
