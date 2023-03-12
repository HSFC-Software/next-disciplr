import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import { Provider as Store } from "react-redux";
import { store } from "@/lib/models";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Store store={store}>
          <Component {...pageProps} />
        </Store>
      </Hydrate>
    </QueryClientProvider>
  );
}
