import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemList from "../ItemList/ItemList.jsx";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config.js";

export default function ItemListContainer() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);

    const productsRef = collection(db, "products");

    // 🔥 DEBUG 1 — Ver categoría enviada por la URL
    console.log("🔎 categoryId recibido:", categoryId);

    // Generar consulta (con filtro o sin filtro)
    const q = categoryId
      ? query(productsRef, where("category", "==", categoryId))
      : productsRef;

    // Ejecutar consulta
    getDocs(q)
      .then((res) => {
        // 🔥 DEBUG 2 — Cantidad de documentos encontrados
        console.log("📦 Cantidad docs Firestore:", res.docs.length);

        // 🔥 DEBUG 3 — Datos exactos de cada doc
        res.docs.forEach((d) => console.log("📄 doc:", d.id, d.data()));

        const products = res.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setItems(products);
      })
      .catch((err) => console.error("❌ Error Firestore:", err))
      .finally(() => setLoading(false));
  }, [categoryId]);

  // Estado de carga
  if (loading) return <p>Cargando productos...</p>;

  // Cuando no hay items
  if (!items.length)
    return <p>No hay productos en esta categoría por el momento.</p>;

  return <ItemList items={items} />;
}

// 🔥 DEBUG GLOBAL — Ver TODOS los productos de tu Firestore
getDocs(collection(db, "products")).then((r) => {
  console.log("🧪 TODOS LOS PRODUCTOS EN FIRESTORE:");
  r.docs.forEach((d) =>
    console.log(`➡ ${d.id} | category: "${d.data().category}"`)
  );
});
