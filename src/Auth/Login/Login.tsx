import React, { useContext } from "react";

import * as S from "./Login.styled";
import { AuthContext } from "../AuthProvider";
import WithBackground from "../../Layout/WithBackground/WithBackground";

const Login: React.FC = () => {
  const auth = useContext(AuthContext)

  return (
    <S.Login>
      <S.Circle/>
      <S.H1>A really cool title</S.H1>
      <S.P>And some more cool stuff</S.P>
      <S.Button onClick={() => auth.login()}>Login</S.Button>
    </S.Login>
  );
}

export default WithBackground(Login);
