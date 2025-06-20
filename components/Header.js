export default function Header() {
  return (
    <header className="bg-white border-b py-6">
      <div className="container mx-auto flex justify-between items-center px-4">
        <img
          src="https://www.mendoza.edu.ar/wp-content/uploads/sites/3/2021/07/logo-dge.png"
          alt="DGE"
          className="h-12"
        />
        <nav className="space-x-6 font-medium">
          <a href="/" className="text-gray-800 hover:text-blue-600">Inicio</a>
          <a href="#" className="text-gray-800 hover:text-blue-600">Institucional</a>
          <a href="#" className="text-gray-800 hover:text-blue-600">Recursos</a>
          <a href="#" className="text-gray-800 hover:text-blue-600">Servicios</a>
          <a href="#" className="text-gray-800 hover:text-blue-600">Novedades</a>
          <a href="#" className="text-gray-800 hover:text-blue-600">Aulas Virtuales</a>
        </nav>
      </div>
    </header>
  );
}
