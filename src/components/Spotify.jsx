// import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
// import { reducerCases } from "../utils/Constants";
// import { useStateProvider } from "../utils/StateProvider";
import { backgroundColors } from "../utils/BackgroundColor";
import { useStateProvider } from "../utils/StateProvider";
import Body from "./Body";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 85vh 15vh;

  .spotify__body {
    display: grid;
    grid-template-columns: 20vw 80vw;
    height: 100%;
    width: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 1));
    /* background-color: rgb(32, 87, 100); */
    background-color: ${(props) => props.themeColor};

    .body {
      height: 100%;
      width: 100%;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 0.5rem;

        &-thumb {
          background-color: rgba(255, 255, 255, 0.6);
          border-radius: 10px;
        }
      }
    }
  }
`;

const Spotify = () => {
  const [{ token, selectedPlaylistId }, dispatch] = useStateProvider();

  const bodyRef = useRef();
  const [navBackground, setNavBackground] = useState(false);
  const [headerBackground, setHeaderBackground] = useState(false);
  const [spin, setSpin] = useState(false);

  const bodyScrolled = () => {
    bodyRef.current.scrollTop >= 30
      ? setNavBackground(true)
      : setNavBackground(false);

    bodyRef.current.scrollTop >= 268
      ? setHeaderBackground(true)
      : setHeaderBackground(false);
  };

  const [themeColor, setThemeColor] = useState("");

  useEffect(() => {
    const randomColor = Math.floor(Math.random() * 20);
    setThemeColor(backgroundColors[randomColor]);
  }, [token, dispatch, selectedPlaylistId]);

  return (
    <Container themeColor={themeColor}>
      <div className="spotify__body">
        <Sidebar />

        <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
          <Navbar navBackground={navBackground} />

          <div className="body__contents">
            <Body
              headerBackground={headerBackground}
              spin={spin}
              setSpin={setSpin}
            />
          </div>
        </div>
      </div>

      <div className="spotify__footer">
        <Footer spin={spin} setSpin={setSpin} />
      </div>
    </Container>
  );
};

export default Spotify;
