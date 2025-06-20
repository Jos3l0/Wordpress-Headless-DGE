export async function fetchSliderPosts() {
  const res = await fetch(
    "https://www.mendoza.edu.ar/wp-json/wp/v2/posts?_embed&per_page=5"
  );
  if (!res.ok) {
    throw new Error("Error al obtener posts del slider");
  }
  const posts = await res.json();
  return posts;
}
