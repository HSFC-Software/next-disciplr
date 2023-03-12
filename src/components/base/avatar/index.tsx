import { ReactNode } from "react";

type AvatarProps = {
  children?: ReactNode;
  imgSrc?: string;
  size: number;
  fontSize: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
};

export default function Avatar({ children, size, fontSize }: AvatarProps) {
  return (
    <div
      className={`shrink-0 bg-[#eaeaea] h-[${size}px] w-[${size}px] rounded-full z-10 flex justify-center items-center font-bold uppercase ${
        fontSize ? fontSize : "text-xl"
      }`}
    >
      {children}
    </div>
  );
}
