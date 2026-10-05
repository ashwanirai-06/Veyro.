import ProductCard from "./ProductCard";
import LoadingSkeleton from "./LoadingSkeleton";
import EmptyState from "./EmptyState";

export default function ProductGrid({ products = [], loading = false, emptyTitle = "Nothing found", emptyText = "Try another search or filter." }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => <LoadingSkeleton key={index} />)}
      </div>
    );
  }

  if (!products.length) {
    return <EmptyState title={emptyTitle} text={emptyText} />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => <ProductCard key={product.id} product={product} />)}
    </div>
  );
}
