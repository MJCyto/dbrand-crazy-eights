import { useSelector } from "react-redux";
import { selectHumanHand } from "../../redux/slices/card/selectors";
import Card from "./Card";

const HumanHand = props => {
  const cards = useSelector(selectHumanHand);
  console.log(cards);
  return (
    <div>
      {cards.map((card, i) => (
        <Card cardObj={card} key={i} />
      ))}
    </div>
  );
};

export default HumanHand;
