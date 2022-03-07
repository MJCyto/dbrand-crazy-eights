import { useSelector } from "react-redux";
import { selectHumanHand } from "../../redux/slices/card/selectors";
import CardElement from "../../shared/CardElement";

const HumanHand = props => {
  const { onPlayCard } = props;

  const cards = useSelector(selectHumanHand);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      {cards.map((card, i) => (
        <CardElement cardObj={card} key={i} playCard={onPlayCard} />
      ))}
    </div>
  );
};

export default HumanHand;
