import { ReactNode } from "react";

export default function Header({ children }: { children?: ReactNode }) {
  return (
    <header className="p-7 border-b">
      <span className="text-[#04021D] text-2xl font-semibold">{children}</span>
    </header>
  );
}
