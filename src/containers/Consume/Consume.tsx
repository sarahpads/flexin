import React, { useContext } from "react";
import { AuthContext } from "../../components/AuthProvider";

// TODDO: redirect after successful consumption
const Consume: React.FC = () => {
  const auth = useContext(AuthContext)
  console.log("?")
  debugger;
  auth.consume();

  return <div>Loading</div>;
}

export default Consume;
