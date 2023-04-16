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
    const { data } = await axios.get(`/profile?q=${keyword}`);
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

export const removeNetwork = async (id: string) => {
  try {
    const { data } = await axios.delete(`/networks/${id}`);
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

export type UpdateUserPaypload = {
  first_name: string;
  last_name: string;
  middle_name: string;
  address: string;
  contact_number: string;
  birthday: string;
  email: string;
  sex: "Male" | "Female";
  status: "Active" | "Inactive";
  id?: string;
};

export const updateUser = async (payload: UpdateUserPaypload) => {
  try {
    const _payload = { ...payload };
    delete _payload.id;

    const { data } = await axios.patch(`/profile/${payload.id}`, _payload);
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

type LessonCodes =
  | "L1"
  | "L2"
  | "L3"
  | "L4"
  | "L5"
  | "L6"
  | "L7"
  | "L8"
  | "L9"
  | "L10";

type Consoliations = {
  id: string;
  created_at: string;
  disciple_id: {
    id: string;
    first_name: string;
    last_name: string;
  };
  lesson_code: {
    code: LessonCodes;
    name: string;
  };
};

export const getConsolidations = async (consolidatorId: string) => {
  try {
    const { data } = await axios.get(
      `/consolidations?consolidator=${consolidatorId}&client=disciplr`
    );
    return data as Consoliations[];
  } catch (err) {
    return Promise.reject(err);
  }
};

type ConsolidationDetails = {
  recent: {
    id: string;
    created_at: string;
    lesson_code: {
      code: LessonCodes;
      name: string;
    };
  };
  disciple: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  history: {
    id: string;
    created_at: string;
    lesson_code: {
      code: LessonCodes;
      name: string;
    };
  }[];
};

export const getConsolidationDetails = async (id: string) => {
  try {
    const { data } = await axios.get(`/consolidations?disciple=${id}`);
    return data as ConsolidationDetails;
  } catch (err) {
    return Promise.reject(err);
  }
};

export type ConsolidateResponse = {
  id: string;
  lesson_code: {
    code: LessonCodes;
    name: string;
  };
};

export const consolidate = async (
  disciple_id: string,
  consolidator_id: string
): Promise<ConsolidateResponse> => {
  try {
    const { data } = await axios.post(`/consolidations`, {
      disciple_id,
      consolidator_id,
    });
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

type GetConsolidationByIdResponse = {
  id: string;
  created_at: string;
  disciple_id: {
    id: string;
    first_name: string;
    last_name: string;
  };
  consolidator_id: {
    id: string;
    first_name: string;
    last_name: string;
  };
  lesson_code: {
    code: LessonCodes;
    name: string;
    title: string;
  };
};

export const getConsolidationById = async (id: string) => {
  try {
    const { data } = await axios.get(`/consolidations?id=${id}`);
    return data as GetConsolidationByIdResponse;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getProfileById = async (id: string) => {
  try {
    const { data } = await axios.get(`/profile/${id}`);
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};
