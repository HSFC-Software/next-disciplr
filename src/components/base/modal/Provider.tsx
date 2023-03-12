import {
  ReactNode,
  useContext,
  useState,
  createContext,
  useCallback,
  useMemo,
} from "react";
import Modal from "@/components/base/modal";

type IModalContext = {
  showModal: (c: ReactNode) => void;
  closeModal: () => void;
};

export const ModalContext = createContext<IModalContext>({
  showModal() {
    // fallback fn
  },
  closeModal() {
    // fallback fn
  },
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<ReactNode | null>(null);

  const showModal = useCallback((modalContent: ReactNode) => {
    setContent(modalContent);
  }, []);

  const closeModal = useCallback(() => {
    setContent(null);
  }, []);

  const contextProps = useMemo(
    () => ({
      showModal,
      closeModal,
    }),
    []
  );

  return (
    <ModalContext.Provider value={contextProps}>
      {children}
      <Modal isOpen={Boolean(content)}>{content}</Modal>
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
