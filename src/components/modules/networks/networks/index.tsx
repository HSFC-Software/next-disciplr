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
      {subNetworks?.length === 0 && <EmptyScreen />}
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

const EmptyScreen = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 mb-7">
      <div className="opacity-75">
        <svg
          width={77}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Iconly/Bulk/Category">
            <g id="Category">
              <path
                id="Fill 1"
                opacity="0.4"
                d="M16.0755 2H19.4615C20.8637 2 22 3.14585 22 4.55996V7.97452C22 9.38864 20.8637 10.5345 19.4615 10.5345H16.0755C14.6732 10.5345 13.537 9.38864 13.537 7.97452V4.55996C13.537 3.14585 14.6732 2 16.0755 2Z"
                fill="#6e7ac5"
              />
              <path
                id="Combined Shape"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.53852 2H7.92449C9.32676 2 10.463 3.14585 10.463 4.55996V7.97452C10.463 9.38864 9.32676 10.5345 7.92449 10.5345H4.53852C3.13626 10.5345 2 9.38864 2 7.97452V4.55996C2 3.14585 3.13626 2 4.53852 2ZM4.53852 13.4655H7.92449C9.32676 13.4655 10.463 14.6114 10.463 16.0255V19.44C10.463 20.8532 9.32676 22 7.92449 22H4.53852C3.13626 22 2 20.8532 2 19.44V16.0255C2 14.6114 3.13626 13.4655 4.53852 13.4655ZM19.4615 13.4655H16.0755C14.6732 13.4655 13.537 14.6114 13.537 16.0255V19.44C13.537 20.8532 14.6732 22 16.0755 22H19.4615C20.8637 22 22 20.8532 22 19.44V16.0255C22 14.6114 20.8637 13.4655 19.4615 13.4655Z"
                fill="#6e7ac5"
              />
            </g>
          </g>
        </svg>
      </div>
      <div className="text-sm text-gray-500">
        There are no members in this network yet
      </div>
    </div>
  );
};
