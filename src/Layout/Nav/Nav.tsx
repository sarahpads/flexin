import React, { useState } from "react";
import { IconContext } from "react-icons";
import { MdSettings } from "react-icons/md";
import { CSSTransition } from "react-transition-group";

import * as S from "./Nav.styled";
import Settings from "../../Auth/Settings/Settings";
import usePushNotification from "../../Auth/use-push-notification";
import useHomeScreen from "../../Auth/use-home-screen";

const Nav: React.FC = () => {
  usePushNotification()
  useHomeScreen();
  const [showMenu, setShowMenu] = useState(false);

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