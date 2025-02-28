import HomeSlider from "@/components/Slider";
import { fetchFromWordPress } from "@/lib/wordpress";

export default async function Home() {
  // Obtener noticias de Últimas Noticias
  const latestPosts = await fetchFromWordPress("posts?per_page=8&_embed");

  // Obtener noticias de Noticias de Escuelas (Categoría ID: 798)
  const schoolNews = await fetchFromWordPress("posts?categories=798&per_page=8&_embed");

  // Obtener noticias de Concursos y Eventos (Categoría ID: 1589)
  const contestEvents = await fetchFromWordPress("posts?categories=1589&per_page=4&_embed");
  
  // Obtener enlaces de Formación y Capacitación (Categoría ID: 780)
  const trainingPosts = await fetchFromWordPress("posts?categories=780&per_page=2");
  
   // Obtener los 3 últimos posts de la categoría Cartelera (ID: 5707)
  const carteleraPosts = await fetchFromWordPress("posts?categories=5707&per_page=3");
  
     // Obtener los 3 últimos posts de la categoría Cultura (ID: 5707)
  const agendaCulturalPosts = await fetchFromWordPress("posts?categories=5747&per_page=3");

  
  

  return (
    <main className="container">
      {/* 🔹 Slider Principal (Ahora ocupa todo el ancho de la pantalla) */}
      <div className="slider-full-width">
        <HomeSlider />
      </div>

      {/* 🔹 Últimas Noticias */}
      <section className="post-section-container">
        <h1 className="post-section">Últimas Noticias</h1>
        <div className="post-grid">
          {latestPosts.map((post) => {
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

      {/* 🔹 Noticias de Escuelas */}
      <section className="post-section-container">
        <h1 className="post-section">Noticias de las Escuelas</h1>
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

      {/* 🔹 Concursos y Eventos + Formación + Cartelera */}
      <section className="concursos-container">
        <div className="concursos-y-eventos">
          <h2>Concursos y eventos</h2>
          {contestEvents.map((post) => {
            const featuredImage =
              post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/default-image.jpg";
            const formattedDate = new Date(post.date).toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            });

            return (
              <a key={post.id} href={`/post/${post.id}`} className="concurso-card">
                <img src={featuredImage} alt={post.title.rendered} />
                <div className="concurso-text">
                  <h3>{post.title.rendered}</h3>
                  <span>{formattedDate}</span>
                </div>
              </a>
            );
          })}
        </div>

        {/* 🔹 Formación */}
 <div className="formacion">
          <h2>Formación y Capacitación</h2>
          <ul>
            {trainingPosts.length > 0 ? (
              trainingPosts.map((post) => (
                <li key={post.id}>
                  <a href={post.link} target="_blank" rel="noopener noreferrer">
                    {post.title.rendered}
                  </a>
                </li>
              ))
            ) : (
              <p>No hay publicaciones disponibles.</p>
            )}
          </ul>
        </div>
      {/* 🔹 Sección Cartelera - Enlaces dinámicos desde WordPress */}
<div className="cartelera">
  <h2><i className="fa-regular fa-calendar-check"></i> Cartelera</h2>
  <ul>
    {carteleraPosts.length > 0 ? (
      carteleraPosts.map((post) => (
        <li key={post.id}>
          <i className="fa-regular fa-calendar-alt"></i>
          <a href={post.link} target="_blank" rel="noopener noreferrer">
            {post.title.rendered}
          </a>
        </li>
      ))
    ) : (
      <p>No hay publicaciones disponibles.</p>
    )}
  </ul>

  {/* 🔹 Sección Agenda Cultural - Enlaces dinámicos desde WordPress */}
  <h3>
  <i className="fa-regular fa-calendar-alt"></i> 
  <a href="/categoria/agenda-cultural" target="_blank" rel="noopener noreferrer">
    Agenda Cultural
  </a>
</h3>
</div>


      </section>
    </main>
  );
}

