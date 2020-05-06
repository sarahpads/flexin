import styled from "styled-components";

export const Standing = styled.div`
  align-items: center;
  border-bottom: 1px solid #EDEDED;
  display: flex;
  padding: 1.5rem 0;

  &:last-child {
    border: none;
  }
`

export const Rank = styled.div`
  font-weight: 600;
  text-align: center;
  width: 3rem;
`

export const Avatar = styled.div`
  background-color: #EDEDED;
  border-radius: 50%;
  height: 3.5rem;
  margin: 0 1rem 0 1.5rem;
  width: 3.5rem;
`

export const Name = styled.span``

export const Flex = styled.span`
  margin-left: auto;
`