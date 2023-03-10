import { useMutation, useQueryClient } from "react-query";
import {
  linkExistingMember,
  LinkExistingMemberPayload,
  linkNewMember,
  LinkNewMemberPayload,
  markNetworkInactive,
  openNetwork,
  OpenNetworkPayload,
  removeMember,
  unlinkMember,
  updateNetwork,
  UpdateNetworkPayload,
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

export const useUnlinkMember = (netowrkId: string) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, string>((id) => unlinkMember(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["getNetworkMembers", { id: netowrkId }]);
    },
  });
};

export const useRemoveMember = (netowrkId: string) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, string>((id) => removeMember(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["getNetworkMembers", { id: netowrkId }]);
    },
  });
};

export const useUpdateNetwork = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<Network, unknown, UpdateNetworkPayload>(
    (payload) => updateNetwork(id, payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getNetworkDetails", { id }]);
      },
    }
  );
};

export const useMarkInactiveNetwork = () => {
  const queryClient = useQueryClient();

  return useMutation<Network, unknown, string>(
    (id) => markNetworkInactive(id),
    {
      onSuccess: (_, id) => {
        queryClient.invalidateQueries(["getNetworkDetails", { id }]);
      },
    }
  );
};
