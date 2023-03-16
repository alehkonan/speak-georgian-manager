import { PropsWithChildren, useCallback, useEffect, useRef } from 'react';
import ReactFocusLock from 'react-focus-lock';
import styles from './styles.module.css';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const addTabIndex = (element: Element) => {
  if (element instanceof HTMLElement) {
    if (element.tabIndex === -5) element.tabIndex = 0;
    [...element.children].forEach(addTabIndex);
  }
};

const removeTabIndex = (element: Element) => {
  if (element instanceof HTMLElement) {
    if (element.tabIndex > -1) element.tabIndex = -5;
    [...element.children].forEach(removeTabIndex);
  }
};

export const Modal = ({
  children,
  isOpen,
  onClose,
}: PropsWithChildren<Props>) => {
  const contentRef = useCallback(
    (node: HTMLDivElement) =>
      isOpen ? addTabIndex(node) : removeTabIndex(node),
    [isOpen]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'inherit';
    }
  }, [isOpen]);

  return (
    <ReactFocusLock disabled={!isOpen}>
      <dialog
        className={styles.dialog}
        open={isOpen}
        onClick={(e) => e.currentTarget === e.target && onClose()}
      >
        <div ref={contentRef} className={styles.content}>
          {children}
        </div>
      </dialog>
    </ReactFocusLock>
  );
};
