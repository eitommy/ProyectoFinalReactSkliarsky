import { Link } from "react-router-dom";

export default function Item({ item }) {
  return (
    <article className="item-card">
      <img
        src={item.image}
        alt={item.title}
        className="item-image"
      />

      <h3 className="item-title">{item.title}</h3>

      <p className="item-price">${item.price}</p>

      <p className="item-category">{item.category}</p>

      <Link to={`/item/${item.id}`} className="btn">
        Ver detalle
      </Link>
    </article>
  );
}
