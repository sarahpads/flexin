import React, { useContext } from "react";
import { useFormState } from "react-use-form-state";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { AuthContext } from "../AuthProvider";

import * as S from "./ChallengeResponseForm.styled";

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
  const [formState, { number }] = useFormState({ reps: 4 });
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
      <S.P>You need to do X reps to beat so and so</S.P>

      <div>
        <S.RepsInput {...number("reps")}/>
        <span>reps</span>
      </div>

      <S.Button>Flex Back!</S.Button>
    </form>
  )
}

export default ChallengeResponseForm;
