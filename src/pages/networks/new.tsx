import Header from "@/components/base/header";
import Layout from "@/components/templates/layout";
import { useGetNetworkDetails } from "@/lib/queries";
import Head from "next/head";
import { useRouter } from "next/router";
import Body from "@/components/base/body";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/base/button";
import { useOpenNetwork } from "@/lib/mutations";

export const getServerSideProps = (context: any) => {
  return {
    props: {
      id: context.query.id,
    },
  };
};

const NewNetwork = () => {
  let leader = "";
  const [initialized, setInitialized] = useState(false);
  const [name, setName] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate: openNetwork } = useOpenNetwork(router.query.id as string);

  const { data: network } = useGetNetworkDetails(String(router.query.id));

  useEffect(() => {
    if (network && !name && inputRef.current && !initialized) {
      setName(`${network.discipler_id.first_name}'s Network`);
      inputRef.current.focus();
      setInitialized(true);
    }
  }, [name, network, inputRef, initialized]);

  if (network?.discipler_id?.first_name) {
    leader += network?.discipler_id?.last_name;
  }

  if (network?.discipler_id?.last_name) {
    leader += ", " + network?.discipler_id?.first_name;
  }

  const handleOnSuccess = () => {
    router.push(`/networks/${router.query.id}`);
  };

  const handleSubmit = () => {
    if (network) {
      const payload = {
        name,
        discipler_id: network?.discipler_id.id,
        network_id: network?.id,
      };

      openNetwork(payload, { onSuccess: handleOnSuccess });
    }
  };

  return (
    <>
      <Head>
        <title>Disciplr</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout activeRoute="networks">
        <Header>
          <div className="flex w-full justify-between items-center">
            New Network
          </div>
        </Header>
        <Body>
          <div className="p-7 flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label className="block uppercase text-sm">
                Leader&apos;s Name
              </label>
              <input
                value={leader}
                disabled
                className="bg-[#f2f2f8] w-full px-4 py-3 rounded-lg outline-none opacity-50"
              />
            </div>
            <div className="flex flex-col gap-2 mb-7">
              <label className="block uppercase text-sm">Network Name</label>
              <input
                ref={inputRef}
                value={name}
                className="bg-[#f2f2f8] w-full px-4 py-3 rounded-lg outline-none"
                placeholder="Enter Network Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <Button disabled={!network} onClick={handleSubmit}>
              Open New Network
            </Button>
          </div>
        </Body>
      </Layout>
    </>
  );
};

export default NewNetwork;
