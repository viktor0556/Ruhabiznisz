import React, { useState, useRef } from "react";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ProductList from "./ProductList";

const categoryFields = {
  Parfümök: [
    { label: "Kiszerelés (ml)", key: "volume" },
    { label: "Illatjegy", key: "note" },
  ],
  Fülhallgatók: [
    { label: "Típus", key: "type" },
    { label: "Funkció", key: "feature" },
  ],
};

const AddProduct = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [extraFields, setExtraFields] = useState({});
  const fileInputRef = useRef(null);
  const [description, setDescription] = useState("");

  const handleExtraChange = (key, value) => {
    setExtraFields((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Kérlek válassz képet");
      return;
    }

    const imageRef = ref(storage, `products/${image.name}`);
    await uploadBytes(imageRef, image);
    const imageUrl = await getDownloadURL(imageRef);

    await addDoc(collection(db, "products"), {
      name,
      category,
      size: categoryFields[category] ? "" : size,
      price: Number(price),
      quantity: Number(quantity),
      imageUrl,
      description,
      createdAt: serverTimestamp(),
      ...extraFields,
    });

    setName("");
    setCategory("");
    setSize("");
    setPrice(0);
    setQuantity(0);
    setImage(null);
    setExtraFields({});
    setDescription("");
    if (fileInputRef.current) fileInputRef.current.value = "";

    alert("Termék hozzáadva");
    setRefreshKey((prev) => prev + 1);
  };

  const renderExtraFields = () => {
    const fields = categoryFields[category];
    if (!fields) return null;

    return fields.map(({ label, key }) => (
      <div key={key}>
        <label className="block font-semibold">{label}:</label>
        <input
          type="text"
          value={extraFields[key] || ""}
          onChange={(e) => handleExtraChange(key, e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>
    ));
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
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="">Válassz kategóriát</option>
            <option value="Pólók">Pólók</option>
            <option value="Farmerek">Farmerek</option>
            <option value="Dzsekik">Dzsekik</option>
            <option value="Alsóneműk">Alsóneműk</option>
            <option value="Parfümök">Parfümök</option>
            <option value="Kabátok">Kabátok</option>
            <option value="Cipők">Cipők</option>
            <option value="Fülhallgatók">Fülhallgatók</option>
            <option value="Mellények">Mellények</option>
          </select>
        </div>
        {!categoryFields[category] && (
          <div>
            <label className="block font-semibold">Méret:</label>
            <input
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Pl: M vagy 42"
            />
          </div>
        )}
        {renderExtraFields()}
        <div className="grid grid-cols-2 gap-4">
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
          <label className="block font-semibold">Leírás:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded h-24 resize-none"
            placeholder="Pl: Limitált kiadású cipő különleges dizájnnal..."
          ></textarea>
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
          className="w-full bg-blue-600 text-white py-2 rounded-md shadow-sm hover:bg-blue-700 hover:shadow-md transition-all duration-300"
        >
          Hozzáadás
        </button>
      </form>
      <ProductList refreshKey={refreshKey} />
    </>
  );
};

export default AddProduct;
