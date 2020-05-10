import { gql, useMutation } from "@apollo/client";
import { useContext, useState, useEffect } from "react";

import { AuthContext } from "./AuthProvider";

const CREATE_SUBSCRIPTION = gql`
  mutation createSubscription($data: CreateSubscriptionInput!) {
    createSubscription(data: $data)
  }
`

export default function usePushNotification() {
  const { profile } = useContext(AuthContext);
  const [createSubscription] = useMutation(CREATE_SUBSCRIPTION);
  const [userConsent, setUserConsent] = useState(Notification.permission);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if (!profile?.sub) {
      return;
    }

    navigator.serviceWorker.ready
      .then((serviceWorker) => serviceWorker.pushManager.getSubscription())
      .then((subscription) => {
        setIsSubscribed(!!subscription);
      });
  }, [profile])

  useEffect(() => {
    if (!!isSubscribed) {
      return;
    }

    Notification.requestPermission().then((consent) => {
      setUserConsent(consent);
    })
  }, [isSubscribed])

  useEffect(() => {
    if (userConsent !== "granted") {
      return;
    }

  navigator.serviceWorker.ready
    .then((serviceWorker) => serviceWorker.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: process.env.REACT_APP_NOTIFICATION_KEY
    }))
    .then((response: PushSubscription) => createSubscription({ variables: { data: {
      user: profile.sub,
      notification: JSON.stringify(response)
    }}}));
  }, [userConsent])
}