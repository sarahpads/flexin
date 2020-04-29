import styled from "styled-components";

import { Button as B } from "../../components/Typography.styled";
export { Label, Input, Link } from "../../components/Typography.styled";

export const Form = styled.form`
  margin: auto;
  margin-top: 15vh;
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
  height: 25rem;
  margin: auto;
  margin-bottom: 5rem;
  width: 25rem;
`

export const Reps = styled.div`
  align-items: flex-end;
  display: flex;
`

export const RepsInput = styled.input`
  background-color: transparent;
  border: none;
  color: white;
  font-family: "ManRope";
  font-size: 8rem;
  font-weight: 600;
  height: 0.9em;
  letter-spacing: -0.5rem;
  margin-right: 1rem;
  min-width: 0;
  outline: none;
  padding: 0;
  text-align: right;
  width: 3ch;
  -moz-appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

export const RepsLabel = styled.label`
  font-size: 2rem;
  text-transform: uppercase;
`

export const Select = styled.div`
  border: 1px solid white;
  border-radius: 20px;
  box-sizing: border-box;
  color: white;
  display: flex;
  font-weight: 800;
  height: 4rem;
  outline: none;
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
  margin-top: 3rem;
`

export const Cancel = styled.div`
  margin-top: 0.8rem;
  text-align: center;
`