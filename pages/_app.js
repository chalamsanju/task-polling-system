import { StateContextProvider } from "../Context/index";


function MyApp({ Component, pageProps }) {
  return (
    <StateContextProvider>
      <Component {...pageProps} />
    </StateContextProvider>
  );
}

export default MyApp;
