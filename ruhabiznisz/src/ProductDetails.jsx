import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct({ id: docSnap.id, ...docSnap.data() });
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <p className="text-center mt-10">Termék betöltése...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Kép */}
        <div className="bg-gray-100 rounded-xl overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Adatok */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-sm text-gray-600">Kategória: {product.category}</p>
          <p className="text-sm text-gray-600">Méret: {product.size}</p>
          <p className="text-xl font-semibold text-gray-800">
            {product.price.toLocaleString()} Ft
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
