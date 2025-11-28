import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config.js";
import ItemDetail from "../ItemDetail/ItemDetail.jsx";
import Loader from "../Loader/Loader.jsx";

export default function ItemDetailContainer() {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const docRef = doc(db, "products", itemId);

    getDoc(docRef)
      .then((snap) => {
        if (snap.exists()) {
          setItem({ id: snap.id, ...snap.data() });
        } else {
          setItem(null);
        }
      })
      .catch((error) => console.error("Error cargando detalle:", error))
      .finally(() => setLoading(false));
  }, [itemId]);

  if (loading) return <Loader />;
  if (!item) return <p>Producto no encontrado.</p>;

  return <ItemDetail item={item} />;
}
