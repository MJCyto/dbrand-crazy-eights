import { useSelector } from "react-redux";
import { selectHumanHand } from "../../redux/slices/card/selectors";
import CardElement from "./CardElement";
import { Alert } from "@mui/material";
import { useRef, useState } from "react";
import { CardFaces, CardSuits } from "../../constants/cardValues";
import { Players } from "../../constants/gameStates";

const HumanHand = props => {
  const cards = useSelector(selectHumanHand);
  const [gameplayError, setGameplayError] = useState();
  const errorTimeout = useRef();

  const onError = e => {
    clearTimeout(errorTimeout.current);
    setGameplayError(e);
    errorTimeout.current = setTimeout(() => {
      setGameplayError();
    }, 5000);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      {gameplayError && (
        <Alert variant="outlined" severity="error">
          {gameplayError.message}
        </Alert>
      )}
      {cards.map((card, i) => (
        <CardElement cardObj={card} onError={onError} key={i} />
      ))}
    </div>
  );
};

export default HumanHand;
