import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

import * as S from "./Error.styled";

interface ErrorProps {
  error: any
}

const Error: React.FC<ErrorProps> = ({
  error
}) => {
  const [show, setShow] = useState(true);
  const [message, setMessage] = useState()
  const [errors, setErrors] = useState();
  debugger;

  useEffect(() => {
    const message = error.networkError
      ? error.networkError.message
      : error.message;

    const errors = error.networkError
      ? error.networkError.result.errors
      : error.graphQLErrors;

    setMessage(message);
    setErrors(JSON.stringify(errors));
  }, [error])

  function onClick() {
    setShow(false);
  }

  return (
    <CSSTransition appear={true} classNames="error" in={show} timeout={800} unmountOnExit>
      <S.Error>
        <S.Message>
          {message}
        </S.Message>

        <S.Stack>
          {errors}
        </S.Stack>

        <S.Button onClick={(e) => onClick()}>Close</S.Button>
      </S.Error>
    </CSSTransition>
  )
};

export default Error;
