import { supabase } from "@/lib/supabase";
import Head from "next/head";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function Home() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleSignUp = () => {
    if (!password) return;
    setIsSigningUp(true);

    supabase.auth
      .signUp({
        email: router.query?.email as string,
        password,
      })
      .then((res) => {
        console.log(res);
        // redirect to sign-in
        if (!res.error) {
          toast.success("Account created successfully! 🎉", {
            autoClose: 1500,
          });
          setTimeout(() => {
            return router.push(`/sign-in`);
          }, 1500);
        }

        if (res.error) {
          toast.error(res.error?.message, {
            autoClose: 1500,
            hideProgressBar: true,
            position: "top-center",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsSigningUp(false));
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
          {/* <h1 className="text-4xl font-bold text-slate-700 mb-2">
            <div>Disciplr</div>
          </h1> */}
          <div className="flex justify-center mb-7">
            <Image
              src="/disciplr-logo.png"
              alt="disciplr"
              width="100"
              height="100"
            />
          </div>
          <div className="text-base font-light text-gray-400">
            Welcome <span className="font-bold text-primary">Disciplr</span> 🎉
          </div>

          <div className="my-7 px-7">
            <input
              id="email"
              disabled
              value={router.query?.email}
              placeholder="Email"
              className="opacity-50 w-full px-4 py-2 border-2 rounded-xl mt-2 border-gray-300 cursor-not-allowed"
            />
            <input
              autoFocus
              id="password"
              disabled={isSigningUp}
              placeholder="Password"
              type="password"
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  handleSignUp();
                }
              }}
              onChange={(e) => setPassword(e?.target?.value)}
              className="w-full px-4 py-2 border-2 rounded-xl mt-2 border-gray-300"
            />
          </div>
          <button
            disabled={isSigningUp}
            onClick={handleSignUp}
            className="bg-[#6e7ac5] disabled:opacity-50 text-white px-14 py-3 rounded-xl hover:shadow-md"
          >
            Sign up
          </button>
          <div />
        </div>
      </main>
    </>
  );
}
