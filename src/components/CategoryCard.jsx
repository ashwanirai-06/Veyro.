import { ArrowUpRight, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { slugToTitle } from "../utils/format";

export default function CategoryCard({ category, image, count, description }) {
  const title = category.name || slugToTitle(category.slug || category);
  const slug = category.slug || category;

  return (
    <Link
      to={`/category/${slug}`}
      className="veyro-card group overflow-hidden rounded-2xl"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-[#0D1117]">
        {image ? (
          <img src={image} alt={title} className="h-full w-full object-cover opacity-70 transition duration-500 group-hover:scale-105 group-hover:opacity-90" />
        ) : (
          <div className="grid h-full place-items-center text-[#3B4655]"><Package size={34} /></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080B10] via-transparent to-transparent" />
        <span className="absolute bottom-3 left-4 rounded-full border border-white/10 bg-[#080B10]/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#A3E635] backdrop-blur">
          {count} products
        </span>
        <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-[#202833] bg-[#080B10]/70 text-[#AAB4C3] backdrop-blur group-hover:text-[#A3E635]">
          <ArrowUpRight size={16} />
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#8B95A7]">
          {description || `Explore curated ${title.toLowerCase()} from the Veyro collection.`}
        </p>
        <span className="mt-4 inline-block text-xs font-black uppercase tracking-[0.16em] text-[#A3E635]">
          Explore category →
        </span>
      </div>
    </Link>
  );
}
