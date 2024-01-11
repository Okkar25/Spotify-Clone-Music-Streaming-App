import React, { useEffect } from "react";
import Login from "./components/Login";
import Spotify from "./components/Spotify";
import { reducerCases } from "./utils/Constants";
import { useStateProvider } from "./utils/StateProvider";

const App = () => {
  const [{ token }, dispatch] = useStateProvider(); // useReducer // token => null

  // getting # access token every time window load
  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      // substring => removing hash # // split => & [0]  // split => = [1]
      const token = hash.substring(1).split("&")[0].split("=")[1];
      dispatch({ type: reducerCases.SET_TOKEN, payload: { token: token } });
    }
  }, [token, dispatch]);

  // console.log(token);

  return <div>{token ? <Spotify /> : <Login />}</div>;
};

export default App;
