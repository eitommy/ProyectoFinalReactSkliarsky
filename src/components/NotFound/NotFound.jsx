import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="notfound">
      <h1>404</h1>
      <p>Página no encontrada</p>
      <Link to="/" className="btn">Volver al inicio</Link>
    </div>
  );
}
