import styled from "styled-components";

interface GraphicProps {
  background: string;
}

export const Graphic = styled.div<GraphicProps>`
  background-color: ${(props) => props.background};
  border-radius: 50%;
  height: 25rem;
  margin: auto;
  margin-bottom: 5rem;
  width: 25rem;
`
