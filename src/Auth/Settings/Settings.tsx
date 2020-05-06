import React, { useContext, useState, useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";

import * as S from "./Settings.styled";
import WithBackground from "../../Layout/WithBackground/WithBackground";
import { AuthContext } from "../AuthProvider";
import ProfileForm, { ProfileData } from "../ProfileForm/ProfileForm";

interface SettingsProps {
  onClose: Function;
}

interface Result {
  exercises: {
    title: string;
    id: string;
  }[],
  user: {
    exercises: {
      reps: number;
      exercise: {
        id: string;
      }
    }[]
  }
}

interface Data {
  exercises: { title: string, id: string }[];
  userExercises: { reps: number, exerciseId: string }[];
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
  const [updateUserExercises] = useMutation(UPDATE_USER_EXERCISES);
  const [data, setData] = useState<Data>();
  const result = useQuery<Result>(GET_DATA, {
    variables: { id: auth.profile?.sub }
  });

  useEffect(() => {
    if (!result.data) {
      return;
    }

    const data = {
      exercises: result.data.exercises,
      userExercises: result.data.user.exercises.map((userExercise) => {
        return { reps: userExercise.reps, exerciseId: userExercise.exercise.id };
      })
    };

    setData(data);
  }, [result.data]);

  const handleSubmit = (profileData: ProfileData) => {
    updateUserExercises({ variables: { data: {
      user: auth.profile.sub,
      exercises: profileData
    }}});
  }

  return (
    <div>
      <S.H1>Benchmarks</S.H1>
      <S.P>
        What is your typical max for each exercise?
        These values are used to calculate how much you're flexin'.
      </S.P>

      {data && <ProfileForm
        onSubmit={(event: any) => handleSubmit(event)}
        exercises={data.exercises}
        userExercises={data.userExercises}
      />}

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
