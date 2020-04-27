import React, { useContext } from "react";

import * as S from "./Login.styled";
import { AuthContext } from "../../components/AuthProvider";
import WithBackground from "../../components/WithBackground/WithBackground";
import Button from "../../components/Button/Button";
import Graphic from "../../components/Graphic/Graphic";

const Login: React.FC = () => {
  const auth = useContext(AuthContext)

  return (
    <S.Login>
      <Graphic/>
      <S.H1>A really cool title</S.H1>
      <S.P>And some more cool stuff</S.P>
      <Button onClick={() => auth.login()}>Login</Button>
    </S.Login>
  );
}

export default WithBackground(Login);
