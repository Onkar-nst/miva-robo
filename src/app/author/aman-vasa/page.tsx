import PostCard from "@/components/PostCard";
import { Lines } from "@/components/ui";
import { posts } from "@/content/posts";

export const metadata = { title: "Aman Vasa – MIVA Robotics", alternates: { canonical: "/author/aman-vasa/" } };

export default function Author() {
  return (
    <>
      <section className="page-hero"><div className="wrap"><Lines as="h1" className="h-lg metal" lines={["Author: Aman Vasa"]} /></div></section>
      <section className="section" style={{ paddingTop: 0 }}><div className="wrap posts">{posts.map((p) => <PostCard key={p.slug} post={p} />)}</div></section>
    </>
  );
}
