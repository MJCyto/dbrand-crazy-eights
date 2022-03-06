import { useDispatch, useSelector } from "react-redux";
import { selectWhosTurn } from "../../redux/slices/gameState/selectors";
import { useEffect } from "react";
import { Players } from "../../constants/gameStates";
import { selectRobotHand } from "../../redux/slices/card/selectors";
import { doRobotTurn } from "../../redux/slices/gameState/gameStateSlice";

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
    <div>
      {cards.map((card, i) => (
        <div key={i}>{`${card.face} of ${card.suit}`}</div>
      ))}
    </div>
  );
};

export default RobotHand;
