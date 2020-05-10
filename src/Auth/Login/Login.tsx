import React, { useContext } from "react";

import * as S from "./Login.styled";
import { AuthContext } from "../AuthProvider";
import WithBackground from "../../Layout/WithBackground/WithBackground";

const Login: React.FC = () => {
  const auth = useContext(AuthContext)

  return (
    <S.Login>
      <S.Logo>
        <S.Circle/>
        <S.Graphic/>
      </S.Logo>

      <S.H1>Waffle Tax</S.H1>
      <S.P>Earn your treats by out-flexing your frinds.</S.P>
      <S.Button onClick={() => auth.login()}>Login</S.Button>

      <S.Credit>
        Logo made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
      </S.Credit>
    </S.Login>
  );
}

export default WithBackground(Login);
