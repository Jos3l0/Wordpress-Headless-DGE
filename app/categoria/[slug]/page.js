import { fetchFromWordPress } from "@/lib/wordpress";

export default async function CategoriaPage({ params }) {
  const { slug } = params;

  // Definir IDs de categorías permitidas
  const categorias = {
    "agenda-cultural": 5747,
    "cartelera": 5707,
  };

  const categoriaID = categorias[slug];

  if (!categoriaID) {
    return <h1>🚫 Categoría no encontrada</h1>;
  }

  // Obtener los posts de la categoría específica
  const posts = await fetchFromWordPress(`posts?categories=${categoriaID}&per_page=100&_embed=true`);

  return (
    <main className="container">
      <h1 className="categoria-title">{slug.replace("-", " ")}</h1>
      <div className="post-grid">
        {posts.length > 0 ? (
          posts.map((post) => (
            <a key={post.id} href={post.link} className="post-card" target="_blank" rel="noopener noreferrer">
              <img src={post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/default-image.jpg"} alt={post.title.rendered} />
              <div className="post-text">
                <h2>{post.title.rendered}</h2>
                <p className="post-date">{new Date(post.date).toLocaleDateString("es-ES")}</p>
              </div>
            </a>
          ))
        ) : (
          <p>No hay publicaciones disponibles.</p>
        )}
      </div>
    </main>
  );
}

