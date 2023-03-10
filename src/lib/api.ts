import axios from "@/lib/axios";

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
