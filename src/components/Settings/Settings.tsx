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

interface Data {
  exercises: [{
    title: string;
    id: string;
  }],
  user: {
    exercises: [{
      reps: number;
      exercise: {
        id: string;
      }
    }]
  }
}

interface Exercise {
  exercise: {
    title: string;
    id: string;
  };
  reps: number | undefined;
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
  const [updateUserExercises] = useMutation(UPDATE_USER_EXERCISES);
  const result = useQuery<Data>(GET_DATA, {
    variables: { id: auth.profile?.sub }
  });
  const [exercises, setExercises] = useState([] as Exercise[]);

  useEffect(() => {
    if (!result.data) {
      return;
    }

    const exercises = result.data.exercises.map((exercise) => {
      const userExercise = result.data?.user.exercises.find((e) => {
        return e.exercise.id === exercise.id;
      });

      if (userExercise) {
        formState.setField(exercise.id, userExercise.reps);
      }

      return {
        exercise,
        reps: userExercise ? userExercise.reps : undefined
      }
    });

    setExercises(exercises);
  }, [result.data]);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const isMissingValues = exercises.some((exercise) => {
      return !formState.values[exercise.exercise.id];
    });

    if (Object.keys(formState.errors).length || isMissingValues) {
      return;
    }

    const userExercises = exercises.map((exercise) => {
      return {
        exercise: exercise.exercise.id,
        reps: parseInt(formState.values[exercise.exercise.id])
      }
    })

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
        {exercises.map((test: any) => {
          return <UserExercise
            key={test.exercise.id}
            exercise={test.exercise}
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
