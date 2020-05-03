import React, { useContext, useState, useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";

import * as S from "./Settings.styled";
import WithBackground from "../WithBackground/WithBackground";
import { AuthContext } from "../AuthProvider";
import UserExercise from "../UserExercise/UserExercise";
import { useFormState } from "react-use-form-state";

interface SettingsProps {
  onClose: Function;
}

const GET_DATA = gql`
  query User($id: String!) {
    exercises { title, id }
    user(id: $id) {
      exercises { reps, exercise { id } }
    }
  }
`

const UPDATE_USER_EXERCISES = gql`
  mutation UpdateUserExercises($data: UpdateUserExercisesInput!) {
    updateUserExercises(data: $data) { reps exercise { id } }
  }
`

const Settings: React.FC<SettingsProps> = ({
  onClose
}) => {
  const auth = useContext(AuthContext);
  const [formState, { number, label }] = useFormState()
  const [ updateUserExercises ] = useMutation(UPDATE_USER_EXERCISES);
  const data = useQuery(GET_DATA, {
    variables: { id: auth.profile?.sub }
  });
  const [test, setTest] = useState();

  useEffect(() => {
    if(!data.data) {
      return;
    }

    const test = data.data.exercises.map((exercise: any) => {
      const userExercise = data.data.user.exercises.find((e: any) => {
        return e.exercise.id === exercise.id;
      });

      return {
        exercise,
        reps: userExercise ? userExercise.reps : undefined
      }
    });

    setTest(test);
  }, [data.data])

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const userExercises = data.data.exercises.map((exercise: any) => {
      return {
        exercise: exercise.id,
        reps: parseInt(formState.values[exercise.id])
      }
    })

    console.log(userExercises)
    updateUserExercises({ variables: { data: { user: auth.profile.sub, exercises: userExercises }}})
  }

  return (
    <div>
      <S.H1>Benchmarks</S.H1>
      <S.P>
        What is your typical max for each exercise?
        These values are used to calculate how much you're flexin'.
      </S.P>

      <form noValidate onSubmit={handleSubmit}>
        {test?.map((test: any) => {
          return <UserExercise
            key={test.exercise.id}
            exercise={test.exercise}
            reps={test.reps}
            formControl={number(test.exercise.id)}
            label={label(test.exercise.id)}
          />;
        })}

        <S.Button type="submit">Save</S.Button>
      </form>

      <S.Cancel>
        <S.Link as="button" onClick={() => onClose()}>Cancel</S.Link>
      </S.Cancel>
    </div>
  )
}

export default WithBackground(Settings, {
  origin: "top right",
  animateOut: true,
  animation: "clip"
});
