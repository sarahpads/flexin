import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import { AuthContext } from "../../components/AuthProvider";

const Consume: React.FC = () => {
  const auth = useContext(AuthContext)
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    auth.consume()
      .then(() => setShouldRedirect(true));
  }, [auth])

  if (shouldRedirect) {
    return <Redirect to="/"/>
  }

  return <div>Loading</div>;
}

export default Consume;
