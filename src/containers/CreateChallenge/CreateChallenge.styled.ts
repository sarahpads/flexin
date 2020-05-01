import styled from "styled-components";

import { Button as B, Input } from "../../components/Typography.styled";
export { Label, Link, RepsInput } from "../../components/Typography.styled";

export const Form = styled.form`
  margin: auto;
  /* margin-top: 15vh; */
  max-width: 100%;
  width: 25rem;
`

interface CircleProps {
  background: string;
}

export const Circle = styled.div<CircleProps>`
  align-items: center;
  background-color: ${(props) => props.background};
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  height: 25rem;
  justify-content: center;
  margin: auto;
  margin-bottom: 5rem;
  width: 25rem;
`

export const Output = styled.span`
  font-family: "ManRope";
  font-size: 8rem;
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