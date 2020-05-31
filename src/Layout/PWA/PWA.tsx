import React from "react";

import * as S from "./PWA.styled";
import usePushNotification from "../../Auth/use-push-notification";
import useHomeScreen from "../../Auth/use-home-screen";

const PWA: React.FC = () => {
  usePushNotification();
  const prompt = useHomeScreen();

  if (!prompt) {
    return <></>;
  }

  return (
    <div className="background--light">
      <S.Button onClick={() => prompt.prompt()}>Add to Home Screen</S.Button>
    </div>
  );
};

export default PWA;