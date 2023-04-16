import { supabase } from "@/lib/supabase";
import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignInWithGoogle = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth` },
    });
  };

  const handleSignInByEmailPassword = () => {
    setIsSigningIn(true);
    supabase.auth
      .signInWithPassword({
        email: (document.getElementById("email") as HTMLInputElement)?.value ?? "", // prettier-ignore
        password: (document.getElementById("password") as HTMLInputElement)?.value ?? "", // prettier-ignore
      })
      .then((res) => {
        window.location.href = `${window.location.origin}/auth#access_token=${res.data.session?.access_token}`;
      })
      .catch((err) => console.log(err))
      .finally(() => setIsSigningIn(false));
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
            <div>Disciplr</div>
            <span className="text-base font-normal text-gray-400">
              Welcome back <strong>Disciplr 🎉</strong> Sign in to continue
            </span>
          </h1>
          <div className="mb-7">
            <input
              id="email"
              disabled={isSigningIn}
              placeholder="Email"
              className="w-full px-4 py-2 border-2 rounded-xl mt-2 border-gray-300"
            />
            <input
              id="password"
              disabled={isSigningIn}
              placeholder="Password"
              type="password"
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  handleSignInByEmailPassword();
                }
              }}
              className="w-full px-4 py-2 border-2 rounded-xl mt-2 border-gray-300"
            />
          </div>
          <button
            disabled={isSigningIn}
            onClick={handleSignInByEmailPassword}
            className="bg-[#6e7ac5] disabled:opacity-50 text-white px-14 py-3 rounded-xl hover:shadow-md"
          >
            Sign in
          </button>
          <div />
          <button
            onClick={handleSignInWithGoogle}
            className="mt-14 text-base text-[#6e7ac5]"
          >
            Sign in with <strong className="text-primary">Google</strong>
          </button>
        </div>
      </main>
    </>
  );
}
