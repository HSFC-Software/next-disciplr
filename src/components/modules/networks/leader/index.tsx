import { Profile } from "@/types/profile";

export const Leader = (props: Partial<Profile>) => {
  const { first_name, last_name } = props;

  return (
    <section>
      <header>Leader</header>
      {first_name} {last_name}
    </section>
  );
};
