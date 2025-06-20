import "../globals.css";
import "@/styles/components/header.css";
import "@/styles/components/footer.css";
import "@/styles/components/home.css";
import "@/styles/components/post.css";

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
