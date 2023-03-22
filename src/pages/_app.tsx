import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import { Provider as Store } from "react-redux";
import { store } from "@/lib/models";
import LauncharklyProvider, {
  LauncharklyConsumer,
} from "@/components/modules/launchdarkly";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <LauncharklyProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Store store={store}>
            <LauncharklyConsumer>
              <Component {...pageProps} />
            </LauncharklyConsumer>
          </Store>
        </Hydrate>
      </QueryClientProvider>
    </LauncharklyProvider>
  );
}
