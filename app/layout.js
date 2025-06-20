// app/layout.js
import "@/styles/components/header.css";
import "@/styles/components/footer.css";
import "@/styles/components/home.css";
import "@/styles/components/post.css";
import "@/styles/components/slider.css";
import "@/app/globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main className="container mx-auto px-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
