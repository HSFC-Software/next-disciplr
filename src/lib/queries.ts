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
