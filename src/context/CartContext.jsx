import { createContext, useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  // 🟢 Carrito persistente REAL
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // 🟢 Guardar automáticamente en localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // 🟢 AGREGAR PRODUCTO
  function addItem(item, quantity) {
    const exists = cart.find((prod) => prod.id === item.id);

    if (exists) {
      const newQuantity = exists.quantity + quantity;

      if (newQuantity > item.stock) {
        Swal.fire({
          icon: "error",
          title: "Stock insuficiente",
          text: `Solo hay ${item.stock} unidades disponibles.`,
        });
        return false;
      }

      setCart(
        cart.map((prod) =>
          prod.id === item.id ? { ...prod, quantity: newQuantity } : prod
        )
      );

      Swal.fire({
        icon: "success",
        title: "Cantidad actualizada",
        text: `Ahora tenés ${newQuantity} unidades.`,
        timer: 1500,
        showConfirmButton: false,
      });

      return true;
    }

    if (quantity > item.stock) {
      Swal.fire({
        icon: "error",
        title: "Stock insuficiente",
        text: `Solo hay ${item.stock} unidades disponibles.`,
      });
      return false;
    }

    setCart([...cart, { ...item, quantity }]);

    Swal.fire({
      icon: "success",
      title: "Producto agregado",
      text: `${item.title} fue añadido al carrito.`,
      timer: 1500,
      showConfirmButton: false,
    });

    return true;
  }

  // 🟢 AUMENTAR CANTIDAD DESDE EL CARRITO
  function increaseQty(id) {
    setCart((prev) =>
      prev.map((prod) => {
        if (prod.id === id) {
          if (prod.quantity < prod.stock) {
            return { ...prod, quantity: prod.quantity + 1 };
          } else {
            Swal.fire({
              icon: "error",
              title: "Stock máximo",
              text: "No hay más stock disponible.",
            });
          }
        }
        return prod;
      })
    );
  }

  // 🟢 DISMINUIR CANTIDAD DESDE EL CARRITO
  function decreaseQty(id) {
    setCart((prev) =>
      prev
        .map((prod) =>
          prod.id === id
            ? { ...prod, quantity: prod.quantity - 1 }
            : prod
        )
        .filter((prod) => prod.quantity > 0) // elimina si llega a 0
    );
  }

  // 🟢 ELIMINAR PRODUCTO
  function removeItem(id) {
    setCart(cart.filter((prod) => prod.id !== id));
  }

  // 🟢 VACÍAR CARRITO (CON ALERTA)
  function clearCart() {
    Swal.fire({
      title: "¿Vaciar carrito?",
      text: "Perderás todos los productos.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, vaciar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setCart([]);
        Swal.fire({
          icon: "success",
          title: "Carrito vacío",
          timer: 1200,
          showConfirmButton: false,
        });
      }
    });
  }

  // 🟢 VACÍAR CARRITO SIN ALERTA (PARA CHECKOUT)
  function clearCartSilent() {
    setCart([]);
  }

  // 🟢 Totales automáticos
  const totalUnits = cart.reduce((acc, prod) => acc + prod.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, prod) => acc + prod.quantity * prod.price,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        clearCart,
        clearCartSilent,   // ← NECESARIO PARA CHECKOUT
        increaseQty,
        decreaseQty,
        totalUnits,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
