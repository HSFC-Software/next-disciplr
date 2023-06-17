import axios from "@/lib/axios";
import request from "axios";
import { Network } from "@/types/networks";
import { Profile } from "@/types/profile";
import { supabase } from "@/lib/supabase";
import { generateRandomHash } from "./utils";

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
  contact_number?: string;
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

export type UpdateUserPaypload = Partial<{
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
  img_url?: string;
}>;

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
    status: "DRAFT" | "PUBLISHED";
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
    status: "DRAFT" | "PUBLISHED";
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
  status: "DRAFT" | "PUBLISHED";
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

export const publishConsolidation = async (id: string) => {
  try {
    const { data } = await axios.patch(`/consolidations?id=${id}`, {
      status: "PUBLISHED",
    });
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const sendBulkSms = async (
  text: string,
  receivers: string[],
  sender: string
) => {
  try {
    const { data } = await request.post("/api/sms", {
      text,
      receivers,
      sender,
    });
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export type EventType = "CELLGROUP" | "CLOSED_CELL" | "PID" | "CONSOLIDATION";

export type GetEventsParams = {
  network_id?: string;
  type: EventType[];
  date: Date; // Must be iso string `new Date().toISOString()`
};

export type EventParticipant = {
  id: string;
  participant_id: {
    id: string;
    first_name: string;
    last_name: string;
    status: "Active" | "Inactive";
  };
};

type Location = {
  address: string;
  created_at: string;
  id: string;
  lat: number;
  lng: number;
};

type File = {
  id: string;
  url: string;
};

export type EventsResponse = {
  id: string;
  name: string;
  date_time: string;
  event_type: EventType;
  network_id?: string;
  consolidation_id?: string;
  location_id?: Location;
  attachments_id?: string[];
  participants_id?: string[];
  consolidations?: any;
  event_participants: EventParticipant[];
  files?: File[];
};

export const getEvents = async (params: GetEventsParams) => {
  try {
    let url = "/events?"; //events?type=CELLGROUP&type=CLOSED_CELL&date=2023-06-28T18:04:23.665Z&network_id=ad5987f3-030e-4f0a-b343-e4bbf400ee30

    url += `type=${params.type[0]}`;
    params.type.forEach((type, index) => {
      if (index === 0) return;
      url += `&type=${type}`;
    });

    url += `&date=${params.date}`;
    url += `&network_id=${params.network_id}`;

    const { data } = await axios.get(url);
    return data as EventsResponse[];
  } catch (err) {
    return Promise.reject(err);
  }
};

export type CreateEventParams = {
  event_type: EventType;
  name: string;
  date_time: string; // should be iso string
  network_id: string;
};

export const createEvent = async (params: CreateEventParams) => {
  try {
    const { data } = await axios.post("/events", params);
    return data as EventsResponse;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getEvent = async (id: string) => {
  try {
    const { data } = await axios.get(`/events/${id}`);
    return data as EventsResponse;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const addParticipants = async (
  event_id: string,
  participants: string[]
) => {
  try {
    const { data } = await axios.post(`/events/participants`, {
      event_id,
      participants,
    });
    return data as {
      id: string;
      participant_id: string;
    }[];
  } catch (err) {
    return Promise.reject(err);
  }
};

export const removeParticipant = async (id: string) => {
  try {
    const { data } = await axios.delete(`/events/participants?id=${id}`);
    return data as {};
  } catch (err) {
    return Promise.reject(err);
  }
};

export const autocompletePlace = async (q: string) => {
  try {
    const { data } = await axios.get(`/v2/google/place/search?input=${q}`);
    return data as any;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getPlaceDetails = async (place_id: string) => {
  try {
    const { data } = await axios.get(`/v2/google/place/${place_id}`);
    return data as any;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getGeocode = async (lat: number, lng: number) => {
  if (!lat || !lng) return Promise.reject("Invalid lat or lng");

  try {
    const { data } = await axios.get(
      `/v2/google/place/geocode?lat=${lat}&lng=${lng}`
    );
    return data as any;
  } catch (err) {
    return Promise.reject(err);
  }
};

export type UpdateLocationPayload = {
  event_id: string;
  address?: string;
  lat?: number;
  lng?: number;
};

export const updateLocation = async (payload: UpdateLocationPayload) => {
  try {
    const { data } = await axios.patch("/v2/events/locations", payload);
    return data as any;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const addEventMoments = async (payload: {
  event_id: string;
  url: string;
}) => {
  try {
    const { data } = await axios.post("/v2/events/moments", payload);
    return data as any;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getCourse = async (course_id: string) => {
  const { data, error } = await supabase
    .from("courses")
    .select("id, title, fee")
    .eq("id", course_id)
    .single();

  if (error) return Promise.reject(error);
  return data;
};

export const getCourses = async () => {
  const { data, error } = await supabase
    .from("courses")
    .select("id, title, fee");

  if (error) return Promise.reject(error);
  return data;
};

export type SchoolAdmissionPayload = {
  course_id: string;
  first_name: string;
};

export const schoolRegistration = async (payload: SchoolAdmissionPayload) => {
  const { data, error } = await supabase
    .from("school_registrations")
    .insert({
      ...payload,
      reference: generateRandomHash(5),
    })
    .select(
      "id, course_id, first_name, status, reference, middle_name, last_name, contact_number, cell_leader_name, network_leader_name, lesson_completed, ojt, with_cellgroup, want_to_be_admin_or_teacher, role"
    )
    .single();

  if (error) return Promise.reject(error);
  return data;
};

export const getSchoolRegistration = async (id: string) => {
  const { data, error } = await supabase
    .from("school_registrations")
    .select(
      "id, course_id, first_name, status, reference, middle_name, last_name, contact_number, cell_leader_name, network_leader_name, lesson_completed, ojt, with_cellgroup, want_to_be_admin_or_teacher, role"
    )
    .eq("id", id)
    .single();

  if (error) return Promise.reject(error);
  return data;
};

export const getSchoolRegistrationByReference = async (reference: string) => {
  const { data, error } = await supabase
    .from("school_registrations")
    .select(
      "id, course_id, first_name, status, reference, middle_name, last_name, contact_number, cell_leader_name, network_leader_name, lesson_completed, ojt, with_cellgroup, want_to_be_admin_or_teacher, role"
    )
    .eq("reference", reference)
    .single();

  if (error) return Promise.reject(error);
  return data;
};

export const enrollStudent = async (registration_id: string) => {
  const { data, error } = await supabase
    .from("school_registrations")
    .update({ status: "ENROLLED" })
    .eq("id", registration_id)
    .select(
      "id, course_id, first_name, status, reference, middle_name, last_name, contact_number, cell_leader_name, network_leader_name, lesson_completed, ojt, with_cellgroup, want_to_be_admin_or_teacher, role"
    )
    .single();

  if (error) return Promise.reject(error);
  return data;
};

export const getMasterList = async () => {
  const { data, error } = await supabase //
    .from("school_registrations")
    .select(
      "id, course_id, first_name, status, reference, middle_name, last_name, contact_number, cell_leader_name, network_leader_name, lesson_completed, ojt, with_cellgroup, want_to_be_admin_or_teacher, role"
    );
  if (error) return Promise.reject(error);
  return data;
};

export const getApplicationList = async () => {
  const { data, error } = await supabase //
    .from("school_registrations")
    .select("*, course_id")
    .eq("status", "PENDING");

  if (error) return Promise.reject(error);
  return data;
};

export const updateApplication = async (
  id: string,
  status: "APPROVED" | "REJECTED"
) => {
  const { data, error } = await supabase
    .from("school_registrations")
    .update({ status })
    .eq("id", id)
    .select(
      "id, course_id, first_name, status, reference, middle_name, last_name, contact_number, cell_leader_name, network_leader_name, lesson_completed, ojt, with_cellgroup, want_to_be_admin_or_teacher, role"
    )
    .single();

  if (error) return Promise.reject(error);
  return data as any;
};
