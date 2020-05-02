import React, { useContext, useState } from "react";
import { useFormState } from 'react-use-form-state';
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client";

import { AuthContext } from "../../components/AuthProvider";
import { Redirect } from "react-router";
import WithBackground from "../../components/WithBackground/WithBackground";
import WithAuth from "../../components/WithAuth";

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

  const [formState, { number, text, label }] = useFormState({
    name: profile.name,
    email: profile.email
  }, { withIds: true });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { name, email } = formState.values;
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
    <form noValidate onSubmit={handleSubmit}>
      <label {...label("name")}>Name</label>
      <input {...text("name")}/>

      <label {...label("email")}>email</label>
      <input {...text("email")}/>

      {data && data.exercises.map((exercise: any) => {
        return (
          <React.Fragment key={exercise.id}>
            <label {...label(exercise.id)}>{exercise.title}</label>
            <input {...number(exercise.id)}/>
          </React.Fragment>
        );
      })}

      <button type="submit">Submit</button>
    </form>
  );
}

export default WithBackground(WithAuth(CreateProfile));
