import React, { useState, useEffect } from "react";
import { IconContext } from "react-icons";
import { MdSettings } from "react-icons/md";
import { CSSTransition } from "react-transition-group";

import * as S from "./Nav.styled";
import Settings from "../Settings/Settings";

const Nav: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    console.log(showMenu)
  }, [showMenu])

  function onClick() {
    setShowMenu(!showMenu);
  }

  return (
    <React.Fragment>
      <S.Nav>
        <IconContext.Provider value={{ color: "white", size: "3rem" }}>
          <S.Button onClick={() => onClick()}>
            <MdSettings />
          </S.Button>
        </IconContext.Provider>
      </S.Nav>

      <S.Settings>
        <CSSTransition classNames="shit" in={showMenu} timeout={800} unmountOnExit mountOnEnter>
          <Settings userExercises={[]}/>
        </CSSTransition>
      </S.Settings>
    </React.Fragment>
  )
}

export default Nav;