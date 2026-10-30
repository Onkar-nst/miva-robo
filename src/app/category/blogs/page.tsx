import PostCard from "@/components/PostCard";
import { Lines } from "@/components/ui";
import { posts } from "@/content/posts";

export const metadata = { title: "Blogs – MIVA Robotics", alternates: { canonical: "/category/blogs/" } };

export default function Blogs() {
  return (
    <>
      <section className="page-hero"><div className="wrap"><Lines as="h1" className="h-xl metal" lines={["Blogs"]} /></div></section>
      <section className="section" style={{ paddingTop: 0 }}><div className="wrap posts">{posts.map((p) => <PostCard key={p.slug} post={p} />)}</div></section>
    </>
  );
}
