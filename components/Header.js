"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch("https://www.mendoza.edu.ar/wp-json/menus/v1/menus/portal-restaurado")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.items) {
          setMenuItems(data.items);
        }
      });
  }, []);

  const renderMenuItems = (items) => {
    return (
      <ul className="menu">
        {items.map((item) => {
          const hasChildren = item.children && item.children.length > 0;

          return (
            <li key={item.ID} className={hasChildren ? "has-children" : ""}>
              <Link href={item.url || "#"}>{item.title}</Link>
              {hasChildren && (
                <ul className="submenu">
                  {item.children.map((child) => (
                    <li key={child.ID}>
                      <Link href={child.url || "#"}>{child.title}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <header className="header">
      <div className="container flex items-center justify-between py-6">
        <Link href="/">
          <img
            src="/logo-dge.png"
            alt="Logo DGE"
            className="h-16 object-contain"
          />
        </Link>
        <nav>{renderMenuItems(menuItems)}</nav>
      </div>
    </header>
  );
};

export default Header;
