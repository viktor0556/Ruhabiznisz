import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import ProductBuy from "./ProductBuy";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

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

  if (!product)
    return <div className="text-white text-center">Betöltés...</div>;

  return (
    <div className="bg-black text-white min-h-screen py-12 px-4 sm:px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Termék kép */}
        <div className="w-full max-w-[500px] mx-auto aspect-square overflow-hidden rounded-xl">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Jobb oldal: Tartalom */}
        <div className="flex flex-col justify-start items-start space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <div className="space-y-1">
            <p className="text-gray-400 text-lg">
              Kategória: <span className="text-white">{product.category || "N/A"}</span>
            </p>
            <p className="text-gray-400 text-lg">
              Méret: <span className="text-white">{product.size || "N/A"}</span>
            </p>
          </div>

          <p className="text-3xl font-bold">{product.price.toLocaleString()} Ft</p>

          <ProductBuy />

          <button
            onClick={() => navigate("/")}
            className="mt-4 w-full py-3 bg-gray-800 text-white font-semibold rounded hover:bg-gray-700 transition"
          >
            Vissza a termékekhez
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
