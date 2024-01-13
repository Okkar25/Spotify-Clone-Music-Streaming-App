import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  BsFillPauseCircleFill,
  BsFillPlayCircleFill,
  BsShuffle,
} from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FiRepeat } from "react-icons/fi";
import styled from "styled-components";
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";
import { calculateTime, convertMsToS } from "../utils/convertToSeconds";

const PlayerControls = ({ spin, setSpin }) => {
  const [{ token, playerState, currentlyPlaying, selectedPlaylist }, dispatch] =
    useStateProvider();

  const progressBarRef = useRef();
  const currentSongDuration = convertMsToS(currentlyPlaying?.duration);
  const [currentTime, setCurrentTime] = useState(0);

  // App starts => play if spotify is playing / pause if no music playing
  useEffect(() => {
    const AppStartPlayState = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      // if music is playing from app starts
      if (response.data.is_playing) {
        setSpin(true);

        await axios.put(
          `https://api.spotify.com/v1/me/player/play`,
          {}, // empty body
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );

        dispatch({
          type: reducerCases.SET_PLAYER_STATE,
          payload: { playerState: true },
        });
      }
    };

    AppStartPlayState();
  }, [token, dispatch]);

  const changeTrack = async (type) => {
    // post request => prev , next
    // body required {} empty
    await axios.post(
      `https://api.spotify.com/v1/me/player/${type}`,
      {}, // empty body
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );

    // shows the currently playing song and update in reducer
    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data !== "") {
      const { item } = response.data;
      const currentlyPlaying = {
        id: item.id,
        name: item.name,
        artists: item.artists.map((artist) => artist.name),
        image: item.album.images[1].url,
        isPlaying: response.data.is_playing,
      };

      dispatch({
        type: reducerCases.SET_PLAYING,
        payload: { currentlyPlaying },
      });
    } else {
      dispatch({
        type: reducerCases.SET_PLAYING,
        payload: { currentlyPlaying: null },
      });
    }
  };

  // control play - pause
  const changeState = async (state) => {
    // const state = playerState ? "pause" : "play";

    if (state === "play") {
      await axios.put(
        `https://api.spotify.com/v1/me/player/play`,
        {}, // empty body
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: reducerCases.SET_PLAYER_STATE,
        payload: { playerState: true },
      });
      setSpin(true);
    } else if (state === "pause") {
      await axios.put(
        `https://api.spotify.com/v1/me/player/pause`,
        {}, // empty body
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: reducerCases.SET_PLAYER_STATE,
        payload: { playerState: false },
      });
      setSpin(false);
    }
  };

  const updateProgressPosition = async () => {
    const currentPosition = (
      currentlyPlaying?.duration /
      (100 / progressBarRef.current.value)
    ).toFixed(0);

    await axios.put(
      `https://api.spotify.com/v1/me/player/seek?position_ms=${currentPosition}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
  };

  // console.log(currentlyPlaying)

  return (
    <Container>
      <div className="control-buttons">
        <div className="shuffle">
          <BsShuffle />
        </div>

        <div className="previous">
          <CgPlayTrackPrev onClick={() => changeTrack("previous")} />
        </div>

        <div className="state">
          {playerState ? (
            <BsFillPauseCircleFill onClick={() => changeState("pause")} />
          ) : (
            <BsFillPlayCircleFill onClick={() => changeState("play")} />
          )}
        </div>

        <div className="next">
          <CgPlayTrackNext onClick={() => changeTrack("next")} />
        </div>

        <div className="repeat">
          <FiRepeat />
        </div>
      </div>

      <div className="audio-player">
        <span>{calculateTime(currentTime)}</span>

        <input
          defaultValue="30"
          type="range"
          ref={progressBarRef}
          onMouseUp={updateProgressPosition}
        />

        <span>{currentSongDuration}</span>
      </div>
    </Container>
  );
};

export default PlayerControls;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  .audio-player {
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    span {
      user-select: none;
    }

    input {
      width: 20rem;
      height: 0.2rem;
      border-radius: 10px;
      &::-webkit-slider-runnable-track {
        width: 100%;
        height: 5px;
        background: gray;
        /* background: #1db954; */
        border-radius: 5px;
        border: none;
      }

      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        margin-top: -6px;
        cursor: pointer;
        /* background-color: red; */
      }
    }
  }

  .control-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    svg {
      cursor: pointer;
      color: #b3b3b3;
      transition: 0ms.2s ease-in-out;
      &:hover {
        color: white;
      }
    }

    .state {
      svg {
        color: white;
      }
    }

    .previous,
    .next,
    .state {
      font-size: 2rem;
    }
  }
`;
