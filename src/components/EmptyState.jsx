import { SearchX } from "lucide-react";
import { Link } from "react-router-dom";

export default function EmptyState({ title = "Nothing here yet", text = "Try another option.", action = true }) {
  return (
    <div className="rounded-3xl border border-dashed border-[#293341] bg-[#0D1117] px-6 py-16 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-[#202833] bg-[#11161D] text-[#A3E635]">
        <SearchX size={23} />
      </div>
      <h3 className="mt-5 text-xl font-bold text-white">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#8B95A7]">{text}</p>
      {action && (
        <Link to="/shop" className="veyro-button mt-6 inline-flex rounded-xl bg-[#A3E635] px-5 py-3 text-sm font-black text-[#080B10]">
          Browse collection
        </Link>
      )}
    </div>
  );
}
