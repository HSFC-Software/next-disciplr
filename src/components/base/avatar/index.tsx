import { ReactNode } from "react";

type AvatarProps = {
  children?: ReactNode;
  imgSrc?: string;
  size: number;
};

export default function Avatar({ children, size }: AvatarProps) {
  return (
    <div
      className={`shrink-0 bg-[#eaeaea] h-[${size}px] w-[${size}px] rounded-full z-10 flex justify-center items-center font-bold text-xl uppercase`}
    >
      {children}
    </div>
  );
}
