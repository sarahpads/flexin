import React, { useContext } from "react";
import { useFormState } from "react-use-form-state";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client";

import * as S from "./CreateChallenge.styled";
import { AuthContext } from "../../components/AuthProvider";
import WithBackground from "../../components/WithBackground/WithBackground";
import Button from "../../components/Button/Button";
import ThemeContext from "../../components/ThemeProvider";

const GET_EXERCISES = gql`
  query {
    exercises { title, id }
  }
`

const CREATE_CHALLENGE = gql`
  mutation CreateChallenge($data: CreateChallengeInput!) {
    createChallenge(data: $data) { id, exercise { title } }
  }
`

const CreateChallenge: React.FC = () => {
  const auth = useContext(AuthContext);
  const palette = useContext(ThemeContext);
  const { data } = useQuery(GET_EXERCISES);
  const [ createChallenge ] = useMutation(CREATE_CHALLENGE);

  // TODO: ensure leading 0 when under 2 digits
  const [formState, { number, label, select }] = useFormState({ reps: "04" })

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const { exercise, reps } = formState.values;
    createChallenge({ variables: { data: { exercise, reps: parseInt(reps), user: auth.profile.sub }}});
    // TODO: redirect
  }

  // TODO: figure out validation
  return (
    <React.Fragment>
      <S.Form noValidate onSubmit={handleSubmit}>
        <S.Circle background={palette?.dark}>
          <S.Output>100%</S.Output>
          <S.Benchmark>This is your typical output</S.Benchmark>
        </S.Circle>

        <S.Label {...label("exercise")}>What are you kicking ass at?</S.Label>
        <S.Select>
          <S.SelectInput {...select("exercise")}>
            <option>Choose an exercise</option>
            {data && data.exercises.map((exercise: any) => {
              return <option key={exercise.id} value={exercise.id}>{exercise.title}</option>
            })}
          </S.SelectInput>
        </S.Select>

        <S.Reps>
          <S.Label {...label("reps")}>How many times?</S.Label>
          <S.RepsInput {...number("reps")}/>
          <span>reps</span>
        </S.Reps>

        <S.Button color={palette?.neutral}>Challenge!</S.Button>
      </S.Form>

      <S.Cancel>
        <S.Link to="/">or wimp out</S.Link>
      </S.Cancel>
    </React.Fragment>
  )
}

export default WithBackground(CreateChallenge);
