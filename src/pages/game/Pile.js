import { useSelector } from "react-redux";
import { selectPile } from "../../redux/slices/card/selectors";
import CardElement from "./CardElement";

const Pile = props => {
  const cards = useSelector(selectPile);

  return (
    <div>
      <CardElement cardObj={cards[cards.length - 1]} nonSelectable />
    </div>
  );
};

export default Pile;
