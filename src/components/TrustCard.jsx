import { Headphones, RotateCcw, ShieldCheck, Truck } from "lucide-react";

const icons = { truck: Truck, shield: ShieldCheck, return: RotateCcw, support: Headphones };

export default function TrustCard({ icon = "shield", title, text }) {
  const Icon = icons[icon] || ShieldCheck;
  return (
    <div className="flex gap-4 rounded-2xl border border-[#202833] bg-[#0D1117] p-5">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#A3E635]/10 text-[#A3E635]">
        <Icon size={19} />
      </div>
      <div>
        <h3 className="text-sm font-bold text-white">{title}</h3>
        <p className="mt-1 text-xs leading-5 text-[#8B95A7]">{text}</p>
      </div>
    </div>
  );
}
