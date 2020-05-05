import React, { useContext, useState } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client";

import * as S from "./CreateProfile.styled";
import { AuthContext } from "../../components/AuthProvider";
import { Redirect } from "react-router";
import WithBackground from "../../components/WithBackground/WithBackground";
import WithAuth from "../../components/WithAuth";
import ProfileForm, { ProfileData } from "../../components/ProfileForm/ProfileForm";

interface Result {
  exercises: { title: string, id: string }[];
}

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
  const { profile } = useContext(AuthContext)
  const [shouldRedirect, setShoulRedirect] = useState(false);
  const result = useQuery<Result>(GET_EXERCISES);
  const [ createProfile ] = useMutation(CREATE_PROFILE);

  const handleSubmit = (profileData: ProfileData) => {
    // TODO: sometimes name isn't available on profile; how to resolve?
    const { name, email, sub: id } = profile;

    createProfile({ variables: { data: {
      user: { id, name, email },
      exercises: profileData.map((data) => {
        return {...data, user: id }
      })
    }}})

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

      {result.data && <ProfileForm
        onSubmit={(event: any) => handleSubmit(event)}
        exercises={result.data.exercises}
      />}
        {/* <S.Button type="submit">Get Flexin'</S.Button> */}
    </div>
  );
}

export default WithBackground(WithAuth(CreateProfile));
