import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

import * as S from "./Error.styled";

interface ErrorProps {
  error: any
}

const Error: React.FC<ErrorProps> = ({
  error
}) => {
  const [show, setShow] = useState(true);

  function onClick() {
    setShow(false);
  }

  return (
    <CSSTransition appear={true} classNames="error" in={show} timeout={800} unmountOnExit>
      <S.Error>
        <S.Message>
          {error.networkError.message}
        </S.Message>

        <S.Stack>
          {JSON.stringify(error.networkError.result.errors)}
        </S.Stack>

        <S.Button onClick={(e) => onClick()}>Close</S.Button>
      </S.Error>
    </CSSTransition>
  )
};

export default Error;
