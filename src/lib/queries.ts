import jwt from "jsonwebtoken";
import { useQuery } from "react-query";
import { Profile } from "@/types/profile";
import { Network, SubNetwork } from "@/types/networks";
import { useToken } from "./hooks";
import {
  getProfileByEmail,
  getNetworksByDiscipler,
  getNetworkDetails,
  getSubNetworks,
  getNetworkMembers,
  searchLeaders,
  getConsolidations,
  getConsolidationDetails,
  getConsolidationById,
  getProfileById,
  getEvents,
  GetEventsParams,
  getEvent,
  autocompletePlace,
  getPlaceDetails,
  getGeocode,
  getCourse,
  getSchoolRegistration,
  getCourses,
  getApplicationList,
} from "@/lib/api";

export const useGetProfileFromToken = (token: string) => {
  type UserMetadata = {
    avatar_url: string;
    email: string;
    email_verified: boolean;
    full_name: string;
    iss: string;
    name: string;
    picture: string;
    provider_id: string;
    sub: string;
  };

  let userMetadata = {} as UserMetadata;
  let email = "";

  try {
    const data = jwt.decode(token);
    userMetadata = (data as any)?.user_metadata as UserMetadata;
    email = userMetadata?.email ?? (data as any)?.email;
  } catch (err) {}

  return useQuery<Profile | null>(
    ["getProfile", { email }],
    async () => await getProfileByEmail(email),
    {
      staleTime: 1000 * 60 * 5,
      enabled: true,
    }
  );
};

// use this after a user logs in
export const useGetProfile = () => {
  const token = useToken();
  return useGetProfileFromToken(token);
};

export const useGetNetworksByDiscipler = (id: string) => {
  return useQuery<Network[] | null>(
    ["getNetworksByDiscipler", { id }],
    async () => await getNetworksByDiscipler(id),
    {
      staleTime: 1000 * 60 * 5,
      enabled: true,
    }
  );
};

export const useGetNetworkDetails = (id: string) => {
  return useQuery<Network | null>(
    ["getNetworkDetails", { id }],
    async () => await getNetworkDetails(id),
    {
      staleTime: 1000 * 60 * 5,
      enabled: true,
    }
  );
};

export const useGetSubNetworks = (id: string) => {
  return useQuery<SubNetwork[] | null>(
    ["getSubNetworks", { id }],
    async () => await getSubNetworks(id),
    {
      staleTime: 1000 * 60 * 5,
      enabled: true,
    }
  );
};

export const useGetNetworkMembers = (id: string) => {
  return useQuery<
    | {
        status: "Active" | "Inactive";
        id: string;
        disciples: Partial<Profile>;
      }[]
    | null
  >(["getNetworkMembers", { id }], async () => await getNetworkMembers(id), {
    staleTime: 1000 * 60 * 5,
    enabled: true,
  });
};

export const useSearchLeaders = (keyword: string) => {
  return useQuery(
    ["searchLeaders", { id: keyword }],
    async () => await searchLeaders(keyword),
    {
      staleTime: 1000 * 60 * 5,
      enabled: true,
    }
  );
};

export const useGetConsolidations = () => {
  const { data } = useGetProfile();

  return useQuery(
    ["getConsolidations", { id: data?.id }],
    async () => await getConsolidations(data?.id ?? ""),
    {
      staleTime: 1000 * 60 * 5,
      enabled: true,
    }
  );
};

export const useGetConsolidationDetails = (id: string) => {
  return useQuery(
    ["getConsolidationDetails", { id }],
    async () => await getConsolidationDetails(id),
    {
      staleTime: 1000 * 60 * 5,
      enabled: true,
    }
  );
};

export const useGetConsolidationById = (id: string) =>
  useQuery(
    ["getConsolidationById", { id }],
    async () => await getConsolidationById(id),
    {
      staleTime: 1000 * 60 * 5,
      enabled: true,
    }
  );

export const useGetProfileById = (id: string) =>
  useQuery(["getProfileById", { id }], async () => await getProfileById(id), {
    staleTime: 1000 * 60 * 5,
    enabled: true,
  });

export const useGetEvents = (params: GetEventsParams) =>
  useQuery(
    ["getEvents", { network_id: params.network_id }],
    async () => await getEvents(params),
    {
      staleTime: 1000 * 60 * 5,
      enabled: true,
    }
  );

export const useGetEvent = (id: string) =>
  useQuery(["getEvent", { id }], async () => await getEvent(id), {
    staleTime: 1000 * 60 * 5,
    enabled: true,
  });

export const useAutocompletePlace = (q: string) =>
  useQuery(
    ["autocompletePlace", { q }],
    async () => await autocompletePlace(q),
    {
      staleTime: 1000 * 60 * 5,
      enabled: true,
    }
  );

export const useGetPlaceDetails = (place_id: string) =>
  useQuery(
    ["getPlaceDetails", { place_id }],
    async () => await getPlaceDetails(place_id),
    {
      staleTime: 1000 * 60 * 5,
      enabled: true,
    }
  );

export const useGetGeocode = (lat: number, lng: number) =>
  useQuery(
    ["getGeocode", { lat, lng }],
    async () => await getGeocode(lat, lng),
    {
      staleTime: 1000 * 60 * 5,
      enabled: true,
    }
  );

export const useGetCourse = (course_id: string) =>
  useQuery(
    ["getCourse", { id: course_id }],
    async () => await getCourse(course_id),
    {
      staleTime: 1000 * 60 * 5,
      enabled: true,
    }
  );

export const useGetCourses = () =>
  useQuery(["getCourses"], async () => await getCourses(), {
    staleTime: 1000 * 60 * 5,
    enabled: true,
  });

export const useGetSchoolRegistration = (id: string) =>
  useQuery(
    ["getSchoolRegistration", { id }],
    async () => await getSchoolRegistration(id),
    {
      staleTime: 1000 * 60 * 5,
      enabled: true,
    }
  );

export const useGetApplicationList = () =>
  useQuery(["getApplicationList"], async () => await getApplicationList(), {
    staleTime: 1000 * 60 * 5,
    enabled: true,
  });
