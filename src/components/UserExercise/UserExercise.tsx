import React from "react";

import * as S from "./UserExercise.styled";

interface UserExerciseProps {
  exercise: any;
  formControl: any;
  label: any;
}

const UserExercise: React.FC<UserExerciseProps> = ({
  exercise,
  label,
  formControl
}) => {
  return (
    <S.UserExercise>
      <S.Label {...label}>{exercise.title}</S.Label>
      <S.Input {...formControl}/>
      <span>reps</span>
    </S.UserExercise>
  )
}

export default UserExercise;
