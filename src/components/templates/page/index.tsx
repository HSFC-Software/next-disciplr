import Auth from "@/components/base/auth";
import ConsolidationIcon from "@/components/base/icons/Consolidation";
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
  isNavigationHidden?: boolean;
}) {
  const { activeRoute } = props;
  const token = useToken();

  if (!token) return <Auth></Auth>;

  return (
    <ModalProvider>
      <Auth>
        <main className="w-screen h-screen flex flex-col bg-white relative text-gray-900">
          <div id="header-filler" />
          <div id="content-area" className="grow flex-col flex relative">
            {props?.header}
            {props.children}
            <div id="footer-filler" className="bg-white" />
          </div>
          {props?.isNavigationHidden ? null : <Nav activeRoute={activeRoute} />}
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
      filler.style.paddingBottom = `${nav.offsetHeight * 1.5}px`;
    }
  });

  return (
    <nav
      id="nav"
      className="shrink-0 flex px-7 py-5 justify-center fixed bottom-7 w-screen z-10 pointer-events-none"
    >
      <div
        className={`${styles.navigation} px-14 py-5 bg-blue-200 bg-white pointer-events-auto`}
      >
        <Link href="/networks">
          <GroupIcon
            width={38}
            height={38}
            isActive={activeRoute === "networks"}
          />
        </Link>
        <Link href="/conso" className="relative flex items-center">
          <ConsolidationIcon
            width={38}
            height={38}
            isActive={activeRoute === "conso"}
          />
        </Link>
        <Link href="/events" className="relative flex items-center">
          <NotificationIcon
            width={38}
            height={38}
            isActive={activeRoute === "/events"}
          />
          <span className="text-[8px] absolute bg-primary text-white px-2 rounded-lg w-[50px] text-center ml-[-7px]">
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
}
