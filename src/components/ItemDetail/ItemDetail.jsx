import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import ItemCount from "../ItemCount/ItemCount.jsx";

export default function ItemDetail({ item }) {
  const { addItem, cart } = useCart();
  const [addedQty, setAddedQty] = useState(0);

  // ✔ Cuando cambia el item, resetear el estado (EVITA BUG DE 155)
  useEffect(() => {
    setAddedQty(0);
  }, [item.id]);

  function handleAdd(quantity) {
    const ok = addItem(item, quantity);

    if (ok) {
      setAddedQty(quantity);
    }
  }

  return (
    <section className="item-detail">
      <img src={item.image} alt={item.title} className="item-detail-image" />

      <div className="item-detail-info">
        <h2>{item.title}</h2>
        <p className="item-detail-description">{item.description}</p>
        <p><strong>Precio:</strong> ${item.price}</p>
        <p><strong>Categoría:</strong> {item.category}</p>
        <p><strong>Talle:</strong> {item.size}</p>

        {/* ✔ Mostrar stock REAL (no el del carrito) */}
        <p><strong>Stock disponible:</strong> {item.stock}</p>

        {item.stock === 0 && (
          <p className="no-stock">Producto sin stock.</p>
        )}

        {item.stock > 0 && addedQty === 0 && (
          <ItemCount stock={item.stock} initial={1} onAdd={handleAdd} />
        )}

        {addedQty > 0 && (
          <div className="after-add">
            <p>Agregaste {addedQty} unidad(es).</p>

            <Link to="/cart" className="btn">Ir al carrito</Link>
            <Link to="/" className="btn btn-secondary">Seguir comprando</Link>
          </div>
        )}
      </div>
    </section>
  );
}
