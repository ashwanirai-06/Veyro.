import { Minus, Plus } from "lucide-react";

export default function QuantitySelector({ quantity, onDecrease, onIncrease }) {
  return (
    <div className="inline-flex items-center overflow-hidden rounded-xl border border-[#26303C] bg-[#0D1117]">
      <button onClick={onDecrease} className="grid h-10 w-10 place-items-center text-[#AAB4C3] hover:bg-[#11161D] hover:text-white">
        <Minus size={15} />
      </button>
      <span className="grid h-10 min-w-10 place-items-center border-x border-[#26303C] px-2 text-sm font-bold text-white">
        {quantity}
      </span>
      <button onClick={onIncrease} className="grid h-10 w-10 place-items-center text-[#AAB4C3] hover:bg-[#11161D] hover:text-white">
        <Plus size={15} />
      </button>
    </div>
  );
}
