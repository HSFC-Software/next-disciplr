import Avatar from "@/components/base/avatar";
import { Profile } from "@/types/profile";

export const Leader = (props: Partial<Profile>) => {
  const { first_name, last_name, img_url, id } = props;

  return (
    <section>
      <div className="pt-7 px-7 pb-5">
        <header className="text-[#686777] uppercase font-semibold">
          Leader
        </header>
      </div>
      <div className="flex items-center pl-[15%]">
        <Avatar id={id} imgSrc={img_url} fontSize="text-xl" size={77} />
        <div className="ml-[-38px] bg-[#F5F5F5] w-full h-20 py-16 rounded-l-[32px] flex items-center pl-14">
          <div className="flex flex-col gap-1">
            <span>
              {first_name} {last_name}
            </span>
            <div className="mt-[-5px] flex gap-1">
              <span className="text-xs bg-[#6e7ac5] text-white px-3 py-[3px] rounded-full">
                SDL-[X]
              </span>
              <span className="text-xs bg-[#6e7ac5] text-white px-3 py-[3px] rounded-full">
                Soon
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
