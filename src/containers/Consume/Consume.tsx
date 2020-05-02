import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../components/AuthProvider";

// TODDO: redirect after successful consumption
const Consume: React.FC = () => {
  const auth = useContext(AuthContext)

  useEffect(() => {
    auth.consume();
  }, [auth])

  return <div>Loading</div>;
}

export default Consume;
