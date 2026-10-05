import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Check, Heart, Minus, Plus, ShoppingBag, ShieldCheck, Truck } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RatingStars from "../components/RatingStars";
import ProductGrid from "../components/ProductGrid";
import { getProductById, getProducts } from "../services/productApi";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { formatINR, getINRPrice, getDiscountedINRPrice } from "../utils/format";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      try {
        const [item, products] = await Promise.all([getProductById(id), getProducts()]);
        if (!active) return;
        setProduct(item);
        setAllProducts(products);
        setImage(item.thumbnail || item.images?.[0]);
      } catch (error) {
        console.error(error);
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => { active = false; };
  }, [id]);

  const related = useMemo(
    () => allProducts
      .filter((item) => item.category === product?.category && item.id !== product?.id)
      .slice(0, 4),
    [allProducts, product]
  );

  if (loading) {
    return (
      <div className="veyro-page">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-20 text-center text-[#8B95A7]">Loading product…</main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="veyro-page">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-20 text-center">
          <h1 className="text-2xl font-black text-white">Product not found</h1>
          <Link to="/shop" className="mt-5 inline-block text-sm font-bold text-[#A3E635]">Back to shop →</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const oldPrice = getINRPrice(product.price);
  const salePrice = getDiscountedINRPrice(product);
  const total = salePrice * quantity;

  const add = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
  };

  return (
    <div className="veyro-page">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <button onClick={() => navigate(-1)} className="mb-6 inline-flex items-center gap-2 text-sm text-[#8B95A7] hover:text-white">
          <ArrowLeft size={15} /> Back
        </button>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr]">
          <div className="grid gap-3 sm:grid-cols-[90px_1fr]">
            <div className="order-2 flex gap-2 overflow-auto sm:order-1 sm:flex-col">
              {(product.images?.length ? product.images : [product.thumbnail]).slice(0, 5).map((src) => (
                <button
                  key={src}
                  onClick={() => setImage(src)}
                  className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border bg-[#0D1117] p-2 ${image === src ? "border-[#A3E635]/60" : "border-[#202833]"}`}
                >
                  <img src={src} alt="" className="h-full w-full object-contain" />
                </button>
              ))}
            </div>
            <div className="order-1 overflow-hidden rounded-3xl border border-[#202833] bg-[#0D1117] sm:order-2">
              <div className="aspect-square">
                <img src={image} alt={product.title} className="h-full w-full object-contain p-10 sm:p-16" />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-black uppercase tracking-[.2em] text-[#A3E635]">{product.category?.replaceAll("-", " ")}</p>
              <button onClick={() => toggleWishlist(product)} className={`grid h-10 w-10 place-items-center rounded-full border ${isInWishlist(product.id) ? "border-[#FB7185]/40 bg-[#FB7185]/10 text-[#FB7185]" : "border-[#202833] text-[#8B95A7] hover:text-white"}`}>
                <Heart size={17} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
              </button>
            </div>

            <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">{product.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <RatingStars rating={product.rating} count={product.reviews?.length || Math.round(product.rating * 23)} />
              <span className="rounded-full bg-[#34D399]/10 px-2.5 py-1 text-xs font-bold text-[#34D399]">In stock</span>
            </div>

            <div className="mt-7">
              <div className="flex items-end gap-3">
                <span className="text-3xl font-black text-white">{formatINR(salePrice)}</span>
                <span className="pb-1 text-sm text-[#697586] line-through">{formatINR(oldPrice)}</span>
                <span className="rounded-full bg-[#FB7185]/10 px-2 py-1 text-xs font-bold text-[#FB7185]">Save {Math.round(product.discountPercentage || 0)}%</span>
              </div>
              <p className="mt-2 text-xs text-[#596474]">Displayed in INR for this demo catalog.</p>
            </div>

            <p className="mt-6 text-sm leading-7 text-[#8B95A7]">{product.description}</p>

            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-xl border border-[#202833] bg-[#0D1117] p-3 text-xs text-[#AAB4C3]"><Truck size={16} className="text-[#22D3EE]" /> Fast delivery available</div>
              <div className="flex items-center gap-3 rounded-xl border border-[#202833] bg-[#0D1117] p-3 text-xs text-[#AAB4C3]"><ShieldCheck size={16} className="text-[#34D399]" /> Secure checkout</div>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center overflow-hidden rounded-xl border border-[#26303C] bg-[#0D1117]">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="grid h-12 w-11 place-items-center text-[#AAB4C3] hover:bg-[#11161D]"><Minus size={15} /></button>
                <span className="grid h-12 min-w-11 place-items-center border-x border-[#26303C] font-bold">{quantity}</span>
                <button onClick={() => setQuantity((q) => Math.min(product.stock || 10, q + 1))} className="grid h-12 w-11 place-items-center text-[#AAB4C3] hover:bg-[#11161D]"><Plus size={15} /></button>
              </div>
              <button onClick={add} className="veyro-button flex min-w-44 flex-1 items-center justify-center gap-2 rounded-xl bg-[#A3E635] px-5 py-3.5 text-sm font-black text-[#080B10]">
                <ShoppingBag size={17} /> Add to Cart · {formatINR(total)}
              </button>
              <button onClick={() => { add(); navigate("/checkout"); }} className="veyro-button rounded-xl border border-[#2A3440] bg-[#11161D] px-5 py-3.5 text-sm font-bold text-white hover:border-[#A3E635]/40">
                Buy now
              </button>
            </div>

            <div className="mt-7 rounded-2xl border border-[#202833] bg-[#0D1117] p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-[#697586]">Product details</p>
              <dl className="mt-4 grid grid-cols-2 gap-x-5 gap-y-4 text-sm">
                <div><dt className="text-[#596474]">Brand</dt><dd className="mt-1 font-semibold text-white">{product.brand || "Veyro"}</dd></div>
                <div><dt className="text-[#596474]">SKU</dt><dd className="mt-1 font-semibold text-white">VYR-{String(product.id).padStart(4, "0")}</dd></div>
                <div><dt className="text-[#596474]">Availability</dt><dd className="mt-1 font-semibold text-[#34D399]">{product.stock} units</dd></div>
                <div><dt className="text-[#596474]">Shipping</dt><dd className="mt-1 font-semibold text-white">Fast delivery</dd></div>
              </dl>
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs text-[#697586]">
              <Check size={14} className="text-[#34D399]" /> Frontend demo — no real payment is processed.
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <div className="mb-6">
              <p className="text-xs font-black uppercase tracking-[.2em] text-[#22D3EE]">You may also like</p>
              <h2 className="mt-2 text-2xl font-black text-white">Related products</h2>
            </div>
            <ProductGrid products={related} />
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
