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
  signUp,
  SignUpPayload,
  unlinkMember,
  updateNetwork,
  UpdateNetworkPayload,
} from "@/lib/api";
import { Network } from "@/types/networks";
import { useGetProfile } from "./queries";

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
  const { data } = useGetProfile();
  const queryClient = useQueryClient();

  return useMutation<Network, unknown, LinkExistingMemberPayload>(
    (payload: LinkExistingMemberPayload) => linkExistingMember(payload),
    {
      onSuccess: (response) => {
        queryClient.invalidateQueries([
          "getNetworkMembers",
          { id: network_id },
        ]);
        queryClient.invalidateQueries([
          "getNetworksByDiscipler",
          { id: data?.id },
        ]);
        if (response.main_network_id) {
          queryClient.invalidateQueries([
            "getSubNetworks",
            { id: response.main_network_id },
          ]);
        }
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
  const { data } = useGetProfile();
  const queryClient = useQueryClient();

  return useMutation<Network, unknown, string>((id) => removeMember(id), {
    onSuccess: (response) => {
      queryClient.invalidateQueries(["getNetworkDetails", { id: netowrkId }]);
      queryClient.invalidateQueries(["getNetworkMembers", { id: netowrkId }]);
      queryClient.invalidateQueries([
        "getNetworksByDiscipler",
        { id: data?.id },
      ]);
      queryClient.invalidateQueries([
        "getSubNetworks",
        { id: response.main_network_id },
      ]);
    },
  });
};

export const useUpdateNetwork = (id: string) => {
  const { data } = useGetProfile();
  const queryClient = useQueryClient();

  return useMutation<Network, unknown, UpdateNetworkPayload>(
    (payload) => updateNetwork(id, payload),
    {
      onSuccess: (response) => {
        queryClient.invalidateQueries(["getNetworkDetails", { id }]);
        queryClient.invalidateQueries([
          "getNetworksByDiscipler",
          { id: data?.id },
        ]);
        queryClient.invalidateQueries([
          "getSubNetworks",
          { id: response.main_network_id },
        ]);
      },
    }
  );
};

export const useMarkInactiveNetwork = () => {
  const { data } = useGetProfile();
  const queryClient = useQueryClient();

  return useMutation<Network, unknown, string>(
    (id) => markNetworkInactive(id),
    {
      onSuccess: (response, id) => {
        queryClient.invalidateQueries(["getNetworkDetails", { id }]);
        queryClient.invalidateQueries([
          "getNetworksByDiscipler",
          { id: data?.id },
        ]);
        queryClient.invalidateQueries([
          "getSubNetworks",
          { id: response.main_network_id },
        ]);
      },
    }
  );
};

export const useSignUp = () => {
  return useMutation<unknown, unknown, SignUpPayload>((payload) =>
    signUp(payload)
  );
};
