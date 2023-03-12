import { useMutation, useQueryClient } from "react-query";
import { openNetwork, OpenNetworkPayload } from "@/lib/api";
import { Network } from "@/types/networks";

export const useOpenNetwork = (network_id: string) => {
  const queryClient = useQueryClient();

  return useMutation<Network, unknown, OpenNetworkPayload>(
    (payload: OpenNetworkPayload) => openNetwork(payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getSubNetworks", { id: network_id }]);
      },
    }
  );
};
