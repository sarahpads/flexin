import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import { AuthContext } from "../../Auth/AuthProvider";
import Spinner from "../../Layout/Spinner/Spinner";

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

  return <Spinner/>;
}

export default Consume;
