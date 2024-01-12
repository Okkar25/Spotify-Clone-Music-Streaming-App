import React, { useRef } from "react";
import styled from "styled-components";
import { config } from "../config/Config";

const Login = () => {
  const inputRef = useRef();

  const handleClick = () => {
    const clientId = config.client_id;
    const redirectUrl = config.redirect_url;
    // const clientId = "cf6a647a18b6477e89f69356e5add9db";
    // const redirectUrl = "http://localhost:5173/";
    // const clientId = inputRef.current.value;
    const apiUrl = "https://accounts.spotify.com/authorize";
    // scopes => permission for third-party apps
    const scope = [
      "user-read-email",
      "user-read-private",
      "user-read-playback-state",
      "user-modify-playback-state",
      "user-read-currently-playing",
      "user-read-playback-position",
      "user-top-read",
      "user-read-recently-played",
      "user-library-modify",
      "user-library-read",
    ];

    // response_type=token => will be returned
    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(
      " "
    )}&response_type=token&show_dialog=true`;
  };

  return (
    <Container>
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png"
        alt="spotify"
      />

      {/* <input
        type="text"
        ref={inputRef}
        placeholder="Insert Your Spotify Client ID"
      /> */}

      <button onClick={handleClick}>Connect to Spotify</button>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #1db954;
  gap: 5rem;

  input {
    padding: 1rem 5rem;
    border: none;
    border-radius: 1rem;
    font-size: 1rem;
    &:focus {
      outline: none;
    }
  }

  img {
    height: 20vh;
  }

  button {
    padding: 1rem 5rem;
    border-radius: 5rem;
    border: none;
    background-color: black;
    color: #49f585;
    font-size: 1.4rem;
    cursor: pointer;
  }
`;
