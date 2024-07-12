import React from "react";
import styled from "styled-components";

const Container = styled.div`
  max-height: 10vh;
  width: 100%;
  user-select: none;
  display: flex;
  flex-direction: column;

  .album {
    padding: 0.1rem;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 1.5rem;
    transition: 0.1s ease-in-out;
    &:hover {
      background-color: #1a1a1a;
      border-radius: 8px;
    }

    .album-photo {
      img {
        max-height: 60px;
        max-width: 60px;
        border-radius: 5px;
        cursor: pointer;
      }
    }

    .album-details {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      .album-name {
        color: white;
        cursor: pointer;
      }

      .song-number {
        font-size: 0.9rem;
        color: #a7a7a7;
      }
    }
  }
`;

const Album = ({ props: { id, name, images, tracks, type } }) => {
  // const [{ token, playlists, selectedPlaylistId }, dispatch] =
  //   useStateProvider();

  // const handlePlaylistId = () => {
  //   dispatch({
  //     type: reducerCases.SET_PLAYLIST_SONGS,
  //     payload: { playlistId: id },
  //   });
  // };

  // console.log(selectedPlaylistId);
  // console.log(images[0].url);

  // Check if images exist and if the first image is available
  const imageUrl = images && images.length > 0 ? images[0].url : null;

  return (
    <Container>
      {/* <div className="album" onClick={handlePlaylistId}> */}
      <div className="album">
        <div className="album-photo">
          {/* Conditionally render the img tag */}
          {imageUrl && <img src={imageUrl} alt="" />}
        </div>

        <div className="album-details">
          <div className="album-name">{name}</div>
          <div className="song-number">
            <span>
              {type} . {tracks.total} songs
            </span>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Album;
