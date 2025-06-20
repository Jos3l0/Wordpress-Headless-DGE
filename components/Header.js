"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const Header = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch("/api/menu");
        const data = await res.json();
        setMenuItems(data.items);
      } catch (error) {
        console.error("Error cargando menú:", error);
      }
    };

    fetchMenu();
  }, []);

  return (
    <header className="header bg-white shadow-md py-6 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <img
            src="/logo-dge.png"
            alt="Logo DGE"
            className="h-12 w-auto"
          />
        </Link>
        <nav>
          <ul className="flex space-x-6 text-sm md:text-base font-semibold">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link href={item.url}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
