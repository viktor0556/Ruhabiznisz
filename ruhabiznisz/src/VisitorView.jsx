// src/VisitorView.jsx
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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Termékek</h2>
      <div className="overflow-x-auto max-w-full">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Kép</th>
              <th className="px-4 py-2 text-left">Név</th>
              <th className="px-4 py-2 text-left">Kategória</th>
              <th className="px-4 py-2 text-left">Méret</th>
              <th className="px-4 py-2 text-left">Ár</th>
              <th className="px-4 py-2 text-left">Darabszám</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="px-4 py-2">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-20 h-20 object-cover aspect-square rounded-lg shadow-sm"
                  />
                </td>
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    {product.category}
                  </span>
                </td>
                <td className="px-4 py-2">{product.size}</td>
                <td className="px-4 py-2">{product.price} Ft</td>
                <td className="px-4 py-2">{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VisitorView;
