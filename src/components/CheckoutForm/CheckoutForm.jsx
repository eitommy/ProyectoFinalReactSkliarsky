import { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/config.js";
import { useCart } from "../../context/CartContext.jsx";

export default function CheckoutForm() {
  const { cart, totalPrice, clearCartSilent } = useCart();
  const [buyer, setBuyer] = useState({ name: "", phone: "", email: "" });
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setBuyer({ ...buyer, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const order = {
      buyer,
      items: cart.map((prod) => ({
        id: prod.id,
        title: prod.title,
        price: prod.price,
        quantity: prod.quantity,
      })),
      total: totalPrice,
      date: Timestamp.fromDate(new Date()),
    };

    try {
      const ordersRef = collection(db, "orders");
      const docRef = await addDoc(ordersRef, order);

      // 🔥 Guardamos solo ID corto y bonito
      const niceId = docRef.id.slice(0, 6).toUpperCase();
      setOrderId(niceId);

      // 🔥 Vaciado silencioso REAL
      clearCartSilent();
    } catch (error) {
      console.error("Error al crear la orden:", error);
    } finally {
      setLoading(false);
    }
  }

  // 🟢 Si ya se generó la orden
  if (!cart.length && orderId) {
    return (
      <section>
        <h2>Gracias por tu compra</h2>
        <p>Tu número de orden es:</p>
        <h3 className="order-id">{orderId}</h3>
      </section>
    );
  }

  // 🟡 Si no hay carrito y no hay orden
  if (!cart.length && !orderId) {
    return (
      <section>
        <h2>No hay productos en el carrito</h2>
      </section>
    );
  }

  // 🟢 FORMULARIO NORMAL
  return (
    <section>
      <h2>Checkout</h2>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <input
          required
          name="name"
          placeholder="Nombre completo"
          value={buyer.name}
          onChange={handleChange}
        />
        <input
          required
          name="phone"
          placeholder="Teléfono"
          value={buyer.phone}
          onChange={handleChange}
        />
        <input
          required
          type="email"
          name="email"
          placeholder="Email"
          value={buyer.email}
          onChange={handleChange}
        />

        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Generando orden..." : "Confirmar compra"}
        </button>
      </form>
    </section>
  );
}
