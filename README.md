# 🛒 Proyecto Final React — SkliarskySport
### E-commerce de Ropa Deportiva · React + Firebase

Este proyecto es mi entrega final del curso de **React**, donde desarrollé una Single Page Application completa de e-commerce llamada **SkliarskySport**, enfocada en la venta de ropa deportiva.

La app permite navegar por categorías, ver productos, ver sus detalles, administrar un carrito de compras persistente, y finalizar la compra generando una orden en Firebase.

---

## 🚀 Tecnologías utilizadas

- **React + Vite**
- **Firebase Firestore** (Base de datos)
- **React Router DOM**
- **Context API** (carrito global)
- **SweetAlert2** (alertas modernas)
- **CSS puro** (estilo responsive)
- **LocalStorage** (carrito persistente)

---

## 🛠️ Funcionalidades

### 🔹 Listado y detalle de productos
- Los productos se obtienen dinámicamente desde Firebase.
- Filtro por categorías.
- Vista detallada con descripción, stock, precio, talle.

### 🔹 Carrito de compras
- Carrito global con **Context**.
- Persistente con **localStorage**.
- Validación de stock real.
- Botones para **sumar**, **restar** y **eliminar** productos.
- Botón para **vaciar carrito** con confirmación.

### 🔹 ItemCount
- Selección de unidades con control de stock.
- Ocultación del contador luego de agregar.

### 🔹 Proceso de compra
- Formulario de Checkout.
- Generación de orden en Firestore.
- Muestra un **ID de compra corto** y limpio.
- Limpieza del carrito una vez confirmada la compra.

---

## 📦 Firebase

Colecciones implementadas:

### `products`
Guarda los productos del e-commerce:

```json
{
  "title": "Remera Deportiva",
  "category": "remeras",
  "price": 15000,
  "description": "Tela dryfit premium.",
  "image": "URL",
  "size": "L",
  "stock": 10
}

orders

Almacena cada orden generada con:

comprador

productos

fecha

total

ID corto mostrado al usuario

nstalación y ejecución

Clonar el repositorio:

git clone https://github.com/tunombre/ProyectoFinalSkliarsky.git


Instalar dependencias:

npm install


Ejecutar servidor de desarrollo:

npm run dev

🔑 Variables de entorno

Crear archivo .env:

VITE_FIREBASE_API_KEY=xxxx
VITE_FIREBASE_AUTH_DOMAIN=xxxx
VITE_FIREBASE_PROJECT_ID=xxxx
VITE_FIREBASE_STORAGE_BUCKET=xxxx
VITE_FIREBASE_MESSAGING_SENDER_ID=xxxx
VITE_FIREBASE_APP_ID=xxxx

👤 Autor

Eithan Skliarsky
Proyecto Final — Curso de React
SkliarskySport 🏆