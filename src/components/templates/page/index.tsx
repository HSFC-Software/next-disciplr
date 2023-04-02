import Auth from "@/components/base/auth";
import DocumentIcon from "@/components/base/icons/Document";
import GroupIcon from "@/components/base/icons/Group";
import NotificationIcon from "@/components/base/icons/Notification";
import UserIcon from "@/components/base/icons/User";
import { ModalProvider } from "@/components/base/modal/Provider";
import { useToken } from "@/lib/hooks";
import Link from "next/link";
import { ReactNode, useEffect } from "react";
import styles from "./index.module.scss";

export default function Layout(props: {
  children?: ReactNode;
  activeRoute?: string;
  header?: ReactNode;
}) {
  const { activeRoute } = props;
  const token = useToken();

  if (!token) return <Auth></Auth>;

  return (
    <ModalProvider>
      <Auth>
        <main className="w-screen h-screen flex flex-col bg-white relative text-gray-900">
          <div id="header-filler" />
          <div id="content-area" className="grow flex-col flex overflow-y-auto">
            {props?.header}
            {props.children}
            <div id="footer-filler" />
          </div>
          <Nav activeRoute={activeRoute} />
        </main>
      </Auth>
    </ModalProvider>
  );
}

function Nav(props: { activeRoute?: string }) {
  const { activeRoute } = props;

  useEffect(() => {
    const filler = document.getElementById("footer-filler");
    const nav = document.getElementById("nav");

    if (filler && nav) {
      filler.style.paddingBottom = `${nav.offsetHeight}px`;
    }
  });

  return (
    <nav
      id="nav"
      className="shrink-0 flex px-7 py-5 justify-center fixed bottom-7 w-screen z-10"
    >
      <div className={`${styles.navigation} px-14 py-5 bg-blue-200 bg-white`}>
        <Link href="/networks">
          <GroupIcon
            width={38}
            height={38}
            isActive={activeRoute === "networks"}
          />
        </Link>
        <Link href="/conso" className="relative flex items-center">
          <DocumentIcon
            width={38}
            height={38}
            isActive={activeRoute === "conso"}
          />
          <span className="text-[8px] absolute bg-[#FB5D64] text-white px-2 rounded-lg w-[50px] text-center ml-[-7px]">
            Soon
          </span>
        </Link>
        <Link href="/" className="relative flex items-center">
          <NotificationIcon
            width={38}
            height={38}
            isActive={activeRoute === "/"}
          />
          <span className="text-[8px] absolute bg-[#FB5D64] text-white px-2 rounded-lg w-[50px] text-center ml-[-7px]">
            Soon
          </span>
        </Link>
        <Link href="/profile">
          <UserIcon
            width={38}
            height={38}
            isActive={activeRoute === "profile"}
          />
        </Link>
      </div>
    </nav>
  );

  return (
    <nav
      id="nav"
      className="shrink-0 flex border-t px-7 py-5 justify-between fixed bottom-0 w-screen bg-white z-10"
    >
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

      <Link href="/conso">
        <div className="flex flex-col items-center gap-2 shrink-0 pointer-cursor relative">
          <DocumentIcon
            width={30}
            height={30}
            isActive={activeRoute === "conso"}
          />
          <span className="text-[8px] absolute bg-[#FB5D64] text-white px-2 rounded-lg top-0 ml-8">
            Soon
          </span>
          <span className="text-xs text-[#686777]">Consolidations</span>
        </div>
      </Link>

      <Link href="/">
        <div className="flex flex-col items-center gap-2 shrink-0 pointer-cursor relative">
          <NotificationIcon
            width={30}
            height={30}
            isActive={activeRoute === "/"}
          />
          <span className="text-[8px] absolute bg-[#FB5D64] text-white px-2 rounded-lg top-0 ml-8">
            Soon
          </span>
          <span className="text-xs text-[#686777]">Notifcations</span>
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
