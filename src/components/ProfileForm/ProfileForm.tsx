import React, { useState, useEffect } from "react";
import { useFormState } from "react-use-form-state";

import * as S from "./ProfileForm.styled";

interface ProfileProps {
  onSubmit: Function;
  exercises: { title: string, id: string }[];
  userExercises?: { reps: number, exerciseId: string }[];
}

interface Input {
  id: string;
  title: string;
  value: number;
}

export type ProfileData = { exercise: string, reps: number }[];
// need to declare this outside of the destructure; otherwise a new array is provided
// on every render, causing an infinite useEffect loop
const defaultArrayProp: any = [];

const ProfileForm: React.FC<ProfileProps> = ({
  onSubmit,
  exercises,
  userExercises = defaultArrayProp
}) => {
  const [formState, { number, label }] = useFormState();
  const [inputs, setInputs] = useState<Input[]>();

  useEffect(() => {
    if (!exercises) {
      return;
    }

    const userExerciseMap: {[key: string]: number} = {};

    for (let userExercise of userExercises) {
      userExerciseMap[userExercise.exerciseId] = userExercise.reps;
    }

    const inputs = exercises.map((exercise) => {
      const reps = userExerciseMap[exercise.id] || 0;

      formState.setField(exercise.id, reps);

      return { ...exercise, value: reps };
    });

    setInputs(inputs);
  }, [exercises, userExercises])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isMissingValues = Object.keys(formState.values).some((key) => {
      return !formState.values[key];
    });

    const hasErrors = Object.keys(formState.errors).some((key) => {
      return !!formState.errors[key];
    });

    if (hasErrors || isMissingValues) {
      return;
    }

    const userExercises = Object.keys(formState.values).map((key) => {
      return { exercise: key, reps: parseInt(formState.values[key]) };
    });

    onSubmit(userExercises);
  }

  return (
    <form noValidate onSubmit={(event) => handleSubmit(event)}>
      {inputs && inputs.map((input: Input) => (
        <S.UserExercise key={input.id}>
          <S.Label {...label(input.id)}>{input.title}</S.Label>
          <S.Input {...number(input.id)} min="0" max="999" required/>
          <span>reps</span>
        </S.UserExercise>
      ))}

      <S.Button type="submit">Save</S.Button>
    </form>
  )
}

export default ProfileForm;
