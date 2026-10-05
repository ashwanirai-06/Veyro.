import { Heart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import QuantitySelector from "./QuantitySelector";
import { formatINR, getDiscountedINRPrice } from "../utils/format";

export default function CartItem({ item }) {
  const { removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const { toggleWishlist } = useWishlist();

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-[#202833] bg-[#11161D] p-4 sm:flex-row">
      <Link to={`/product/${item.id}`} className="h-28 w-full shrink-0 overflow-hidden rounded-xl bg-[#0D1117] sm:w-32">
        <img src={item.thumbnail || item.images?.[0]} alt={item.title} className="h-full w-full object-contain p-3" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#A3E635]">{item.category?.replaceAll("-", " ")}</p>
          <Link to={`/product/${item.id}`} className="mt-1 block text-sm font-bold text-white hover:text-[#A3E635]">{item.title}</Link>
          <p className="mt-1 text-xs text-[#697586]">{item.brand || "Veyro collection"}</p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <QuantitySelector
            quantity={item.quantity}
            onDecrease={() => decreaseQuantity(item.id)}
            onIncrease={() => increaseQuantity(item.id)}
          />
          <div className="text-right">
            <div className="font-black text-white">{formatINR(getDiscountedINRPrice(item) * item.quantity)}</div>
            <div className="text-xs text-[#697586]">each × {item.quantity}</div>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <button onClick={() => toggleWishlist(item)} className="rounded-lg p-2 text-[#697586] hover:bg-[#0D1117] hover:text-[#FB7185]"><Heart size={16} /></button>
            <button onClick={() => removeFromCart(item.id)} className="rounded-lg p-2 text-[#697586] hover:bg-[#0D1117] hover:text-[#FB7185]"><Trash2 size={16} /></button>
          </div>
        </div>
      </div>
    </article>
  );
}
