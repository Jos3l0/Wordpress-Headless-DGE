"use client";

import { useEffect, useState } from "react";

export default function DynamicMenu() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const response = await fetch("https://des.mendoza.edu.ar/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `
              {
                menu(id: "5749", idType: DATABASE_ID) {
                  name
                  menuItems {
                    nodes {
                      id
                      label
                      url
                      parentId
                    }
                  }
                }
              }
            `,
          }),
        });

        const data = await response.json();
        if (data.data.menu.menuItems) {
          setMenuItems(data.data.menu.menuItems.nodes);
        }
      } catch (error) {
        console.error("Error cargando el menú:", error);
      }
    }

    fetchMenu();
  }, []);

  // Función para construir el menú con subniveles
  const buildMenu = (items, parentId = null) => {
    const filteredItems = items.filter((item) => item.parentId === parentId);

    if (filteredItems.length === 0) return null;

    return (
      <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>
            <a href={item.url}>{item.label}</a>
            {buildMenu(items, item.id)} {/* Renderiza submenús */}
          </li>
        ))}
      </ul>
    );
  };

  return <nav className="dynamic-menu">{buildMenu(menuItems)}</nav>;
}

