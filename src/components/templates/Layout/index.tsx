import Auth from "@/components/base/auth";
import DocumentIcon from "@/components/base/icons/Document";
import GroupIcon from "@/components/base/icons/Group";
import NotificationIcon from "@/components/base/icons/Notification";
import UserIcon from "@/components/base/icons/User";
import Link from "next/link";
import { ReactNode, useEffect } from "react";

export default function Layout(props: {
  children?: ReactNode;
  activeRoute?: string;
  header?: ReactNode;
}) {
  const { activeRoute } = props;

  return (
    <Auth>
      <main className="w-screen h-screen flex flex-col bg-white relative text-gray-900">
        <div id="header-filler" />
        <div id="content-area" className="grow flex-col flex overflow-hidden">
          {props?.header}
          {props.children}
        </div>
        <div id="footer-filler" />
        <Nav activeRoute={activeRoute} />
      </main>
    </Auth>
  );
}

function Nav(props: { activeRoute?: string }) {
  const { activeRoute } = props;

  useEffect(() => {
    const filler = document.getElementById("footer-filler");
    const nav = document.getElementById("nav");

    if (filler && nav) {
      filler.style.marginBottom = `${nav.offsetHeight}px`;
    }
  });

  return (
    <nav
      id="nav"
      className="shrink-0 flex border-t px-7 py-5 justify-between fixed bottom-0 w-screen bg-white z-10"
    >
      <div className="flex flex-col items-center gap-2 shrink-0 pointer-cursor">
        <NotificationIcon width={30} height={30} />
        <span className="text-xs text-[#686777]">Home</span>
      </div>
      <div className="flex flex-col items-center gap-2 shrink-0 pointer-cursor">
        <DocumentIcon width={30} height={30} />
        <span className="text-xs text-[#686777]">Consolidations</span>
      </div>
      <Link href="/networks">
        <div className="flex flex-col items-center gap-2 shrink-0 pointer-cursor">
          <GroupIcon
            width={30}
            height={30}
            isActive={activeRoute === "networks"}
          />
          <span className="text-xs text-[#686777]">Networks</span>
        </div>
      </Link>
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
  );
}
