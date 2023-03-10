export type Network = {
  id: string;
  name: string;
  status: "Active" | "Inactive";
  member_count: number;
  created_at: string;
  is_deleted: boolean;
  discipler_id: {
    id: string;
    first_name: string;
    last_name: string;
  };
};
