import { createContext, ReactNode } from "react";

type ModalContext = {
  showModal: (c: ReactNode) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContext | null>(null);
