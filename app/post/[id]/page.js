"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchFromWordPress } from "@/lib/wordpress";

export default function Post() {
  const params = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function loadPost() {
      try {
        const data = await fetchFromWordPress(`posts/${params.id}?_embed`);
        setPost(data);
      } catch (error) {
        console.error("Error cargando el post:", error);
      }
    }
    loadPost();
  }, [params.id]);

  if (!post) return <p>Post no encontrado</p>;

  return (
    <article className="post-container">
      <h1 className="post-title">{post.title.rendered}</h1>
      <p className="post-date">{new Date(post.date).toLocaleDateString("es-ES")}</p>
      {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
        <img src={post._embedded["wp:featuredmedia"][0].source_url} alt={post.title.rendered} />
      )}
      <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </article>
  );
}

