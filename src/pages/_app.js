import '../styles/globals.css'
import withReduxStore from "../redux/withReduxStore";
import { Provider } from 'react-redux'


function MyApp({ Component, pageProps, reduxStore }) {
  return <Provider store={reduxStore}><Component {...pageProps} /></Provider>
}

export default withReduxStore(MyApp)
