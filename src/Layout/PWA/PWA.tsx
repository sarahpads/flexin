import React from "react";

import usePushNotification from "../../Auth/use-push-notification";
import useHomeScreen from "../../Auth/use-home-screen";

const PWA: React.FC = () => {
  usePushNotification()
  const prompt = useHomeScreen();

  if (!prompt) {
    return <></>;
  }

  return <button onClick={prompt.prompt()}>Click</button>;
}

export default PWA;