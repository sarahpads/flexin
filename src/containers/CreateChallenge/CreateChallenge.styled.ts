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

// TODO: inherit this stuff from an Input element
export const RepsInput = styled.input`
  background-color: transparent;
  border: 1px solid white;
  border-radius: 20px;
  color: white;
  font-family: "ManRope";
  font-size: 2rem;
  font-weight: 800;
  line-height: 4rem;
  margin-right: 1rem;
  min-width: 0;
  outline: none;
  padding: 0;
  text-align: center;
  width: 6rem;
  -moz-appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
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
  margin-top: 4rem;
`

export const Cancel = styled.div`
  margin-top: 0.8rem;
  text-align: center;
`