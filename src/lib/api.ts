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

export const searchLeaders = async (
  keyword: string
): Promise<Pick<Profile, "id" | "first_name" | "last_name">> => {
  try {
    const { data } = await axios.post(`/profile?q=${keyword}`);
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};
