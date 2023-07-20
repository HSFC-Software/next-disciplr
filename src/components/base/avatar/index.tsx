import { ReactNode, useState } from "react";
import Image from "next/image";
import { useGetProfileById } from "@/lib/queries";
import { PhotoProvider, PhotoView } from "react-photo-view";
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
  id?: string;
};

export default function Avatar({
  children,
  size,
  fontSize,
  style,
  imgSrc,
  id,
}: AvatarProps) {
  const [isImageReady, setIsImageReady] = useState(false);
  const { data, isLoading } = useGetProfileById(id ?? "");

  let _imgSrc = "";
  let _initials = "";

  if (data?.img_url) _imgSrc = data?.img_url;
  if (!_imgSrc) imgSrc = imgSrc;

  if (children) _initials = children as string;
  else
    _initials = `${data?.first_name?.charAt(0) ?? ""}${
      data?.last_name?.charAt(0) ?? ""
    }`.trim();

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
      {_imgSrc && (
        <PhotoProvider>
          <PhotoView src={_imgSrc}>
            <Image
              onLoad={() => setIsImageReady(true)}
              style={{
                opacity: isImageReady ? 1 : 0,
              }}
              alt="profile"
              src={_imgSrc}
              className="w-full h-full rounded-full object-cover"
              width={size}
              height={size}
            />
          </PhotoView>
        </PhotoProvider>
      )}
      {!_imgSrc && <>{_initials}</>}
    </div>
  );
}
