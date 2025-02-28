"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const response = await fetch("https://des.mendoza.edu.ar/wp-json/wp/v2/menu-portal-restaurado");
        const data = await response.json();

        console.log("🔍 Datos del menú recibidos:", data);

        if (!Array.isArray(data)) {
          throw new Error("Estructura de datos del menú incorrecta.");
        }

        // **1️⃣ Crear un objeto de referencia de los elementos del menú**
        const menuMap = {};
        data.forEach((item) => {
          menuMap[item.ID] = { ...item, children: [] };
        });

        // **2️⃣ Construir la estructura jerárquica**
        const structuredMenu = [];
        data.forEach((item) => {
          if (item.menu_item_parent === "0") {
            // 📌 Es un elemento principal (Nivel 1)
            structuredMenu.push(menuMap[item.ID]);
          } else {
            // 📌 Es un submenú, añadirlo al padre correspondiente
            if (menuMap[item.menu_item_parent]) {
              menuMap[item.menu_item_parent].children.push(menuMap[item.ID]);
            }
          }
        });

        // **3️⃣ Ordenar el menú y submenús según `menu_order`**
        const sortMenu = (items) => {
          return items
            .sort((a, b) => a.menu_order - b.menu_order)
            .map((item) => ({
              ...item,
              children: sortMenu(item.children),
            }));
        };

        const orderedMenu = sortMenu(structuredMenu);

        console.log("🛠 Menú estructurado y ordenado:", orderedMenu);
        setMenuItems(orderedMenu);
      } catch (error) {
        console.error("❌ Error cargando el menú:", error);
      }
    }

    fetchMenu();
  }, []);

  // **🔄 Renderizar menú de forma recursiva**
  const renderMenu = (items) => {
    return (
      <ul>
        {items.map((item) => (
          <li key={item.ID}>
            <a href={item.url}>{item.title}</a>
            {item.children.length > 0 && <ul>{renderMenu(item.children)}</ul>}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <header className="header">
      <div className="container">
        {/* LOGO */}
        <a href="/" className="logo">
          <img
            src="https://des.mendoza.edu.ar/wp-content/uploads/2022/02/logodge2024enc.png"
            alt="Logo DGE"
          />
        </a>

        {/* MENÚ DINÁMICO */}
        <nav className="nav">
          {menuItems.length > 0 ? renderMenu(menuItems) : <p>Cargando menú...</p>}
        </nav>

        {/* ÍCONOS DE REDES SOCIALES */}
        <div className="social-icons">
          <a href="#"><i className="fas fa-search"></i></a>
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-youtube"></i></a>
        </div>
      </div>
    </header>
  );
}

