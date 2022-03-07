import { useDispatch, useSelector } from "react-redux";
import { selectWhosTurn } from "../../redux/slices/gameState/selectors";
import { useEffect } from "react";
import { Players } from "../../constants/gameStates";
import { selectRobotHand } from "../../redux/slices/card/selectors";
import { doRobotTurn } from "../../redux/slices/gameState/gameStateSlice";
import FaceDownCard from "../../shared/FaceDownCard";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-evenly;
  align-self: center;
`;

const CardWrapper = styled.div`
  height: 50px;
  width: 0;
  position: relative;
`;

const RobotHand = () => {
  const whosTurn = useSelector(selectWhosTurn);
  const cards = useSelector(selectRobotHand);
  const dispatch = useDispatch();

  // Detecting turn change here to emulate a real robot
  useEffect(() => {
    if (whosTurn === Players.ROBOT) {
      dispatch(doRobotTurn());
    }
  }, [whosTurn]);

  return (
    <Wrapper>
      {cards.map((card, i) => (
        <CardWrapper key={i}>
          <FaceDownCard
            key={i}
            style={{ position: "absolute", bottom: 0, zIndex: 1, marginLeft: -45 }}
          />
        </CardWrapper>
      ))}
    </Wrapper>
  );
};

export default RobotHand;
