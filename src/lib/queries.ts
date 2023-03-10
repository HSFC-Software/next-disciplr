import jwt from "jsonwebtoken";
import { useQuery } from "react-query";
import { getProfileByEmail, getNetworksByDiscipler } from "@/lib/api";
import { Profile } from "@/types/profile";
import { Network } from "@/types/networks";
import { useToken } from "./hooks";

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
