import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import CartItem from "../CartItem/CartItem.jsx";

export default function Cart() {
  const { cart, totalPrice, clearCart } = useCart();

  if (!cart.length) {
    return (
      <section>
        <h2>Carrito</h2>
        <p>Tu carrito está vacío.</p>
        <Link to="/" className="btn">
          Ir al catálogo
        </Link>
      </section>
    );
  }

  return (
    <section>
      <h2>Carrito</h2>

      {/* LISTA DE PRODUCTOS */}
      {cart.map((prod) => (
        <CartItem key={prod.id} item={prod} />
      ))}

      {/* TOTAL / ACCIONES */}
      <div className="cart-summary">
        <h3>Total: ${totalPrice}</h3>

        <button className="btn btn-secondary" onClick={clearCart}>
          Vaciar carrito
        </button>

        <Link to="/checkout" className="btn">
          Finalizar compra
        </Link>
      </div>
    </section>
  );
}
