import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import routes from "../constants/routes";
import { initGame } from "../redux/slices/gameState/gameStateSlice";

const Home = () => {
  const [numCards, setNumCards] = useState();
  const [inputValidationError, setInputValidationError] = useState();
  const dispatch = useDispatch();
  const router = useRouter();

  const beginGame = () => {
    try {
      dispatch(initGame(numCards));
      router.push(routes.gameRoute);
    } catch (e) {
      setInputValidationError(e);
    }
  };

  return (
    <div>
      {inputValidationError?.message}
      <br />
      How many cards should we begin with? <input onChange={e => setNumCards(e.target.value)} />
      <button onClick={beginGame}>Begin</button>
    </div>
  );
};

export default Home;
