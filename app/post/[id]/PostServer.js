import fetchFromWordPress from "@/lib/wordpress";

export default async function PostServer({ id }) {
  const post = await fetchFromWordPress(`posts/${id}?_embed`);

  if (!post) {
    return <p>Post no encontrado</p>;
  }

  return post;
}
