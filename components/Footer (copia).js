"use client";

import { useEffect, useState } from "react";
import Head from "next/head";

export default function Footer() {
  const [footerContent, setFooterContent] = useState("");

  useEffect(() => {
    async function fetchFooter() {
      try {
        const response = await fetch(
          "https://des.mendoza.edu.ar/wp-json/custom/v1/elementor_templates/245969"
        );
        const data = await response.json();
        if (data.content) {
          setFooterContent(data.content);
        }
      } catch (error) {
        console.error("Error cargando el footer:", error);
      }
    }

    fetchFooter();
  }, []);

  return (
    <>
      {/* Carga el CSS de Elementor directamente en el head */}
      <Head>
        <link
          rel="stylesheet"
          href="https://des.mendoza.edu.ar/wp-content/uploads/elementor/css/post-245969.css"
        />
        <link
          rel="stylesheet"
          href="https://des.mendoza.edu.ar/wp-content/plugins/elementor/assets/lib/eicons/css/elementor-icons.min.css"
        />
      </Head>

      <footer className="footer elementor-245969">
        <div
          className="footer-container"
          dangerouslySetInnerHTML={{ __html: footerContent }}
        />
      </footer>
    </>
  );
}

