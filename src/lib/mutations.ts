import { useMutation, useQueryClient } from "react-query";
import {
  linkExistingMember,
  LinkExistingMemberPayload,
  linkNewMember,
  LinkNewMemberPayload,
  openNetwork,
  OpenNetworkPayload,
} from "@/lib/api";
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

export const useLinkNewMember = (network_id: string) => {
  const queryClient = useQueryClient();

  return useMutation<Network, unknown, LinkNewMemberPayload>(
    (payload: LinkNewMemberPayload) => linkNewMember(payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          "getNetworkMembers",
          { id: network_id },
        ]);
      },
    }
  );
};

export const useLinkExistingMember = (network_id: string) => {
  const queryClient = useQueryClient();

  return useMutation<Network, unknown, LinkExistingMemberPayload>(
    (payload: LinkExistingMemberPayload) => linkExistingMember(payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          "getNetworkMembers",
          { id: network_id },
        ]);
      },
    }
  );
};
