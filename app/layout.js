import "../globals.css"; // ✅ Importa los estilos globales
import "@/styles/components/Header.css";
import "@/styles/components/Footer.css";
import "@/styles/components/Home.css";
import "@/styles/components/Post.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "WordPress Headless DGE",
  description: "Sitio oficial de noticias de la Dirección General de Escuelas de Mendoza",
};

export default function Layout({ children }) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main className="container">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
