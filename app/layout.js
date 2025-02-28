import "@/styles/components/header.css";
import "@/styles/components/footer.css";
import "@/styles/components/home.css";
import "@/styles/components/post.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header"; // Importamos el Header dinámico

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

