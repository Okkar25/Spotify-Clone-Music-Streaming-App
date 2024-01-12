import axios from "axios";
import React, { useRef, useState } from "react";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";

const Volume = () => {
  const [{ token }, dispatch] = useStateProvider();
  const [mute, setMute] = useState(false); // speaker mute
  const volumeRef = useRef(0);

  // update volume according to volume bar value
  const setVolume = async (event) => {
    // speaker svg changes according to volume bar values
    if (event.target.value == 0) {
      setMute(true);
    } else {
      setMute(false);
    }
    
    // control volume request
    await axios.put(
      `https://api.spotify.com/v1/me/player/volume`,
      {}, // empty body
      {
        params: {
          volume_percent: parseInt(event.target.value),
        },
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
  };

  // speaker mute / unmute control
  const volumeControl = async (status) => {
    if (status === "off") {
      volumeRef.current.value = 0;
      setMute(!mute);

      await axios.put(
        `https://api.spotify.com/v1/me/player/volume`,
        {}, // empty body
        {
          params: {
            volume_percent: 0,
          },
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
    } else if (status === "on") {
      volumeRef.current.value = 50;
      setMute(!mute);

      await axios.put(
        `https://api.spotify.com/v1/me/player/volume`,
        {}, // empty body
        {
          params: {
            volume_percent: 50,
          },
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
    }
  };

  return (
    <Container>
      <div className="volume-wrap">
        {mute ? (
          <HiSpeakerXMark onClick={() => volumeControl("on")} />
        ) : (
          <HiSpeakerWave onClick={() => volumeControl("off")} />
        )}

        <input
          ref={volumeRef}
          type="range"
          min={0}
          max={100}
          onMouseUp={(event) => setVolume(event)}
        />
      </div>
    </Container>
  );
};

export default Volume;

const Container = styled.div`
  display: flex;
  padding-right: 4rem;
  justify-content: end;
  align-content: center;
  .volume-wrap {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;

    svg {
      font-size: 1.5rem;
      cursor: pointer;
    }

    input {
      width: 15rem;
      border-radius: 2rem;
      height: 0.3rem;
    }
  }
`;
