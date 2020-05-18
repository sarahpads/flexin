import React from "react";
import { useFormState } from "react-use-form-state";
import { gql, useQuery } from "@apollo/client";

import * as S from "./Home.styled";
import WithBackground from "../Layout/WithBackground/WithBackground";
import WithAuth from "../Auth/WithAuth";
import Challenge from "../Challenge/Challenge";
import { useSprings, useSpring } from "react-spring";
import Header from "./Header/Header";
import Leaderboard from "../Leaderboard/Leaderboard"
import useLeaderboard from "../Leaderboard/use-leaderboard";
import Spinner from "../Layout/Spinner/Spinner";
import Error from "../Layout/Error/Error";

interface Result {
  users: { id: string, name: string }[],
  challenges: {
    id: string;
    responses: { user: { id: string }, flex: number }[]
  }[]
}

const GET_DATA = gql`
  query {
    users {
      id,
      name
    },
    challenges {
      id,
      createdAt,
      responses {
        user { id },
        flex
      }
    }
  }
`

const Home: React.FC = () => {
  const result = useQuery<Result>(GET_DATA);
  const {standings, userStanding} = useLeaderboard(result.data?.users, result.data?.challenges)
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

  const [props, set] = useSprings(2, i => ({ x: i * window.innerWidth }));
  const [moreProps, moreSet] = useSpring(() => ({ x: 0 }));

  if (result.loading) {
    return <Spinner/>
  }

  if (result.error) {
    return <Error error={result.error}/>
  }

  return (
    <S.Home>
      <Header standing={userStanding}/>

      <S.Test>
        <S.Nav>
          <S.Track>
            <S.Background style={{ transform: moreProps.x.interpolate(x => `translate3d(${x}px,0,0)`) }} />
            <S.Radio {...radio("page", "0")} />
            <S.Label {...label("page", "0")}>Leaderboard</S.Label>
            <S.Radio {...radio("page", "1")} />
            <S.Label {...label("page", "1")}>Challenge</S.Label>
          </S.Track>
        </S.Nav>

        <S.Pages>
          <S.AnimatedPage style={{ transform: props[0].x.interpolate(x => `translate3d(${x}px,0,0)`) }}>
            <Leaderboard standings={standings}/>
          </S.AnimatedPage>

          <S.AnimatedPage style={{ transform: props[1].x.interpolate(x => `translate3d(${x}px,0,0)`) }}>
            <Challenge />
          </S.AnimatedPage>
        </S.Pages>
      </S.Test>
    </S.Home>
  )
}

export default WithBackground(WithAuth(Home));
