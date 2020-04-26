import React, { useContext } from "react";

import { AuthContext } from "../../components/AuthProvider";
import WithBackground from "../../components/WithBackground/WithBackground";

const Login: React.FC = () => {
  const auth = useContext(AuthContext)

  return <button onClick={() => auth.login()}>Login</button>;
}

export default WithBackground(Login);
