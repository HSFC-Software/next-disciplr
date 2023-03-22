import axios from "@/lib/axios";
import { Network } from "@/types/networks";
import { Profile } from "@/types/profile";

export const getProfileByEmail = async (email: string) => {
  try {
    const { data } = await axios.get("/profile", { params: { email } });
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getNetworksByDiscipler = async (id: string) => {
  try {
    const { data } = await axios.get(`/networks?discipler=${id}`);
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getNetworkDetails = async (id: string) => {
  try {
    const { data } = await axios.get(`/networks/${id}`);
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getSubNetworks = async (id: string) => {
  try {
    const { data } = await axios.get(`/subnetworks/${id}`);
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getNetworkMembers = async (id: string) => {
  try {
    const { data } = await axios.get(`/network_disciples/${id}`);
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export type OpenNetworkPayload = {
  name: string;
  discipler_id: string;
  network_id: string;
};

export const openNetwork = async (
  payload: OpenNetworkPayload
): Promise<Network> => {
  try {
    const { data } = await axios.post(`/link/network`, payload);
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export type SearchedLeader = Pick<Profile, "id" | "first_name" | "last_name">;

export const searchLeaders = async (
  keyword: string
): Promise<SearchedLeader[]> => {
  try {
    const { data } = await axios.post(`/profile?q=${keyword}`);
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export type LinkNewMemberPayload = {
  first_name: string;
  last_name: string;
  middle_name?: string;
  network_id: string;
};

export const linkNewMember = async (payload: LinkNewMemberPayload) => {
  try {
    const { data } = await axios.post(`/link/disciple/new`, payload);
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export type LinkExistingMemberPayload = {
  disciple_id: string;
  network_id: string;
};

export const linkExistingMember = async (
  payload: LinkExistingMemberPayload
) => {
  try {
    const { data } = await axios.post(`/link/disciple`, payload);
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const removeMember = async (id: string) => {
  try {
    const { data } = await axios.delete(`/unlink/disciple/${id}`);
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const unlinkMember = async (id: string) => {
  try {
    const { data } = await axios.patch(`/unlink/disciple/inactive`, { id });
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export type UpdateNetworkPayload = {
  name?: string;
  status?: "Active" | "Inactive";
};

export const updateNetwork = async (
  id: string,
  payload: UpdateNetworkPayload
) => {
  try {
    const { data } = await axios.patch(`/networks/${id}`, payload);
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const markNetworkInactive = async (id: string) => {
  try {
    const { data } = await axios.patch(`/unlink/network/inactive`, { id });
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export type SignUpPayload = {
  first_name: string;
  last_name: string;
  email: string;
};

export const signUp = async (payload: SignUpPayload) => {
  try {
    const { data } = await axios.post(`/profile`, payload);
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};
