import { supabase } from "@/lib/supabase";
import Head from "next/head";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function Home() {
  const router = useRouter();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignInWithGoogle = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth`,
      },
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
        if (!res?.error)
          return (window.location.href = `${window.location.origin}/auth#access_token=${res.data.session?.access_token}`);
        else
          toast.error(res.error?.message, {
            autoClose: 750,
            hideProgressBar: true,
            position: "top-center",
          });
      })
      .catch((err) => console.log(err))
      .finally(() => setIsSigningIn(false));
  };

  useEffect(() => {
    if (router.query.provider === "google") {
      document.getElementById("sign-in-with-google")?.click?.();
    }

    if (router.query.token === "expired") {
      toast("Your session has expired. Please sign in again.", {
        autoClose: 2500,
      });
    }

    if (router.query.user === "unauthorized") {
      // unauthorized login message
      toast.warn(
        "This email is not yet registered. Please contact your disciplr.",
        {
          autoClose: 3000,
          hideProgressBar: true,
          position: "top-center",
        }
      );
    }
  }, [router]);

  useEffect(() => {
    document.getElementById("email")?.focus();
  }, []);

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
            Welcome back{" "}
            <span className="font-bold text-primary">Disciplr</span> 🎉
          </div>
          <span className="text-base font-light text-gray-400">
            Sign in to continue
          </span>
          <div className="my-7 px-7">
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
            Submit
          </button>
          <div />

          <p className="mt-8 px-2 text-sm text-gray-400">
          By clicking "Submit" or "Sign In with Google", you agree to our <a className="text-[#6e7ac5]" href="https://app.fishgen.org/privacy.html">Privacy Policy</a>
          </p>

          <button
            id="sign-in-with-google"
            onClick={handleSignInWithGoogle}
            className="mt-8 text-base text-[#6e7ac5]"
          >
            <Image 
              src="/btn_google_signin_light_normal_web@2x.png"
              alt="google sign in"
              width="200"
              height="200"
            />
          </button>

        </div>
      </main>
    </>
  );
}
