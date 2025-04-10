import React, { useState } from "react";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import ProductList from "./ProductList";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState(0);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState(null);

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
      size: Number(size),
      price: Number(price),
      quantity: Number(quantity),
      imageUrl,
      createdAt: serverTimestamp(),
    });
    setName("");
    setCategory("");
    setSize(0);
    setPrice(0);
    setQuantity(0);
    alert("Termék hozzáadva");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Termék neve:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Kategória:
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </label>

        <label>
          Méret:
          <input
            type="number"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
        </label>

        <label>
          Ár:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>

        <label>
          Darabszám:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </label>
        <label>
          Kép:
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </label>
        <button>Hozzáadás</button>
      </form>
      <div>Termék hozzáadása</div>
      <ProductList/>
    </>
  );
};

export default AddProduct;
