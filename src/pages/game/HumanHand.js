import { useSelector } from "react-redux";
import { selectHumanHand } from "../../redux/slices/card/selectors";
import CardElement from "./CardElement";

const HumanHand = props => {
  const cards = useSelector(selectHumanHand);
  console.log(cards);
  return (
    <div>
      {cards.map((card, i) => (
        <CardElement cardObj={card} key={i} />
      ))}
    </div>
  );
};

export default HumanHand;
