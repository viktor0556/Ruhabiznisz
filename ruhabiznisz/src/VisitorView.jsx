import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

const VisitorView = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      const productsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Termékek</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-200"
          >
            {/* Kép szürke háttéren, középre igazítva */}
            <div className="bg-gray-50 flex items-center justify-center h-[280px]">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="max-h-[260px] w-auto object-contain"
              />
            </div>

            {/* Szöveges rész */}
            <div className="px-4 py-4 text-left">
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {product.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Elérhető méret: {product.size}
              </p>
              <p className="text-base font-semibold text-black mt-2">
                {product.price.toLocaleString()} Ft
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisitorView;
