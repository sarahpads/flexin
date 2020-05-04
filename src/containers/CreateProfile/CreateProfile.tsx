import React, { useContext, useState } from "react";
import { useFormState } from 'react-use-form-state';
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client";

import * as S from "./CreateProfile.styled";
import { AuthContext } from "../../components/AuthProvider";
import { Redirect } from "react-router";
import WithBackground from "../../components/WithBackground/WithBackground";
import WithAuth from "../../components/WithAuth";
import UserExercise from "../../components/UserExercise/UserExercise";

const GET_EXERCISES = gql`
  query Exercise {
    exercises { title, id }
  }
`

const CREATE_PROFILE = gql`
  mutation CreateProfile($data: CreateUserInput!) {
    createProfile(data: $data) { id, name, email}
  }
`

const CreateProfile: React.FC = () => {
  const { profile } = useContext(AuthContext)
  const [ shouldRedirect, setShoulRedirect ] = useState(false);
  const { data } = useQuery(GET_EXERCISES);
  const [ createProfile ] = useMutation(CREATE_PROFILE);

  const [formState, { number, label }] = useFormState();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { name, email } = profile;

    const isMissingValues = data.exercises.some((exercise: any) => {
      return !formState.values[exercise.id];
    });

    if (Object.keys(formState.errors).length || isMissingValues) {
      return;
    }

    const userExercises = data.exercises.map((exercise: any) => {
      const reps = parseInt(formState.values[exercise.id]);
      return { data: { exercise: exercise.id, reps, user: profile.sub }}
    })

    createProfile({ variables: { data: { id: profile.sub, name, email, exercises: userExercises }}})

    setShoulRedirect(true);
  }

  if (shouldRedirect) {
    return <Redirect to="/"/>
  }

  return (
    <div>
      <S.H1>Hey there, {profile.given_name}</S.H1>
      <S.P>
        Before you get started, enter some benchmarks.
        These values will be used to calculate how much you're flexin'.
      </S.P>

      <form noValidate onSubmit={handleSubmit}>
        {data && data.exercises.map((exercise: any) => {
          return <UserExercise
            key={exercise.id}
            exercise={exercise}
            formControl={number(exercise.id)}
            label={label(exercise.id)}
          />
        })}

        <S.Button type="submit">Get Flexin'</S.Button>
      </form>
    </div>
  );
}

export default WithBackground(WithAuth(CreateProfile));
