import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref as storageRef } from "firebase/storage";
import { storage } from "./firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAdmin } from "./AdminContext";
import { useNavigate } from "react-router-dom";

const ProductList = ({ refreshKey }) => {
  const [products, setProducts] = useState([]);
  const { isAdmin, logoutAsAdmin } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAsAdmin();
    navigate("/");
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
  }, [refreshKey]);

  const handleDelete = async (product) => {
    try {
      await deleteDoc(doc(db, "products", product.id));

      if (product.imageUrl) {
        const snapshot = await getDocs(collection(db, "products"));
        const allProducts = snapshot.docs.map((doc) => doc.data());

        const imageUsedElsewhere = allProducts.some(
          (p) => p.imageUrl === product.imageUrl
        );

        if (!imageUsedElsewhere) {
          const decodedUrl = decodeURIComponent(product.imageUrl);
          const pathStart = decodedUrl.indexOf("/o/") + 3;
          const pathEnd = decodedUrl.indexOf("?");
          const filePath = decodedUrl.substring(pathStart, pathEnd);
          const imageRef = storageRef(storage, filePath);
          await deleteObject(imageRef);
        }
      }

      setProducts(products.filter((p) => p.id !== product.id));
      toast.success("Termék törölve");
    } catch (error) {
      console.error("Hiba a törlésnél:", error);
      alert("Nem sikerült törölni a terméket.");
    }
  };

  return (
    <div className="p-4">
      {isAdmin && (
        <div className="flex justify-end mb-4">
          <button
            onClick={handleLogout}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded"
          >
            Kijelentkezés
          </button>
        </div>
      )}
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
              {isAdmin && <th className="px-4 py-2 text-left">Művelet</th>}
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
                {isAdmin && (
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(product)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Törlés
                    </button>
                  </td>
                )}
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
