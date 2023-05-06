import Flagged from "@/components/modules/flagged";
import { useGetNetworkMembers, useGetSubNetworks } from "@/lib/queries";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useQueryClient } from "react-query";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";

const Results = () => {
  return (
    <Flagged flagKey="enableRegistrationResults">
      <Component />
    </Flagged>
  );
};

export default Results;

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
  legend: {
    display: false,
  },
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
      text: "Disciplr Members Registration",
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          },
        },
      ],
    },
  },
};

function Component() {
  const queryClient = useQueryClient();

  const { data: primaryNetworks } = useGetSubNetworks(
    "4758a17f-3a5b-4884-8243-df6aa14df578"
  );

  useEffect(() => {
    supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "network_disciples",
        },
        (payload) => {
          console.log("Invalidating:", payload.new.network_id);
          queryClient.invalidateQueries([
            "getNetworkMembers",
            { id: payload.new.network_id },
          ]);
        }
      )
      .subscribe();
  }, []);

  // girls
  const danica = primaryNetworks?.find(
    (item) => item.networks_id.id === "04b5de8a-64e1-4261-9cb6-2efcf9cdb68c"
  );

  const { data: danicaMembers } = useGetNetworkMembers(danica?.networks_id?.id ?? ""); // prettier-ignore

  const daisy = primaryNetworks?.find(
    (item) => item.networks_id.id === "1df26bfe-06cd-4067-a885-7261c1f3eae5"
  );

  const { data: daisyMembers } = useGetNetworkMembers(daisy?.networks_id?.id ?? ""); // prettier-ignore

  const jhovie = primaryNetworks?.find(
    (item) => item.networks_id.id === "dfb48bfe-379f-4812-9648-3aa2aa55c32c"
  );

  const { data: jhovieMembers } = useGetNetworkMembers(jhovie?.networks_id?.id ?? ""); // prettier-ignore

  const keren = primaryNetworks?.find(
    (item) => item.networks_id.id === "b79d4ff9-ad54-493d-9b67-d8c94964ea53"
  );

  const { data: kerenMembers } = useGetNetworkMembers(keren?.networks_id?.id ?? ""); // prettier-ignore

  const malou = primaryNetworks?.find(
    (item) => item.networks_id.id === "627f6f01-362b-4f8c-afaf-939c0cb06ac7"
  );

  const { data: malouMembers } = useGetNetworkMembers(malou?.networks_id?.id ?? ""); // prettier-ignore

  const romualda = primaryNetworks?.find(
    (item) => item.networks_id.id === "10cbd33a-d8f5-4bf5-a958-eea526380498"
  );

  const { data: romualdaMembers } = useGetNetworkMembers(romualda?.networks_id?.id ?? ""); // prettier-ignore

  const cora = primaryNetworks?.find(
    (item) => item.networks_id.id === "fd34f874-11c6-49c9-b90e-cff4ebded40c"
  );

  const { data: coraMembers } = useGetNetworkMembers(cora?.networks_id?.id ?? ""); // prettier-ignore

  const leonisa = primaryNetworks?.find(
    (item) => item.networks_id.id === "9fdf3ed3-9878-4566-9c27-e7b146339248"
  );

  const { data: leonisaMembers } = useGetNetworkMembers(leonisa?.networks_id?.id ?? ""); // prettier-ignore

  const lyndz = primaryNetworks?.find(
    (item) => item.networks_id.id === "dc21f2b5-a430-4544-8b2b-77676e7c3a9a"
  );

  const { data: lyndzMembers } = useGetNetworkMembers(lyndz?.networks_id?.id ?? ""); // prettier-ignore

  const jinky = primaryNetworks?.find(
    (item) => item.networks_id.id === "0878b349-5892-442b-9d34-df0a8e801e08"
  );

  const { data: jinkyMembers } = useGetNetworkMembers(jinky?.networks_id?.id ?? ""); // prettier-ignore

  const erica = primaryNetworks?.find(
    (item) => item.networks_id.id === "5f76006e-c182-4544-8fe8-dba110087811"
  );

  const { data: ericaMembers } = useGetNetworkMembers(erica?.networks_id?.id ?? ""); // prettier-ignore

  const grace = primaryNetworks?.find(
    (item) => item.networks_id.id === "0cde90d9-fea4-4272-853b-a50d1216ad71"
  );

  const { data: graceMembers } = useGetNetworkMembers(grace?.networks_id?.id ?? ""); // prettier-ignore

  // boys

  const jomar = primaryNetworks?.find(
    (item) => item.networks_id.id === "6efe464d-ee78-422c-be2f-1e9a0ef57e7b"
  );

  const { data: jomarMembers } = useGetNetworkMembers(jomar?.networks_id?.id ?? ""); // prettier-ignore

  const jay = primaryNetworks?.find(
    (item) => item.networks_id.id === "78263d81-d895-4626-82e9-07023fc6ec19"
  );

  const { data: jayMembers } = useGetNetworkMembers(jay?.networks_id?.id ?? ""); // prettier-ignore

  const paul = primaryNetworks?.find(
    (item) => item.networks_id.id === "776c5528-54b0-4f64-a69c-0e4acd44b827"
  );

  const { data: paulMembers } = useGetNetworkMembers(paul?.networks_id?.id ?? ""); // prettier-ignore

  const adrean = primaryNetworks?.find(
    (item) => item.networks_id.id === "9d500500-203d-4dd3-b4f7-f2117acd4c3b"
  );

  const { data: adreanMembers } = useGetNetworkMembers(adrean?.networks_id?.id ?? ""); // prettier-ignore

  const rolando = primaryNetworks?.find(
    (item) => item.networks_id.id === "9fcc9b3c-414a-43b6-8a70-f67b63bc1e38"
  );

  const { data: rolandoMembers } = useGetNetworkMembers(rolando?.networks_id?.id ?? ""); // prettier-ignore

  const arsenio = primaryNetworks?.find(
    (item) => item.networks_id.id === "5974b339-3887-4f4d-8123-0fbd969150b7"
  );

  const { data: arsenioMembers } = useGetNetworkMembers(arsenio?.networks_id?.id ?? ""); // prettier-ignore

  const elpidio = primaryNetworks?.find(
    (item) => item.networks_id.id === "0002960b-6184-457e-9702-39971de3cacd"
  );

  const { data: elpidioMembers } = useGetNetworkMembers(elpidio?.networks_id?.id ?? ""); // prettier-ignore

  const jeffre = primaryNetworks?.find(
    (item) => item.networks_id.id === "0e6fc192-b4e7-4ac6-b389-5c9922b47001"
  );

  const { data: jeffreMembers } = useGetNetworkMembers(jeffre?.networks_id?.id ?? ""); // prettier-ignore

  const glen = primaryNetworks?.find(
    (item) => item.networks_id.id === "a1219331-7587-4c0e-a1f5-ca3c20d15a1f"
  );

  const { data: glenMembers } = useGetNetworkMembers(glen?.networks_id?.id ?? ""); // prettier-ignore

  const nilo = primaryNetworks?.find(
    (item) => item.networks_id.id === "8c9d4aed-ad3e-4084-a10d-b9a9c6c5fe0e"
  );

  const { data: niloMembers } = useGetNetworkMembers(nilo?.networks_id?.id ?? ""); // prettier-ignore

  const mark = primaryNetworks?.find(
    (item) => item.networks_id.id === "73bb650d-e9a9-40bb-8c26-4dcb72c5928c"
  );

  const { data: markMembers } = useGetNetworkMembers(mark?.networks_id?.id ?? ""); // prettier-ignore

  const harry = primaryNetworks?.find(
    (item) => item.networks_id.id === "5aa3bc86-8ad1-410c-9586-badf959f5b8a"
  );

  const { data: harryMembers } = useGetNetworkMembers(harry?.networks_id?.id ?? ""); // prettier-ignore

  const girlsDataSet = {
    danica: {
      ...danica,
      members: danicaMembers,
    },
    daisy: {
      ...daisy,
      members: daisyMembers,
    },
    jhovie: {
      ...jhovie,
      members: jhovieMembers,
    },
    keren: {
      ...keren,
      members: kerenMembers,
    },
    malou: {
      ...malou,
      members: malouMembers,
    },
    romualda: {
      ...romualda,
      members: romualdaMembers,
    },
    cora: {
      ...cora,
      members: coraMembers,
    },
    leonisa: {
      ...leonisa,
      members: leonisaMembers,
    },
    lyndz: {
      ...lyndz,
      members: lyndzMembers,
    },
    jinky: {
      ...jinky,
      members: jinkyMembers,
    },
    erica: {
      ...erica,
      members: ericaMembers,
    },
    grace: {
      ...grace,
      members: graceMembers,
    },
  };

  const boysDataSet = {
    jomar: {
      ...jomar,
      members: jomarMembers,
    },
    jay: {
      ...jay,
      members: jayMembers,
    },
    paul: {
      ...paul,
      members: paulMembers,
    },
    adrean: {
      ...adrean,
      members: adreanMembers,
    },
    rolando: {
      ...rolando,
      members: rolandoMembers,
    },
    arsenio: {
      ...arsenio,
      members: arsenioMembers,
    },
    elpidio: {
      ...elpidio,
      members: elpidioMembers,
    },
    jeffre: {
      ...jeffre,
      members: jeffreMembers,
    },
    glen: {
      ...glen,
      members: glenMembers,
    },
    nilo: {
      ...nilo,
      members: niloMembers,
    },
    mark: {
      ...mark,
      members: markMembers,
    },
    harry: {
      ...harry,
      members: harryMembers,
    },
  };

  const girlsDataSetSortedKey = Object.keys(girlsDataSet).sort((a, b) => {
    // sort by members length

    const aMembers = (girlsDataSet as any)?.[a].members?.length ?? 0;
    const bMembers = (girlsDataSet as any)?.[b].members?.length ?? 0;

    if (aMembers > bMembers) return -1;
    if (aMembers < bMembers) return 1;
    return 0;
  });

  const girlsDataSetLabels = girlsDataSetSortedKey.map((key) =>
    (girlsDataSet as any)?.[key]?.networks_id?.name?.split("Network")?.join("")
  );

  const girlsDataSetData = girlsDataSetSortedKey.map(
    (key) => (girlsDataSet as any)?.[key]?.members?.length
  );

  const girlsDataSetProps = {
    labels: girlsDataSetLabels,
    datasets: [
      {
        label: "Registered Members",
        data: girlsDataSetData,
        backgroundColor: "#FB5D64",
      },
    ],
  };

  const boysDataSetSortedKey = Object.keys(boysDataSet).sort((a, b) => {
    // sort by members length

    const aMembers = (boysDataSet as any)?.[a].members?.length ?? 0;
    const bMembers = (boysDataSet as any)?.[b].members?.length ?? 0;

    if (aMembers > bMembers) return -1;
    if (aMembers < bMembers) return 1;
    return 0;
  });

  const boysDataSetLabels = boysDataSetSortedKey.map((key) =>
    (boysDataSet as any)?.[key]?.networks_id?.name?.split("Network")?.join("")
  );

  const boysDataSetData = boysDataSetSortedKey.map(
    (key) => (boysDataSet as any)?.[key]?.members?.length
  );

  const boysDataSetProps = {
    labels: boysDataSetLabels,
    datasets: [
      {
        label: "Registered Members",
        data: boysDataSetData,
        backgroundColor: "#6e7ac5",
      },
    ],
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="grow-1 shrink-0 w-[780px]">
        <Bar options={options} data={girlsDataSetProps} />
      </div>

      <div className="grow-1 shrink-0 w-[780px]">
        <Bar options={options} data={boysDataSetProps} />
      </div>
    </div>
  );
}
