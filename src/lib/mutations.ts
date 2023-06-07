import { useMutation, useQueryClient } from "react-query";
import {
  addParticipants,
  consolidate,
  ConsolidateResponse,
  createEvent,
  CreateEventParams,
  EventsResponse,
  linkExistingMember,
  LinkExistingMemberPayload,
  linkNewMember,
  LinkNewMemberPayload,
  markNetworkInactive,
  openNetwork,
  OpenNetworkPayload,
  publishConsolidation,
  removeMember,
  removeNetwork,
  removeParticipant,
  sendBulkSms,
  signUp,
  SignUpPayload,
  unlinkMember,
  updateNetwork,
  UpdateNetworkPayload,
  updateUser,
  UpdateUserPaypload,
} from "@/lib/api";
import { Network } from "@/types/networks";
import { useGetProfile } from "./queries";
import { supabase } from "./supabase";

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

export const useRemoveNetwork = (parentNetworkId: string) => {
  const queryClient = useQueryClient();
  const { data } = useGetProfile();

  return useMutation<unknown, unknown, string>((id) => removeNetwork(id), {
    onSuccess: (response: any) => {
      // invalidate get network by disciple
      queryClient.invalidateQueries([
        "getNetworksByDiscipler",
        { id: data?.id },
      ]);
      // invalidate get subnetwork
      queryClient.invalidateQueries([
        "getSubNetworks",
        { id: response?.parent?.id },
      ]);
    },
  });
};

export const useSignUp = () => {
  return useMutation<unknown, unknown, SignUpPayload>((payload) =>
    signUp(payload)
  );
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, unknown, UpdateUserPaypload>(
    (payload) => updateUser(payload),
    {
      onSuccess: (response: any) => {
        queryClient.invalidateQueries([
          "getNetworksByDiscipler",
          { id: response.id },
        ]);
        queryClient.invalidateQueries(["getProfileById", { id: response.id }]);
      },
    }
  );
};

export const useConsolidate = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ConsolidateResponse,
    unknown,
    { disciple_id: string; consolidator_id: string }
  >((payload) => consolidate(payload.disciple_id, payload.consolidator_id), {
    onSuccess: (_, { disciple_id }) => {
      queryClient.invalidateQueries(["getConsolidations", { id: disciple_id }]);
      queryClient.invalidateQueries([
        "getConsolidationDetails",
        { id: disciple_id },
      ]);
    },
  });
};

export const useUpdateProfilePicture = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<UpdateUserPaypload, unknown, any>(
    async function (file) {
      const { error } = await supabase.storage
        .from("public")
        .upload(`profiles/${file.name}`, file, {
          cacheControl: "3600",
          upsert: true,
        });

      const publicUrl = supabase.storage
        .from("public")
        .getPublicUrl(`profiles/${file.name}`).data.publicUrl;

      let user;

      try {
        user = await updateUser({ img_url: publicUrl, id });
      } catch (err: any) {
        throw new Error(err);
      }

      if (error) {
        throw new Error(error.message);
      }

      return user;
    },
    {
      onSuccess: (response) => {
        queryClient.invalidateQueries(["getProfileById", { id: response?.id }]);
        queryClient.invalidateQueries([
          "getNetworksByDiscipler",
          { id: response.id },
        ]);
        queryClient.invalidateQueries([
          "getProfile",
          { email: response.email },
        ]);
      },
    }
  );
};

export const usePublishConsolidation = () => {
  const queryClient = useQueryClient();

  return useMutation<{ disciple_id: string }, unknown, string>(
    (id) => publishConsolidation(id),
    {
      onSuccess(response, id) {
        queryClient.invalidateQueries(["getConsolidationById", { id }]);
        queryClient.invalidateQueries([
          "getConsolidationDetails",
          { id: response?.disciple_id },
        ]);
      },
    }
  );
};

export const useSendBulkSms = () => {
  return useMutation<
    unknown,
    unknown,
    { text: string; receivers: string[]; sender: string }
  >(({ text, receivers, sender }) => sendBulkSms(text, receivers, sender));
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation<EventsResponse, unknown, CreateEventParams>(
    (params) => createEvent(params),
    {
      onSuccess: (response) => {
        queryClient.invalidateQueries([
          "getEvents",
          { network_id: response.network_id },
        ]);
      },
    }
  );
};

export const useAddParticipants = (event_id: string) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, string[]>(
    (participants) => addParticipants(event_id, participants),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getEvent", { id: event_id }]);
      },
    }
  );
};

export const useRemoveParticipant = (event_id: string) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, string>((id) => removeParticipant(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["getEvent", { id: event_id }]);
    },
  });
};
