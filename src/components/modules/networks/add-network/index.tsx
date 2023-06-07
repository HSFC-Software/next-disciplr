import Link from "next/link";
import { useRouter } from "next/router";
import { TbCalendar } from "react-icons/tb";

export default function Addnetwork() {
  const router = useRouter();

  return (
    <Link href={`/networks/${router.query.id}/events`}>
      <div className="flex justify-center">
        <button className="flex gap-2 rounded-xl p-3 px-5 bg-[#F5F5F5] text-[#5A6072] relative">
          <span className="text-2xl text-[#6e7ac5]">
            <TbCalendar />
          </span>
          <div className="font-semibold text-primary">NETWORK EVENTS</div>
        </button>
      </div>
    </Link>
  );
}
