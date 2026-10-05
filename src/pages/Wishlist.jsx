import { ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductGrid from "../components/ProductGrid";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import EmptyState from "../components/EmptyState";

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="veyro-page">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[.2em] text-[#FB7185]">Saved for later</p>
            <h1 className="mt-2 text-4xl font-black text-white">Your Wishlist</h1>
            <p className="mt-2 text-sm text-[#8B95A7]">{wishlistItems.length} saved product{wishlistItems.length === 1 ? "" : "s"}.</p>
          </div>
          {wishlistItems.length > 0 && <Link to="/shop" className="text-sm font-bold text-[#A3E635]">Keep exploring →</Link>}
        </div>

        {wishlistItems.length === 0 ? (
          <div className="mt-8"><EmptyState title="Your wishlist is empty" text="Save products you want to compare or revisit later." /></div>
        ) : (
          <>
            <div className="mt-8 flex flex-wrap gap-2">
              {wishlistItems.slice(0, 3).map((item) => (
                <button key={item.id} onClick={() => addToCart(item)} className="inline-flex items-center gap-2 rounded-xl border border-[#202833] bg-[#11161D] px-3 py-2 text-xs font-bold text-[#AAB4C3] hover:text-white">
                  <ShoppingBag size={13} /> Add {item.title}
                </button>
              ))}
            </div>
            <div className="mt-6"><ProductGrid products={wishlistItems} /></div>
            <div className="mt-5 flex flex-wrap gap-2">
              {wishlistItems.map((item) => (
                <button key={item.id} onClick={() => removeFromWishlist(item.id)} className="inline-flex items-center gap-1 rounded-lg px-2.5 py-2 text-xs text-[#697586] hover:bg-[#11161D] hover:text-[#FB7185]">
                  <Trash2 size={12} /> Remove {item.title}
                </button>
              ))}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
