import "../styles/globals.css";

//internal imports
import {Navbar} from "../components/Navbar/Navbar";


const App = ({ Component, pageProps }) => (
  <div>
    <Navbar />
    <Component {...pageProps} />
  </div>
);

export default App;

