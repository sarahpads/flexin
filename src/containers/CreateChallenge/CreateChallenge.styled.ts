import styled from "styled-components";

import theme from "../../theme"
import { Button as B, Input, Circle as C } from "../../components/Typography.styled";
export { Label, Link, RepsInput } from "../../components/Typography.styled";

export const Form = styled.form`
  margin: auto;
  max-width: 100%;
  width: 25rem;
`

export const Circle = styled(C)`
  align-items: center;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const Output = styled.span`
  font-family: "ManRope";
  font-size: ${theme.circle.fontSize};
  font-weight: 600;
  letter-spacing: -0.5rem;
`

export const Benchmark = styled.span`
  font-size: 1.4rem;
`

export const Reps = styled.div`
  margin-top: 2rem;
`

export const Select = styled(Input)`
  display: flex;
  padding: 0 1rem;
  width: 100%;
`

export const SelectInput = styled.select`
  background: transparent;
  border: none;
  color: white;
  font-family: "ManRope";
  font-size: 1.5rem;
  font-weight: 800;
  width: 100%;
`

export const Button = styled(B)`
  margin-top: 4rem;
`

export const Cancel = styled.div`
  margin-top: 0.8rem;
  text-align: center;
`