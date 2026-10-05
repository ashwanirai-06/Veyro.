import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductGrid from "../components/ProductGrid";
import TrustCard from "../components/TrustCard";
import CategoryCard from "../components/CategoryCard";
import useProducts from "../hooks/useProducts";
import { formatINR, getDiscountedINRPrice } from "../utils/format";

const categoryMeta = {
  smartphones: "Everyday performance, sharp displays and modern mobile essentials.",
  laptops: "Portable power for study, work, coding and creative workflows.",
  "mobile-accessories": "Practical add-ons that make your everyday tech setup better.",
  tablets: "Flexible screens for productivity, entertainment and everything between.",
  "mens-watches": "Wearable details that bring a refined finish to your everyday setup.",
  "womens-watches": "Clean, expressive accessories selected for modern routines.",
};

const techCategories = Object.keys(categoryMeta);

function Home() {
  const { products, loading } = useProducts();

  const techProducts = products.filter((product) => techCategories.includes(product.category));
  const featured = (techProducts.length ? techProducts : products)
    .slice()
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  const heroProduct =
    products.find((p) => p.category === "laptops") ||
    products.find((p) => p.category === "smartphones") ||
    featured[0];

  const categories = techCategories.map((slug) => {
    const categoryProducts = products.filter((p) => p.category === slug);
    return {
      slug,
      name: slug.replaceAll("-", " "),
      count: categoryProducts.length,
      image: categoryProducts[0]?.thumbnail,
    };
  }).filter((item) => item.count > 0).slice(0, 6);

  return (
    <div className="veyro-page">
      <Navbar />
      <span className="veyro-scan" />

      <main>
        <section className="mx-auto max-w-7xl px-4 pb-14 pt-8 sm:px-6 lg:px-8 lg:pb-20 lg:pt-12">
          <div className="relative overflow-hidden rounded-[28px] border border-[#28323E] bg-[#0D1117]">
            <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-[#A3E635]/10 blur-3xl" />
            <div className="grid min-h-[470px] items-center lg:grid-cols-[1.05fr_.95fr]">
              <div className="relative z-10 px-6 py-12 sm:px-10 lg:px-14">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#A3E635]/20 bg-[#A3E635]/5 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-[#A3E635]">
                  <Sparkles size={12} /> Curated tech · 2026
                </div>
                <h1 className="mt-6 max-w-2xl text-5xl font-black leading-[.95] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
                  Technology,
                  <br />
                  <span className="text-[#A3E635]">Curated Better.</span>
                </h1>
                <p className="mt-6 max-w-xl text-sm leading-7 text-[#8B95A7] sm:text-base">
                  Discover thoughtfully selected products for work, study, creativity and everyday life — with a shopping experience designed to stay simple.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/shop" className="veyro-button inline-flex items-center gap-2 rounded-xl bg-[#A3E635] px-5 py-3.5 text-sm font-black text-[#080B10]">
                    Explore Collection <ArrowRight size={16} />
                  </Link>
                  <Link to="/categories" className="veyro-button inline-flex items-center gap-2 rounded-xl border border-[#2A3440] bg-[#11161D] px-5 py-3.5 text-sm font-bold text-white hover:border-[#3A4654]">
                    View Categories
                  </Link>
                </div>
                <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#697586]">
                  <span className="flex items-center gap-1.5"><Check size={13} className="text-[#34D399]" /> API-powered catalog</span>
                  <span className="flex items-center gap-1.5"><Check size={13} className="text-[#34D399]" /> Responsive by design</span>
                </div>
              </div>

              <div className="relative min-h-[300px] border-t border-[#202833] bg-[radial-gradient(circle_at_center,rgba(163,230,53,.10),transparent_58%)] lg:min-h-full lg:border-l lg:border-t-0">
                {heroProduct ? (
                  <div className="absolute inset-0 flex items-center justify-center p-8 sm:p-12">
                    <div className="w-full max-w-sm">
                      <div className="overflow-hidden rounded-2xl border border-[#28323E] bg-[#11161D] shadow-2xl shadow-black/40">
                        <div className="aspect-square bg-[#0A0E13]">
                          <img src={heroProduct.thumbnail || heroProduct.images?.[0]} alt={heroProduct.title} className="h-full w-full object-contain p-10" />
                        </div>
                        <div className="border-t border-[#202833] p-5">
                          <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#A3E635]">{heroProduct.category?.replaceAll("-", " ")}</p>
                          <h2 className="mt-2 line-clamp-1 font-bold text-white">{heroProduct.title}</h2>
                          <p className="mt-1 text-lg font-black text-[#A3E635]">{formatINR(getDiscountedINRPrice(heroProduct))}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid h-full place-items-center text-[#596474]">Loading collection…</div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[.2em] text-[#A3E635]">Explore</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-white">Popular categories</h2>
              <p className="mt-2 text-sm text-[#8B95A7]">Start with a focused collection.</p>
            </div>
            <Link to="/categories" className="hidden text-sm font-bold text-[#AAB4C3] hover:text-[#A3E635] sm:block">View all →</Link>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((item) => (
              <CategoryCard
                key={item.slug}
                category={item.slug}
                image={item.image}
                count={item.count}
                description={categoryMeta[item.slug]}
              />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[.2em] text-[#22D3EE]">Selected for you</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-white">Featured products</h2>
              <p className="mt-2 text-sm text-[#8B95A7]">Highly rated picks from the current collection.</p>
            </div>
            <Link to="/shop" className="hidden text-sm font-bold text-[#AAB4C3] hover:text-[#A3E635] sm:block">View all products →</Link>
          </div>

          <div className="mt-7">
            <ProductGrid products={featured} loading={loading} />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-xs font-black uppercase tracking-[.2em] text-[#34D399]">Built for confidence</p>
            <h2 className="mt-2 text-2xl font-black text-white">A better way to shop tech</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <TrustCard icon="truck" title="Free Shipping" text="Free delivery on qualifying orders." />
            <TrustCard icon="shield" title="Secure Payments" text="A checkout flow designed around clarity." />
            <TrustCard icon="return" title="Easy Returns" text="Simple, visible return information." />
            <TrustCard icon="support" title="24/7 Support" text="Help whenever you need it." />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
