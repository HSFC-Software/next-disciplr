import Head from "next/head";
import { useFlags } from "launchdarkly-react-client-sdk";

export function SignUp() {
  const { enableAlphaUsersRegistration } = useFlags();

  console.log(enableAlphaUsersRegistration);

  return (
    <>
      <Head>
        <title>Disciplr | Sign Up</title>
        <meta name="description" content="Consolidation for Network Leader" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-screen w-full h-screen flex items-center justify-center"></main>
    </>
  );
}

export default SignUp;
