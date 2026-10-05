import { ArrowDownUp } from "lucide-react";

export default function SortDropdown({ value, onChange }) {
  return (
    <label className="relative block">
      <ArrowDownUp size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#596474]" />
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="veyro-input appearance-none rounded-xl py-3 pl-9 pr-9 text-sm"
      >
        <option value="featured">Featured</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="rating">Highest Rated</option>
        <option value="newest">Newest</option>
      </select>
    </label>
  );
}
