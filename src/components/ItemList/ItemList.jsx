import Item from "../Item/Item.jsx";

export default function ItemList({ items }) {
  return (
    <div className="item-grid">
      {items.map((prod) => (
        <Item key={prod.id} item={prod} />
      ))}
    </div>
  );
}
