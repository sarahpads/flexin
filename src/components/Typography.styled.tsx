import styled from "styled-components";
import { Link as L } from "react-router-dom";

import theme from "../theme";

export const Button = styled.button`
  background: white;
  border: none;
  border-radius: 20px;
  color: var(--palette-neutral);
  cursor: pointer;
  display: block;
  font-family: "ManRope";
  font-size: 1.5rem;
  font-weight: 800;
  line-height: 4rem;
  margin: auto;
  max-width: 100%;
  outline: none;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  width: 25rem;
`

export const H1 = styled.h1`
  line-height: 1em;
  margin: 0;
`

export const P = styled.p`
  margin: 0;
  margin-bottom: 3rem;
`

export const Input = styled.input`
  background-color: transparent;
  border: none;
  border: 1px solid white;
  border-radius: 20px;
  box-sizing: border-box;
  color: ${theme.text.default};
  font-family: "ManRope";
  font-size: 2rem;
  font-weight: 800;
  height: 4rem;
  line-height: 4rem;
  margin-bottom: 1rem;
  min-width: 0;
  outline: none;
  padding: 0;
  outline: none;
  width: 100%;

  -moz-appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

export const RepsInput = styled(Input)`
  margin-right: 1rem;
  text-align: center;
  width: 6rem;
`

export const Label = styled.label`
  display: block;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  padding-left: 2rem;
`

export const Link = styled(L)`
  color: ${theme.text.default};
  text-decoration: underline;
`

export const Circle = styled.div`
  background-color: var(--palette-dark);
  border-radius: 50%;
  height: ${theme.circle.dimension};
  margin: auto;
  margin-bottom: 5rem;
  width: ${theme.circle.dimension};
`