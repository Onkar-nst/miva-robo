import PostCard from "@/components/PostCard";
import { Lines } from "@/components/ui";
import { posts } from "@/content/posts";

export const metadata = { title: "Aman Vasa – MIVA Robotics", alternates: { canonical: "/author/aman-vasa/" } };

export default function Author() {
  return (
    <>
      <section className="pb-[clamp(31px,3.9vw,57px)] pt-[clamp(112px,11.7vw,156px)]"><div className="wrap"><Lines as="h1" className="h-lg" lines={["Author: Aman Vasa"]} /></div></section>
      <section className="section-y light"><div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-x-5 gap-y-11">{posts.map((p) => <PostCard key={p.slug} post={p} />)}</div></section>
    </>
  );
}
