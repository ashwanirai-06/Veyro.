import { Heart, ShoppingBag, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import RatingStars from "./RatingStars";
import { formatINR, getINRPrice } from "../utils/format";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const oldPrice = getINRPrice(product.price);
  const salePrice = Math.round(oldPrice * (1 - Number(product.discountPercentage || 0) / 100));

  return (
    <article className="group overflow-hidden rounded-2xl border border-[#202833] bg-[#11161D]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#0D1117]">
        <Link to={`/product/${product.id}`} className="block h-full">
          <img
            src={product.thumbnail || product.images?.[0]}
            alt={product.title}
            className="h-full w-full object-contain p-7 transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        <div className="absolute left-3 top-3 rounded-full bg-[#FB7185] px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[#080B10]">
          -{Math.round(product.discountPercentage || 0)}%
        </div>

        <button
          onClick={() => toggleWishlist(product)}
          aria-label="Toggle wishlist"
          className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border backdrop-blur ${
            isInWishlist(product.id)
              ? "border-[#FB7185]/50 bg-[#FB7185]/10 text-[#FB7185]"
              : "border-[#202833] bg-[#080B10]/75 text-[#AAB4C3] hover:text-white"
          }`}
        >
          <Heart size={16} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
        </button>

        <Link
          to={`/product/${product.id}`}
          className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full border border-[#202833] bg-[#080B10]/80 text-[#AAB4C3] opacity-0 backdrop-blur transition group-hover:opacity-100 hover:text-[#A3E635]"
        >
          <ArrowUpRight size={16} />
        </Link>
      </div>

      <div className="p-4">
        <p className="truncate text-[10px] font-bold uppercase tracking-[0.18em] text-[#A3E635]">
          {product.category?.replaceAll("-", " ")}
        </p>
        <Link to={`/product/${product.id}`} className="mt-2 block">
          <h3 className="line-clamp-2 min-h-11 text-sm font-semibold leading-5 text-white hover:text-[#A3E635]">
            {product.title}
          </h3>
        </Link>

        <div className="mt-3 flex items-center justify-between gap-2">
          <RatingStars rating={product.rating} />
          <span className="text-xs text-[#697586]">{product.stock} left</span>
        </div>

        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <div className="text-lg font-black text-white">{formatINR(salePrice)}</div>
            <div className="text-xs text-[#697586] line-through">{formatINR(oldPrice)}</div>
          </div>
          <button
            onClick={() => addToCart(product)}
            className="veyro-button flex items-center gap-2 rounded-xl bg-[#A3E635] px-3.5 py-2.5 text-xs font-black text-[#080B10] shadow-[0_8px_25px_rgba(163,230,53,.12)] hover:bg-[#bef264]"
          >
            <ShoppingBag size={14} /> Add
          </button>
        </div>
      </div>
    </article>
  );
}
