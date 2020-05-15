import React, { useContext, useState } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation, useApolloClient } from "@apollo/client";
import { Redirect } from "react-router";

import * as S from "./CreateProfile.styled";
import { AuthContext } from "../../Auth/AuthProvider";
import WithBackground from "../../Layout/WithBackground/WithBackground";
import WithAuth from "../../Auth/WithAuth";
import ProfileForm, { ProfileData } from "../../Auth/ProfileForm/ProfileForm";

interface Result {
  exercises: { title: string, id: string }[];
}

const GET_USER_EXISTS = gql`
  query ($id: String!) {
    hasAccount(id: $id)
  }
`

const GET_EXERCISES = gql`
  query Exercise {
    exercises { title, id }
  }
`

const CREATE_PROFILE = gql`
  mutation CreateProfile($data: CreateProfileInput!) {
    createProfile(data: $data) { id, name, email}
  }
`

const CreateProfile: React.FC = () => {
  const client = useApolloClient();
  const { profile } = useContext(AuthContext)
  const [shouldRedirect, setShoulRedirect] = useState(false);
  const result = useQuery<Result>(GET_EXERCISES);
  const [ createProfile ] = useMutation(CREATE_PROFILE, {
    onCompleted: () => {
      client.writeQuery({
        query: GET_USER_EXISTS,
        variables: { id: profile?.sub },
        data: { hasAccount: true }
      })

      setShoulRedirect(true);
    }
  });

  const handleSubmit = (profileData: ProfileData) => {
    // TODO: sometimes name isn't available on profile; how to resolve?
    const { name, email, sub: id } = profile;

    createProfile({ variables: { data: {
      user: { id, name, email },
      exercises: profileData.map((data) => {
        return {...data, user: id }
      })
    }}})
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

      {result.data && <ProfileForm
        onSubmit={(event: any) => handleSubmit(event)}
        exercises={result.data.exercises}
      />}
    </div>
  );
}

export default WithBackground(WithAuth(CreateProfile));
