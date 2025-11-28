import { Link, NavLink } from "react-router-dom";
import CartWidget from "../CartWidget/CartWidget.jsx";

export default function NavBar() {
  return (
    <header className="navbar">
      <Link to="/" className="navbar-logo">
        SkliarskySport
      </Link>

      <nav className="navbar-links">
        <NavLink to="/" end>
          Inicio
        </NavLink>
        <NavLink to="/category/remeras">Remeras</NavLink>
        <NavLink to="/category/pantalones">Pantalones</NavLink>
        <NavLink to="/category/accesorios">Accesorios</NavLink>
      </nav>

      <CartWidget />
    </header>
  );
}
