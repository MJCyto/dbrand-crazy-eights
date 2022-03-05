import { useState } from "react";
import { useDispatch } from "react-redux";
import { initGame } from "../redux/slices/cardSlice";
import { useRouter } from "next/router";
import routes from "../constants/routes";

const Home = () => {
  const [numCards, setNumCards] = useState();
  const [inputValidationError, setInputValidationError] = useState();
  const dispatch = useDispatch();
  const router = useRouter();

  const beginGame = () => {
    // dispatch(initGame(numCards))
    //   .then(() => router.push(routes.gameRoute))
    //   .catch(setInputValidationError);

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
