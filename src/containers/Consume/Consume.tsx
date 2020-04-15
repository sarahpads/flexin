import React, { useContext } from "react";
import { AuthContext } from "../../components/AuthProvider";

const Consume: React.FC = () => {
  const auth = useContext(AuthContext)
  auth.consume();

  return <div>Loading</div>;
}

export default Consume;
