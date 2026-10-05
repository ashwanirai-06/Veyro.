import { useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CategoryCard from "../components/CategoryCard";
import useProducts from "../hooks/useProducts";
import LoadingSkeleton from "../components/LoadingSkeleton";

const descriptions = {
  smartphones: "Modern smartphones for everyday performance, communication and entertainment.",
  laptops: "Portable computing power for study, coding, work and creative projects.",
  "mobile-accessories": "Useful accessories that complete and simplify your mobile setup.",
  tablets: "Flexible displays for productivity, browsing and entertainment.",
  "mens-watches": "Refined wearable accessories for a polished everyday look.",
  "womens-watches": "Expressive wearable pieces selected for modern routines.",
};

export default function Categories() {
  const { products, loading } = useProducts();

  const categories = useMemo(() => {
    const map = new Map();
    products.forEach((product) => {
      if (!map.has(product.category)) map.set(product.category, []);
      map.get(product.category).push(product);
    });

    return [...map.entries()]
      .sort((a, b) => b[1].length - a[1].length)
      .map(([slug, items]) => ({
        slug,
        count: items.length,
        image: items[0]?.thumbnail,
      }));
  }, [products]);

  return (
    <div className="veyro-page">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="max-w-2xl">
          <p className="text-xs font-black uppercase tracking-[.2em] text-[#A3E635]">Browse by category</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-white sm:text-5xl">Find your corner of Veyro.</h1>
          <p className="mt-4 text-sm leading-7 text-[#8B95A7]">
            Explore the live API catalog by category. Every collection leads to its own filtered product experience.
          </p>
        </div>

        {loading ? (
          <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => <LoadingSkeleton key={i} />)}
          </div>
        ) : (
          <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard
                key={category.slug}
                category={category.slug}
                count={category.count}
                image={category.image}
                description={descriptions[category.slug]}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
