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

  try {
    const data = jwt.decode(token);
    userMetadata = (data as any)?.user_metadata as UserMetadata;
  } catch (err) {}

  return useQuery<Profile | null>(
    ["getProfile", { email: userMetadata?.email }],
    async () => await getProfileByEmail(userMetadata?.email),
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
