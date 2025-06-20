const API_URL = process.env.WORDPRESS_API_URL;

if (!API_URL) {
  throw new Error("❌ ERROR: Falta configurar WORDPRESS_API_URL en .env.local");
}

/**
 * Función principal para obtener datos de WordPress
 * @param {string} endpoint - Endpoint de la API (ej: 'posts', 'categories')
 * @returns {Promise<object>} Datos de la API
 */
async function fetchFromWordPress(endpoint) {
  // Normaliza el endpoint (añade / si no está presente)
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_URL}${normalizedEndpoint}`;

  try {
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 } // Cache de 1 hora (solo en producción)
    });

    if (!res.ok) {
      throw new Error(`❌ Error ${res.status}: ${res.statusText} (${url})`);
    }

    return await res.json();
  } catch (error) {
    console.error(`❌ Error en fetchFromWordPress (${url}):`, error.message);
    throw error;
  }
}

/**
 * Obtiene posts para el slider principal
 * @returns {Promise<Array>} Lista de posts para el slider
 */
async function fetchSliderPosts() {
  try {
    const categoryId = 5951; // ID de categoría "slider"
    const posts = await fetchFromWordPress(`posts?categories=${categoryId}&_embed&per_page=3`);

    if (!posts || !posts.length) {
      console.warn('⚠️ No se encontraron posts para el slider');
      return [];
    }

    return posts.map(post => ({
      id: post.id,
      title: post.title.rendered,
      excerpt: post.excerpt.rendered,
      image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
      link: post.link
    }));
  } catch (error) {
    console.error('❌ Error en fetchSliderPosts:', error);
    return []; // Devuelve array vacío para que el slider no falle
  }
}

/**
 * Obtiene los últimos posts
 * @param {number} per_page - Cantidad de posts a obtener
 * @returns {Promise<Array>} Lista de posts
 */
async function fetchLatestPosts(per_page = 8) {
  return fetchFromWordPress(`posts?_embed&per_page=${per_page}`);
}

// Exporta todas las funciones
module.exports = {
  fetchFromWordPress,
  fetchSliderPosts,
  fetchLatestPosts
};
