import React from "react";
import { IconContext } from "react-icons";
import { MdSettings } from "react-icons/md";

import * as S from "./Nav.styled";

const Nav: React.FC = () => {
  function onClick() {
    // TODO: open settings using same background transition, but with grey
  }

  return <S.Nav>
    <IconContext.Provider value={{ color: "white", size: "3rem" }}>
      <S.Button onClick={() => onClick()}>
        <MdSettings/>
      </S.Button>
    </IconContext.Provider>
  </S.Nav>
}

export default Nav;