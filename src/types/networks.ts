export type Network = {
  id: string;
  name: string;
  status: "Active" | "Inactive";
  member_count: number;
  created_at: string;
};
