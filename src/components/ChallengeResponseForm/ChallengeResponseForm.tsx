import React, { useContext } from "react";
import { useFormState } from "react-use-form-state";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { AuthContext } from "../AuthProvider";

interface ChallengeResponseFormProps {
  challenge: {
    id: string;
    exercise: {
      title: string;
    }
  }
}

const CREATE_RESPONSE = gql`
  mutation CreateResponse($data: CreateResponseInput!) {
    createResponse(data: $data) { challenge { id } reps }
  }
`

const ChallengeResponseForm: React.FC<ChallengeResponseFormProps> = ({
  challenge
}) => {
  const [formState, { number, label }] = useFormState();
  const [createResponse] = useMutation(CREATE_RESPONSE);
  const { session } = useContext(AuthContext);

  // TODO: redirect
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { reps } = formState.values;

    createResponse({ variables: { data: { challenge: challenge.id, user: session.sub, reps: parseInt(reps) } } });
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <label {...label("reps")}>Reps</label>
      <input {...number("reps")} />
    </form>
  )
}

export default ChallengeResponseForm;
