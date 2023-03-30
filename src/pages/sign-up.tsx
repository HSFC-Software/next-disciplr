import Head from "next/head";
import { useFlags } from "launchdarkly-react-client-sdk";
import { useState } from "react";
import { useSignUp } from "@/lib/mutations";

export function SignUp() {
  const { enableAlphaUsersRegistration } = useFlags();

  const { mutate, isLoading } = useSignUp();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  const handleOnSubmit = () => {
    mutate(
      { first_name: firstname, last_name: lastname, email },
      {
        onSuccess: () => {
          // redirect to sign-in page
          window.location.href = "/sign-in";
        },
      }
    );
  };

  return (
    <>
      <Head>
        <title>Disciplr | Sign Up</title>
        <meta name="description" content="Consolidation for Network Leader" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="w-screen w-full h-screen flex items-center justify-center">
        <div className="w-full px-7">
          <h1 className="text-3xl mb-6 text-slate-700 text-center">
            <span className="font-bold">Disciplr</span>{" "}
            <span className="font-light">Alpha</span>
            <div className="text-base text-gray-500 mt-2">
              Do you disciple? Join us now 🙌🏼
            </div>
          </h1>
          <div className="flex flex-col gap-7">
            <div className="flex flex-col">
              <input
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                autoFocus
                className="bg-transparent border-b border-gray-300 py-3 outline-none"
                placeholder="Firstname"
              />
            </div>
            <div className="flex flex-col">
              <input
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="bg-transparent border-b border-gray-300 py-3 outline-none"
                placeholder="Surname"
              />
            </div>
            <div className="flex flex-col">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent border-b border-gray-300 py-3 outline-none"
                placeholder="Gmail address"
              />
            </div>
            <div className="text-center">
              <button
                onClick={handleOnSubmit}
                disabled={!firstname || !lastname || !email || isLoading}
                className="bg-[#6474dc] disabled:bg-[#e0e9f1] hover:bg-[#4c55dc] text-white px-7 py-3 rounded-lg hover:shadow-md"
              >
                Absolutely! I&apos;m a discplr
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default SignUp;
