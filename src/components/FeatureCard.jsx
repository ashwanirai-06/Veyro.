import { ArrowUpRight, Search, Smartphone, Gauge, FileCheck2, LockKeyhole, SlidersHorizontal, BadgeCheck } from "lucide-react";

const iconMap = {
  Gauge, Smartphone, Search, FileCheck2, LockKeyhole, SlidersHorizontal, BadgeCheck,
};

export default function FeatureCard({ icon = "Gauge", title, text, support, index }) {
  const Icon = iconMap[icon] || Gauge;
  const accents = ["#A3E635", "#22D3EE", "#FB7185", "#34D399", "#A3E635", "#22D3EE", "#FB7185"];
  const accent = accents[index % accents.length];

  return (
    <div className="group rounded-2xl border border-[#202833] bg-[#11161D] p-6 transition hover:-translate-y-1 hover:border-[#303b48]">
      <div className="flex items-start justify-between">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/[.04]" style={{ color: accent }}>
          <Icon size={21} />
        </div>
        <ArrowUpRight size={17} className="text-[#3B4655] transition group-hover:text-white" />
      </div>
      <h3 className="mt-6 text-base font-bold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#8B95A7]">{text}</p>
      <p className="mt-4 text-xs font-bold" style={{ color: accent }}>{support}</p>
    </div>
  );
}
