import React from "react";
import { IoLibrary } from "react-icons/io5";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import styled from "styled-components";
import Playlists from "./Playlists";

const Container = styled.div`
  background-color: #121212;
  /* background-color: red; */
  /* z-index: 100; */
  color: #b3b3b3;
  display: flex;
  flex-direction: column;
  height: 100%;
  /* height: calc(100%); */
  /* overflow-y: auto; */
  width: 100%;

  .top__links {
    display: flex;
    flex-direction: column;

    .logo {
      text-align: center;
      margin: 1rem 0;

      img {
        max-inline-size: 70%;
        block-size: auto;
      }
    }

    ul {
      /* background-color: red; */
      list-style-type: none;
      display: flex;
      flex-direction: column;
      align-items: start;
      gap: 1rem;
      padding: 1rem 1rem 1rem 2rem;

      li {
        display: flex;
        align-items: center;
        gap: 1rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: white;
        }

        span {
          /* font-weight: bold; */
          font-size: 1.1rem;
          user-select: none;
        }

        .side-icons {
          font-size: 1.6rem;
        }
      }
    }
  }
`;

const Sidebar = () => {
  return (
    <Container>
      <div className="top__links">
        <div className="logo">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
            alt="spotify"
          />
        </div>

        <ul>
          <li>
            <MdHomeFilled className="side-icons" />
            <span>Home</span>
          </li>

          <li>
            <MdSearch className="side-icons" />
            <span>Search</span>
          </li>

          <li>
            <IoLibrary className="side-icons" />
            <span>Your Library</span>
          </li>
        </ul>
      </div>

      <Playlists />
    </Container>
  );
};

export default Sidebar;
