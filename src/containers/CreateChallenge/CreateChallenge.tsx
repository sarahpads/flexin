import React, { useContext } from "react";
import { useFormState } from "react-use-form-state";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client";
import { AuthContext } from "../../components/AuthProvider";

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
  const { data } = useQuery(GET_EXERCISES);
  const [ createChallenge ] = useMutation(CREATE_CHALLENGE);

  const [formState, { number, label, select }] = useFormState()

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const { exercise, reps } = formState.values;
    createChallenge({ variables: { data: { exercise, reps: parseInt(reps), user: auth.session.sub }}});
    // TODO: redirect
  }

  // TODO: figure out validateion
  return (
    <form noValidate onSubmit={handleSubmit}>
      <select {...select("exercise")}>
        <option></option>
        {data && data.exercises.map((exercise: any) => {
          return <option key={exercise.id} value={exercise.id}>{exercise.title}</option>
        })}
      </select>

      <label {...label("reps")}>Reps</label>
      <input {...number("reps")}/>

      <button type="submit">Challenge!</button>
    </form>
  )
}

export default CreateChallenge;
