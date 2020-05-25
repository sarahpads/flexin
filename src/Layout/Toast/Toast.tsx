import React, { useEffect } from "react";

import * as S from "./Toast.styled";

interface ToastProps {
  content: Node;
  onDismiss: Function;
}

const Toast: React.FC<ToastProps> = ({ content, onDismiss }) => {
  useEffect(() => {
    setTimeout(onDismiss, 3000);
  }, []);

  return <S.Toast>{content}</S.Toast>;
}

export default Toast;
