import React, { useEffect, useState } from "react";
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

const ProductList = () => {
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
    <div>
      <h2>Termékek</h2>
      {products.map((product) => (
        <div key={product.id}>
          <img src={product.imageUrl} alt={product.name} width="200" />
          <h3>{product.name}</h3>
          <p>Kategória: {product.category}</p>
          <p>Méret: {product.size}</p>
          <p>Ár: {product.price} Ft</p>
          <p>Darabszám: {product.quantity}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
