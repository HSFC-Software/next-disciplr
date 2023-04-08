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
        <title>Disciplr | Sign In</title>
        <meta name="description" content="Disciplr | Sign In" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="w-screen w-full h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl mb-6 font-bold text-slate-700">
            <div>Disciplr.</div>
            <span className="font-light text-base">
              Welcome back! 🎉 Sign in to continue.
            </span>
          </h1>
          <button
            onClick={handleClick}
            className="bg-primary text-white px-7 py-3 rounded-lg hover:shadow-md"
          >
            Sign in with Google
          </button>
        </div>
      </main>
    </>
  );
}
