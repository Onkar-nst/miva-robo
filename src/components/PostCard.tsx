import Image from "next/image";
import Link from "next/link";
import type { posts } from "@/content/posts";

export default function PostCard({ post }: { post: (typeof posts)[number] }) {
  return (
    <Link href={`/${post.slug}/`} className="post-card" data-reveal>
      <div className="frame"><Image src={post.image} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" /></div>
      <p className="meta">{post.date} · Posted by {post.author}</p>
      <h3 className="h-sm">{post.title}</h3>
    </Link>
  );
}
