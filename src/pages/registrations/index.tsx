import Flagged from "@/components/modules/flagged";
import Registrations from "./registrations";

const Register = () => {
  return (
    <Flagged flagKey="enableRegistrations">
      <Registrations />
    </Flagged>
  );
};

export default Register;
