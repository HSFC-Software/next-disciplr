import Link from "next/link";
import { useRouter } from "next/router";

export default function Addnetwork() {
  const router = useRouter();

  return (
    <Link href={`/networks/new?id=${router.query.id}`}>
      <div className="flex justify-center">
        <button className="flex gap-2 rounded-xl p-3 px-5 bg-[#F5F5F5]">
          <span className="px-2 bg-indigo-300 text-indigo-700 rounded-lg text-lg">
            +
          </span>
          <div className="text-[#5A6072] font-semibold">OPEN NEW NETWORK</div>
        </button>
      </div>
    </Link>
  );
}
