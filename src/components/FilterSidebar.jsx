import { RotateCcw, SlidersHorizontal } from "lucide-react";

export default function FilterSidebar({
  categories,
  category,
  setCategory,
  priceRange,
  setPriceRange,
  rating,
  setRating,
  stockOnly,
  setStockOnly,
  onReset,
}) {
  return (
    <aside className="rounded-2xl border border-[#202833] bg-[#0D1117] p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-[#A3E635]" />
          <h3 className="text-sm font-bold text-white">Filters</h3>
        </div>
        <button onClick={onReset} className="flex items-center gap-1 text-xs text-[#697586] hover:text-white">
          <RotateCcw size={12} /> Reset
        </button>
      </div>

      <div className="mt-6 space-y-6">
        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#697586]">Category</span>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="veyro-input rounded-xl px-3 py-2.5 text-sm">
            <option value="all">All categories</option>
            {categories.map((item) => <option key={item} value={item}>{item.replaceAll("-", " ")}</option>)}
          </select>
        </label>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#697586]">Price</span>
            <span className="text-xs text-[#A3E635]">₹{priceRange.toLocaleString("en-IN")}</span>
          </div>
          <input
            type="range"
            min="500"
            max="50000"
            step="500"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full accent-[#A3E635]"
          />
          <div className="mt-1 flex justify-between text-[10px] text-[#596474]">
            <span>₹500</span><span>₹50,000+</span>
          </div>
        </div>

        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#697586]">Minimum rating</span>
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="veyro-input rounded-xl px-3 py-2.5 text-sm">
            <option value="0">Any rating</option>
            <option value="3">3.0+</option>
            <option value="3.5">3.5+</option>
            <option value="4">4.0+</option>
            <option value="4.5">4.5+</option>
          </select>
        </label>

        <label className="flex cursor-pointer items-center justify-between rounded-xl border border-[#202833] bg-[#11161D] p-3">
          <span className="text-sm text-[#AAB4C3]">In stock only</span>
          <input type="checkbox" checked={stockOnly} onChange={(e) => setStockOnly(e.target.checked)} className="h-4 w-4 accent-[#A3E635]" />
        </label>
      </div>
    </aside>
  );
}
