import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref as storageRef } from "firebase/storage";
import { storage } from "./firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductList = ({ refreshKey }) => {
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
  }, [refreshKey]); // <-- ez fontos!

  const handleDelete = async (product) => {
    try {
      // 1. Dokumentum törlése Firestore-ból
      await deleteDoc(doc(db, "products", product.id));

      if (product.imageUrl) {
        // Lekérjük az összes terméket
        const snapshot = await getDocs(collection(db, "products"));
        const allProducts = snapshot.docs.map((doc) => doc.data());

        // Megnézzük, hogy más is használja-e ugyanazt a képet
        const imageUsedElsewhere = allProducts.some(
          (p) => p.imageUrl === product.imageUrl
        );

        // Ha senki más nem használja, csak akkor töröljük
        if (!imageUsedElsewhere) {
          const decodedUrl = decodeURIComponent(product.imageUrl);
          const pathStart = decodedUrl.indexOf("/o/") + 3;
          const pathEnd = decodedUrl.indexOf("?");
          const filePath = decodedUrl.substring(pathStart, pathEnd); // pl. "products/xyz.jpg"
          const imageRef = storageRef(storage, filePath);
          await deleteObject(imageRef);
        }
      }

      // 3. Frissítjük a listát
      setProducts(products.filter((p) => p.id !== product.id));
      toast.success("Termék törölve");
    } catch (error) {
      console.error("Hiba a törlésnél:", error);
      alert("Nem sikerült törölni a terméket.");
    }
  };

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
              <th className="px-4 py-2 text-left">Művelet</th>
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

                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(product)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Törlés
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default ProductList;
