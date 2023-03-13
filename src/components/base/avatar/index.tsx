import { ReactNode } from "react";

type AvatarProps = {
  children?: ReactNode;
  imgSrc?: string;
  size: number;
  fontSize:
    | "text-xs"
    | "text-sm"
    | "text-base"
    | "text-lg"
    | "text-xl"
    | "text-2xl"
    | "text-3xl"
    | "text-4xl"
    | "5xl";
  style?: object;
};

export default function Avatar({
  children,
  size,
  fontSize,
  style,
}: AvatarProps) {
  return (
    <div
      style={{
        height: size,
        width: size,
        ...(style ?? {}),
      }}
      className={`shrink-0 bg-[#eaeaea] rounded-full z-10 flex justify-center items-center font-bold uppercase ${
        fontSize ? `${fontSize}` : "text-xl"
      }`}
    >
      {children}
    </div>
  );
}
