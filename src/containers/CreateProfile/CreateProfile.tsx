import React, { useContext, useState } from "react";
import { useFormState } from 'react-use-form-state';
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client";

import { AuthContext } from "../../components/AuthProvider";
import { Redirect } from "react-router";

const GET_EXERCISES = gql`
  query Exercise {
    exercises { title, id }
  }
`

const CREATE_PROFILE = gql`
  mutation CreateUser($data: CreateUserInput!) {
    createUser(data: $data) { id, name, email}
  }
`

const CREATE_USER_EXERCISE = gql`
  mutation CreateUserExercise($data: CreateUserExerciseInput!) {
    createUserExercise(data: $data) {
      exercise { title },
      reps
    }
  }
`

const CreateProfile: React.FC = () => {
  const { session } = useContext(AuthContext)
  const [ shouldRedirect, setShoulRedirect ] = useState(false);
  const { data } = useQuery(GET_EXERCISES);
  const [ createUser ] = useMutation(CREATE_PROFILE);
  const [ createUserExercise ] = useMutation(CREATE_USER_EXERCISE);

  const [formState, { number, text, label }] = useFormState({
    name: session.name,
    email: session.email
  }, { withIds: true });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { name, email } = formState.values;
    createUser({ variables: { data: { id: session.sub, name, email }}})

    for (const exercise of data.exercises) {
      const reps = parseInt(formState.values[exercise.id]);
      createUserExercise({ variables: { data: { exercise: exercise.id, reps, user: session.sub }}});
    }

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

export default CreateProfile;
