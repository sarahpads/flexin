import styled from "styled-components";

export const Button = styled.button<any>`
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