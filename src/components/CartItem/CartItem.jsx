import { useCart } from "../../context/CartContext.jsx";

export default function CartItem({ item }) {
  const { increaseQty, decreaseQty, removeItem } = useCart();

  return (
    <article className="cart-item">
      <div>
        <h4>{item.title}</h4>
        <p>Talle: {item.size}</p>

        {/* CONTROLES DE CANTIDAD */}
        <div className="qty-controls">
          <button onClick={() => decreaseQty(item.id)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => increaseQty(item.id)}>+</button>
        </div>

        <p>Precio unidad: ${item.price}</p>
        <p>Subtotal: ${item.price * item.quantity}</p>
      </div>

      {/* ELIMINAR */}
      <button className="btn btn-secondary" onClick={() => removeItem(item.id)}>
        Eliminar
      </button>
    </article>
  );
}
