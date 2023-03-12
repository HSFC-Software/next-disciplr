import NetworkCard from "@/components/modules/network-card";
import moment from "moment";
import { useGetSubNetworks } from "@/lib/queries";

export const Networks = (props: { id: string }) => {
  const { data: subNetworks } = useGetSubNetworks(props.id);

  return (
    <section>
      <header className="text-[#686777] uppercase font-semibold pb-7">
        Networks
      </header>
      <div className="flex flex-col gap-3">
        {subNetworks?.map((network) => {
          return (
            <NetworkCard
              id={network.networks_id.id}
              key={network.id}
              alias={network.networks_id.name}
              created_at={moment(network.created_at).format("MMM DD, YYYY")}
              member_count={network.networks_id.member_count ?? 0}
              status={network.status}
            />
          );
        })}
      </div>
    </section>
  );
};
