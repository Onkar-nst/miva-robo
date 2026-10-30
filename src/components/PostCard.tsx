import Image from "next/image";
import Link from "next/link";
import type { posts } from "@/content/posts";
import { ArrowR } from "./ui";

// The byline only appears on the home page cards, matching mivarobotics.ai.
export default function PostCard({ post, byline }: { post: (typeof posts)[number]; byline?: boolean }) {
  return (
    <Link href={`/${post.slug}/`} className="post-card" data-reveal>
      <div className="frame">
        <Image src={post.image} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" />
        <span className="tag">Blogs</span>
      </div>
      <p className="meta"><time dateTime={post.iso}>{post.date}</time></p>
      <div className="post-row">
        <div>
          <h3 className="h-sm">{post.title}</h3>
          {byline && <p className="post-by">Posted by {post.author}</p>}
        </div>
        <span className="circ" aria-hidden="true"><ArrowR /></span>
      </div>
    </Link>
  );
}
