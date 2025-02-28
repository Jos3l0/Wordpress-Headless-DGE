const API_URL = process.env.WORDPRESS_API_URL;

if (!API_URL) {
  throw new Error("❌ ERROR: Falta configurar WORDPRESS_API_URL en .env.local");
}

/* 🔹 Función para obtener datos generales de WordPress */
export async function fetchFromWordPress(endpoint) {
  const res = await fetch(`${API_URL}${endpoint}`);
  if (!res.ok) {
    throw new Error(`❌ Error al obtener datos de ${endpoint}: ${res.statusText}`);
  }
  return res.json();
}

/* 🔹 Función para obtener los posts del slider */
export async function fetchSliderPosts() {
  try {
    const categoryId = 5951; // 🔹 ID de la categoría "slider"
    const posts = await fetchFromWordPress(`posts?categories=${categoryId}&_embed&per_page=3`);

    if (!posts.length) {
      console.warn("⚠️ Advertencia: No hay posts en la categoría 'slider'.");
    }

    return posts;
  } catch (error) {
    console.error("❌ ERROR en fetchSliderPosts:", error);
    return [];
  }
}

