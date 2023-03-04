import DocumentIcon from "@/components/base/icons/Document";
import GroupIcon from "@/components/base/icons/Group";
import NotificationIcon from "@/components/base/icons/Notification";
import UserIcon from "@/components/base/icons/User";
import Link from "next/link";
import { useEffect, ReactNode } from "react";
import vhCheck from "vh-check";

export default function Layout(props: {
  children?: ReactNode;
  activeRoute?: string;
  header?: ReactNode;
}) {
  const { activeRoute } = props;

  useEffect(() => {
    vhCheck("main");
  }, []);

  return (
    <>
      <main className="w-screen h-screen flex flex-col bg-white">
        <div className="grow flex-col flex overflow-hidden">
          {props?.header}
          {props.children}
        </div>
        <nav className="shrink-0 flex border-t px-7 py-5 justify-between">
          <div className="flex flex-col items-center gap-2 shrink-0 pointer-cursor">
            <NotificationIcon width={30} height={30} />
            <span className="text-xs text-[#686777]">Home</span>
          </div>
          <div className="flex flex-col items-center gap-2 shrink-0 pointer-cursor">
            <DocumentIcon width={30} height={30} />
            <span className="text-xs text-[#686777]">Consolidations</span>
          </div>
          <div className="flex flex-col items-center gap-2 shrink-0 pointer-cursor">
            <GroupIcon width={30} height={30} />
            <span className="text-xs text-[#686777]">Networks</span>
          </div>
          <Link href="/profile">
            <div className="flex flex-col items-center gap-2 shrink-0 pointer-cursor">
              <UserIcon
                width={30}
                height={30}
                isActive={activeRoute === "profile"}
              />
              <span className="text-xs text-[#686777]">Profile</span>
            </div>
          </Link>
        </nav>
      </main>
    </>
  );
}
