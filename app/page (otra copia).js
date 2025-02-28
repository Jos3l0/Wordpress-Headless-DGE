import HomeSlider from "@/components/Slider";
import { fetchFromWordPress } from "@/lib/wordpress";

export default async function Home() {
  const posts = await fetchFromWordPress("posts?per_page=8&_embed");

  return (
    <main className="container">
      <HomeSlider />
      <section className="post-section-container">
        <h1 className="post-section">Últimas Noticias</h1>
        <div className="post-grid">
          {posts.map((post) => {
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
    </main>
  );
}

