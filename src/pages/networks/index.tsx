import Header from "@/components/base/header";
import Layout from "@/components/templates/layout";
import Head from "next/head";
import NetworkCard from "@/components/modules/network-card";
import { useGetNetworksByDiscipler, useGetProfile } from "@/lib/queries";
import moment from "moment";
import Body from "@/components/base/body";

const Networks = () => {
  const { data: profile } = useGetProfile();
  const { data: networks } = useGetNetworksByDiscipler(profile?.id ?? "");

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
            <span>Networks</span>
          </div>
        </Header>
        <Body>
          <div className="p-7 flex flex-col gap-8">
            {networks?.map((network) => {
              return (
                <NetworkCard
                  id={network.id}
                  key={network.id}
                  alias={network.name}
                  created_at={moment(network.created_at).format("MMM DD, YYYY")}
                  member_count={network.member_count ?? 0}
                  status={network.status}
                />
              );
            })}
          </div>
        </Body>
      </Layout>
    </>
  );
};

export default Networks;
