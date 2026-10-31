import PostCard from "@/components/PostCard";
import { Lines } from "@/components/ui";
import { posts } from "@/content/posts";

export const metadata = { title: "Blogs – MIVA Robotics", alternates: { canonical: "/category/blogs/" } };

export default function Blogs() {
  return (
    <>
      <section className="pb-[clamp(31px,3.9vw,57px)] pt-[clamp(112px,11.7vw,156px)]"><div className="wrap"><Lines as="h1" className="h-xl" lines={["Blogs"]} /></div></section>
      <section className="section-y light"><div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-x-5 gap-y-11">{posts.map((p) => <PostCard key={p.slug} post={p} />)}</div></section>
    </>
  );
}
