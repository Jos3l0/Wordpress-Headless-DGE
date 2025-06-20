export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="container mx-auto px-4 text-center">
        Dirección General de Escuelas - Gobierno de Mendoza © {new Date().getFullYear()}
      </div>
    </footer>
  );
}
