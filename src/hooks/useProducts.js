import { useEffect, useState } from "react";
import { getProducts } from "../services/productApi";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        setLoading(true);
        setError("");
        const data = await getProducts();
        if (active) setProducts(data);
      } catch (error) {
        console.error(error);
        if (active) setError("Unable to load the collection right now.");
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => { active = false; };
  }, []);

  return { products, loading, error };
}
