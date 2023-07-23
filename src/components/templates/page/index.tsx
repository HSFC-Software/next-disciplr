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
      className="shrink-0 flex pt-5 justify-center fixed bottom-0 w-screen z-50 pointer-events-none"
    >
      <div
        className={`${styles.navigation} px-7 py-3 bg-white pointer-events-auto w-full`}
      >
        <Link className="gap-2 flex flex-col items-center" href="/networks">
          <GroupIcon
            width={30}
            height={30}
            isActive={activeRoute === "networks"}
          />
          <small
            style={{ opacity: activeRoute === "networks" ? 1 : 0.4 }}
            className="text-[10px] font-medium text-[#6e7ac5]"
          >
            NETWORK
          </small>
        </Link>

        <Link
          href="/conso"
          className="gap-2 flex flex-col items-center relative flex items-center"
        >
          <ConsolidationIcon
            width={30}
            height={30}
            isActive={activeRoute === "conso"}
          />
          <small
            style={{ opacity: activeRoute === "conso" ? 1 : 0.4 }}
            className="text-[10px] font-medium text-[#6e7ac5]"
          >
            CONSO
          </small>
        </Link>
        <div className="relative flex items-center">
          <Link href="/events" className="gap-2 flex flex-col items-center">
            <NotificationIcon
              width={30}
              height={30}
              isActive={activeRoute === "events"}
            />
            <small
              style={{ opacity: activeRoute === "events" ? 1 : 0.4 }}
              className="text-[10px] font-medium text-[#6e7ac5]"
            >
              SDL
            </small>
          </Link>
          <span className="text-[8px] absolute bg-primary text-white py-[1px] px-2 rounded-lg w-[50px] text-center ml-[-10px] font-medium">
            SOON
          </span>
        </div>
        <Link className="gap-2 flex flex-col items-center" href="/account">
          <UserIcon
            width={30}
            height={30}
            isActive={activeRoute === "account"}
          />
          <small
            style={{ opacity: activeRoute === "account" ? 1 : 0.4 }}
            className="text-[10px] font-medium text-[#6e7ac5]"
          >
            ACCOUNT
          </small>
        </Link>
      </div>
    </nav>
  );
}
