import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductGrid from "../components/ProductGrid";
import SearchBar from "../components/SearchBar";
import SortDropdown from "../components/SortDropdown";
import { getProductsByCategory } from "../services/productApi";
import { getINRPrice, slugToTitle } from "../utils/format";

export default function CategoryProducts() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        setLoading(true);
        setError("");
        const data = await getProductsByCategory(category);
        if (active) setProducts(data);
      } catch (err) {
        console.error(err);
        if (active) setError("Unable to load this category.");
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => { active = false; };
  }, [category]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    const result = products.filter((p) =>
      !q ||
      p.title?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q)
    );
    if (sort === "price-low") result.sort((a, b) => getINRPrice(a.price) - getINRPrice(b.price));
    if (sort === "price-high") result.sort((a, b) => getINRPrice(b.price) - getINRPrice(a.price));
    if (sort === "rating") result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [products, search, sort]);

  return (
    <div className="veyro-page">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="text-xs text-[#596474]">
          <Link to="/categories" className="hover:text-[#A3E635]">Categories</Link> / {slugToTitle(category)}
        </div>

        <div className="mt-5 rounded-2xl border border-[#28323E] bg-[#0D1117] p-6 sm:p-8">
          <p className="text-xs font-black uppercase tracking-[.2em] text-[#A3E635]">Category</p>
          <h1 className="mt-2 text-4xl font-black text-white">{slugToTitle(category)}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#8B95A7]">
            Explore {products.length} products in this Veyro collection.
          </p>
        </div>

        {error && <div className="mt-5 rounded-xl border border-[#FB7185]/30 bg-[#FB7185]/5 p-4 text-sm text-[#FDA4AF]">{error}</div>}

        <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_210px]">
          <SearchBar value={search} onChange={setSearch} />
          <SortDropdown value={sort} onChange={setSort} />
        </div>

        <div className="mt-6">
          <ProductGrid products={filtered} loading={loading} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
