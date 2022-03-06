import "../styles/globals.css";
import withReduxStore from "../redux/withReduxStore";
import { Provider } from "react-redux";
import { debounce } from "lodash";
import { saveState } from "../redux/browserStorage";
import { store } from "../redux/store";
import { useEffect, useState } from "react";
import "../public/fonts/style.css";

store.subscribe(
  debounce(() => {
    saveState(store.getState());
  }, 800)
);
function MyApp({ Component, pageProps, reduxStore }) {
  const [storeToUse, setStoreToUse] = useState(reduxStore);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setStoreToUse(store);
    }
  }, []);
  return (
    <>
      <Provider store={storeToUse}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default withReduxStore(MyApp);
