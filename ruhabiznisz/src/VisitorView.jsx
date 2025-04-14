import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

const VisitorView = () => {
  const [products, setProducts] = useState([]);
  const [hoveredProductId, setHoveredProductId] = useState(null);

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
    <div className="bg-[#f5f5f5] py-8 px-4 sm:px-6 md:px-10 min-h-screen">
      <h2 className="text-3xl font-semibold text-gray-800 tracking-tight mb-8 text-center">
        Termékek
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            onMouseEnter={() => setHoveredProductId(product.id)}
            onMouseLeave={() => setHoveredProductId(null)}
            className="relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            {/* Kép */}
            <div className="bg-gray-100 aspect-[3/4] flex items-center justify-center overflow-hidden rounded-t-xl">
              <img
                src={product.imageUrl}
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-300 ${
                  hoveredProductId === product.id ? "scale-105" : ""
                }`}
              />
            </div>

            {/* Szöveg + gomb */}
            <div
              className={`relative px-4 pt-4 pb-4 text-center space-y-1 transition-all duration-300 ${
                hoveredProductId === product.id ? "pb-16" : ""
              }`}
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500">Méret: {product.size}</p>
              <p className="text-base font-bold text-gray-800">
                {product.price.toLocaleString()} Ft
              </p>

              {hoveredProductId === product.id && (
                <Link
                  to={`/product/${product.id}`}
                  className="absolute left-1/2 bottom-4 transform -translate-x-1/2 px-6 py-2 bg-black text-white text-sm font-semibold rounded-md shadow-md hover:bg-gray-900"
                >
                  Részletek
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisitorView;
