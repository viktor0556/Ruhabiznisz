import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import CategorySidebar from "./CategorySidebar";

const VisitorView = () => {
  const [products, setProducts] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredProducts = selectedCategory
    ? products.filter((p) =>
        p.category.toLowerCase().includes(selectedCategory.toLowerCase())
      )
    : products;

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(list);
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-black text-white py-12 px-4 sm:px-6 md:px-10 min-h-screen">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold">Prémium termékkínálat</h2>
        <p className="text-gray-400 text-sm mt-2">
          Fedezd fel a legújabb stílusos és exkluzív darabokat
        </p>
      </div>

      <div className="flex gap-10">
        {/* Bal oldali kategóriaszűrő */}
        <CategorySidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* Termékkártyák */}
        <div
          className="grid justify-center gap-6 flex-grow"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          }}
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-[#1a1a1a] shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              <div
                className={`flex flex-col justify-between px-3 pt-3 text-center relative transition-all duration-300 ${
                  hoveredId === product.id ? "pb-16" : "pb-4"
                }`}
              >
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold uppercase tracking-wide">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-400">Méret: {product.size}</p>
                  <p className="text-base font-bold">
                    {product.price.toLocaleString()} Ft
                  </p>
                </div>

                {hoveredId === product.id && (
                  <Link
                    to={`/product/${product.id}`}
                    className="absolute bottom-3 left-1/2 transform -translate-x-1/2 px-4 py-1.5 text-sm rounded bg-white text-black font-semibold opacity-100 transition duration-300"
                  >
                    Részletek
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VisitorView;
