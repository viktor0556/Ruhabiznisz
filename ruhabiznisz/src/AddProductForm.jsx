import React, { useState, useRef } from "react";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ProductList from "./ProductList";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Ref a file inputhoz
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Kérlek válassz képet");
      return;
    }

    // Feltöltés: használj egyedi fájlnevet, ha szükséges (például Date.now() és random kombinációval)
    const imageRef = ref(storage, `products/${image.name}`);
    await uploadBytes(imageRef, image);
    const imageUrl = await getDownloadURL(imageRef);

    await addDoc(collection(db, "products"), {
      name,
      category,
      size,
      price: Number(price),
      quantity: Number(quantity),
      imageUrl,
      createdAt: serverTimestamp(),
    });

    // Reseteljük az inputokat
    setName("");
    setCategory("");
    setSize("");
    setPrice(0);
    setQuantity(0);
    setImage(null);
    // A file input értékét közvetlenül reseteljük a ref segítségével
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    alert("Termék hozzáadva");
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white shadow p-4 rounded space-y-4"
      >
        <div>
          <label className="block font-semibold">Termék neve:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Kategória:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block font-semibold">Méret:</label>
            <input
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Pl: M vagy 42"
            />
          </div>
          <div>
            <label className="block font-semibold">Ár (Ft):</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Darabszám:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
        </div>
        <div>
          <label className="block font-semibold mb-1">Kép feltöltése:</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            ref={fileInputRef}
            className="block w-full border border-gray-300 rounded px-3 py-2 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Hozzáadás
        </button>
      </form>
      <ProductList refreshKey={refreshKey} />
    </>
  );
};

export default AddProduct;
