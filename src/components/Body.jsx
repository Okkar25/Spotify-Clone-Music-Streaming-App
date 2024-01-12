import axios from "axios";
import React, { useEffect } from "react";
import { AiFillClockCircle } from "react-icons/ai";
import styled from "styled-components";
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";
import { convertMsToHMS, convertMsToS } from "../utils/convertToSeconds";

const Body = ({ headerBackground }) => {
  const [
    { token, userInfo, selectedPlaylistId, selectedPlaylist, playerState },
    dispatch,
  ] = useStateProvider();

  useEffect(() => {
    const getInitialPlaylist = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
        {
          headers: {
            Authorization: "Bearer " + token, //
            "Content-Type": "application/json",
          },
        }
      );

      // console.log(response.data);

      const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        image: response.data.images[0].url,
        description: response.data.description.startsWith("<a")
          ? ""
          : response.data.description,
        type: response.data.type,
        song_number: response.data.tracks.total,
        added_at: response.data.tracks.items.map((date) =>
          date.added_at.substring(0, 10)
        ),

        tracks: response.data.tracks.items.map(({ track }) => ({
          id: track.id,
          track_name: track.name,
          artists: track.artists.map((artist) => artist.name),
          duration: track.duration_ms,
          track_image: track.album.images[0].url,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
        })),
      };

      dispatch({
        type: reducerCases.SET_PLAYLIST,
        payload: { selectedPlaylist },
      });
    };

    getInitialPlaylist();
  }, [token, dispatch, selectedPlaylistId]);

  // console.log(selectedPlaylist);

  // calculation of total songs duration
  const durationInMs = selectedPlaylist?.tracks?.reduce(
    (pv, cv) => pv + cv.duration,
    0
  );

  const durationInOrder = convertMsToHMS(durationInMs);

  // console.log(selectedPlaylist.tracks)

  // click on selected soundtrack to play
  const playTrack = async (
    id,
    name,
    artists,
    context_uri,
    image,
    track_number
  ) => {
    await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        context_uri,
        offset: {
          position: track_number - 1,
        },
        position_ms: 0,
      },
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
  };

  return (
    <Container headerBackground={headerBackground}>
      {selectedPlaylist && (
        <>
          <div className="playlist">
            {/* highlighted playlist header */}
            <div className="playlist-highlight">
              <div className="image">
                <img src={selectedPlaylist.image} alt="selectedPlaylist" />
              </div>

              <div className="details">
                <span className="type">
                  {selectedPlaylist.type.toUpperCase()}
                </span>
                <h1 className="title">{selectedPlaylist.name}</h1>
                <p children="description">
                  {userInfo.userName} . {selectedPlaylist.song_number} songs .{" "}
                  {durationInOrder}
                </p>
              </div>
            </div>

            <div className="list">
              {/* title bar  */}
              <div className="header__row">
                <div className="col">
                  <span>#</span>
                </div>

                <div className="col">
                  <span>Title</span>
                </div>

                <div className="col">
                  <span>Album</span>
                </div>

                <div className="col">
                  <span>Date added</span>
                </div>

                <div className="col">
                  <span>
                    <AiFillClockCircle />
                  </span>
                </div>
              </div>

              {/* tracks display */}
              <div className="tracks">
                {selectedPlaylist.tracks.map(
                  (
                    {
                      id,
                      track_name,
                      artists,
                      track_image,
                      duration,
                      album,
                      context_uri,
                      track_number,
                    },
                    index
                  ) => {
                    // fixing each song duration format
                    const durationInOrder = convertMsToS(duration);

                    return (
                      <div
                        className="row"
                        key={index}
                        onClick={() =>
                          playTrack(
                            id,
                            track_name,
                            artists,
                            context_uri,
                            track_image,
                            track_number
                          )
                        }
                      >
                        <div className="col">
                          <span>{index + 1}</span>
                        </div>

                        <div className="col detail">
                          <div className="track-image">
                            <img src={track_image} alt="track" />
                          </div>

                          <div className="info">
                            <span className="name">{track_name}</span>
                            <span className="artists">
                              {artists.join(", ")}
                            </span>
                          </div>
                        </div>

                        <div className="col album">
                          <span>{album}</span>
                        </div>

                        <div className="col">
                          <span>{selectedPlaylist.added_at[index]}</span>
                        </div>

                        <div className="col">
                          <span>{durationInOrder}</span>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default Body;

const Container = styled.div`
  .playlist {
    margin: 0 2rem;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 0.5rem;

    .playlist-highlight {
      display: flex;
      gap: 2rem;
      align-items: end;
      .image {
        img {
          height: 15rem;
          box-shadow: rgba(0, 0, 0, 0.5) 0px 25px 50px -12px;
        }
      }
      .details {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        color: #e0dede;
        .title {
          color: white;
          font-size: 4rem;
          margin: 0;
        }
      }
    }

    .list {
      color: white;
      width: 100%;

      .header__row {
        display: grid;
        grid-template-columns: 0.3fr 3fr 2fr 2fr 0.1fr;
        color: #dddcdc;
        margin: 1rem 0 0 0;
        position: sticky;
        top: 12vh;
        padding: 1rem 2rem;
        /* background-color: #1a1a1a; */
        border-radius: 10px;
        transition: 0.3s ease-in-out;
        background-color: ${({ headerBackground }) =>
          headerBackground ? "#000000dc" : "none"};
      }

      .tracks {
        user-select: none;
        margin: 0.2rem;
        display: flex;
        flex-direction: column;
        margin-bottom: 5rem;
        padding: 0 1rem;

        .row {
          padding: 0.5rem 1rem;
          display: grid;
          grid-template-columns: 0.3fr 3fr 2.1fr 1.9fr 0.1fr;
          &:hover {
            border-radius: 10px;
            background-color: #2a2a2a;
            .col {
              color: white;
            }
          }

          .album {
            width: 80%;
            word-wrap: break-word;
            /* white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis; 
            resize: horizontal; */
          }

          .col {
            display: flex;
            align-items: center;
            color: #a3a3a3;
            img {
              height: 50px;
              border-radius: 7px;
            }
          }

          .detail {
            display: flex;
            gap: 1rem;
            .info {
              display: flex;
              flex-direction: column;
              gap: 0.5rem;

              .name {
                color: white;
                /* width: 90%;
                word-wrap: break-word; */
              }

              .artists {
                font-size: 0.9rem;
                width: 99%;
                word-wrap: break-word;
              }
            }
          }
        }
      }
    }
  }
`;
