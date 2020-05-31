import React, { useContext, useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";

import * as S from "./Home.styled";
import WithBackground from "../Layout/WithBackground/WithBackground";
import WithAuth from "../Auth/WithAuth";
import Challenge from "../Challenge/Challenge";
import Header from "./Header/Header";
import Leaderboard from "../Challenge/Leaderboard/Leaderboard";
import useHomeData from "./use-home-data";
import Spinner from "../Layout/Spinner/Spinner";
import Error from "../Layout/Error/Error";
import { AuthContext } from "../Auth/AuthProvider";

const Home: React.FC = () => {
  const { search } = useLocation();
  const { profile } = useContext(AuthContext);
  const result = useHomeData();
  const [userStanding, setUserStanding] = useState();
  const [page, setPage] = useState();
  const [pagesStyle, setPagesStyle] = useState();
  const [trackStyle, setTrackStyle] = useState();
  const [pages, setPages] = useState();
  const [track, setTrack] = useState();

  const pagesRef = useCallback((node) => setPages(node), []);
  const trackRef = useCallback((node) => setTrack(node), []);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const page = params.get("page") || "leaderboard";

    setPage(page);
  }, [search]);

  useEffect(() => {
    if (!pages || !track) {
      return;
    }

    const index = page === "leaderboard" ? 0 : 1;
    const options = {
      duration: 400,
      fill: "forwards",
      easing: "ease"
    };

    const pagesKeyframe = { transform: `translateX(${index * -100}vw)` };
    const trackKeyframe = { transform: `translateX(${index * 100}%)` };
    setPagesStyle(pagesKeyframe);
    setTrackStyle(trackKeyframe);

    pages.animate([pagesStyle || pagesKeyframe, pagesKeyframe], options);
    track.animate([trackStyle || trackKeyframe, trackKeyframe], options);
  }, [page, pages, track]);

  useEffect(() => {
    if (!result.data) {
      return;
    }

    const userStanding = result.data.leaderboard?.find((standing) => standing.user.id === profile.sub);
    setUserStanding(userStanding);
  }, [result.data]);

  if (result.error) {
    return <Error error={result.error}/>;
  }

  if (result.loading || !result.data) {
    return <Spinner/>;
  }

  return (
    <S.Home>
      <Header standing={userStanding}/>

      <S.Content>
        <S.Nav>
          <S.Track>
            <S.Background ref={trackRef}/>
            <S.Label active={page === "leaderboard" ? 1 : 0} to="?page=leaderboard">Leaderboard</S.Label>
            <S.Label active={page === "challenge" ? 1 : 0} to="?page=challenge">Challenge</S.Label>
          </S.Track>
        </S.Nav>

        <S.Pages ref={pagesRef}>
          <S.AnimatedPage>
            <Leaderboard standings={result.data.leaderboard}/>
          </S.AnimatedPage>

          <S.AnimatedPage>
            <Challenge challenge={result.data.challenge}/>
          </S.AnimatedPage>
        </S.Pages>
      </S.Content>
    </S.Home>
  );
};

export default WithBackground(WithAuth(Home));
