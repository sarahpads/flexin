import React, { useState, useContext, useEffect } from "react";
import { IconContext } from "react-icons";
import { MdSettings } from "react-icons/md";
import { CSSTransition } from "react-transition-group";

import * as S from "./Nav.styled";
import Settings from "../../Auth/Settings/Settings";
import { useQuery, gql } from "@apollo/client";
import { AuthContext } from "../../Auth/AuthProvider";

interface Result {
  hasAccount: boolean;
}

const GET_USER_EXISTS = gql`
  query ($id: String!) {
    hasAccount(id: $id)
  }
`

const Nav: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { profile } = useContext(AuthContext)
  const result = useQuery<Result>(GET_USER_EXISTS, {
    variables: { id: profile?.sub },
    skip: !isAuthenticated
  });

  useEffect(() => {
    setIsAuthenticated(!!profile);
  }, [profile])

  if (!result.data?.hasAccount) {
    return <></>;
  }

  return (
    <React.Fragment>
      <S.Settings>
        <CSSTransition classNames="background" in={showMenu} timeout={800} unmountOnExit mountOnEnter>
          <Settings onClose={() => setShowMenu(false)}/>
        </CSSTransition>
      </S.Settings>

      <S.Nav>
        <IconContext.Provider value={{ color: "white", size: "3rem" }}>
          <S.Button onClick={() => setShowMenu(!showMenu)}>
            <MdSettings />
          </S.Button>
        </IconContext.Provider>
      </S.Nav>

    </React.Fragment>
  )
}

export default Nav;