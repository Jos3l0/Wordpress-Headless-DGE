import HomeSlider from "@/components/Slider";
import { fetchFromWordPress } from "@/lib/wordpress";

export default async function Home() {
  // Obtener Últimas Noticias
  const latestNews = await fetchFromWordPress("posts?per_page=8&_embed");

  // Obtener Noticias de Escuelas
  const schoolNews = await fetchFromWordPress("posts?categories=798&per_page=8&_embed");

  // Obtener Concursos y Eventos (Categoría ID: 1589)
  const contestsAndEvents = await fetchFromWordPress("posts?categories=1589&per_page=4&_embed");

  return (
    <main className="container">
      <HomeSlider />

      {/* Sección Últimas Noticias */}
      <section className="post-section-container">
        <h1 className="post-section">Últimas Noticias</h1>
        <div className="post-grid">
          {latestNews.map((post) => {
            const featuredImage =
              post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/default-image.jpg";
            const formattedDate = new Date(post.date).toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            });

            return (
              <a key={post.id} href={`/post/${post.id}`} className="post-card">
                <img src={featuredImage} alt={post.title.rendered} />
                <div className="post-text">
                  <h2>{post.title.rendered}</h2>
                  <div className="post-date">{formattedDate}</div>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* Sección Noticias de Escuelas */}
      <section className="post-section-container">
        <h1 className="post-section">Noticias de Escuelas</h1>
        <div className="post-grid">
          {schoolNews.map((post) => {
            const featuredImage =
              post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/default-image.jpg";
            const formattedDate = new Date(post.date).toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            });

            return (
              <a key={post.id} href={`/post/${post.id}`} className="post-card">
                <img src={featuredImage} alt={post.title.rendered} />
                <div className="post-text">
                  <h2>{post.title.rendered}</h2>
                  <div className="post-date">{formattedDate}</div>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* Sección Concursos y Eventos + Información adicional */}
      <section className="dual-section">
        <div className="left-section">
          <h1 className="post-section">Concursos y Eventos</h1>
          <div className="post-list">
            {contestsAndEvents.map((post) => {
              const featuredImage =
                post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/default-image.jpg";
              const formattedDate = new Date(post.date).toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              });

              return (
                <a key={post.id} href={`/post/${post.id}`} className="post-item">
                  <img src={featuredImage} alt={post.title.rendered} className="post-thumb" />
                  <div className="post-info">
                    <h2>{post.title.rendered}</h2>
                    <div className="post-date">{formattedDate}</div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        <div className="right-section">
          <div className="info-box">
            <h2>📅 Cartelera</h2>
            <ul>
              <li>5 de enero - Día de la Bandera Provincial</li>
              <li>10 de enero - Ley Micaela</li>
              <li>31 de enero - Asamblea General Constituyente de 1813</li>
            </ul>
          </div>

          <div className="info-box">
            <h2>🎭 Agenda Cultural</h2>
            <p>Próximos eventos y actividades en la provincia.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

