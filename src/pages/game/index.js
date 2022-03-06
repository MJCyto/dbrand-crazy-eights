import HumanHand from "./HumanHand";
import Pile from "./Pile";
import { useSelector } from "react-redux";
import { selectWhosTurn } from "../../redux/slices/gameState/selectors";
import PageWrapper from "../PageWrapper";
import RobotHand from "./RobotHand";

const GameScreen = () => {
  const whosTurn = useSelector(selectWhosTurn);
  return (
    <PageWrapper>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "-webkit-fill-available",
        }}
      >
        <RobotHand />
        {`It's the ${whosTurn}'s turn.`}
        <Pile />
        <br />
        <br />
        <HumanHand />
      </div>
    </PageWrapper>
  );
};

export default GameScreen;
