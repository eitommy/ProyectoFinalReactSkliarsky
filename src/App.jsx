import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.jsx";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer.jsx";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer.jsx";
import Cart from "./components/Cart/Cart.jsx";
import CheckoutForm from "./components/CheckoutForm/CheckoutForm.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";

export default function App() {
  return (
    <>
      <NavBar />
      <main className="container">
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/category/:categoryId" element={<ItemListContainer />} />
          <Route path="/item/:itemId" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutForm />} />
          <Route path="*" element={<p>404 - Página no encontrada</p>} />
        </Routes>
      </main>
    </>
  );
}
