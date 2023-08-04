import { ReactNode, useEffect } from "react";
import { parseCookies, destroyCookie } from "nookies";
import { GetServerSidePropsContext } from "next";

// TODO: hande token evaluation in server side
// TODO: apply this in every route / pages
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const token = ctx.req.headers.cookie?.split("=")[1];

  // TODO: validate session

  return {
    props: {},
  };
};

export default function Auth({ children }: { children?: ReactNode }) {
  useEffect(() => {
    const cookie = parseCookies();
    let token = cookie.token;

    if (!token) {
      // destroyCookie(null, "token");
      window.location.href = `/sign-in`;
    }
  }, []);

  return <>{children}</>;
}
