import Slider from "@/components/Slider";

const API = "https://www.mendoza.edu.ar/wp-json/wp/v2";

async function fetchPosts(path) {
  const res = await fetch(`${API}/${path}`);
  if (!res.ok) return [];
  return await res.json();
}

export default async function HomePage() {
  const posts = await fetchPosts("posts?per_page=8&_embed");

  return (
    <>
      <Slider />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {posts.map((post) => {
          const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;
          return (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {image && (
                <img
                  src={image}
                  alt={post.title.rendered}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2
                  className="text-lg font-semibold"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(post.date).toLocaleDateString("es-AR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
