import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { useFormState } from "react-use-form-state";
import { gql, useQuery } from "@apollo/client";

import * as S from "./Home.styled";
import { AuthContext } from "../Auth/AuthProvider";
import WithBackground from "../Layout/WithBackground/WithBackground";
import WithAuth from "../Auth/WithAuth";
import Challenge from "../Challenge/Challenge";
import Spinner from "../Layout/Spinner/Spinner";
import Error from "../Layout/Error/Error";
import { useSprings, animated, useSpring } from "react-spring";
import Header from "../Scoreboard/Header/Header";
import Scoreboard from "../Scoreboard/Scoreboard";

interface Result {
  hasAccount: boolean;
}

const GET_USER_EXISTS = gql`
  query ($id: String!) {
    hasAccount(id: $id)
  }
`

const Home: React.FC = () => {
  const { profile } = useContext(AuthContext);
  const [formState, { radio, label }] = useFormState({ page: "0" }, {
    withIds: true,
    onChange: (event, oldValues, newValues) => {
      const index = parseInt(newValues.page);

      // @ts-ignore
      set((i: number) => {
        if (i === index) {
          return { x: 0 }
        } else {
          return { x: (i - index) * window.innerWidth }
        }
      })

      moreSet({ x: index * 150 });
    }
  });
  const result = useQuery<Result>(GET_USER_EXISTS, {
    variables: { id: profile?.sub }
  });

  const [props, set] = useSprings(2, i => ({ x: i * window.innerWidth }));
  const [moreProps, moreSet] = useSpring(() => ({ x: 0 }));

  if (result.loading) {
    return <Spinner/>
  }

  if (result.error) {
    return <Error error={result.error}/>
  }

  if (!result.data?.hasAccount) {
    return <Redirect to="/create-profile"/>
  }

  return (
    <S.Home>
      <Header/>

      <S.Nav>
        <S.Track>
          <S.Background style={{ transform: moreProps.x.interpolate(x => `translate3d(${x}px,0,0)`) }}/>
          <S.Radio {...radio("page", "0")} />
          <S.Label {...label("page", "0")}>Leaderboard</S.Label>
          <S.Radio {...radio("page", "1")} />
          <S.Label {...label("page", "1")}>Challenge</S.Label>
        </S.Track>
      </S.Nav>

      <S.Pages>
        <S.AnimatedPage style={{ transform: props[0].x.interpolate(x => `translate3d(${x}px,0,0)`) }}>
          <Scoreboard/>
        </S.AnimatedPage>

        <S.AnimatedPage style={{ transform: props[1].x.interpolate(x => `translate3d(${x}px,0,0)`) }}>
          <Challenge/>
        </S.AnimatedPage>
      </S.Pages>
    </S.Home>
  )
}
export default WithBackground(WithAuth(Home));
