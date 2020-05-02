import React, { useState, useEffect } from "react";
import { IconContext } from "react-icons";
import { MdSettings } from "react-icons/md";
import { CSSTransition } from "react-transition-group";

import * as S from "./Nav.styled";
import Settings from "../Settings/Settings";

const Nav: React.FC = () => {
  const [showMenu, setShowMenu] = useState(true);

  return (
    <React.Fragment>
      <S.Settings>
        <CSSTransition classNames="background" in={showMenu} timeout={800} unmountOnExit mountOnEnter>
          <Settings userExercises={[]}/>
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