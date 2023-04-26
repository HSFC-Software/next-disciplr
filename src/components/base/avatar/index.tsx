import { ReactNode } from "react";
import Image from "next/image";

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
  image?: any;
};

export default function Avatar({
  children,
  size,
  fontSize,
  style,
  imgSrc,
}: AvatarProps) {
  return (
    <div
      style={{
        height: size,
        width: size,
        ...(style ?? {}),
      }}
      className={`shrink-0 bg-[#eaeaea] rounded-full z-10 flex justify-center items-center font-bold uppercase overflow-hidden ${
        fontSize ? `${fontSize}` : "text-xl"
      }`}
    >
      {imgSrc ? (
        <>
          <Image
            alt="profile"
            src={imgSrc!}
            className="w-full h-full rounded-full"
            layout="fill"
            objectFit="cover"
          />
        </>
      ) : (
        <>{children}</>
      )}
    </div>
  );
}
