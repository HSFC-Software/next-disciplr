import NetworkCard from "@/components/modules/network-card";
import moment from "moment";
import { useGetSubNetworks } from "@/lib/queries";
import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { generateNumberBetween } from "@/lib/utils";

export const Networks = (props: { id: string }) => {
  const { data: subNetworks, isLoading } = useGetSubNetworks(props.id);

  return (
    <section>
      <header className="text-[#686777] uppercase font-semibold pb-7">
        Networks
      </header>
      {isLoading && <Preloader />}
      <div className="flex flex-col gap-3">
        {subNetworks?.map((network) => {
          return (
            <NetworkCard
              id={network.networks_id.id}
              key={network.id}
              alias={network.networks_id.name}
              created_at={moment(network.created_at).format("MMM DD, YYYY")}
              member_count={network.member_count ?? 0}
              status={network.networks_id.status}
            />
          );
        })}
      </div>
    </section>
  );
};

function Preloader() {
  const [units, setUnits] = useState<number>(1);
  const [randomWidth, setRandomWidth] = useState<number[]>();

  useEffect(() => {
    const count = generateNumberBetween(1, 3);
    const tuples = new Array(count)
      .fill(0)
      .map((_) => generateNumberBetween(80, 140));

    setRandomWidth(tuples);
    setUnits(count);
  }, []);

  if (!!units) {
    return (
      <div className="gap flex flex-col gap-3">
        {randomWidth?.map((width, index) => (
          <div
            key={index}
            className="h-[117px] w-full bg-gray-50 rounded-3xl px-7 py-5"
          >
            <div className="flex gap-4 items-center">
              <div className="shrink-0">
                <Skeleton width={77} height={77} variant="circular" />
              </div>
              <div className="grow">
                <Skeleton width={width} height={21} />
                <Skeleton width={width} height={14} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
}
