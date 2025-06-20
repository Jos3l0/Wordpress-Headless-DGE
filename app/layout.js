import "@/styles/globals.css";
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
        {children}
        <Footer />
      </body>
    </html>
  );
}
