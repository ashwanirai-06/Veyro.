export default function LoadingSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#202833] bg-[#11161D]">
      <div className="aspect-[4/3] animate-pulse bg-[#1A2028]" />
      <div className="space-y-3 p-4">
        <div className="h-2.5 w-1/3 animate-pulse rounded bg-[#202833]" />
        <div className="h-4 w-4/5 animate-pulse rounded bg-[#202833]" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-[#202833]" />
        <div className="h-9 animate-pulse rounded-xl bg-[#202833]" />
      </div>
    </div>
  );
}
