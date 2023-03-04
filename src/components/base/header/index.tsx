import { useEffect } from "react";
import { ReactNode } from "react";

export default function Header({ children }: { children?: ReactNode }) {
  useEffect(() => {
    const filler = document.getElementById("header-filler");
    const header = document.getElementById("header");

    if (filler && header) {
      filler.style.marginTop = `${header.offsetHeight}px`;
    }
  });

  return (
    <header id="header" className="p-7 border-b fixed top-0 w-screen bg-white">
      <span className="text-[#04021D] text-2xl font-semibold">{children}</span>
    </header>
  );
}
