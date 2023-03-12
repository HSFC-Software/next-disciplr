import { ReactNode } from "react";

export default function Button({
  children,
  onClick,
  disabled,
}: {
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="disabled:bg-[#e0e9f1] bg-[#6474dc] hover:bg-[#4c55dc] text-white py-3 rounded-lg"
    >
      {children}
    </button>
  );
}
