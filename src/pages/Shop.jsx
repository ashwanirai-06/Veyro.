import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductGrid from "../components/ProductGrid";
import SearchBar from "../components/SearchBar";
import SortDropdown from "../components/SortDropdown";
import FilterSidebar from "../components/FilterSidebar";
import useProducts from "../hooks/useProducts";
import { getINRPrice } from "../utils/format";

export default function Shop() {
  const { products, loading, error } = useProducts();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState(50000);
  const [rating, setRating] = useState(0);
  const [stockOnly, setStockOnly] = useState(false);
  const [sort, setSort] = useState("featured");
  const [mobileFilters, setMobileFilters] = useState(false);

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))].sort(),
    [products]
  );

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    let result = products.filter((product) => {
      const matchesSearch =
        !query ||
        product.title?.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query) ||
        product.brand?.toLowerCase().includes(query);

      const matchesCategory = category === "all" || product.category === category;
      const matchesPrice = getINRPrice(product.price) <= priceRange;
      const matchesRating = Number(product.rating || 0) >= rating;
      const matchesStock = !stockOnly || Number(product.stock || 0) > 0;

      return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesStock;
    });

    if (sort === "price-low") result.sort((a, b) => getINRPrice(a.price) - getINRPrice(b.price));
    if (sort === "price-high") result.sort((a, b) => getINRPrice(b.price) - getINRPrice(a.price));
    if (sort === "rating") result.sort((a, b) => b.rating - a.rating);
    if (sort === "newest") result.sort((a, b) => b.id - a.id);

    return result;
  }, [products, search, category, priceRange, rating, stockOnly, sort]);

  const reset = () => {
    setSearch("");
    setCategory("all");
    setPriceRange(50000);
    setRating(0);
    setStockOnly(false);
    setSort("featured");
  };

  return (
    <div className="veyro-page">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[.2em] text-[#A3E635]">Veyro collection</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight text-white sm:text-5xl">Explore the Collection</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#8B95A7]">
              Search, filter and sort the catalog to find exactly what fits your setup.
            </p>
          </div>
          <div className="text-sm text-[#697586]">{filtered.length} products</div>
        </div>

        {error && (
          <div className="mt-7 rounded-xl border border-[#FB7185]/30 bg-[#FB7185]/5 p-4 text-sm text-[#FDA4AF]">{error}</div>
        )}

        <div className="mt-8 grid gap-6 lg:grid-cols-[240px_1fr]">
          <div className="hidden lg:block">
            <FilterSidebar
              categories={categories}
              category={category}
              setCategory={setCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              rating={rating}
              setRating={setRating}
              stockOnly={stockOnly}
              setStockOnly={setStockOnly}
              onReset={reset}
            />
          </div>

          <div>
            <div className="rounded-2xl border border-[#202833] bg-[#0D1117] p-3">
              <div className="grid gap-3 md:grid-cols-[1fr_180px_auto]">
                <SearchBar value={search} onChange={setSearch} />
                <SortDropdown value={sort} onChange={setSort} />
                <button
                  onClick={() => setMobileFilters(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#26303C] px-4 py-3 text-sm font-bold text-[#AAB4C3] hover:bg-[#11161D] hover:text-white lg:hidden"
                >
                  <SlidersHorizontal size={16} /> Filters
                </button>
              </div>
            </div>

            <div className="mt-5">
              <ProductGrid products={filtered} loading={loading} />
            </div>
          </div>
        </div>
      </main>

      {mobileFilters && (
        <div className="fixed inset-0 z-[70] bg-black/70 p-4 lg:hidden" onClick={() => setMobileFilters(false)}>
          <div className="ml-auto h-full w-full max-w-sm overflow-auto" onClick={(e) => e.stopPropagation()}>
            <FilterSidebar
              categories={categories}
              category={category}
              setCategory={setCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              rating={rating}
              setRating={setRating}
              stockOnly={stockOnly}
              setStockOnly={setStockOnly}
              onReset={reset}
            />
            <button onClick={() => setMobileFilters(false)} className="veyro-button mt-3 w-full rounded-xl bg-[#A3E635] py-3 text-sm font-black text-[#080B10]">
              Apply filters
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
