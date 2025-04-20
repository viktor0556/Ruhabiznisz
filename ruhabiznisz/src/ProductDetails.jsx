import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useNavigate } from "react-router-dom";

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
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Kép */}
        <div className="w-full">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-auto rounded-xl object-cover"
          />
        </div>

        {/* Szöveg */}
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-400 text-sm">
            Kategória:{" "}
            <span className="text-white">{product.category || "N/A"}</span>
          </p>
          <p className="text-gray-400 text-sm">
            Méret: <span className="text-white">{product.size || "N/A"}</span>
          </p>
          <p className="text-2xl font-bold mt-4">
            {product.price.toLocaleString()} Ft
          </p>

          {/* Itt jöhetne gomb is: pl. vásárlás vagy vissza */}
          <button
            onClick={() => navigate("/")}
            className="mt-6 w-fit bg-white text-black font-semibold px-6 py-2 rounded hover:bg-gray-200 transition"
          >
            Vissza a termékekhez
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
