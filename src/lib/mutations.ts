import { useMutation, useQueryClient } from "react-query";
import {
  addEventMoments,
  addParticipants,
  batchInactiveMembers,
  consolidate,
  ConsolidateResponse,
  createEvent,
  CreateEventParams,
  enrollStudent,
  EventsResponse,
  inviteMember,
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
  SchoolAdmissionPayload,
  schoolRegistration,
  sendBulkSms,
  signUp,
  SignUpPayload,
  unlinkMember,
  updateApplication,
  updateLocation,
  UpdateLocationPayload,
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

  return useMutation<ConsolidateResponse, unknown, string>(
    (id) => consolidate(id),
    {
      onSuccess: ({ consolidators_disciples_id }) => {
        queryClient.invalidateQueries([
          "getConsolidations",
          { id: consolidators_disciples_id },
        ]);
        queryClient.invalidateQueries([
          "getConsolidationDetails",
          { id: consolidators_disciples_id },
        ]);
      },
    }
  );
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
          { id: (response as any)?.consolidators_disciples_id.id },
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

export const useUpdateLocation = () => {
  const queryClient = useQueryClient();

  return useMutation<{ id: string }, unknown, UpdateLocationPayload>(
    (payload) => updateLocation(payload),
    {
      onSuccess: ({ id }) => {
        queryClient.invalidateQueries(["getEvent", { id }]);
      },
    }
  );
};

export const useUploadMoment = (event_id: string) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, any>(
    async function (file) {
      const { error } = await supabase.storage
        .from("public")
        .upload(`events/eventId/${file.name}`, file, {
          cacheControl: "3600",
          upsert: true,
        });

      const url = supabase.storage
        .from("public")
        .getPublicUrl(`events/eventId/${file.name}`).data.publicUrl;

      return await addEventMoments({ event_id, url });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getEvent", { id: event_id }]);
      },
    }
  );
};

export const useSchoolRegistration = () =>
  useMutation((payload: SchoolAdmissionPayload) => schoolRegistration(payload));

export const useEnrollStudent = () => {
  const queryClient = useQueryClient();

  return useMutation((id: string) => enrollStudent(id), {
    onSuccess(res) {
      queryClient.invalidateQueries(["getSchoolRegistration", { id: res.id }]);
    },
  });
};

export const useUpdateApplication = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (payload: any) => updateApplication(payload.id, payload.status),
    { onSuccess: () => queryClient.invalidateQueries(["getApplicationList"]) }
  );
};

export const useInviteMember = () => {
  const queryClient = useQueryClient();
  return useMutation((disciple_id: string) => inviteMember(disciple_id), {
    onSuccess(res) {
      queryClient.invalidateQueries([
        "getInviteStatus",
        { id: res.disciple_id },
      ]);
    },
  });
};

export const useBatchInactiveMember = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, string[]>(
    (ids) => batchInactiveMembers(ids),
    {
      onSuccess: (res: any) => {
        queryClient.invalidateQueries([
          "getNetworkMembers",
          { id: res?.network_id },
        ]);
      },
    }
  );
};
