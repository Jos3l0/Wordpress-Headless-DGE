import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Slider from "@/components/Slider";
import fetchFromWordPress from "@/lib/wordpress";

export default async function Home() {
  const posts = await fetchFromWordPress("posts");

  return (
    <main>
      <Header />
      <Slider />
      <div className="p-6">
        <h1 className="text-2xl font-bold">Últimos Posts</h1>
        <ul className="mt-4">
          {posts.map((post) => (
            <li key={post.id} className="mt-2">
              <a href={`/post/${post.id}`} className="text-blue-500 hover:underline">
                {post.title.rendered}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </main>
  );
}
