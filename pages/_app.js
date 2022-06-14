import SSRProvider from "react-bootstrap/SSRProvider";
import "../styles/main.scss";

function App({ Component, pageProps }) {
  return (
    <SSRProvider>
      <Component {...pageProps} />
    </SSRProvider>
  );
}

export default App;
