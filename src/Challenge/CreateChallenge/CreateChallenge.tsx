import React, { useContext, useEffect, useState } from "react";
import { useFormState } from "react-use-form-state";
import { Redirect } from "react-router-dom";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client";

import * as S from "./CreateChallenge.styled";
import { AuthContext } from "../../Auth/AuthProvider";
import WithBackground from "../../Layout/WithBackground/WithBackground";
import WithAuth from "../../Auth/WithAuth";
import Error from "../../Layout/Error/Error";

interface Result {
  exercises: { title: string; id: string}[];
  user: {
    exercises: { reps: number, exercise: { id: string } }[]
  }
}

const GET_DATA = gql`
  query Data($userId: String!) {
    exercises { title, id },
    user (id: $userId) {
      exercises { reps, exercise { id } }
    }
  }
`

const CREATE_CHALLENGE = gql`
  mutation CreateChallenge($data: CreateChallengeInput!) {
    createChallenge(data: $data) { id, exercise { title } }
  }
`

const CreateChallenge: React.FC = () => {
  const [error, setError] = useState();
  const auth = useContext(AuthContext);
  const [createChallenge] = useMutation(CREATE_CHALLENGE, {
    onError: (error) => setError(error)
  });
  const result = useQuery<Result>(GET_DATA, {
    variables: { userId: auth.profile.sub }
  });
  // https://github.com/wsmd/react-use-form-state/issues/75
  // can't use the built-in "onChange" events because they cache the closures
  // meaning we won't have access to the current values from apollo
  const [formState, { number, label, select }] = useFormState({ reps: 0 })
  const [flex, setFlex] = useState(0);
  const [message, setMessage] = useState();
  const [shouldRedirect, setShouldRedirect] = useState();

  useEffect(() => {
    const { exercise, reps } = formState.values;

    if (!result.data || !exercise || !reps) {
      return;
    }

    const userExercise = result.data.user.exercises.find((userExercise) => {
      return userExercise.exercise.id === exercise;
    })

    if (!userExercise) {
      return;
    }

    const flex = Math.ceil((reps / userExercise.reps) * 100);

    setFlex(flex);
    setMessage(getMessage(flex));
  }, [formState.values])

  const getMessage = (flex: number): string => {
    switch(true) {
      case flex < 50:
        return "That's pathetic"

      case flex > 50 && flex < 90:
        return "We both know you can do better than that"

      case flex < 100:
        return "That's your typical output";

      default:
        return "Now you're flexin'!"
    }
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // the library only validates inputs on blur/touch, so we
    // need to check for the presense of these fields directly
    const { exercise, reps } = formState.values;

    if (Object.keys(formState.errors).length || !exercise || !reps) {
      return;
    }

    createChallenge({ variables: { data: { exercise, reps: parseInt(reps), user: auth.profile.sub }}});

    setShouldRedirect(true);
  }

  if (shouldRedirect) {
    return <Redirect to="/"/>
  }

  if (result.error || error) {
    return <Error error={result.error || error}/>
  }

  return (
    <React.Fragment>
      <S.Form noValidate onSubmit={handleSubmit}>
        <S.Circle>
          <S.Output>{flex}%</S.Output>
          <S.Benchmark>
            {!flex
              ? "Fill in the form, dummy"
              : message
            }
          </S.Benchmark>
        </S.Circle>

        <S.Label {...label("exercise")}>What are you kicking ass at?</S.Label>
        <S.Select as="div">
          <S.SelectInput {...select("exercise")} required>
            <option>Choose an exercise</option>
            {result.data && result.data.exercises.map((exercise: any) => {
              return <option key={exercise.id} value={exercise.id}>{exercise.title}</option>
            })}
          </S.SelectInput>
        </S.Select>

        <S.Reps>
          <S.RepsInput {...number("reps")} min="0" max="999" required/>
          <span>reps</span>
        </S.Reps>

        <S.Button>Challenge!</S.Button>
      </S.Form>

      <S.Cancel>
        <S.Link to="/">or wimp out</S.Link>
      </S.Cancel>
    </React.Fragment>
  )
}

export default WithBackground(WithAuth(CreateChallenge));
