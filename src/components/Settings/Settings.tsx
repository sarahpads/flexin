import React from "react";

import * as S from "./Settings.styled";
import WithBackground from "../WithBackground/WithBackground";

interface SettingsProps {
  userExercises: any[]
}

const Settings: React.FC<SettingsProps> = ({ userExercises = [] }) => {
  return (
    <S.Settings>Settings</S.Settings>
  )
}

export default WithBackground<SettingsProps>(Settings, { origin: "top right", animateOut: true, animation: "clip" });
