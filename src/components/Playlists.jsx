import axios from "axios";
import React, { useEffect } from "react";
import styled from "styled-components";
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";
import Album from "./Album";

// styled components

const Container = styled.div`
  height: 100%;
  overflow: hidden;

  ul {
    // error fixed - height 50vh
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    /* max-height: calc(100% - 85vh); */
    max-height: 50vh;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.4rem;

      &-thumb {
        background-color: rgba(255, 255, 255, 0.6);
        border-radius: 10px;
      }
    }

    li {
      display: flex;
      align-items: center;
      gap: 1rem;
      cursor: pointer;
      transition: 0.3s ease-in-out;

      &:hover {
        color: white;
      }
    }
  }
`;

const Playlists = () => {
  const [{ token, playlists }, dispatch] = useStateProvider();

  useEffect(() => {
    const getPlaylistData = async () => {
      // get current user's playlist
      const response = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            Authorization: "Bearer " + token, // 'Authorization: Bearer token'
            "Content-Type": "application/json",
          },
        }
      );

      const { items } = response.data;
      const playlists = items.map(({ name, id, images, tracks, type }) => {
        return { name, id, images, tracks, type };
      });

      dispatch({ type: reducerCases.SET_PLAYLISTS, payload: { playlists } });
    };

    getPlaylistData();
  }, [token, dispatch]);

  // console.log(playlists);

  return (
    <Container>
      <ul>
        {playlists.map((props) => (
          <Album key={props.id} props={props} />
        ))}
      </ul>
    </Container>
  );
};

export default Playlists;
