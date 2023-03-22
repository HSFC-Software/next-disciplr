import { withLDProvider, withLDConsumer } from "launchdarkly-react-client-sdk";
import { ReactNode } from "react";

function Provider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

function Consumer({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default withLDProvider({
  clientSideID: process.env.NEXT_PUBLIC_LD_CLIENTSIDE_ID ?? "",
})(Provider as any) as any;

export const LauncharklyConsumer = withLDConsumer()(Consumer);
