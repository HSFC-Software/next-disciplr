type Status = "Active" | "Inactive";

export type Network = {
  id: string;
  name: string;
  status: Status;
  member_count: number;
  created_at: string;
  is_deleted: boolean;
  main_network_id?: string;
  discipler_id: {
    id: string;
    first_name: string;
    last_name: string;
    img_url?: string;
  };
};

export type SubNetwork = {
  id: string;
  created_at: string;
  main_network_id: string;
  networks_id: Network;
  status: Status;
  member_count: number;
};
