"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const response = await fetch("https://des.mendoza.edu.ar/wp-json/wp/v2/menu-portal-restaurado");
        const data = await response.json();

        if (!Array.isArray(data)) throw new Error("Estructura de datos del menú incorrecta.");

        const menuMap = {};
        data.forEach((item) => {
          menuMap[item.ID] = { ...item, children: [] };
        });

        const structuredMenu = [];
        data.forEach((item) => {
          if (item.menu_item_parent === "0") {
            structuredMenu.push(menuMap[item.ID]);
          } else if (menuMap[item.menu_item_parent]) {
            menuMap[item.menu_item_parent].children.push(menuMap[item.ID]);
          }
        });

        const sortMenu = (items) =>
          items
            .sort((a, b) => a.menu_order - b.menu_order)
            .map((item) => ({
              ...item,
              children: sortMenu(item.children),
            }));

        setMenuItems(sortMenu(structuredMenu));
      } catch (error) {
        console.error("❌ Error cargando el menú:", error);
      }
    }

    fetchMenu();
  }, []);

  const renderMenu = (items) => (
    <ul>
      {items.map((item) => {
        const localUrl = item.url.replace("https://www.mendoza.edu.ar", "");
        const isInternal = localUrl.startsWith("/");

        return (
          <li key={item.ID}>
            {isInternal ? (
              <Link href={localUrl}>{item.title}</Link>
            ) : (
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
            )}
            {item.children.length > 0 && <ul>{renderMenu(item.children)}</ul>}
          </li>
        );
      })}
    </ul>
  );

  return (
    <header className="header">
      <div className="container">
        <Link href="/" className="logo">
          <Image
            src="https://des.mendoza.edu.ar/wp-content/uploads/2022/02/logodge2024enc.png"
            alt="Logo DGE"
            width={180}
            height={60}
            priority
          />
        </Link>

        <nav className="nav">
          {menuItems.length > 0 ? renderMenu(menuItems) : <p>Cargando menú...</p>}
        </nav>

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

