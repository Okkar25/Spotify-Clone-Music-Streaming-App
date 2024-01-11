import axios from "axios";
import React, { useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { FaBell, FaSearch } from "react-icons/fa";
import { HiArrowDown } from "react-icons/hi";
import styled from "styled-components";
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  height: 3vh;
  position: sticky;
  top: 0;
  transition: 0.3s ease-in-out;
  /* background-color: #1C4C58; */
  /* background-color: #1E525E; */
  background-color: ${({ navBackground }) =>
    navBackground ? "rgba(0,0,0,0.7)" : "none"};

  .search__bar {
    background-color: white;
    width: 30%;
    padding: 0.4rem 1rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    .search-icon {
      font-size: 1.3rem;
    }
    input {
      height: 2rem;
      width: 100%;
      border: none;
      &:focus {
        outline: none;
      }
    }
  }

  .profile-details {
    display: flex;
    gap: 0.5rem;
    /* pointer-events: none;
    user-select: none; */

    .avatar,
    .install-app {
      background-color: #080808;
      padding: 0.3rem 0.4rem;
      padding-right: 1rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;

      a {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        text-decoration: none;
        color: white;
        padding: 0.3rem;
        svg {
          font-size: 1.1rem;
          color: #c7c5c5;
        }
      }
    }

    .bell {
      background-color: #080808;
      padding: 0.3rem 0.4rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      a {
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        padding: 0.3rem;
        svg {
          font-size: 1.1rem;
          color: #c7c5c5;
        }
      }
    }

    .install-app a svg {
      font-size: 1rem;
    }
  }
`;

const Navbar = ({ navBackground }) => {
  const [{ token, userInfo }, dispatch] = useStateProvider();

  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });

      const userInfo = {
        userId: data.id,
        userName: data.display_name,
        userEmail: data.email,
      };

      dispatch({ type: reducerCases.SET_USER, payload: { userInfo } });
    };

    getUserInfo();
  }, [token, dispatch]);

  // console.log(userInfo);

  return (
    <Container navBackground={navBackground}>
      <div className="search__bar">
        <FaSearch className="search-icon" />
        <input type="text" placeholder="What do you want to listen to?" />
      </div>

      <div className="profile-details">
        <div className="install-app">
          <a href="#">
            <HiArrowDown />
            Install App
          </a>
        </div>

        <div className="bell">
          <a href="#">
            <FaBell />
          </a>
        </div>

        <div className="avatar">
          <a href="#">
            <CgProfile />
            <span>{userInfo?.userName}</span>
          </a>
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
