import styled from "styled-components";

import { RepsInput } from "../Typography.styled";

export const UserExercise = styled.div`
  align-items: center;
  border-bottom: 1px solid white;
  display: flex;
  padding: 2rem 1rem;

  &:last-of-type {
    border: none;
  }
`

export const Label = styled.label`
  font-weight: 600;
  text-transform: uppercase;
`

export const Input = styled(RepsInput)`
  margin-left: auto;
  margin-bottom: 0;
`