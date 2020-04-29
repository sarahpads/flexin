import styled from "styled-components";
import { Link as L } from "react-router-dom";

import theme from "../theme";

interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  color: string;
}

export const Button = styled.button<ButtonProps>`
  background: white;
  border: none;
  border-radius: 20px;
  color: ${(props) => props.color};
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
  margin: 0;
`

export const P = styled.p`
  margin: 0;
  margin-bottom: 3rem;
`

export const Input = styled.input`
  color: ${() => theme.text.default};
  background-color: transparent;
  border: none;
  border-bottom: 1px solid white;
  margin-bottom: 1rem;
  outline: none;
  width: 100%;
`

export const Label = styled.label`
  display: block;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  padding-left: 2rem;
`

export const Link = styled(L)`
  color: ${() => theme.text.default};
  text-decoration: underline;
`