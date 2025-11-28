import { useState } from "react";

export default function ItemCount({ stock, initial = 1, onAdd }) {
  const [count, setCount] = useState(initial);

  function increment() {
    if (count < stock) setCount(count + 1);
  }

  function decrement() {
    if (count > 1) setCount(count - 1);
  }

  function handleAdd() {
    if (stock === 0) return;
    onAdd(count);
  }

  return (
    <div className="item-count">
      <div className="item-count-controls">
        <button onClick={decrement} disabled={count <= 1}>
          -
        </button>
        <span>{count}</span>
        <button onClick={increment} disabled={count >= stock}>
          +
        </button>
      </div>

      <button
        className="btn"
        onClick={handleAdd}
        disabled={stock === 0 || count < 1}
      >
        Agregar al carrito
      </button>
    </div>
  );
}
