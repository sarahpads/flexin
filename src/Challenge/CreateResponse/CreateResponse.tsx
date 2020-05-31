import React, { useContext, useEffect, useState } from "react";
import { useFormState } from "react-use-form-state";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";

import * as S from "./CreateResponse.styled";
import { AuthContext } from "../../Auth/AuthProvider";
import { Challenge } from "../challenge.types";

interface CreateResponseProps {
  challenge: Challenge;
}

interface Result {
  userExercise: {
    reps: number;
  };
}

const GET_USER_EXERCISE = gql`
  query UserExercise($userId: String!, $exerciseId: String!) {
    userExercise(userId: $userId, exerciseId: $exerciseId) {
      reps
    }
  }
`;

const CREATE_RESPONSE = gql`
  mutation CreateResponse($data: CreateResponseInput!) {
    createResponse(data: $data) { challenge { id } reps }
  }
`;

const CreateResponse: React.FC<CreateResponseProps> = ({
  challenge
}) => {
  const { profile } = useContext(AuthContext);
  const [formState, { number }] = useFormState();
  const [createResponse] = useMutation(CREATE_RESPONSE);
  const result = useQuery<Result>(GET_USER_EXERCISE, {
    variables: { userId: profile.sub, exerciseId: challenge.exercise.id}
  });
  const [requiredReps, setRequiredReps] = useState();

  useEffect(() => {
    if (!result.data) {
      return;
    }

    formState.setField("reps", result.data.userExercise.reps);

    const challenger = challenge.responses.find((response) => {
      return response.user.id === challenge.user.id;
    });

    if (!challenger) {
      return;
    }

    setRequiredReps(Math.ceil(result.data.userExercise.reps * challenger.flex));
  }, [result.data]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { reps } = formState.values;

    if (!reps) {
      return;
    }

    createResponse({ variables: { data: {
      challenge: challenge.id,
      user: profile.sub,
      reps: parseInt(reps)
    }}});
  };

  return (
    <S.Form noValidate onSubmit={handleSubmit}>
      <S.P>You need to do {requiredReps} {challenge.exercise.title}s to beat {challenge.user.name}</S.P>

      <div>
        <S.RepsInput {...number("reps")} min="0" max="999" required/>
        <span>reps</span>
      </div>

      <S.Button>Flex Back!</S.Button>
    </S.Form>
  );
};

export default CreateResponse;
