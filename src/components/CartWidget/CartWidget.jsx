import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";

export default function CartWidget() {
  const { totalUnits } = useCart();

  return (
    <Link to="/cart" className="cart-widget">
      <span className="cart-icon">🛒</span>
      {totalUnits > 0 && <span className="cart-count">{totalUnits}</span>}
    </Link>
  );
}
