import React, { useContext } from "react";

import { AuthContext } from "../../components/AuthProvider";

const Login: React.FC = () => {
  const auth = useContext(AuthContext)

  return <button onClick={() => auth.login()}>Login</button>;
}

export default Login;
