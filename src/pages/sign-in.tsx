import { supabase } from "@/lib/supabase";
import Head from "next/head";

export default function Home() {
  const handleClick = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth` },
    });
  };

  return (
    <>
      <Head>
        <title>HSFC Consolidation</title>
        <meta name="description" content="Consolidation for Network Leader" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-screen w-full h-screen flex items-center justify-center">
        <div className="text-center px-12">
          <h1 className="text-4xl mb-6 font-bold text-slate-700">
            Let&apos;s make it simple and make it happen.
          </h1>
          <button
            onClick={handleClick}
            className="bg-[#6474dc] hover:bg-[#4c55dc] text-white px-7 py-3 rounded-lg hover:shadow-md"
          >
            Sign in with Google
          </button>
        </div>
      </main>
    </>
  );
}
