import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { v4 as uuid } from "uuid";

import Toast from "./Toast";
import * as S from "./Toast.styled";

interface ToastValue {
  add: Function;
  remove: Function;
}

export const ToastContext = React.createContext({} as ToastValue);

interface Toast {
  id: string;
  content: Node;
}

interface ToastProps {
  children: React.ReactNode;
}

const ToastProvider: React.FC<ToastProps> = (props) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastsRef = useRef(toasts);
  toastsRef.current = toasts;

  function add(content: Node) {
    const id = uuid();
    setToasts([...toasts, { id, content }]);

    return id;
  }

  // this is called asynchronously from a setTimeout in a nested component
  // setTimeout will use the 'toasts' value it receives when scheduled, causing it
  // to be out of sync. Using a ref instead.
  // https://upmostly.com/tutorials/settimeout-in-react-components-using-hooks
  function remove(id: string) {
    setToasts(toastsRef.current.filter((toast: Toast) => toast.id !== id ));
  }

  return (
    <ToastContext.Provider value={{
      add,
      remove
    }}>
      {props.children}

      {createPortal(
        <S.ToastContainer>
          <TransitionGroup component={null}>
            {toasts.map((toast: Toast) => (
              <CSSTransition
                appear
                classNames="toast"
                key={toast.id}
                mountOnEnter
                timeout={2200}
                unmountOnExit
              >
                <Toast onDismiss={() => remove(toast.id)} content={toast.content}/>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </S.ToastContainer>
        , document.body)}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
