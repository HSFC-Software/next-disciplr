import jwt from "jsonwebtoken";
import { useQuery } from "react-query";
import { getProfileByEmail } from "@/lib/api";
import { Profile } from "@/types/profile";

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
