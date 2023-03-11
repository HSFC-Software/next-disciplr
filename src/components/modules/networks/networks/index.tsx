import NetworkCard from "@/components/modules/network-card";
import moment from "moment";
import { useGetSubNetworks } from "@/lib/queries";

export const Networks = (props: { id: string }) => {
  const { data: subNetworks } = useGetSubNetworks(props.id);

  return (
    <section className="flex flex-col gap-3">
      <header>Networks</header>
      {subNetworks?.map((network) => {
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
    </section>
  );
};
