import Flagged from "@/components/modules/flagged";
import UpdateProfile from "./update-profile";

export default function Update() {
  return (
    <Flagged flagKey="enableUpdateProfile">
      <UpdateProfile />
    </Flagged>
  );
}
